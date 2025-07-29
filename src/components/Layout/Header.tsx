import React, { useState, useEffect } from 'react' ;
import { Bell, Clock, Hospital } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // In a real app, we would handle authentication logout here
    //user data dump - relogin
    setUser(null);
    navigate('/');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    };
    // Role display mapping - for login handling
  const roleDisplayMap: { [key: string]: string } = {
    nurse: 'Nurse',
    chargeNurse: 'Charge Nurse',
    flowCoordinator: 'Flow Coordinator',
    housekeeper: 'Housekeeper'
  
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
              {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'})}
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
              <p className="text-sm font-medium">{user?.displayName || 'Guest'}</p>
              <p className="text-xs text-muted-foreground">{user?.role ? roleDisplayMap[user.role] : 'Not logged in'}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-emerG-primary text-white flex items-center justify-center text-sm font-medium">
              {user?.initials || 'G'}
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
