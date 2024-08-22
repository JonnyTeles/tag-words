"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { checkIsPublicRoute } from "./functions/check-is-public-route";
import PrivateRoute from "./components/private";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isPublicPage = checkIsPublicRoute(pathName);
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          
          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}

        </SessionProvider>
      </body>
    </html>
  );
}
