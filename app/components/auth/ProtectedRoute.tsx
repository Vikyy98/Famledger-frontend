import { useAppSelector, useAppDispatch } from "@/app/hooks/useAuth";
import { rehydrateFromStorage } from "@/app/services/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    dispatch(rehydrateFromStorage());
    setInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;
    if (!token) {
      router.push("/login");
    }
  }, [initialized, token, router]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
