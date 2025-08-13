"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import { loadFromStorage } from "@/store/features/auth/authSlice";
import LoadingSkeleton from "../shared/loader/LoaderSkeleton";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && !storedToken && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    }
    setLoading(false);
  }, [token, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSkeleton
              
              className="w-[100px] h-[200px] md:w-[200px]  rounded-md bg-white"
              showShimmer
            />
        <p className="text-gray-500">
           Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
