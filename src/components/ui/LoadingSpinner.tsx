import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'gray';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue', 
  text,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colorClasses = {
    white: 'border-white',
    blue: 'border-blue-600',
    gray: 'border-gray-600'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        <div
          className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        />
        {text && (
          <span className={`text-sm ${
            color === 'white' ? 'text-white' : 
            color === 'blue' ? 'text-blue-600' : 
            'text-gray-600'
          }`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;