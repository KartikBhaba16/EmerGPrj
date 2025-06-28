
// Global type definitions for the EmerG application

export interface User {
  id: string;
  name: string;
  role: 'nurse' | 'charge_nurse' | 'flow_coordinator' | 'housekeeper';
  department?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  arrivalTime: Date;
  triage: 1 | 2 | 3 | 4 | 5;
  status: 'waiting' | 'in_treatment' | 'discharged' | 'admitted';
  department: string;
  bedNumber?: string;
  symptoms: string;
}

export interface Bed {
  id: string;
  number: string;
  department: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  patientId?: string;
  lastCleaned?: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  dueDate?: Date;
  department: string;
}

export interface Ambulance {
  id: string;
  callSign: string;
  eta: Date;
  priority: 'routine' | 'urgent' | 'emergency';
  status: 'en_route' | 'arrived' | 'departed';
  patientInfo: {
    age: number;
    gender: 'M' | 'F' | 'Other';
    chiefComplaint: string;
  };
}

export interface Resource {
  serviceName: string;
  description: string;
  contactNumber: string;
  category: 'primary_health' | 'harm_reduction' | 'mental_health' | 'crisis_support' | 'shelter' | 'womens_shelter' | 'housing';
}

export interface Department {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  avgWaitTime: number;
  status: 'normal' | 'busy' | 'critical';
  color: string;
}
