// react router
import { useNavigate } from "react-router-dom";

export function BackBtn() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)}>
            back
        </button>
    )
}