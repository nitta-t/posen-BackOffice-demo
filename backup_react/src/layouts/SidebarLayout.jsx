import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, BarChart3 } from 'lucide-react';

const SidebarLayout = () => {
  const navItems = [
    { path: '/', label: 'ダッシュボード', icon: <LayoutDashboard size={20} /> },
    { path: '/accounts', label: 'アカウント管理', icon: <UserCog size={20} /> },
    { path: '/customers', label: '顧客管理', icon: <Users size={20} /> },
    { path: '/analytics', label: '分析', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span>POSEN BackOffice</span>
        </div>
        <nav className="flex flex-col py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;

