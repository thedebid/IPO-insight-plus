import React from 'react';
import { Calendar, Globe, Building, TrendingUp, Flag } from 'lucide-react';

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

interface IPOCardProps {
  ipo: IPO;
}

export default function IPOCard({ ipo }: IPOCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-amber-100 text-amber-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === 'local' ? <Flag className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    return category === 'local' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="p-4 lg:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {ipo.company}
            </h3>
            <p className="text-xs lg:text-sm text-gray-500 font-mono">{ipo.symbol}</p>
          </div>
          <div className="flex flex-col items-end space-y-1 lg:space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ipo.status)}`}>
              {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(ipo.category)}`}>
              {getCategoryIcon(ipo.category)}
              <span className="ml-1 capitalize">{ipo.category}</span>
            </span>
          </div>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center text-xs lg:text-sm text-gray-600">
            <Building className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-gray-400" />
            <span>{ipo.industry}</span>
          </div>

          <div className="flex items-center text-xs lg:text-sm text-gray-600">
            <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-gray-400" />
            <span>{new Date(ipo.launchDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-xs lg:text-sm text-gray-600">
            <Globe className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-gray-400" />
            <span>{ipo.country}</span>
          </div>
        </div>

        <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Price Range</p>
              <p className="text-xs lg:text-sm font-semibold text-gray-900">{ipo.priceRange}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Market Cap</p>
              <p className="text-xs lg:text-sm font-semibold text-gray-900">{ipo.marketCap}</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-3 lg:mt-4 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm lg:text-base">
          <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}