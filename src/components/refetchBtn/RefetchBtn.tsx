type RefetchBtnProps = {
    onRefetch: () => void, 
}

export function RefetchBtn({ onRefetch }: RefetchBtnProps) {
    return (
        <button onClick={onRefetch}>refetch</button>
    )
}