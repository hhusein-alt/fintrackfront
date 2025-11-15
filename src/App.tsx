import React from 'react';
import { useState, useEffect } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { AIChat } from './components/AIChat';
import { SpendingsPanel } from './components/SpendingsPanel';
import { BudgetTracker } from './components/BudgetTracker';
import { AddSpendingDialog } from './components/AddSpendingDialog';
import { SubscribesPanel } from './components/SubscribesPanel';
import { SubscriptionCalendar } from './components/SubscriptionCalendar';
import { AddSubscriptionDialog } from './components/AddSubscriptionDialog';
import { ProfilePanel } from './components/ProfilePanel';
import { SettingsPanel } from './components/SettingsPanel';
import { LanguageDialog } from './components/LanguageDialog';
import { ThemeDialog } from './components/ThemeDialog';
import { CurrencyDialog } from './components/CurrencyDialog';
import { RewardsList } from './components/RewardsList';
import { HistoryView } from './components/HistoryView';
import { SignUpDialog } from './components/SignUpDialog';
import { SignInDialog } from './components/SignInDialog';
import { UsernameDialog } from './components/UsernameDialog';
import { BudgetDialog } from './components/BudgetDialog';
import { GoalDialog } from './components/GoalDialog';
import { CreditCard, RefreshCw, Sparkles } from 'lucide-react';

interface Spending {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface Subscription {
  id: number;
  service: string;
  date: string;
  amount: number;
  color: string;
  sendMail?: boolean;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  earned: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isProfilePanelVisible, setIsProfilePanelVisible] = useState(false);
  const [isSettingsPanelVisible, setIsSettingsPanelVisible] = useState(false);
  const [isRewardsPanelVisible, setIsRewardsPanelVisible] = useState(false);
  const [isHistoryPanelVisible, setIsHistoryPanelVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddSubscriptionDialogOpen, setIsAddSubscriptionDialogOpen] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [username, setUsername] = useState('User');
  const [budget, setBudget] = useState(5000); // Store budget in USD
  const [goal, setGoal] = useState(0); // Store goal in USD
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'AZN'>('USD');
  const [activeView, setActiveView] = useState<'home' | 'spendings' | 'subscribes'>('home');
  const [categories, setCategories] = useState<string[]>(['food', 'taxi', 'coffee', 'shopping', 'entertainment']);
  const [services, setServices] = useState<string[]>(['Netflix', 'Spotify', 'YouTube Premium', 'Apple Music']);
  const [spendings, setSpendings] = useState<Spending[]>([
    { id: 1, category: 'food', amount: 45.50, date: '2024-11-14', description: 'Grocery Shopping' },
    { id: 2, category: 'coffee', amount: 5.75, date: '2024-11-14', description: 'Morning Coffee' },
    { id: 3, category: 'taxi', amount: 18.20, date: '2024-11-13', description: 'Ride to Office' },
  ]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 1, service: 'Netflix', date: '2024-11-17', amount: 15.99, color: 'red' },
    { id: 2, service: 'Spotify', date: '2024-11-16', amount: 9.99, color: 'green' },
  ]);
  const [rewards] = useState<Reward[]>([
    { id: 1, title: '7 Day Strike', description: 'Track your expenses for 7 consecutive days', earned: true },
    { id: 2, title: 'Master of Budgeting', description: 'Stay within budget for an entire month', earned: true },
    { id: 3, title: 'Savings Champion', description: 'Save $1000 in a single month', earned: false },
    { id: 4, title: 'Category Expert', description: 'Add 10 different spending categories', earned: false },
    { id: 5, title: 'Subscription Master', description: 'Track 5 active subscriptions', earned: false },
    { id: 6, title: 'Monthly Warrior', description: 'Complete 30 days of expense tracking', earned: false },
  ]);

  const handleAddSpending = (category: string) => {
    if (category === 'add') {
      // Open the dialog
      setIsAddDialogOpen(true);
    } else {
      // Add spending by category
      const amounts: Record<string, number> = {
        food: 25 + Math.random() * 50,
        taxi: 10 + Math.random() * 30,
        coffee: 3 + Math.random() * 7,
      };
      
      const newSpending: Spending = {
        id: Date.now(),
        category,
        amount: amounts[category] || 20,
        date: new Date().toISOString().split('T')[0],
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} Purchase`,
      };
      setSpendings(prev => [newSpending, ...prev]);
    }
  };

  const handleAddSpendingFromDialog = (spending: Omit<Spending, 'id'>) => {
    const newSpending: Spending = {
      id: Date.now(),
      ...spending,
    };
    setSpendings(prev => [newSpending, ...prev]);
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const handleAddSubscribe = (service: string) => {
    if (service === 'add') {
      // Open the dialog
      setIsAddSubscriptionDialogOpen(true);
    } else {
      // Add subscription by service
      const amounts: Record<string, number> = {
        netflix: 15.99,
        spotify: 9.99,
      };

      const colors: Record<string, string> = {
        netflix: 'red',
        spotify: 'green',
      };
      
      const newSubscription: Subscription = {
        id: Date.now(),
        service: service.charAt(0).toUpperCase() + service.slice(1),
        amount: amounts[service.toLowerCase()] || 10.99,
        date: new Date().toISOString().split('T')[0],
        color: colors[service.toLowerCase()] || 'blue',
      };
      setSubscriptions(prev => [newSubscription, ...prev]);
    }
  };

  const handleAddSubscriptionFromDialog = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      id: Date.now(),
      ...subscription,
    };
    setSubscriptions(prev => [newSubscription, ...prev]);
  };

  const handleAddService = (service: string) => {
    if (!services.includes(service)) {
      setServices(prev => [...prev, service]);
    }
  };

  const handleProfileAction = (action: string) => {
    // Handle profile actions (username, budget, goal)
    if (action === 'username') {
      setIsUsernameDialogOpen(true);
    } else if (action === 'budget') {
      setIsBudgetDialogOpen(true);
    } else if (action === 'goal') {
      setIsGoalDialogOpen(true);
    }
  };

  const handleUpdateUsername = (newUsername: string) => {
    setUsername(newUsername);
    console.log('Username updated to:', newUsername);
  };

  const handleUpdateBudget = (newBudget: number) => {
    setBudget(newBudget);
    console.log('Budget updated to:', newBudget);
  };

  const handleUpdateGoal = (newGoal: number) => {
    setGoal(newGoal);
    console.log('Goal updated to:', newGoal);
  };

  // Currency conversion functions
  const USD_TO_AZN_RATE = 1.7;
  
  const convertToDisplayCurrency = (amountUSD: number): number => {
    if (selectedCurrency === 'AZN') {
      return amountUSD * USD_TO_AZN_RATE;
    }
    return amountUSD;
  };

  const convertFromDisplayCurrency = (amount: number): number => {
    if (selectedCurrency === 'AZN') {
      return amount / USD_TO_AZN_RATE;
    }
    return amount;
  };

  const getCurrencySymbol = (): string => {
    return selectedCurrency === 'AZN' ? '₼' : '$';
  };

  const formatCurrency = (amount: number): string => {
    return `${getCurrencySymbol()}${amount.toFixed(2)}`;
  };

  const handleSettingsAction = (action: string) => {
    // Handle settings actions (language, currency, theme)
    if (action === 'language') {
      setIsLanguageDialogOpen(true);
    } else if (action === 'theme') {
      setIsThemeDialogOpen(true);
    } else if (action === 'currency') {
      setIsCurrencyDialogOpen(true);
    } else {
      console.log('Settings action:', action);
    }
  };

  const handleSelectCurrency = (currency: 'USD' | 'AZN') => {
    setSelectedCurrency(currency);
    console.log('Selected currency:', currency);
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    // You can add logic here to actually change the app language
    console.log('Selected language:', language);
  };

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme);
    console.log('Selected theme:', theme);
  };

  // Apply dark theme to document root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleTabChange = (tab: string) => {
    // Store previous state before closing panels
    const wasProfileVisible = activeTab === 'profile' && isProfilePanelVisible;
    const wasSettingsVisible = activeTab === 'settings' && isSettingsPanelVisible;
    const wasRewardsVisible = activeTab === 'rewards' && isRewardsPanelVisible;
    const wasHistoryVisible = activeTab === 'history' && isHistoryPanelVisible;

    // Close all panels first
    setIsProfilePanelVisible(false);
    setIsSettingsPanelVisible(false);
    setIsRewardsPanelVisible(false);
    setIsHistoryPanelVisible(false);
    
    // Close spendings/subscribes view when opening control panels
    setActiveView('home');

    if (tab === 'profile') {
      // Toggle profile panel visibility
      if (wasProfileVisible) {
        // If profile was already active and visible, just close it (already closed above)
        setActiveTab('profile');
      } else {
        // Otherwise, activate profile tab and show panel
        setActiveTab('profile');
        setIsProfilePanelVisible(true);
      }
    } else if (tab === 'settings') {
      // Toggle settings panel visibility
      if (wasSettingsVisible) {
        // If settings was already active and visible, just close it (already closed above)
        setActiveTab('settings');
      } else {
        // Otherwise, activate settings tab and show panel
        setActiveTab('settings');
        setIsSettingsPanelVisible(true);
      }
    } else if (tab === 'rewards') {
      // Toggle rewards panel visibility
      if (wasRewardsVisible) {
        // If rewards was already active and visible, just close it (already closed above)
        setActiveTab('rewards');
      } else {
        // Otherwise, activate rewards tab and show panel
        setActiveTab('rewards');
        setIsRewardsPanelVisible(true);
      }
    } else if (tab === 'history') {
      // Toggle history panel visibility
      if (wasHistoryVisible) {
        // If history was already active and visible, just close it (already closed above)
        setActiveTab('history');
      } else {
        // Otherwise, activate history tab and show panel
        setActiveTab('history');
        setIsHistoryPanelVisible(true);
      }
    } else {
      setActiveTab(tab);
      // All panels already closed above
    }
  };

  const handleViewChange = (view: 'home' | 'spendings' | 'subscribes') => {
    // Close all control panels when switching to spendings/subscribes
    setIsProfilePanelVisible(false);
    setIsSettingsPanelVisible(false);
    setIsRewardsPanelVisible(false);
    setIsHistoryPanelVisible(false);
    setActiveView(view);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Left Panel */}
        <LeftPanel 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onProfileDoubleClick={() => setIsProfilePanelVisible(false)}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
          {/* Evil atmosphere overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          
          {/* Center Content */}
          <div className="relative z-10 h-full flex-1 flex items-center justify-center">
            {activeView === 'home' && (
              <div className="p-12 w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                  {/* Spendings Button */}
                      <button 
                        onClick={() => handleViewChange('spendings')}
                        className="group aspect-square bg-black border-2 border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 shadow-sm hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 hover:scale-105 relative overflow-hidden"
                      >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500" />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6">
                      <div className="p-6 bg-gray-900 group-hover:bg-blue-600 group-hover:shadow-blue-600/50 rounded-full transition-all duration-500 group-hover:shadow-lg">
                        <CreditCard size={48} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h2 className="text-3xl text-white tracking-wider uppercase">Spendings</h2>
                    </div>
                  </button>

                  {/* Subscriptions Button */}
                      <button 
                        onClick={() => handleViewChange('subscribes')}
                        className="group aspect-square bg-black border-2 border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 shadow-sm hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 hover:scale-105 relative overflow-hidden"
                      >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500" />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6">
                      <div className="p-6 bg-gray-900 group-hover:bg-blue-600 group-hover:shadow-blue-600/50 rounded-full transition-all duration-500 group-hover:shadow-lg">
                        <RefreshCw size={48} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h2 className="text-3xl text-white tracking-wider uppercase">Subscriptions</h2>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeView === 'spendings' && (
              <BudgetTracker 
                spendings={spendings} 
                budget={budget}
                currency={selectedCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
              />
            )}

            {activeView === 'subscribes' && (
              <SubscriptionCalendar 
                subscriptions={subscriptions}
                currency={selectedCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
              />
            )}

            {/* Rewards View - Show when rewards tab is active and panel is visible */}
            {activeTab === 'rewards' && isRewardsPanelVisible && (
              <RewardsList rewards={rewards} />
            )}

            {/* History View - Show when history tab is active and panel is visible */}
            {activeTab === 'history' && isHistoryPanelVisible && (
              <HistoryView 
                spendings={spendings} 
                subscriptions={subscriptions}
                currency={selectedCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
              />
            )}
          </div>

          {/* Right Control Panel - Only show when in spendings view */}
          {activeView === 'spendings' && (
            <div className="relative z-20">
              <SpendingsPanel onAddSpending={handleAddSpending} />
            </div>
          )}

          {/* Right Control Panel - Only show when in subscribes view */}
          {activeView === 'subscribes' && (
            <div className="relative z-20">
              <SubscribesPanel onAddSubscribe={handleAddSubscribe} />
            </div>
          )}

              {/* Right Control Panel - Only show when profile tab is active and panel is visible */}
              {activeTab === 'profile' && isProfilePanelVisible && (
                <div className="relative z-20">
                  <ProfilePanel 
                    onProfileAction={handleProfileAction}
                    username={username}
                    budget={budget}
                    goal={goal}
                    currency={selectedCurrency}
                    convertToDisplayCurrency={convertToDisplayCurrency}
                    formatCurrency={formatCurrency}
                  />
                </div>
              )}

          {/* Right Control Panel - Only show when settings tab is active and panel is visible */}
          {activeTab === 'settings' && isSettingsPanelVisible && (
            <div className="relative z-20">
              <SettingsPanel onSettingsAction={handleSettingsAction} />
            </div>
          )}

          {/* AI Button - Bottom Right Corner */}
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="absolute bottom-8 right-8 group z-20"
                style={{ marginRight: (activeView === 'spendings' || activeView === 'subscribes' || (activeTab === 'profile' && isProfilePanelVisible) || (activeTab === 'settings' && isSettingsPanelVisible)) ? '12rem' : '0' }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              
              {/* Button */}
              <div className="relative bg-blue-600 hover:bg-blue-500 shadow-blue-600/50 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl transition-all duration-300 group-hover:scale-110">
                <Sparkles size={18} />
                <span className="tracking-wider">AI</span>
              </div>
            </div>
          </button>

          {/* Back Button - Show when not on home */}
          {activeView !== 'home' && (
            <button
              onClick={() => handleViewChange('home')}
              className="absolute top-8 left-8 z-20 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 hover:border-blue-600 hover:text-white rounded-lg transition-all duration-300 shadow-sm"
            >
              ← Back
            </button>
          )}

          {/* Sign In and Sign Up Buttons - Top Right Corner */}
          <div 
            className="absolute top-8 z-20 flex gap-3 transition-all duration-300"
            style={{ 
              right: (activeView === 'spendings' || activeView === 'subscribes' || (activeTab === 'profile' && isProfilePanelVisible) || (activeTab === 'settings' && isSettingsPanelVisible)) ? '14rem' : '2rem' 
            }}
          >
            <button
              onClick={() => setIsSignInDialogOpen(true)}
              className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 hover:border-blue-600 hover:text-white rounded-lg transition-all duration-300 shadow-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUpDialogOpen(true)}
              className="px-4 py-2 bg-blue-600 border border-blue-600 text-white hover:bg-blue-500 hover:border-blue-500 rounded-lg transition-all duration-300 shadow-sm shadow-blue-600/30"
            >
              Sign Up
            </button>
          </div>

          {/* Decorative elements for evil atmosphere */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20" />
        </div>
      </div>

      {/* AI Chat - Outside main layout for proper z-index */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Add Spending Dialog */}
      <AddSpendingDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddSpendingFromDialog}
        existingCategories={categories}
        onAddCategory={handleAddCategory}
        currency={selectedCurrency}
        convertFromDisplayCurrency={convertFromDisplayCurrency}
        getCurrencySymbol={getCurrencySymbol}
      />

      {/* Add Subscription Dialog */}
      <AddSubscriptionDialog
        isOpen={isAddSubscriptionDialogOpen}
        onClose={() => setIsAddSubscriptionDialogOpen(false)}
        onAdd={handleAddSubscriptionFromDialog}
        existingServices={services}
        onAddService={handleAddService}
        currency={selectedCurrency}
        convertFromDisplayCurrency={convertFromDisplayCurrency}
        getCurrencySymbol={getCurrencySymbol}
      />

      {/* Language Dialog */}
      <LanguageDialog
        isOpen={isLanguageDialogOpen}
        onClose={() => setIsLanguageDialogOpen(false)}
        onSelectLanguage={handleSelectLanguage}
        selectedLanguage={selectedLanguage}
      />

      {/* Theme Dialog */}
      <ThemeDialog
        isOpen={isThemeDialogOpen}
        onClose={() => setIsThemeDialogOpen(false)}
        onSelectTheme={handleSelectTheme}
        selectedTheme={selectedTheme}
      />

      {/* Currency Dialog */}
      <CurrencyDialog
        isOpen={isCurrencyDialogOpen}
        onClose={() => setIsCurrencyDialogOpen(false)}
        onSelectCurrency={handleSelectCurrency}
        selectedCurrency={selectedCurrency}
      />

      {/* Sign Up Dialog */}
      <SignUpDialog
        isOpen={isSignUpDialogOpen}
        onClose={() => setIsSignUpDialogOpen(false)}
        onSignUp={(data) => {
          console.log('Sign up data:', data);
          // Handle sign up logic here
        }}
      />

      {/* Sign In Dialog */}
      <SignInDialog
        isOpen={isSignInDialogOpen}
        onClose={() => setIsSignInDialogOpen(false)}
        onSignIn={(data) => {
          console.log('Sign in data:', data);
          // Handle sign in logic here
        }}
      />

      {/* Username Dialog */}
      <UsernameDialog
        isOpen={isUsernameDialogOpen}
        onClose={() => setIsUsernameDialogOpen(false)}
        currentUsername={username}
        onUpdateUsername={handleUpdateUsername}
      />

      {/* Budget Dialog */}
      <BudgetDialog
        isOpen={isBudgetDialogOpen}
        onClose={() => setIsBudgetDialogOpen(false)}
        currentBudget={budget}
        onUpdateBudget={handleUpdateBudget}
        currency={selectedCurrency}
        convertToDisplayCurrency={convertToDisplayCurrency}
        convertFromDisplayCurrency={convertFromDisplayCurrency}
        getCurrencySymbol={getCurrencySymbol}
      />

      {/* Goal Dialog */}
      <GoalDialog
        isOpen={isGoalDialogOpen}
        onClose={() => setIsGoalDialogOpen(false)}
        currentGoal={goal}
        onUpdateGoal={handleUpdateGoal}
        currency={selectedCurrency}
        convertToDisplayCurrency={convertToDisplayCurrency}
        convertFromDisplayCurrency={convertFromDisplayCurrency}
        getCurrencySymbol={getCurrencySymbol}
      />
    </>
  );
}
