import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GymOS Luxury SaaS | IFA Irahi Reynosa",
  description: "Plataforma Integral de Gestión de Gimnasios y Nutrición de Alta Biomecánica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-gray-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
