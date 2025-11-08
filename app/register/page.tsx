import React from "react";

import { RegisterSection } from "../components/sections/RegisterSection";
import { HeroSection } from "../components/sections/HeroSection";
import { AuthLayout } from "../components/layout/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      leftContent={<HeroSection />}
      rightContent={<RegisterSection />}
    />
  );
}
