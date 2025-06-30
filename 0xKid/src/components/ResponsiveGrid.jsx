import React from 'react';

const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  autoFit = false,
  minWidth = '280px'
}) => {
  const getGridCols = () => {
    if (autoFit) {
      return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
    }
    
    const mobileCols = cols.mobile || 1;
    const tabletCols = cols.tablet || mobileCols;
    const desktopCols = cols.desktop || tabletCols;
    const wideCols = cols.wide || desktopCols;
    
    return `grid-cols-${mobileCols} sm:grid-cols-${tabletCols} lg:grid-cols-${desktopCols} xl:grid-cols-${wideCols}`;
  };

  const getGap = () => {
    const mobileGap = gap.mobile || 4;
    const tabletGap = gap.tablet || mobileGap;
    const desktopGap = gap.desktop || tabletGap;
    
    return `gap-${mobileGap} sm:gap-${tabletGap} lg:gap-${desktopGap}`;
  };

  const gridClasses = [
    'grid',
    getGridCols(),
    getGap(),
    className
  ].filter(Boolean).join(' ');

  const style = autoFit ? {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  } : {};

  return (
    <div className={gridClasses} style={style}>
      {children}
    </div>
  );
};

export default ResponsiveGrid; 