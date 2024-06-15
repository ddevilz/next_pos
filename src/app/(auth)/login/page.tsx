import { LoginForm } from "@/components/auth/login-form";
import React, { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;
