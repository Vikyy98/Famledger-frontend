"use client";

import { useAppDispatch, useAppSelector } from "@/src/hooks/useAuth";
import ProtectedRoute from "../components/route/ProtectedRoute";
import { logoutUser } from "@/src/auth/authSlice";
import { useRouter } from "next/navigation";

export default function DashBoardPage() {
  const userDetails = useAppSelector((state) => state.auth.user);
  const disptach = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    disptach(logoutUser());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div>Welcome back {userDetails?.name}</div>;
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
}
