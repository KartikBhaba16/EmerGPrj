
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Info, AlertCircle, Ambulance } from 'lucide-react';

type NotificationType = 'info' | 'alert' | 'success' | 'ambulance';

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      title: 'New Patient Arrival',
      message: 'A new level 2 acuity patient has been assigned to bed A3',
      timestamp: '2 minutes ago',
      type: 'info',
      read: false,
    },
    {
      id: 'n2',
      title: 'Ambulance Arriving',
      message: 'Ambulance with level 1 acuity patient arriving in 5 minutes',
      timestamp: '5 minutes ago',
      type: 'ambulance',
      read: false,
    },
    {
      id: 'n3',
      title: 'Bed Swap Completed',
      message: 'Patient swap between beds B2 and D1 completed successfully',
      timestamp: '15 minutes ago',
      type: 'success',
      read: false,
    },
    {
      id: 'n4',
      title: 'Housekeeping Alert',
      message: 'Housekeeping task for bed C2 is overdue by 15 minutes',
      timestamp: '30 minutes ago',
      type: 'alert',
      read: true,
    },
    {
      id: 'n5',
      title: 'Patient Discharged',
      message: 'Patient in bed A4 has been discharged',
      timestamp: '45 minutes ago',
      type: 'info',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'ambulance': return <Ambulance className="h-5 w-5 text-amber-500" />;
    }
  };

  const getCardStyle = (type: NotificationType, read: boolean) => {
    const baseStyle = "transition-all duration-200 hover:shadow-md";
    
    if (read) {
      return `${baseStyle} bg-gray-50 border-gray-200`;
    }
    
    switch (type) {
      case 'info': 
        return `${baseStyle} bg-blue-50 border-blue-200 hover:bg-blue-100`;
      case 'alert': 
        return `${baseStyle} bg-red-50 border-red-200 hover:bg-red-100`;
      case 'success': 
        return `${baseStyle} bg-green-50 border-green-200 hover:bg-green-100`;
      case 'ambulance': 
        return `${baseStyle} bg-amber-50 border-amber-200 hover:bg-amber-100`;
      default: 
        return `${baseStyle} bg-white`;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerG-secondary">Notifications</h1>
        
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Card className="mb-6 bg-gradient-to-r from-emerG-primary/5 to-emerG-secondary/5 border-emerG-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-emerG-secondary" />
            Notification Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            You have <span className="font-bold text-emerG-primary">{unreadCount}</span> unread notifications
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {notifications.map(notification => (
          <Card 
            key={notification.id}
            className={getCardStyle(notification.type, notification.read)}
          >
            <CardContent className="p-4">
              <div className="flex">
                <div className="mr-4 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-emerG-secondary'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 bg-white/70 px-2 py-1 rounded-full">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  
                  {!notification.read && (
                    <div className="mt-3 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                        className="hover:bg-white/70"
                      >
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <div className="text-center p-8 text-gray-500">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
