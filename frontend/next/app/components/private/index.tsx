import { APP_ROUTES } from "@/app/constants/app-routes";
import { checkUserAuthenticated } from "@/app/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = checkUserAuthenticated();
            setIsAuth(authenticated);
            setIsCheck(true);
            if (!authenticated) {
                router.push(APP_ROUTES.public.login);
            }
        };

        checkAuth();
    }, [router]);

    if (!isCheck) return null;
    return isAuth ? <>{children}</> : null;
};

export default PrivateRoute;