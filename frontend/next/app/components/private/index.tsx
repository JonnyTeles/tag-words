import { APP_ROUTES } from "@/app/constants/app-routes";
import { checkUserAuthenticated } from "@/app/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { push } = useRouter()

    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(() => {
        if (!isUserAuthenticated) {
            push(APP_ROUTES.public.login);
        }
    }, [isUserAuthenticated, push])

    return (
        <>
            {!isUserAuthenticated && null}
            {isUserAuthenticated && children}
        </>
    )
}

export default PrivateRoute