"use client";

import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <main className="container mx-auto py-6 px-4">
      {/* <h1 className="text-3xl font-bold mb-6">SQL Query Dashboard</h1> */}
      <Header onLogout={handleLogout} title="Dashboard" />
      <Dashboard />
    </main>
  );
}
