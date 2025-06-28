
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type PatientType = {
  id: string;
  acuityLevel: number;
  requiresOxygen: boolean;
  requiresTelemetry: boolean;
  mobilityStatus: string;
  timeInBed: string;
  color: string;
};

type BedType = {
  id: string;
  zone: string;
  patient: PatientType | null;
  status: 'empty' | 'occupied' | 'cleaning';
};

const BedSwapping: React.FC = () => {
  const [swapMode, setSwapMode] = useState(false);
  const [selectedBeds, setSelectedBeds] = useState<string[]>([]);
  const [beds, setBeds] = useState<BedType[]>([
    {
      id: 'A1',
      zone: 'A',
      patient: null,
      status: 'empty',
    },
    {
      id: 'A2',
      zone: 'A',
      patient: null,
      status: 'empty',
    },
    {
      id: 'B1',
      zone: 'B',
      patient: null,
      status: 'empty',
    },
    {
      id: 'B2',
      zone: 'B',
      patient: null,
      status: 'empty',
    },
    {
      id: 'C1',
      zone: 'C',
      patient: null,
      status: 'empty',
    },
    {
      id: 'C2',
      zone: 'C',
      patient: null,
      status: 'empty',
    },
    {
      id: 'D1',
      zone: 'D',
      patient: null,
      status: 'empty',
    },
    {
      id: 'D2',
      zone: 'D',
      patient: null,
      status: 'empty',
    },
  ]);

  const handleBedClick = (bedId: string) => {
    if (!swapMode) return;

    if (selectedBeds.includes(bedId)) {
      setSelectedBeds(selectedBeds.filter(id => id !== bedId));
    } else {
      if (selectedBeds.length < 2) {
        setSelectedBeds([...selectedBeds, bedId]);
      }
    }
  };

  const handleSwap = () => {
    if (selectedBeds.length !== 2) {
      toast({
        title: "Swap Error",
        description: "Please select exactly two beds to swap patients",
        variant: "destructive",
      });
      return;
    }

    const firstBedIndex = beds.findIndex(bed => bed.id === selectedBeds[0]);
    const secondBedIndex = beds.findIndex(bed => bed.id === selectedBeds[1]);

    const firstBed = beds[firstBedIndex];
    const secondBed = beds[secondBedIndex];

    // Check if at least one bed has a patient
    if (!firstBed.patient && !secondBed.patient) {
      toast({
        title: "Swap Error",
        description: "At least one bed must have a patient to perform a swap",
        variant: "destructive",
      });
      return;
    }

    // Perform the swap - this now works even if one bed is empty
    const updatedBeds = [...beds];
    const tempPatient = updatedBeds[firstBedIndex].patient;
    updatedBeds[firstBedIndex].patient = updatedBeds[secondBedIndex].patient;
    updatedBeds[secondBedIndex].patient = tempPatient;
    
    // Update bed statuses based on patient presence
    updatedBeds[firstBedIndex].status = updatedBeds[firstBedIndex].patient ? 'occupied' : 'empty';
    updatedBeds[secondBedIndex].status = updatedBeds[secondBedIndex].patient ? 'occupied' : 'empty';

    setBeds(updatedBeds);
    setSelectedBeds([]);
    
    toast({
      title: "Swap Successful",
      description: `Patients swapped between ${selectedBeds[0]} and ${selectedBeds[1]}`,
    });
  };
  
  const resetSwap = () => {
    setSelectedBeds([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerG-secondary">Bed Swapping</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="swap-mode" 
              checked={swapMode}
              onCheckedChange={setSwapMode}
            />
            <Label htmlFor="swap-mode" className="font-medium">
              Swap Mode <span className={`px-2 py-1 rounded-full text-xs ${
                swapMode 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700'
              }`}>
                {swapMode ? 'On' : 'Off'}
              </span>
            </Label>
          </div>
          
          {swapMode && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={resetSwap}
                disabled={selectedBeds.length === 0}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                Reset
              </Button>
              <Button
                onClick={handleSwap}
                disabled={selectedBeds.length !== 2}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Swap Selected Beds
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {beds.map(bed => (
          <Card 
            key={bed.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedBeds.includes(bed.id) 
                ? 'ring-4 ring-gradient-to-r ring-purple-400 scale-105 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50' 
                : 'hover:shadow-lg hover:scale-102'
            } ${swapMode ? 'hover:shadow-lg' : ''} ${
              bed.zone === 'A' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' :
              bed.zone === 'B' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
              bed.zone === 'C' ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' :
              'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200'
            }`}
            onClick={() => handleBedClick(bed.id)}
          >
            <CardHeader className="pb-2 border-b border-white/50">
              <CardTitle className="flex justify-between items-center">
                <span className="text-gray-800">Bed {bed.id}</span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full text-white ${
                  bed.zone === 'A' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                  bed.zone === 'B' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  bed.zone === 'C' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                  'bg-gradient-to-r from-purple-500 to-violet-500'
                }`}>
                  Zone {bed.zone}
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4">
              {bed.status === 'occupied' && bed.patient && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Patient {bed.patient.id}</span>
                    <span className={`inline-block w-3 h-3 rounded-full ${bed.patient.color}`}></span>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Acuity Level:</span>
                      <span className="font-medium">{bed.patient.acuityLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mobility:</span>
                      <span className="font-medium capitalize">{bed.patient.mobilityStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time in Bed:</span>
                      <span className="font-medium">{bed.patient.timeInBed}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {bed.patient.requiresOxygen && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          O₂
                        </span>
                      )}
                      {bed.patient.requiresTelemetry && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          Telemetry
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {bed.status === 'empty' && (
                <div className="h-[120px] flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Empty Bed</span>
                </div>
              )}
              
              {bed.status === 'cleaning' && (
                <div className="h-[120px] flex items-center justify-center">
                  <span className="text-amber-500 font-medium">Cleaning in Progress</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {swapMode && selectedBeds.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg shadow-2xl border border-white/20 backdrop-blur-sm">
          <h3 className="font-medium mb-2 text-white">Selected Beds</h3>
          <div className="flex space-x-2">
            {selectedBeds.map(bedId => (
              <div key={bedId} className="px-3 py-1 bg-white/20 text-white rounded-md backdrop-blur-sm">
                {bedId}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BedSwapping;
