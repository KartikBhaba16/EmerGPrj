
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Hospital, Timer, Ambulance, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import BedStatusCard from '@/components/BedStatus/BedStatusCard';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerG-secondary">Dashboard</h1>
          <p className="text-muted-foreground">Emergency Department status and overview</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg">
          <Ambulance className="h-4 w-4 mr-2" /> New Ambulance Arrival
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Current Patients"
          value="0"
          description="0 pending placement"
          icon={<Hospital className="h-5 w-5 text-emerG-primary" />}
          change="0"
        />
        <StatCard 
          title="Average Wait Time"
          value="0m"
          description="No wait time data"
          icon={<Timer className="h-5 w-5 text-emerG-primary" />}
          change="0m"
        />
        <StatCard 
          title="Ambulance Arrivals"
          value="0"
          description="Expected today"
          icon={<Ambulance className="h-5 w-5 text-emerG-primary" />}
          change="0"
        />
        <StatCard 
          title="Bed Occupancy"
          value="0%"
          description="All beds available"
          icon={<MapPin className="h-5 w-5 text-emerG-primary" />}
          progress={0}
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-xl shadow-md">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="departments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Departments
            </TabsTrigger>
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Pending Tasks (0)
            </TabsTrigger>
            <TabsTrigger 
              value="alerts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Alerts (0)
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-cyan-300 text-cyan-600 hover:bg-cyan-50">Refresh</Button>
            <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">Export</Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EmptyDepartmentOverview />
            <EmptyTimelineCard />
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BedStatusCard 
              department="Department A" 
              beds={12} 
              available={12} 
              pending={0} 
              color="bg-emerG-department-a"
            />
            <BedStatusCard 
              department="Department B" 
              beds={10} 
              available={10} 
              pending={0} 
              color="bg-emerG-department-b"
            />
            <BedStatusCard 
              department="Department C" 
              beds={8} 
              available={8} 
              pending={0} 
              color="bg-emerG-department-c"
            />
            <BedStatusCard 
              department="Department D" 
              beds={10} 
              available={10} 
              pending={0} 
              color="bg-emerG-department-d"
            />
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12 text-gray-500">
                No pending tasks
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12 text-gray-500">
                No active alerts
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change?: string;
  changePositive?: boolean;
  progress?: number;
}> = ({ title, value, description, icon, change, changePositive = false, progress }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-emerG-light p-2 rounded-md">{icon}</div>
          {change && (
            <div className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
              {change}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          {progress !== undefined && (
            <Progress className="h-2 mt-3" value={progress} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyDepartmentOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
        <CardDescription>Current status by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerG-department-a rounded-full mr-2"></div>
            <span className="flex-1 font-medium">Department A</span>
            <span className="text-sm text-muted-foreground">0/12 beds occupied</span>
            <div className="w-24 ml-4">
              <Progress className="h-2" value={0} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerG-department-b rounded-full mr-2"></div>
            <span className="flex-1 font-medium">Department B</span>
            <span className="text-sm text-muted-foreground">0/10 beds occupied</span>
            <div className="w-24 ml-4">
              <Progress className="h-2" value={0} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerG-department-c rounded-full mr-2"></div>
            <span className="flex-1 font-medium">Department C</span>
            <span className="text-sm text-muted-foreground">0/8 beds occupied</span>
            <div className="w-24 ml-4">
              <Progress className="h-2" value={0} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerG-department-d rounded-full mr-2"></div>
            <span className="flex-1 font-medium">Department D</span>
            <span className="text-sm text-muted-foreground">0/10 beds occupied</span>
            <div className="w-24 ml-4">
              <Progress className="h-2" value={0} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyTimelineCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bed Activity</CardTitle>
        <CardDescription>Timeline of bed status changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center py-12 text-gray-500">
          No recent activity
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
