import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Balansis — Engineering the Edge", description: "Balansis turns complex challenges into purposeful technology through engineering, sensing and applied research.", metadataBase: new URL("https://balansis.pw") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
