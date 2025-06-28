
import React from 'react';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BedStatusItemProps {
  id: string;
  status: 'occupied' | 'available' | 'cleaning' | 'pending';
  timeInBed: number | null;
  patientType: string | null;
}

const BedStatusItem: React.FC<BedStatusItemProps> = ({
  id,
  status,
  timeInBed,
  patientType,
}) => {
  // Determine status color and label
  const getStatusClasses = () => {
    switch (status) {
      case 'occupied':
        // Color based on time in bed
        if (timeInBed !== null) {
          if (timeInBed < 60) return 'bg-emerG-success text-white';
          if (timeInBed < 180) return 'bg-emerG-warning text-black';
          return 'bg-emerG-danger text-white';
        }
        return 'bg-emerG-success text-white';
      case 'available':
        return 'bg-slate-100 text-emerG-dark border-2 border-dashed border-emerG-success';
      case 'cleaning':
        return 'bg-emerG-light text-emerG-dark animate-pulse-subtle';
      case 'pending':
        return 'bg-emerG-warning/20 text-emerG-dark border-2 border-dashed border-emerG-warning';
      default:
        return 'bg-slate-100 text-emerG-dark';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'occupied':
        return <Timer className="h-3 w-3" />;
      case 'cleaning':
        return '🧹';
      default:
        return null;
    }
  };

  const formatTime = (minutes: number | null) => {
    if (minutes === null) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPatientTypeIndicator = () => {
    if (!patientType) return null;
    
    let color = '';
    switch (patientType) {
      case 'Standard':
        color = 'bg-blue-200';
        break;
      case 'Telemetry':
        color = 'bg-purple-200';
        break;
      case 'Oxygen':
        color = 'bg-green-200';
        break;
      case 'Critical':
        color = 'bg-red-200';
        break;
      default:
        color = 'bg-gray-200';
    }
    
    return (
      <div className="absolute -top-1 -right-1">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
      </div>
    );
  };

  const tooltipContent = () => {
    switch (status) {
      case 'occupied':
        return (
          <div className="text-xs">
            <div className="font-bold">Bed {id}</div>
            <div>Status: Occupied</div>
            <div>Time in bed: {formatTime(timeInBed)}</div>
            <div>Patient type: {patientType}</div>
          </div>
        );
      case 'available':
        return (
          <div className="text-xs">
            <div className="font-bold">Bed {id}</div>
            <div>Status: Available</div>
            <div>Ready for patient assignment</div>
          </div>
        );
      case 'cleaning':
        return (
          <div className="text-xs">
            <div className="font-bold">Bed {id}</div>
            <div>Status: Cleaning in progress</div>
            <div>Will be available soon</div>
          </div>
        );
      case 'pending':
        return (
          <div className="text-xs">
            <div className="font-bold">Bed {id}</div>
            <div>Status: Pending assignment</div>
            <div>Patient coming soon</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            'relative p-2 rounded-md text-xs font-medium flex flex-col items-center justify-center min-h-[50px] cursor-pointer transition-all hover:scale-105',
            getStatusClasses()
          )}>
            {getPatientTypeIndicator()}
            <div className="font-bold">{id}</div>
            {status === 'occupied' && timeInBed !== null && (
              <div className="flex items-center mt-1">
                {getStatusIcon()}
                <span className="ml-1">{formatTime(timeInBed)}</span>
              </div>
            )}
            {status === 'cleaning' && (
              <div className="mt-1 text-[10px]">{getStatusIcon()}</div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-2">
          {tooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BedStatusItem;
