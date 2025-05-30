import {
  ClerkProvider
} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai Carrier Guide",
  description: "A comprehensive guide to AI careers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: "dark" }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {/* header */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          © {new Date().getFullYear()} Carrier Guide by Sunny. All rights reserved.
          </footer>
        </ThemeProvider>
        
      </body>
      </html>
    </ClerkProvider>
  );
}
