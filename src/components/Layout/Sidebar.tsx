import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hospital, 
  Timer, 
  Ambulance, 
  BarChart2, 
  Repeat, 
  Bell,
  ClipboardList,
  Database,
  BookOpen
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Departments', icon: Hospital, path: '/departments' },
    { name: 'Patients', icon: Timer, path: '/patients' },
    { name: 'Bed Swapping', icon: Repeat, path: '/bed-swapping' },
    { name: 'Ambulance', icon: Ambulance, path: '/ambulance' },
    { name: 'Tasks', icon: ClipboardList, path: '/tasks' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Resources', icon: BookOpen, path: '/resources' },
    { name: 'Database', icon: Database, path: '/database' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Hospital className="h-8 w-8 text-blue-400" />
          <h2 className="text-xl font-bold text-white">EmerG</h2>
          <h1 className="text-xs font-bold text-blue-300">Management system</h1>
        </div>
      </div>

      <nav className="mt-2 flex-grow overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-blue-300'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-blue-500'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 text-white text-xs border border-blue-300 shadow">
          <p className="font-medium mb-1">Emergency Capacity</p>
          <div className="w-full bg-sidebar-border rounded-full h-2">
            <div className="bg-emerG-success h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span>0% Full</span>
            <span>All beds available</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
