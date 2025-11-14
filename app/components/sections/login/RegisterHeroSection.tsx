import React from "react";
import { FeatureCard } from "../../ui/FeatureCard";
import { IconWrapper } from "../../ui/IconWrapper";
import { Rocket, Heart, PiggyBank, Target } from "lucide-react";

function RegisterHeroSection() {
  return (
    <div className="max-w-lg space-y-8">
      {/* Tagline */}
      <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
        🌟 Start Free • No Credit Card
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {"Begin Your Family's"}
        </h1>
        <h1 className="text-4xl font-bold leading-tight text-blue-600">
          Financial Journey
        </h1>
        <p className="text-gray-600 mt-3">
          Join thousands of families building wealth, achieving goals, and
          securing their future together.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard
          icon={
            <IconWrapper>
              <Rocket size={18} />
            </IconWrapper>
          }
          title="Quick Setup"
          description="Get started in under 2 minutes"
        />
        <FeatureCard
          icon={
            <IconWrapper>
              <Heart size={18} />
            </IconWrapper>
          }
          title="Family First"
          description="Built for families, by families"
        />
        <FeatureCard
          icon={
            <IconWrapper>
              <PiggyBank size={18} />
            </IconWrapper>
          }
          title="Smart Savings"
          description="Save 30% more on average"
        />
        <FeatureCard
          icon={
            <IconWrapper>
              <Target size={18} />
            </IconWrapper>
          }
          title="Goal Tracking"
          description="Achieve dreams together"
        />
      </div>
    </div>
  );
}

export default RegisterHeroSection;
