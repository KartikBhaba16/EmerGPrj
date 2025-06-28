
import React from 'react';
import { Bell, Clock, Hospital } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, we would handle authentication logout here
    navigate('/login');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Hospital className="h-6 w-6 text-emerG-primary mr-2" />
            <h1 className="text-xl font-semibold text-emerG-secondary">EmerG</h1>
          </div>
          <div className="bg-emerG-light rounded-md px-3 py-1 flex items-center">
            <Clock className="h-4 w-4 text-emerG-secondary mr-1" />
            <span className="text-sm font-medium text-emerG-dark">
              {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-emerG-secondary" />
            <span className="absolute -top-1 -right-1 bg-emerG-danger rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
              3
            </span>
          </Button>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium">Florence N</p>
              <p className="text-xs text-muted-foreground">Flow Coordinator</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-emerG-primary text-white flex items-center justify-center text-sm font-medium">
              FN
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-emerG-secondary hover:text-emerG-danger hover:bg-emerG-light/80"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
