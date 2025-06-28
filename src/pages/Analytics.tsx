import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line
} from 'recharts';

const kpiData = [
  { name: 'Monday', bedOccupancy: 82, ambulanceOffload: 12, triageToBed: 22 },
  { name: 'Tuesday', bedOccupancy: 75, ambulanceOffload: 9, triageToBed: 18 },
  { name: 'Wednesday', bedOccupancy: 88, ambulanceOffload: 15, triageToBed: 25 },
  { name: 'Thursday', bedOccupancy: 95, ambulanceOffload: 18, triageToBed: 30 },
  { name: 'Friday', bedOccupancy: 92, ambulanceOffload: 16, triageToBed: 28 },
  { name: 'Saturday', bedOccupancy: 78, ambulanceOffload: 11, triageToBed: 20 },
  { name: 'Sunday', bedOccupancy: 72, ambulanceOffload: 8, triageToBed: 16 },
];

const taskData = [
  { name: 'Nurses', completed: 78, pending: 12 },
  { name: 'Housekeeping', completed: 45, pending: 8 },
  { name: 'Physicians', completed: 62, pending: 15 },
  { name: 'Transport', completed: 34, pending: 6 },
];

const swapData = [
  { hour: '7AM', swaps: 2 },
  { hour: '8AM', swaps: 5 },
  { hour: '9AM', swaps: 8 },
  { hour: '10AM', swaps: 10 },
  { hour: '11AM', swaps: 7 },
  { hour: '12PM', swaps: 6 },
  { hour: '1PM', swaps: 8 },
  { hour: '2PM', swaps: 12 },
  { hour: '3PM', swaps: 15 },
  { hour: '4PM', swaps: 11 },
  { hour: '5PM', swaps: 9 },
  { hour: '6PM', swaps: 7 },
];

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-emerG-secondary">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-cyan-100 to-blue-200 border-cyan-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-cyan-800">Average Bed Occupancy Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-cyan-900">3.2 hrs</span>
              <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">-12% vs. last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-100 to-amber-200 border-orange-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-orange-800">Avg. Triage to Bed Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-orange-900">22 min</span>
              <span className="text-sm text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-medium">+5% vs. last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-100 to-green-200 border-emerald-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-emerald-800">Avg. Ambulance Offload Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-emerald-900">14 min</span>
              <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">-8% vs. last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="time">
        <TabsList className="mb-4 bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-xl shadow-md">
          <TabsTrigger 
            value="time" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            Time Metrics
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            Task Completion
          </TabsTrigger>
          <TabsTrigger 
            value="swaps" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            Bed Swaps
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="time" className="space-y-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Weekly Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={kpiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bedOccupancy" name="Bed Occupancy (%)" fill="#8884d8" />
                  <Bar dataKey="ambulanceOffload" name="Ambulance Offload (min)" fill="#82ca9d" />
                  <Bar dataKey="triageToBed" name="Triage to Bed (min)" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Task Completion by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={taskData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed Tasks" fill="#82ca9d" stackId="a" />
                  <Bar dataKey="pending" name="Pending Tasks" fill="#ffc658" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="swaps">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800">Today's Bed Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={swapData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="swaps" 
                    name="Bed Swaps" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
