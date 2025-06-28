
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hospital } from 'lucide-react';
import BedStatusItem from './BedStatusItem';

interface BedStatusCardProps {
  department: string;
  beds: number;
  available: number;
  pending: number;
  color: string;
}

const BedStatusCard: React.FC<BedStatusCardProps> = ({
  department,
  beds,
  available,
  pending,
  color,
}) => {
  // Mock data for bed status
  const bedStatuses = Array.from({ length: beds }, (_, i) => {
    let status: 'occupied' | 'available' | 'cleaning' | 'pending';
    let timeInBed: number | null = null;
    
    // Determine status based on the counts provided
    if (i < beds - available - pending) {
      status = 'occupied';
      timeInBed = Math.floor(Math.random() * 240); // Random minutes between 0-240
    } else if (i < beds - available) {
      status = 'cleaning';
    } else {
      status = 'available';
    }
    
    return {
      id: `${department.charAt(department.length - 1)}-${(i + 1).toString().padStart(2, '0')}`,
      status,
      timeInBed,
      patientType: status === 'occupied' ? ['Standard', 'Telemetry', 'Oxygen', 'Critical'][Math.floor(Math.random() * 4)] : null,
    };
  });

  // Calculate occupancy percentage
  const occupiedCount = beds - available;
  const occupancyPercentage = Math.round((occupiedCount / beds) * 100);

  return (
    <Card>
      <CardHeader className={`${color} text-white rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Hospital className="h-5 w-5 mr-2" />
            <CardTitle>{department}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs bg-white/20 px-2 py-1 rounded-md">
              {occupiedCount}/{beds} beds
            </div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded-md">
              {occupancyPercentage}% full
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {bedStatuses.map((bed) => (
            <BedStatusItem
              key={bed.id}
              id={bed.id}
              status={bed.status}
              timeInBed={bed.timeInBed}
              patientType={bed.patientType}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BedStatusCard;
