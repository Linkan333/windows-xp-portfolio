import type { Metadata } from "next";
import localFont from "next/font/local";
import CRTMonitor from "./components/CRTMonitor";
import "./globals.css";

const alfaSlabOne = localFont({
  src: [
    {
      path: "fonts/Tahoma.ttf",
      weight: "400",
      style: "normal",
    }
  ]
})

export const metadata: Metadata = {
  title: "linkan.dev",
  description: "Linkan333 Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${alfaSlabOne.className} antialiased`}
      >
        <CRTMonitor frameSrc="/images/crt-frame.png">{children}</CRTMonitor>
      </body>
    </html>
  );
}
