import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidenav } from "./components/sidenav/sidenav.component";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Internalize",
  description: "Internalize is a lightweight Role Provider service that will manage all your actions and users in one place. Does not offer an Authentication Part which can be demanded to other services (ie: Azure)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <Sidenav></Sidenav>

          <section className="w-full px-2">{children}</section>
        </div>
      </body>
    </html>
  );
}
