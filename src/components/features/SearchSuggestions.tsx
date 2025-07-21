import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  type: 'keyword' | 'location';
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  onSelect,
  type,
}) => {
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    `recent-${type}-searches`,
    []
  );

  const keywordSuggestions = [
    'Shop Assistant', 'Waiter', 'Delivery Partner', 'Security Guard',
    'Cleaner', 'Cook', 'Driver', 'Cashier', 'Sales Executive',
    'Receptionist', 'Helper', 'Packer', 'Loader', 'Electrician',
  ];

  const locationSuggestions = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  ];

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      const baseSuggestions = type === 'keyword' ? keywordSuggestions : locationSuggestions;
      const filtered = baseSuggestions.filter(item =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions(recentSearches.slice(0, 3));
    }
  }, [debouncedQuery, type, recentSearches]);

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    
    // Add to recent searches
    const updated = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 5);
    setRecentSearches(updated);
  };

  if (suggestions.length === 0) return null;

  const Icon = type === 'keyword' ? Search : MapPin;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1"
      >
        {debouncedQuery.length === 0 && recentSearches.length > 0 && (
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
            Recent searches
          </div>
        )}
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSelect(suggestion)}
            className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            {debouncedQuery.length === 0 ? (
              <Clock className="h-4 w-4 text-gray-400 mr-3" />
            ) : (
              <Icon className="h-4 w-4 text-gray-400 mr-3" />
            )}
            <span className="text-sm text-gray-700">{suggestion}</span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchSuggestions;