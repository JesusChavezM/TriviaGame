import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trivia Game",
  description: "Este proyecto es un juego de trivia en el que los usuarios pueden participar en emocionantes partidas de preguntas y respuestas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/static/media/auron.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
