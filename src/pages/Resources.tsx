
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Clock, Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Resource {
  name: string;
  description: string;
  contact: string;
  category: 'primary-care' | 'harm-reduction' | 'mental-health' | 'crisis' | 'shelter' | 'housing';
}

const resources: Resource[] = [
  // Primary Health Care
  { name: 'NorWest CHC – Virtual Primary Care', description: 'Remote/virtual general health services', contact: '1-800-409-3484', category: 'primary-care' },
  { name: 'Anishnawbe Mushkiki', description: 'Aboriginal Health Access Centre', contact: '807-623-0383', category: 'primary-care' },
  { name: 'Matawa Health Co-operative', description: 'Indigenous community health services', contact: '1-833-625-3611', category: 'primary-care' },
  { name: 'Thunder Bay Regional HSC', description: 'Main hospital', contact: '807-684-6000', category: 'primary-care' },
  { name: 'Thunder Bay District Health Unit', description: 'Public health services', contact: '807-625-5900', category: 'primary-care' },
  { name: 'Street Outreach – Health Unit', description: 'Mobile public health', contact: '807-935-7755', category: 'primary-care' },
  { name: 'Dilico Anishinabek', description: 'Indigenous primary care', contact: '807-623-8511', category: 'primary-care' },
  { name: 'Indigenous Services Walk-in', description: 'Walk-in for Indigenous clients', contact: '807-343-5310', category: 'primary-care' },
  { name: 'Boreal Clinic', description: 'General walk-in clinic', contact: 'Not listed', category: 'primary-care' },
  { name: 'Ridgeway Walk-in Clinic', description: 'Walk-in family medicine', contact: '807-622-0601', category: 'primary-care' },

  // Harm Reduction & Addictions
  { name: 'Superior Points', description: 'Harm reduction supplies', contact: '807-621-7862', category: 'harm-reduction' },
  { name: 'Elevate N.W.O.', description: 'Needle exchange program', contact: '807-345-1516', category: 'harm-reduction' },
  { name: 'NorWest RAAM Clinic', description: 'Rapid Access Addiction Medicine', contact: '807-626-8478', category: 'harm-reduction' },
  { name: 'Withdrawal Management', description: 'Detox support', contact: 'Connex or local', category: 'harm-reduction' },
  { name: 'Ontario Addiction Treatment', description: 'Suboxone, Methadone, Recovery clinics', contact: '1-877-937-2282', category: 'harm-reduction' },
  { name: 'Sister Margaret Smith Centre', description: 'Inpatient addictions treatment', contact: '807-684-1500', category: 'harm-reduction' },
  { name: 'Managed Alcohol Program – Matawa', description: 'Harm reduction model for chronic alcohol use', contact: '1-833-625-3611', category: 'harm-reduction' },
  { name: 'Connex Ontario', description: '24/7 addiction & mental health support line', contact: '1-866-531-2600', category: 'harm-reduction' },

  // Mental Health & Counselling
  { name: 'CMHA Walk-In', description: 'Community mental health support', contact: '807-345-5564', category: 'mental-health' },
  { name: 'St. Joseph\'s Health Centre – Outpatient', description: 'Specialized outpatient mental health programs', contact: '807-624-3400', category: 'mental-health' },
  { name: 'Victoriaville Counselling Centre', description: 'Individual & family counselling', contact: '807-684-1880', category: 'mental-health' },
  { name: 'Balmoral Counselling Centre', description: 'Counselling and psychotherapy', contact: '807-623-6515', category: 'mental-health' },
  { name: 'KKW (Mental Health Support)', description: 'Community-based supports', contact: '807-474-4355', category: 'mental-health' },

  // Crisis Support (24/7)
  { name: 'CMHA Safe Beds (24/7 Crisis)', description: 'Crisis stabilization housing', contact: '807-346-8282', category: 'crisis' },
  { name: 'CMHA Crisis Response Line & Mobile Unit', description: 'Mobile crisis team', contact: '807-346-8282', category: 'crisis' },
  { name: 'Victims\' Services Crisis Line', description: '24/7 response for victims of violence', contact: '807-684-1051', category: 'crisis' },
  { name: 'Beendigen Crisis Line', description: 'Indigenous women\'s crisis response', contact: '807-346-4357', category: 'crisis' },
  { name: 'NAN Hope', description: 'Mental health, addictions, & crisis helpline', contact: '1-844-626-4673', category: 'crisis' },

  // Temporary Shelter
  { name: 'CMHA Safe Beds', description: 'Short-term crisis housing', contact: '807-346-8282', category: 'shelter' },
  { name: 'Out of the Cold', description: 'Seasonal overnight shelter', contact: '807-473-3538', category: 'shelter' },
  { name: 'Grace Place (Oct–April)', description: 'Seasonal shelter and meals', contact: 'Not listed', category: 'shelter' },
  { name: 'Salvation Army Men\'s Hostel', description: 'Shelter for men', contact: '807-345-7319', category: 'shelter' },
  { name: 'Shelter House', description: 'Emergency shelter for all genders', contact: '807-623-8182', category: 'shelter' },
  { name: 'Urban Abbey – Women\'s Shelter', description: 'Shelter and spiritual support', contact: '807-768-8923', category: 'shelter' },
  { name: 'Faye Peterson House', description: 'Women & children fleeing violence', contact: '807-345-0450', category: 'shelter' },
  { name: 'Beendigen Indigenous Women\'s Shelter', description: 'Crisis shelter and support', contact: '807-346-4357', category: 'shelter' },
  { name: 'Anishnawbe Women\'s Crisis Home', description: 'Indigenous crisis support', contact: 'Not listed', category: 'shelter' },
  { name: 'Elizabeth Fry', description: 'Support for women involved in justice system', contact: '807-623-1319', category: 'shelter' },

  // Permanent & Transitional Housing
  { name: 'DSSAB – Housing Programs', description: 'Social housing programs', contact: '807-766-2111', category: 'housing' },
  { name: 'Rent-Geared-to-Income – NPTBDC', description: 'Subsidized rent housing', contact: '807-343-9401', category: 'housing' },
  { name: 'Native Housing Program – Matawa', description: 'Indigenous permanent housing', contact: '807-346-1373', category: 'housing' },
  { name: 'Castlegreen Co-op', description: 'Co-operative family housing', contact: '807-767-6214', category: 'housing' },
  { name: 'Dilico Housing Corporation', description: 'Indigenous housing and family services', contact: '807-623-4864', category: 'housing' },
  { name: 'FWFN – Band Office Housing Dept.', description: 'Fort William First Nation housing services', contact: '807-623-9543 / 807-767-8051', category: 'housing' },
  { name: 'Superior View Housing Co-op', description: 'Affordable housing', contact: 'Not listed', category: 'housing' },
];

const getCategoryInfo = (category: string) => {
  switch (category) {
    case 'primary-care': 
      return { 
        title: '🔹 Primary Health Care', 
        color: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-100',
        iconBg: 'bg-gradient-to-r from-cyan-500 to-blue-600'
      };
    case 'harm-reduction': 
      return { 
        title: '🔹 Harm Reduction & Addictions', 
        color: 'from-purple-500 to-pink-600',
        bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100',
        iconBg: 'bg-gradient-to-r from-purple-500 to-pink-600'
      };
    case 'mental-health': 
      return { 
        title: '🔹 Mental Health & Counselling', 
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100',
        iconBg: 'bg-gradient-to-r from-emerald-500 to-teal-600'
      };
    case 'crisis': 
      return { 
        title: '🔹 Crisis Support (24/7)', 
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-gradient-to-br from-red-50 to-rose-100',
        iconBg: 'bg-gradient-to-r from-red-500 to-rose-600'
      };
    case 'shelter': 
      return { 
        title: '🔹 Temporary & Women\'s Shelters', 
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
        iconBg: 'bg-gradient-to-r from-amber-500 to-orange-600'
      };
    case 'housing': 
      return { 
        title: '🔹 Permanent & Transitional Housing', 
        color: 'from-indigo-500 to-violet-600',
        bgColor: 'bg-gradient-to-br from-indigo-50 to-violet-100',
        iconBg: 'bg-gradient-to-r from-indigo-500 to-violet-600'
      };
    default: 
      return { 
        title: 'Services', 
        color: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
        iconBg: 'bg-gradient-to-r from-gray-500 to-gray-600'
      };
  }
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const categoryInfo = getCategoryInfo(resource.category);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${categoryInfo.bgColor} border-0 shadow-lg`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-3 h-3 rounded-full ${categoryInfo.iconBg} shadow-sm`}></div>
              <Building className="h-5 w-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg leading-tight text-gray-800 font-bold">{resource.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 font-medium">{resource.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-xs text-gray-600 font-medium">
              <Phone className="h-3 w-3 mr-1" />
              <span className="truncate">{resource.contact}</span>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="right">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold text-gray-800">{resource.name}</h4>
            <p className="text-sm text-gray-600 mt-1 font-medium">{resource.description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Phone className={`h-4 w-4 mr-2 bg-gradient-to-r ${categoryInfo.color} bg-clip-text text-transparent`} />
              <span className="font-bold text-gray-700">Contact:</span>
            </div>
            <div className="ml-6">
              <Button
                variant="ghost"
                size="sm"
                className={`h-auto p-2 text-sm bg-gradient-to-r ${categoryInfo.color} bg-clip-text text-transparent hover:bg-gradient-to-r hover:${categoryInfo.color} hover:text-white font-bold shadow-md hover:shadow-lg transition-all duration-200`}
                onClick={() => resource.contact !== 'Not listed' && resource.contact !== 'Connex or local' && window.open(`tel:${resource.contact}`, '_self')}
              >
                {resource.contact}
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredResources = (category: string) => 
    resources
      .filter(resource => resource.category === category)
      .filter(resource => 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Community Health Resources</h1>
          <p className="text-gray-600 font-medium">Comprehensive healthcare services for patient referrals</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64 border-2 border-gray-200 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>

      <Tabs defaultValue="primary-care" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="bg-gradient-to-r from-slate-100 to-gray-100 p-2 rounded-2xl shadow-xl border border-gray-200">
            <TabsTrigger 
              value="primary-care" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Primary Care
            </TabsTrigger>
            <TabsTrigger 
              value="harm-reduction" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Harm Reduction
            </TabsTrigger>
            <TabsTrigger 
              value="mental-health" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Mental Health
            </TabsTrigger>
            <TabsTrigger 
              value="crisis" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Crisis (24/7)
            </TabsTrigger>
            <TabsTrigger 
              value="shelter" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Shelters
            </TabsTrigger>
            <TabsTrigger 
              value="housing" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 text-xs font-bold px-3 py-2"
            >
              Housing
            </TabsTrigger>
          </TabsList>
        </div>

        {['primary-care', 'harm-reduction', 'mental-health', 'crisis', 'shelter', 'housing'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${getCategoryInfo(category).color} bg-clip-text text-transparent`}>
                {getCategoryInfo(category).title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources(category).length > 0 ? (
                filteredResources(category).map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 font-medium">No resources found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Resources;
