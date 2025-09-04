import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import IPOCard from '../components/IPOCard';
import FilterBar from '../components/FilterBar';
import StatsOverview from '../components/StatsOverview';

interface IPO {
  id: string;
  company: string;
  symbol: string;
  category: 'local' | 'foreign';
  industry: string;
  launchDate: string;
  priceRange: string;
  status: 'upcoming' | 'active' | 'closed';
  marketCap: string;
  country: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [filteredIpos, setFilteredIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    industry: 'all'
  });

  useEffect(() => {
    // Simulate API call to fetch IPOs
    const fetchIpos = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockIpos: IPO[] = [
        {
          id: '1',
          company: 'TechCorp Inc.',
          symbol: 'TECH',
          category: 'local',
          industry: 'Technology',
          launchDate: '2025-02-15',
          priceRange: '$18-22',
          status: 'upcoming',
          marketCap: '$2.5B',
          country: 'USA'
        },
        {
          id: '2',
          company: 'Global Fintech Ltd.',
          symbol: 'GFIN',
          category: 'foreign',
          industry: 'Financial Services',
          launchDate: '2025-01-28',
          priceRange: '€25-30',
          status: 'active',
          marketCap: '€1.8B',
          country: 'Germany'
        },
        {
          id: '3',
          company: 'BioMed Solutions',
          symbol: 'BMED',
          category: 'local',
          industry: 'Healthcare',
          launchDate: '2025-03-10',
          priceRange: '$35-42',
          status: 'upcoming',
          marketCap: '$4.2B',
          country: 'USA'
        },
        {
          id: '4',
          company: 'Asian Energy Co.',
          symbol: 'AECO',
          category: 'foreign',
          industry: 'Energy',
          launchDate: '2025-01-20',
          priceRange: '¥2,800-3,200',
          status: 'closed',
          marketCap: '¥890B',
          country: 'Japan'
        }
      ];
      
      setIpos(mockIpos);
      setFilteredIpos(mockIpos);
      setLoading(false);
    };

    fetchIpos();
  }, []);

  useEffect(() => {
    let filtered = ipos;

    // Only show IPOs based on user's subscription access
    if (user?.localIpoAccess && !user?.foreignIpoAccess) {
      filtered = filtered.filter(ipo => ipo.category === 'local');
    } else if (user?.foreignIpoAccess && !user?.localIpoAccess) {
      filtered = filtered.filter(ipo => ipo.category === 'foreign');
    } else if (!user?.localIpoAccess && !user?.foreignIpoAccess) {
      filtered = []; // No access to any IPOs
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(ipo => ipo.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(ipo => ipo.status === filters.status);
    }

    if (filters.industry !== 'all') {
      filtered = filtered.filter(ipo => ipo.industry === filters.industry);
    }

    setFilteredIpos(filtered);
  }, [filters, ipos]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-2">
            Track the latest IPO opportunities and manage your alerts
          </p>
        </div>

        <StatsOverview ipos={ipos} />

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 lg:p-6 border-b">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">IPO Listings</h2>
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="p-4 lg:p-6">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-40 lg:h-48"></div>
                ))}
              </div>
            ) : filteredIpos.length === 0 ? (
              <div className="text-center py-8 lg:py-12">
                <p className="text-gray-500 text-base lg:text-lg">No IPOs match your current filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredIpos.map(ipo => (
                  <IPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}