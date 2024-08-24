import { useEffect, useState } from 'react';
import { useCache } from '../context/cacheContext/CacheContext';

type FetchConfig = {
    key: Array<unknown>; 
    initialEnabled: boolean; 
    cache?: {
        enabled: boolean; 
        ttl?: number; 
    }; 
    url: string; 
    options: {
        [key: string]: string | number;
    }; 
}

function keyify(key: FetchConfig['key']) {
    return key.map((item) => JSON.stringify(item)).join('-');
}

export function useFetch<T = any>({
    key, 
    initialEnabled, 
    cache, 
    url, 
    options, 
}: FetchConfig) {
    const [ data, setData ] = useState<T | undefined>();
    const [ error, setError ] = useState<any>(null);
    const [ isPending, setIsPending ] = useState(false);
    const { getCache, setCache, deleteCache } = useCache();

    const refetch = async () => {
        setIsPending(true);
        setError(null);

        const cacheKey = keyify(key);

        try {
            if (cache?.enabled && getCache(cacheKey) !== undefined) {
                setData(getCache(cacheKey));

                return
            }

            const response = await fetch(url, options);

            if (response.ok) {
                const fetchedData: T = await response.json();

                setData(fetchedData);
                setCache(cacheKey, fetchedData, cache?.ttl);
            } else {
                if (response.status === 404) {
                    throw new Error('404, not found');
                }

                if (response.status === 500) {
                    throw new Error('500, internal server error');
                }

                throw new Error(`${response.status}, ${response.statusText}`);
            }
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === 'string') {
                setError(err);
            } else {
                setError('Unknown error');
            }
        } 
        finally {
            setIsPending(false);
        }
    }

    function inValidate(invalidationKey: FetchConfig['key']) {
        deleteCache(keyify(invalidationKey));
    }

    useEffect(() => {
        if (initialEnabled) {
            refetch();
        }
    }, []);

    return {
        data, 
        error, 
        isPending, 
        refetch, 
        inValidate, 
    }
}