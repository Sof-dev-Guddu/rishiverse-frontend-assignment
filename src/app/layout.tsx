import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/sonner";
import AddUpdateStudentDialogWithRedux from "@/components/with-redux-wrapper/AddUpdateStudentDialogWithRedux";
import DeleteAlertDialogWithRedux from "@/components/with-redux-wrapper/DeleteAlertDialogWithRedux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" min-h-screen ">
          <Header/>
          {children}
          <Toaster/>
          <AddUpdateStudentDialogWithRedux/>
          
         </div>
       
      </body>
    </html>
  );
}
