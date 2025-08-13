// pages/signup.tsx or app/signup/page.tsx
"use client";

import AuthForm from '@/components/auth/AuthForm';
import ReduxProvider from '@/store/provider/ReduxProvider';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <ReduxProvider>
        <AuthForm mode="signup" />
        </ReduxProvider>
    </div>
  );
}
