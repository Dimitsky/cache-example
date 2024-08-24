type InvalidateProps = {
    onInvalidate: (cacheKey: string[]) => void, 
    cacheKey: string[],
}
export function Invalidate({ onInvalidate, cacheKey }: InvalidateProps) {
    return (
        <button onClick={() => onInvalidate(cacheKey)}>invalidate</button>
    )
}