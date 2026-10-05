import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import { SiteEntryGate } from "@/components/site-entry-gate";


export const metadata: Metadata = {
  title: "SALT N’ PEP | Small compounds. Big curiosity.",
  description:
    "A considered collection of research peptides. Explore compound details and research information with SALT N’ PEP. For laboratory research only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        <CartProvider>
          <SiteEntryGate>
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
            <Footer />
          </SiteEntryGate>
        </CartProvider>
      </body>
    </html>
  );
}
