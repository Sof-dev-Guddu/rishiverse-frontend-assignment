'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  showSpinner?: boolean;
   showShimmer?: boolean;
  className?: string;
  spinerClassName?:string;
}

const shimmerStyle: React.CSSProperties = {
  animation: 'shimmer 1.5s infinite',
  background: 'linear-gradient(90deg, transparent, rgba(211, 207, 207, 0.8), transparent)',
  transform: 'translateX(-100%)',
  willChange: 'transform',
};

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
//   height = '200px',
//   width = '100%',
  borderRadius = '0.75rem',
  showSpinner = true,
  showShimmer=true,
  className = '',
  spinerClassName=''

}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        className
      )}
      style={{
        borderRadius,
        position: 'relative',
      }}
    >
      {/* Shimmer bar */}
      {
        showShimmer && (
       <div
        style={{
          ...shimmerStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          backgroundSize: '200% 100%',
        }}
      />
        )
      }

      {/* Centered Spinner */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className={cn("h-12 w-12 text-primary animate-spin",spinerClassName)} />
        </div>
      )}

      {/* Add fallback pulse animation using Tailwind */}
      <div className="absolute inset-0 animate-pulse bg-muted/20"></div>
    </div>
  );
};

export default LoadingSkeleton;
