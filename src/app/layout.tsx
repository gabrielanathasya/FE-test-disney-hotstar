import Sidebar from "@/components/sidebar";
import WatchlistProvider from "@/context/provider/watchlist-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disney Hotstar Clone",
  description: "Check out my Disney Hotstar Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WatchlistProvider>
          <Sidebar />
          {children}
        </WatchlistProvider>
      </body>
    </html>
  );
}
