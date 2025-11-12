import { useAppSelector } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
