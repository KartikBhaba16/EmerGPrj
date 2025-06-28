
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ambulance as AmbulanceIcon, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Ambulance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerG-secondary">Ambulance Management</h1>
          <p className="text-muted-foreground">Track and optimize ambulance offloading</p>
        </div>
        <Button className="bg-emerG-primary hover:bg-emerG-secondary">
          <AmbulanceIcon className="h-4 w-4 mr-2" /> Register New Arrival
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Ambulance ETA"
          icon={<AmbulanceIcon className="h-5 w-5 text-emerG-primary" />}
          value="3"
          subtext="Next arrival in 5 minutes"
        />
        <StatCard 
          title="Avg. Offloading Time"
          icon={<Clock className="h-5 w-5 text-emerG-primary" />}
          value="14m"
          subtext="2m better than yesterday"
        />
        <StatCard 
          title="Success Rate"
          icon={<CheckCircle className="h-5 w-5 text-emerG-primary" />}
          value="96%"
          subtext="First bed assignment"
        />
      </div>

      <Tabs defaultValue="incoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incoming">Incoming (3)</TabsTrigger>
          <TabsTrigger value="offloading">Offloading (1)</TabsTrigger>
          <TabsTrigger value="recent">Recently Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Ambulances</CardTitle>
              <CardDescription>Expected ambulance arrivals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AmbulanceCard 
                  id="AMB-1052"
                  eta="5 minutes"
                  patientInfo="Level 2 Trauma - MVA"
                  priority="High"
                  recommendedBed={{
                    department: "Department A",
                    bed: "A-02"
                  }}
                />
                <AmbulanceCard 
                  id="AMB-1053"
                  eta="12 minutes"
                  patientInfo="Level 3 - Chest Pain"
                  priority="Medium"
                  recommendedBed={{
                    department: "Department B",
                    bed: "Pending"
                  }}
                />
                <AmbulanceCard 
                  id="AMB-1054"
                  eta="18 minutes"
                  patientInfo="Level 4 - Minor Injury"
                  priority="Low"
                  recommendedBed={{
                    department: "Department C",
                    bed: "C-04"
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offloading">
          <Card>
            <CardHeader>
              <CardTitle>Currently Offloading</CardTitle>
              <CardDescription>Ambulances in the process of patient transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AmbulanceCard 
                  id="AMB-1051"
                  arrivalTime="10:32 AM"
                  patientInfo="Level 2 - Acute Respiratory Distress"
                  assignedBed={{
                    department: "Department A",
                    bed: "A-01"
                  }}
                  status="offloading"
                  timer="4m 12s"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>Ambulance arrivals within the last 2 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AmbulanceCard 
                  id="AMB-1050"
                  arrivalTime="10:05 AM"
                  departureTime="10:18 AM"
                  patientInfo="Level 3 - Severe Abdominal Pain"
                  assignedBed={{
                    department: "Department B",
                    bed: "B-03"
                  }}
                  offloadTime="13m 42s"
                  status="completed"
                />
                <AmbulanceCard 
                  id="AMB-1049"
                  arrivalTime="9:47 AM"
                  departureTime="9:59 AM"
                  patientInfo="Level 1 - Cardiac Arrest"
                  assignedBed={{
                    department: "Department A",
                    bed: "A-04"
                  }}
                  offloadTime="12m 18s"
                  status="completed"
                />
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
  icon: React.ReactNode;
  value: string;
  subtext: string;
}> = ({ title, icon, value, subtext }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-emerG-light p-2 rounded-md">{icon}</div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface AmbulanceCardProps {
  id: string;
  eta?: string;
  arrivalTime?: string;
  departureTime?: string;
  patientInfo: string;
  priority?: 'High' | 'Medium' | 'Low';
  recommendedBed?: {
    department: string;
    bed: string;
  };
  assignedBed?: {
    department: string;
    bed: string;
  };
  offloadTime?: string;
  timer?: string;
  status?: 'incoming' | 'offloading' | 'completed';
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({
  id,
  eta,
  arrivalTime,
  departureTime,
  patientInfo,
  priority,
  recommendedBed,
  assignedBed,
  offloadTime,
  timer,
  status = 'incoming',
}) => {
  const [expanded, setExpanded] = useState(false);

  const getPriorityBadge = () => {
    if (!priority) return null;
    
    const badgeClasses = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-blue-100 text-blue-800',
    };
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClasses[priority]}`}>
        {priority} Priority
      </span>
    );
  };

  const getStatusIndicator = () => {
    switch(status) {
      case 'incoming':
        return (
          <div className="bg-emerG-warning/20 text-emerG-dark rounded-md p-2 text-xs font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" /> ETA: {eta}
          </div>
        );
      case 'offloading':
        return (
          <div className="bg-emerG-primary/20 text-emerG-primary rounded-md p-2 text-xs font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1 animate-pulse" /> Offloading: {timer}
          </div>
        );
      case 'completed':
        return (
          <div className="bg-emerG-success/20 text-emerG-success rounded-md p-2 text-xs font-medium flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> Completed: {offloadTime}
          </div>
        );
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-emerG-light rounded-md mr-3">
            <AmbulanceIcon className="h-5 w-5 text-emerG-primary" />
          </div>
          <div>
            <h3 className="font-medium">{id}</h3>
            <p className="text-sm text-muted-foreground">{patientInfo}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {getPriorityBadge()}
          {getStatusIndicator()}
        </div>
      </div>

      {status === 'incoming' && recommendedBed && (
        <div className="mt-4 p-3 bg-emerG-light rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">AI Recommended Placement</p>
              <p className="text-sm">
                {recommendedBed.bed === 'Pending' 
                  ? `${recommendedBed.department} - Bed to be determined`
                  : `${recommendedBed.department} - Bed ${recommendedBed.bed}`}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">Modify</Button>
              <Button size="sm" className="bg-emerG-primary hover:bg-emerG-secondary">Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {status === 'offloading' && assignedBed && (
        <div className="mt-4 p-3 bg-emerG-light rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Placement</p>
              <p className="text-sm">{assignedBed.department} - Bed {assignedBed.bed}</p>
            </div>
            <div>
              <Button size="sm" className="bg-emerG-success hover:bg-emerG-success/80">
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
      )}

      {status === 'completed' && assignedBed && (
        <div className="mt-4 text-sm grid grid-cols-2 gap-x-4 gap-y-2 text-muted-foreground">
          <div>Arrival Time:</div>
          <div className="font-medium text-emerG-dark">{arrivalTime}</div>
          <div>Departure Time:</div>
          <div className="font-medium text-emerG-dark">{departureTime}</div>
          <div>Placement:</div>
          <div className="font-medium text-emerG-dark">{assignedBed.department} - Bed {assignedBed.bed}</div>
        </div>
      )}

      <Button 
        variant="ghost" 
        size="sm"
        className="w-full mt-4 text-emerG-secondary"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Show Details'}
      </Button>

      {expanded && (
        <div className="mt-2 pt-4 border-t text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-medium">Estimated Patient Info</p>
              <div className="mt-1 space-y-1">
                <p>Male, 50-60 years</p>
                <p>Chief Complaint: {patientInfo.split('-')[1].trim()}</p>
                <p>Acuity Level: {patientInfo.split('-')[0].trim()}</p>
              </div>
            </div>
            <div>
              <p className="font-medium">Special Requirements</p>
              <div className="mt-1 space-y-1">
                <p>Oxygen: Yes</p>
                <p>Mobility: Stretcher</p>
                <p>Isolation: No</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ambulance;
