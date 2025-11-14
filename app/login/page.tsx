import AuthLayout from "../components/layout/AuthLayout";
import LoginHeroSection from "../components/sections/login/LoginHeroSection";
import LoginSetion from "../components/sections/login/LoginFormSetion";

export default function LoginPage() {
  return (
    <AuthLayout
      leftContent={<LoginHeroSection />}
      rightContent={<LoginSetion />}
    />
  );
}
