import React, { useEffect } from 'react';

interface TabSwitcherProps {
  /** The tabs to render in the UI */
  tabs: string[];
  /** The currently active tab */
  activeTab: string | null;
  /** The callback for when active tab should change */
  setActiveTab: (tab: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  /** Set the first tab as active by default if no activeTab value exists */
  useEffect(() => {
    if (!activeTab) {
      setActiveTab(tabs[0]);
    }
  }, []);

  return (
    <div className="flex space-x-4 border-b mb-8">
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? 'border-b-2 border-violet-500 text-violet-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
