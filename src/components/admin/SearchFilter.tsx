import React from 'react';
import { Search, Filter } from 'lucide-react';

interface Props {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export function SearchFilter({ searchPlaceholder, searchValue, onSearchChange, onFilterClick }: Props) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <button 
        onClick={onFilterClick}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Filter className="h-5 w-5 mr-2" />
        Filter
      </button>
    </div>
  );
}