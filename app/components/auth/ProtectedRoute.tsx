import { useAppSelector } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
