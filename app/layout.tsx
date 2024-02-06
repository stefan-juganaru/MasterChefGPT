import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next"


import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MasterChefGPT",
  description: "Your personal chef for all your cooking needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <html lang="en" data-theme="luxury" >
          <body className={inter.className}>
            <Providers>
                {children}
                <SpeedInsights/>
            </Providers>
          </body>
        </html>
      </ClerkProvider>
  );
}
