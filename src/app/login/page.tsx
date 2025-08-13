// pages/login.tsx or app/login/page.tsx
"use client";

import AuthForm from '@/components/auth/AuthForm';
import ReduxProvider from '@/store/provider/ReduxProvider';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
     <ReduxProvider>
       <AuthForm mode="login" />
     </ReduxProvider>
    </div>
  );
}
