"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { checkIsPublicRoute } from "./functions/check-is-public-route";
import PrivateRoute from "./components/private";
import React from "react";
import Skeleton from "design-system/components/Skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppHeader from "./components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isPublicPage = checkIsPublicRoute(pathName);
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <React.Suspense fallback={<Skeleton active />}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>

              {isPublicPage && children}
              {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}

            </SessionProvider>
          </QueryClientProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
