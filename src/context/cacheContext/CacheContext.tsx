// Контекст для кеширования данных. 
// ttl – time to live. Определяет, через сколько секунд кеш устареет 

// react
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

type ContextType = {
    getCache: (key: string) => any, 
    setCache: (key: string, value: any, ttl?: number) => void, 
    deleteCache: (key: string) => void, 
    clearCache: () => void, 
}

type CacheBody = {
    expiry: Date, 
    data: any, 
}

const CacheContext = createContext<ContextType | null>(null);

export function useCache() {
    const value = useContext(CacheContext);

    // Сужение типа
    // Проверяем, чтобы хук был обернут в провайдер контекста 
    if (!value) {
        throw new Error('useCache has to be used within <CacheContext.Provider>');
    }

    return value;
}

export function CacheProvider({ children }: PropsWithChildren) {
    const map = new Map<string, CacheBody>();

    // Получить кеш по ключу 
    const getCache = (key: string) => {
        const cacheValue = map.get(key);

        // Кеш с таким ключом отсутствует 
        if (!cacheValue) {
            return undefined
        }

        // Кеш просрочен 
        if (Date.now() > cacheValue.expiry.getTime()) {
            deleteCache(key);

            return undefined
        }

        return cacheValue.data
    }
    // Сохранить значение в кеш 
    const setCache = (key: string, value: any, ttl: number = 10) => {
        // Текущая дата 
        const t = new Date();

        // Время, когда данный кеш будет неактуален  
        t.setSeconds(t.getSeconds() + ttl);

        // Сохраняем кеш в мап 
        map.set(key, {
            expiry: t, 
            data:  value, 
        })
    }
    // Удалить кеш по ключу 
    const deleteCache = (key: string) => {
        map.delete(key);
    }
    // Очистить кеш 
    const clearCache = () => {
        map.clear();
    }

    // Мемоизируем, чтобы объект значения контекста не создавался при каждом рендере провайдера 
    const contextValue: ContextType = useMemo(() => ({
        getCache, 
        setCache, 
        deleteCache, 
        clearCache, 
    }), [ getCache, setCache, deleteCache, clearCache ]);

    return (
        <CacheContext.Provider value={contextValue}>
            {children}
        </CacheContext.Provider>
    )
}