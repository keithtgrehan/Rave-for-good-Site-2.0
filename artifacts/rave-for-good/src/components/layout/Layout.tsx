import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageMetadata } from "@/components/PageMetadata";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden">
      <PageMetadata />
      <div className="noise-overlay" />
      <Header />
      <main className="w-full flex-1 overflow-x-hidden" data-testid="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
