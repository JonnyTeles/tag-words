"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { checkIsPublicRoute } from "./functions/check-is-public-route";
import PrivateRoute from "./components/private";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isPublicPage = checkIsPublicRoute(pathName);

  //TODO - COLOCAR SKELETON
  return (
    <html lang="en">
      <body>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SessionProvider>

            {isPublicPage && children}
            {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}

          </SessionProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
