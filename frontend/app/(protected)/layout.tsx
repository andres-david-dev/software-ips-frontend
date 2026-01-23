import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-[var(--background)]">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
