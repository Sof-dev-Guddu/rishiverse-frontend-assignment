"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react"; 

export default function HomePage() {
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);

  const handleClick = (type: "login" | "signup", href: string) => {
    setLoading(type);
    // simulate navigation delay
    setTimeout(() => {
      window.location.href = href; // redirect after loader
    }, 1000);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/rishihood-campus.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center px-2">
        <div className="text-center bg-white p-10 relative border-right border-top border-top-[#008899]">
          <div className="w-full h-full bg-[#ff5200] absolute right-2 top-2 -z-1"></div>
          <div className="w-full h-full bg-secondary absolute right-4 top-4 -z-2"></div>
          <h1 className="text-3xl font-bold mb-4">Rishiverse</h1>
          <p className="mb-6">Assignment demo app. Please login or signup.</p>
          <div className="space-x-4 flex justify-center">
            <button
              onClick={() => handleClick("login", "/login")}
              disabled={loading !== null}
              className="px-4 py-2 rounded text-white bg-gradient-to-r from-[#ff5200] to-[#B20E38] relative overflow-hidden before:absolute before:-inset-1 before:blur-lg before:bg-gradient-to-r before:from-[#C65930] before:to-[#B20E38] before:opacity-36 before:rounded hover:before:bg-gradient-to-l hover:before:opacity-28 transition-opacity duration-300 z-10 flex items-center justify-center gap-2"
            >
              {loading === "login" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
            <button
              onClick={() => handleClick("signup", "/signup")}
              disabled={loading !== null}
              className="px-4 py-2 border rounded flex items-center justify-center gap-2"
            >
              {loading === "signup" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
