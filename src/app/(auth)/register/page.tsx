import { RegisterForm } from "@/components/auth/register-form";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

const Register = () => {
  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <RegisterForm />
    </Suspense>
  );
};

export default Register;
