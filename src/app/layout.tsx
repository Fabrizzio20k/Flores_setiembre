import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flores Amarillas",
  description: "Una app simple para generar Flores Amarillas y enviarlas a esa persona especial ❤️",
  icons: {
    icon: "/icons/flower.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
