import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', className, children }) => {
  const variantClasses = variant === 'destructive' ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-blue-500/20 text-blue-500 border-blue-500/50';

  return (
    <div className={`p-4 rounded-lg border ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return <div className="mt-2 text-sm">{children}</div>;
};