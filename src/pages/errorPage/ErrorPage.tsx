// react router
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    return (
        <div>
            <p>
                {isRouteErrorResponse(error) ? (
                    <>
                        {error.status + '. ' + error.data.message}
                    </>
                ) : (
                    <>
                        Something went wrong
                    </>
                )}
            </p>
        </div>
    )
}