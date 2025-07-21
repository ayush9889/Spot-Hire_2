import React, { useState } from 'react';
import { useJobs } from '../../contexts/JobContext';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { JobCategory, JobType, SearchFilters } from '../../types';
import { JOB_CATEGORIES, JOB_TYPES, COMPENSATION_TYPES } from '../../lib/constants';
import SearchSuggestions from '../features/SearchSuggestions';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const JobSearch: React.FC = () => {
  const { searchJobs, searchFilters } = useJobs();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(searchFilters);
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchJobs(localFilters);
    setIsFilterOpen(false);
    setShowKeywordSuggestions(false);
    setShowLocationSuggestions(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {};
    setLocalFilters(clearedFilters);
    searchJobs(clearedFilters);
  };

  const activeFiltersCount = Object.values(localFilters).filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Input
              leftIcon={<Search className="h-4 w-4" />}
              placeholder="Search for shop assistant, waiter, delivery partner..."
              value={localFilters.keyword || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, keyword: e.target.value })}
              onFocus={() => setShowKeywordSuggestions(true)}
              onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 200)}
            />
            {showKeywordSuggestions && (
              <SearchSuggestions
                query={localFilters.keyword || ''}
                onSelect={(suggestion) => {
                  setLocalFilters({ ...localFilters, keyword: suggestion });
                  setShowKeywordSuggestions(false);
                }}
                type="keyword"
              />
            )}
          </div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <Input
              leftIcon={<MapPin className="h-4 w-4" />}
              placeholder="City, Area (e.g., Andheri, Delhi)"
              value={localFilters.location || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
            />
            {showLocationSuggestions && (
              <SearchSuggestions
                query={localFilters.location || ''}
                onSelect={(suggestion) => {
                  setLocalFilters({ ...localFilters, location: suggestion });
                  setShowLocationSuggestions(false);
                }}
                type="location"
              />
            )}
          </div>

          {/* Filter Toggle */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            leftIcon={<Filter className="h-4 w-4" />}
            rightIcon={activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                {activeFiltersCount}
              </span>
            )}
          >
            Filters
          </Button>

          {/* Search Button */}
          <Button type="submit" leftIcon={<Search className="h-4 w-4" />}>
            Search Jobs
          </Button>
        </div>

        {/* Advanced Filters */}
        {isFilterOpen && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filter Jobs</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
                leftIcon={<X className="h-4 w-4" />}
              >
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <Select
                label="Job Category"
                value={localFilters.category || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  category: e.target.value as JobCategory || undefined 
                })}
                options={[
                  { value: '', label: 'All Categories' },
                  ...JOB_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))
                ]}
              />

              {/* Job Type Filter */}
              <Select
                label="Work Type"
                value={localFilters.type || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  type: e.target.value as JobType || undefined 
                })}
                options={[
                  { value: '', label: 'All Types' },
                  ...JOB_TYPES.map(type => ({ value: type.value, label: type.label }))
                ]}
              />

              {/* Salary Range */}
              <Input
                type="number"
                label="Minimum Salary (₹)"
                placeholder="e.g., 12000"
                value={localFilters.minSalary || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  minSalary: e.target.value ? Number(e.target.value) : undefined 
                })}
              />

              <Input
                type="number"
                label="Maximum Salary (₹)"
                placeholder="e.g., 25000"
                value={localFilters.maxSalary || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  maxSalary: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
              <Button type="submit">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobSearch;