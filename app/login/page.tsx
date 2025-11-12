import AuthLayout from "../components/layout/AuthLayout";
import LoginHeroSection from "../components/sections/LoginHeroSection";
import LoginSetion from "../components/sections/LoginSetion";

export default function LoginPage() {
  return (
    <AuthLayout
      leftContent={<LoginHeroSection />}
      rightContent={<LoginSetion />}
    />
  );
}
