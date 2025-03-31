import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = {
  title: "Admin Dashboard | Justice Law Firm",
  description: "Admin dashboard for managing blog content and settings.",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return <AdminDashboard />;
}
