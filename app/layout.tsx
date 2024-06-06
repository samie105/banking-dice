import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { ColorProvider } from "@/context/colorContext";
import Navbar from "@/components/main/navbar/Navbar";
const inter = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorProvider>
          <Navbar />
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}
