import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flores Amarillas",
  description: "Una app simple para generar Flores Amarillas y enviarlas a esa persona especial ❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
