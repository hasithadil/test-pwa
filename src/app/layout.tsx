import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { SITE_CONFIG } from "@/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base URL used to resolve relative paths in og:image, twitter:image, etc.
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,

  keywords: [
    "Hasitha Dilshan",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Java Developer",
    "Spring Boot",
    "React Developer",
    "Next.js",
    "FinTech",
    "Microservices",
    "Quarkus",
    "Portfolio",
    "Sri Lanka",
    "UCSC",
    "IronOne Technologies",
  ],

  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.png",   // place a 1200×630 image at public/og-image.png
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Software Engineer Portfolio`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },

  // Canonical URL — prevents duplicate-content issues if the site is accessed
  // via multiple domains
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />

          {/* ── Global UI overlays (render above everything) ── */}
          <CustomCursor />
          <ScrollToTop />
          <LoadingScreen />
        </ThemeProvider>
      </body>
    </html>
  );
}
