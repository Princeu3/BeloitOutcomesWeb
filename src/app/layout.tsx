import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { HeroUIProvider } from "@heroui/react";
import AlertSlider from "@/components/AlertSlider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Beloit College Outcomes",
  description: "Explore where a Beloit degree can take you - discover internships, jobs, and graduate schools that Beloit students pursue after graduation.",
  icons: {
    icon: [
      {
        url: '/assets/B Logo Beloit Blue.png',
        href: '/assets/B Logo Beloit Blue.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AlertSlider />
        <HeroUIProvider>
          <main>{children}</main>
        </HeroUIProvider>
      </body>
    </html>
  );
}
