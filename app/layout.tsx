import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://balansis.pw"),
  title: "Balansis — Engineering the Edge",
  description: "Balansis is an independent technology company focused on engineering, sensing, resilient systems and applied research.",
  openGraph: { title: "Balansis — Engineering the Edge", description: "Engineering the edge. Building for a more resilient world.", url: "https://balansis.pw", siteName: "Balansis", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll />{children}</body></html>;
}
