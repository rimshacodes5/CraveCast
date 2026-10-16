import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CraveCast — AI Demand Forecasting for Home Chefs",
  description: "Predictive Demand & Waste Prevention Engine for Home Food Entrepreneurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAF6F0] text-[#2C1A1D] antialiased">
        {children}
      </body>
    </html>
  );
}