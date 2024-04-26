import React, {lazy, Suspense} from "react";

const Login = lazy(() => import("../components/auth/Login"));
const Loading = lazy(() => import("../components/Loading"));
export const LoginPage: React.FC = () => {

    return (
        <Suspense fallback={<Loading/>}>
            <Login/>
        </Suspense>
    )
}