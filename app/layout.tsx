import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { SoundProvider } from "@/components/SoundProvider";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });
export const metadata: Metadata = { title: "Spark & Vouch", description: "Make a connection beyond the first impression." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={font.variable}><SoundProvider><MotionProvider>{children}</MotionProvider></SoundProvider></body></html>;
}
