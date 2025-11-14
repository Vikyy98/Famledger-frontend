import { ArrowRight, Shield, Sparkle, Timer, Users } from "lucide-react";
import { IconWrapper } from "../../ui/IconWrapper";
import FeatureList from "../../ui/FeatureList";

export default function LoginHeroSection() {
  return (
    <div className="max-w-lg space-y-8">
      {/* Tagline */}
      <div className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        <Sparkle className="mr-3 h-4 w-4" />
        <span> Trusted by 50,000+ families</span>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Welcome Back to{" "}
          <span className="text-4xl font-bold leading-tight text-blue-600">
            {" "}
            FamLedger
          </span>
        </h1>
        <p className="text-gray-600 mt-3">
          Your {"family's"} financial command center. Track, manage, and grow
          together.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-4">
        <FeatureList
          icon={
            <IconWrapper>
              <Timer size={18} />
            </IconWrapper>
          }
          title="Real-time Sync"
          description="All family members stay updated instantly"
        />
        <FeatureList
          icon={
            <IconWrapper>
              <Shield size={18} />
            </IconWrapper>
          }
          title="Bank-level Security"
          description="Your financial data is encrypted and protected"
        />
        <FeatureList
          icon={
            <IconWrapper>
              <ArrowRight size={18} />
            </IconWrapper>
          }
          title="Smart Insights"
          description="AI-powered recommendations for better savings"
        />
        <FeatureList
          icon={
            <IconWrapper>
              <Users size={18} />
            </IconWrapper>
          }
          title="Family Collaboration"
          description="Shared goals, shared success, shared future"
        />
      </div>
    </div>
  );
}
