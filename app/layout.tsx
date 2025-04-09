import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import "animate.css";
import { ColorProvider } from "@/context/colorContext";
import { SignUpProvider } from "@/context/signUpFormContext";
import { LoginProvider } from "@/context/loginFormContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Swift Nexus | Best Digital Banking Platform",
  description:
    "Experience cutting-edge banking with our innovative financial service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignUpProvider>
          <LoginProvider>
            <ColorProvider>
              <Toaster richColors position="top-center" />
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </ColorProvider>
          </LoginProvider>
        </SignUpProvider>
      </body>
    </html>
  );
}
