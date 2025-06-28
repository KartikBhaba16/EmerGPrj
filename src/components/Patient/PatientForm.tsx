
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

interface PatientFormProps {
  onComplete?: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onComplete }) => {
  const [patientData, setPatientData] = useState({
    patientId: '',
    acuityLevel: '',
    diagnosisStage: '',
    currentLocation: '',
    requiresOxygen: false,
    requiresTelemetry: false,
    requiresIsolation: false,
    mobilityStatus: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Patient data submitted:', patientData);
    
    toast({
      title: "Getting AI Recommendation",
      description: "Processing patient data for optimal bed assignment",
    });
    
    // Simulate AI processing delay
    setTimeout(() => {
      toast({
        title: "Recommendation Ready",
        description: "Recommend Zone B, Bed B4 for this patient",
      });
      
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setPatientData({
      ...patientData,
      [field]: value,
    });
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-emerG-secondary">Patient Details</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input 
                id="patientId" 
                placeholder="Anonymous ID" 
                value={patientData.patientId}
                onChange={(e) => handleChange('patientId', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="acuityLevel">Acuity Level (1-5)</Label>
              <Select 
                value={patientData.acuityLevel}
                onValueChange={(value) => handleChange('acuityLevel', value)}
              >
                <SelectTrigger id="acuityLevel">
                  <SelectValue placeholder="Select acuity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level1">Level 1 - Resuscitation</SelectItem>
                  <SelectItem value="level2">Level 2 - Emergent</SelectItem>
                  <SelectItem value="level3">Level 3 - Urgent</SelectItem>
                  <SelectItem value="level4">Level 4 - Less Urgent</SelectItem>
                  <SelectItem value="level5">Level 5 - Non-urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosisStage">Diagnosis Stage</Label>
              <Select 
                value={patientData.diagnosisStage}
                onValueChange={(value) => handleChange('diagnosisStage', value)}
              >
                <SelectTrigger id="diagnosisStage">
                  <SelectValue placeholder="Select diagnosis stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Assessment</SelectItem>
                  <SelectItem value="awaiting-labs">Awaiting Labs</SelectItem>
                  <SelectItem value="awaiting-imaging">Awaiting Imaging</SelectItem>
                  <SelectItem value="post-diagnosis">Post-Diagnosis</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="observation">Observation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentLocation">Current Location</Label>
              <Select 
                value={patientData.currentLocation}
                onValueChange={(value) => handleChange('currentLocation', value)}
              >
                <SelectTrigger id="currentLocation">
                  <SelectValue placeholder="Select current location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="triage">Triage</SelectItem>
                  <SelectItem value="waiting">Waiting Room</SelectItem>
                  <SelectItem value="hallway">Hallway</SelectItem>
                  <SelectItem value="ambulance">Ambulance Bay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Resource Needs</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requiresOxygen"
                  checked={patientData.requiresOxygen}
                  onCheckedChange={(checked) => 
                    handleChange('requiresOxygen', checked === true)
                  }
                />
                <Label htmlFor="requiresOxygen" className="cursor-pointer">Oxygen</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requiresTelemetry"
                  checked={patientData.requiresTelemetry}
                  onCheckedChange={(checked) => 
                    handleChange('requiresTelemetry', checked === true)
                  }
                />
                <Label htmlFor="requiresTelemetry" className="cursor-pointer">Telemetry</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requiresIsolation"
                  checked={patientData.requiresIsolation}
                  onCheckedChange={(checked) => 
                    handleChange('requiresIsolation', checked === true)
                  }
                />
                <Label htmlFor="requiresIsolation" className="cursor-pointer">Isolation Room</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mobility Status</Label>
            <RadioGroup 
              value={patientData.mobilityStatus}
              onValueChange={(value) => handleChange('mobilityStatus', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ambulatory" id="ambulatory" />
                <Label htmlFor="ambulatory" className="cursor-pointer">Ambulatory</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wheelchair" id="wheelchair" />
                <Label htmlFor="wheelchair" className="cursor-pointer">Wheelchair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stretcher" id="stretcher" />
                <Label htmlFor="stretcher" className="cursor-pointer">Stretcher</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Input 
              id="notes" 
              placeholder="Any additional relevant information" 
              value={patientData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between px-0">
          <Button type="button" variant="outline" onClick={onComplete}>Cancel</Button>
          <Button type="submit" className="bg-emerG-primary hover:bg-emerG-secondary">
            Get AI Recommendation
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PatientForm;
