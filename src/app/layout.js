import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Prasad Hiwarkhede | Full-Stack Developer & AI Engineer",
  description:
    "Full-stack engineer building AI-powered systems and developer tools. " +
    "Specialising in React, Next.js, Python, LangChain, RAG architectures, " +
    "and systems-level C/C++ programming. Based in Nagpur, India.",
  keywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Python",
    "RAG",
    "LangChain",
    "Node.js",
    "C/C++",
    "Portfolio",
    "Prasad Hiwarkhede",
  ],
  authors: [{ name: "Prasad Hiwarkhede" }],
  creator: "Prasad Hiwarkhede",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prasad.teamxebec.xyz",
    title: "Prasad Hiwarkhede | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack engineer building AI-powered systems and developer tools.",
    siteName: "Prasad Hiwarkhede",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasad Hiwarkhede | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack engineer building AI-powered systems and developer tools.",
  },
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
        {children}
      </body>
    </html>
  );
}