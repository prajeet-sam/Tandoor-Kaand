import type { Metadata, Viewport } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";

const caveat = Caveat({
  variable: "--font-hand-display",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const patrick = Patrick_Hand({
  variable: "--font-hand-body",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://the-tandoor-case.vercel.app";
const AUTHOR = "Anushka Vinay Chitnis";
const AUTHOR_URL = "https://www.linkedin.com/in/anushka-vinay-chitnis-697b0540b/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Tandoor Case — an interactive case file",
  description:
    "A scroll-driven account of the 1995 murder of Naina Sahni — the shooting at the Mandir Marg flat, the failed incineration in the Bagiya tandoor, and the forensic chain that convicted Sushil Sharma.",
  applicationName: "The Tandoor Case",
  authors: [{ name: AUTHOR, url: AUTHOR_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  category: "true crime · forensic science · legal case study",
  keywords: [
    "tandoor murder case",
    "Naina Sahni",
    "Sushil Sharma",
    "Bagiya restaurant",
    "forensic evidence",
    "forensic science",
    "New Delhi",
    "1995",
    "IPC 302",
    "criminal case study",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "The Tandoor Case — an interactive case file",
    description:
      "New Delhi, 2 July 1995. A shooting, a car trunk, a clay tandoor — and the forensic evidence that survived the fire.",
    url: SITE_URL,
    siteName: "The Tandoor Case",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "The Tandoor Case — an investigative case file",
      },
    ],
    type: "article",
    locale: "en_IN",
    publishedTime: "2026-08-28T00:00:00.000Z",
    authors: [AUTHOR_URL],
    tags: [
      "tandoor murder case",
      "Naina Sahni",
      "Sushil Sharma",
      "forensic science",
      "New Delhi",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tandoor Case — an interactive case file",
    description:
      "New Delhi, 2 July 1995. A shooting, a car trunk, a clay tandoor — and the forensic evidence that survived the fire.",
    images: ["/og-cover.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3edde",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${patrick.variable}`}
    >
      <body className="min-h-full">
        <a
          href="#story-start"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:border focus:border-ember focus:bg-ink-3 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ember-bright"
        >
          Skip to the article
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}