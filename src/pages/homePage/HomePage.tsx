import { Link } from "react-router-dom";
import { PostType } from "../../app/types";
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL } from "../../app/consts";

import { RefetchBtn } from "../../components/refetchBtn/RefetchBtn";
import { Invalidate } from "../../components/invalidate/Invalidate";

export function HomePage() {
    const { data: posts, error, isPending, refetch, inValidate } = useFetch<PostType[]>({
        url: `${BASE_URL}/posts`, 
        options: {
            method: 'GET', 
        }, 
        initialEnabled: true, 
        cache: {
            enabled: true, 
            ttl: 30, 
        }, 
        key: ['app', 'posts'], 
    });

    if (isPending) {
        return (
            <p>
                Fetching...
            </p>
        )
    }

    if (error) {
        return (
            <p>
                {error}
            </p>
        )
    }

    return (
        <div>
            <RefetchBtn onRefetch={refetch} />
            <Invalidate 
                onInvalidate={inValidate} 
                cacheKey={['app', 'posts']} 
            />
            {posts && (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link to={`/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}