
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import PatientForm from '@/components/Patient/PatientForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Patients: React.FC = () => {
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerG-secondary">Patient Management</h1>
          <p className="text-muted-foreground">Manage patients and their bed assignments</p>
        </div>
        
        <Sheet open={showNewPatientForm} onOpenChange={setShowNewPatientForm}>
          <SheetTrigger asChild>
            <Button 
              onClick={() => setShowNewPatientForm(true)} 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> New Patient Entry
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>New Patient Entry</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <PatientForm onComplete={() => setShowNewPatientForm(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList className="bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-xl shadow-md">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              All Patients
            </TabsTrigger>
            <TabsTrigger 
              value="assigned" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Assigned (0)
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Pending Assignment (0)
            </TabsTrigger>
            <TabsTrigger 
              value="flagged" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              Flagged (0)
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          <EmptyPatientList />
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <EmptyPatientList message="No assigned patients" bgColor="bg-gradient-to-br from-green-50 to-emerald-50" />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <EmptyPatientList message="No pending patients" bgColor="bg-gradient-to-br from-amber-50 to-orange-50" />
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <EmptyPatientList message="No flagged patients" bgColor="bg-gradient-to-br from-red-50 to-pink-50" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Empty patient list component
const EmptyPatientList = ({ message = "No patients found", bgColor = "bg-white" }) => {
  return (
    <div className={`${bgColor} rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md`}>
      <div className="grid grid-cols-8 gap-2 p-4 font-medium border-b text-sm text-muted-foreground bg-white/50">
        <div>Patient ID</div>
        <div>Acuity</div>
        <div>Support Needs</div>
        <div className="col-span-2">Bed Assignment</div>
        <div>Time in ED</div>
        <div>Status</div>
        <div className="text-right">Action</div>
      </div>
      <div className="py-12 flex justify-center items-center text-gray-500">
        {message}
      </div>
    </div>
  );
};

export default Patients;
