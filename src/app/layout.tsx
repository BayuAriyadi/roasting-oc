import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google"; // Import Poppins dari Google Fonts
import "./globals.css";

// Local fonts
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

// Import Poppins font dari Google Fonts
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins", // CSS variable untuk Poppins
});

export const metadata: Metadata = {
  title: "Roasting Your OC",
  description: "mengroasting oc kamuh dengan sadis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        {/* Add the favicon link here */}
        <link rel="icon" href="./Favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} inter.className antialiased`} // Tambahkan Poppins variable di sini
      >
        {children}
      </body>
    </html>
  );
}
