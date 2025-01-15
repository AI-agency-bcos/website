import React from 'react';

interface TabsProps {
    defaultValue: string;
    className?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
  }

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({ value: '', setValue: () => {} });

export const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  children,
  className = ''
}) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ 
  children,
  className = ''
}) => {
  return (
    <div className={`flex space-x-1 rounded-lg bg-gray-800/50 p-1 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value,
  children,
  className = ''
}) => {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  return (
    <button
      className={`
        px-4 py-2 text-sm font-medium rounded-md 
        transition-all duration-200
        ${isSelected 
          ? 'bg-white/10 text-white shadow-sm' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
        ${className}
      `}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ 
  value,
  children,
  className = ''
}) => {
  const { value: selectedValue } = React.useContext(TabsContext);
  
  if (value !== selectedValue) return null;

  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
};