import React, { lazy, Suspense } from "react";

const Login = lazy(() => import("../components/auth/Login"));
export const LoginPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="loading">
          <p className="text">loading ...</p>
        </div>
      }>
      <Login />
    </Suspense>
  );
};
