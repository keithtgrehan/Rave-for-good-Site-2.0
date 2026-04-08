import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full relative">
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full" data-testid="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
