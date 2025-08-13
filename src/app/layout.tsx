import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/sonner";
import AddUpdateStudentDialogWithRedux from "@/components/with-redux-wrapper/AddUpdateStudentDialogWithRedux";

export const metadata: Metadata = {
  title: "Rishiverse",
  description: "Frontend challenge with JWT auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen">
          <Header />
          {children}
          <Toaster />
          <AddUpdateStudentDialogWithRedux />
        </div>
      </body>
    </html>
  );
}
