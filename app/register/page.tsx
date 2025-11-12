import React from "react";

import RegisterSection from "../components/sections/RegisterSection";
import RegisterHeroSection from "../components/sections/RegisterHeroSection";
import AuthLayout from "../components/layout/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      leftContent={<RegisterHeroSection />}
      rightContent={<RegisterSection />}
    />
  );
}
