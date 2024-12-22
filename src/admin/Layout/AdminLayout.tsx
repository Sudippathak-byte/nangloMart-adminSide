import React, { ReactNode } from "react";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex mt-[75px]">
        <div className="w-20 z-20">
          <SidebarAdmin />
        </div>
        <main className="w-3/4 flex-1 bg-gradient-to-b from-green-50 via-yellow-50 to-green-50 p-6 rounded-tl-xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
