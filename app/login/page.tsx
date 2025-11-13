import AuthLayout from "../components/layout/AuthLayout";
import LoginHeroSection from "../components/sections/LoginHeroSection";
import LoginSetion from "../components/sections/LoginFormSetion";

export default function LoginPage() {
  return (
    <AuthLayout
      leftContent={<LoginHeroSection />}
      rightContent={<LoginSetion />}
    />
  );
}
