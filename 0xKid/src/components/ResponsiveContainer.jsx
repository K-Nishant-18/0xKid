import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = '7xl',
  padding = true,
  center = true 
}) => {
  const containerClasses = [
    'w-full',
    padding && 'px-3 sm:px-4 md:px-6 lg:px-8',
    center && 'mx-auto',
    maxWidth && `max-w-${maxWidth}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default ResponsiveContainer; 