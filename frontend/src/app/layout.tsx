import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PaperBase OCR",
  description:
    "PaperBase OCR is a powerful tool for extracting text from handwritten paper forms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <main
            className="bg-background text-foreground flex-1"
            style={{
              backgroundImage: `linear-gradient(135deg, #eefcf6 0%, #fdf6e3 100%)`,
            }}
          >
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
