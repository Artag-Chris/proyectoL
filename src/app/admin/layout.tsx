import { AdminSidebar } from "@/components/admin/sidebar";
import { FadeInTransition } from "@/components/transitions/FadeIn";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-energy)] to-[var(--color-warmth)]">
      <div className="flex min-h-screen">
        <FadeInTransition position="right">
          <AdminSidebar />
        </FadeInTransition>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
