// react router
import { useParams } from "react-router-dom";

// custom hooks
import { useFetch } from "../../hooks/useFetch";

// types, consts
import { PostType } from "../../app/types";
import { BASE_URL } from "../../app/consts";

// comps
import { RefetchBtn } from "../../components/refetchBtn/RefetchBtn";
import { Invalidate } from "../../components/invalidate/Invalidate";
import { BackBtn } from "../../components/backBtn/BackBtn";

export function SinglePage() {
    const { postId } = useParams();
    const { data: post, error, isPending, refetch, inValidate } = useFetch<PostType>({
        url: `${BASE_URL}/posts/${postId}`, 
        initialEnabled: true, 
        cache: {
            enabled: true, 
            ttl: 30, 
        }, 
        key: ['app', 'posts', `${postId}`], 
        options: {
            method: 'GET', 
        }, 
    });

    if (isPending) {
        return (
            <div>
                <p>Fetching...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div>
            {post && (
                <>
                    <BackBtn />
                    <RefetchBtn onRefetch={refetch} />
                    <Invalidate 
                        onInvalidate={inValidate}
                        cacheKey={['app', 'posts', `${postId}`]}
                    />
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                </>
            )}
        </div>
    )
}