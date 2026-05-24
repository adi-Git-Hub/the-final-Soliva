import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
