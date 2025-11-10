import LoginForm from "../components/auth/LoginForm";
import { AuthLayout } from "../components/layout/AuthLayout";
import LoginHeroSection from "../components/sections/LoginHeroSection";

export default function LoginPage() {
  return (
    <AuthLayout
      leftContent={<LoginHeroSection />}
      rightContent={<LoginForm />}
    />
  );
}
