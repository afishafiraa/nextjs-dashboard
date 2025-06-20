import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PKAT System - Pemeriksaan Kesehatan Anak Terintegrasi",
  description: "Sistem monitoring dan pencatatan kesehatan anak usia 6 bulan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
