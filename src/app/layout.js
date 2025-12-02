import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "../context/TransitionContext";
import Transition from "../components/Transition";
import WaterDropletCursor from "../components/WaterDropletCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prasad Portfolio",
  description: "Created by Prasad Hiwarkhede",
  icons: {
    icon: "/coding.png",
    shortcut: "/coding.png",
    apple: "/coding.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TransitionProvider>
          <Transition />
          <WaterDropletCursor />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
