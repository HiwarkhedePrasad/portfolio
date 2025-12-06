import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "../context/TransitionContext";
import Transition from "../components/Transition";
import WaterDropletCursor from "../components/WaterDropletCursor";
import Preloader from "../components/Preloader";
import Disclaimer from "../components/Disclaimer";

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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-900`}>
        {/* PRELOADER MUST BE HERE AT THE TOP */}
        <Preloader />
        
        <TransitionProvider>
          <Transition />
          <WaterDropletCursor />
          <Disclaimer />
          {/* This content loads in the background behind the black preloader div */}
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}