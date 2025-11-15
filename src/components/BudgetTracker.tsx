import React from 'react';
import { DollarSign, TrendingDown, Calendar } from 'lucide-react';

interface Spending {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface BudgetTrackerProps {
  spendings: Spending[];
  budget: number; // Budget in USD
  currency: 'USD' | 'AZN';
  convertToDisplayCurrency: (amountUSD: number) => number;
  formatCurrency: (amount: number) => string;
}

export function BudgetTracker({ spendings, budget, currency, convertToDisplayCurrency, formatCurrency }: BudgetTrackerProps) {
  const totalSpentUSD = spendings.reduce((sum, spending) => sum + spending.amount, 0);
  const displayBudget = convertToDisplayCurrency(budget);
  const displayTotalSpent = convertToDisplayCurrency(totalSpentUSD);
  const displayRemaining = convertToDisplayCurrency(budget - totalSpentUSD);
  const percentage = (totalSpentUSD / budget) * 100;

  return (
    <div className="h-full w-full p-8 pt-20 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl text-white tracking-wider uppercase mb-2">Budget Tracker</h1>
          <p className="text-gray-400">Monitor your spendings and stay on budget</p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <DollarSign size={20} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-400">Total Budget</span>
            </div>
            <p className="text-2xl text-white">{formatCurrency(displayBudget)}</p>
          </div>

          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <TrendingDown size={20} className="text-red-500" />
              </div>
              <span className="text-sm text-gray-400">Total Spent</span>
            </div>
            <p className="text-2xl text-white">{formatCurrency(displayTotalSpent)}</p>
          </div>

          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <DollarSign size={20} className="text-green-500" />
              </div>
              <span className="text-sm text-gray-400">Remaining</span>
            </div>
            <p className="text-2xl text-white">{formatCurrency(displayRemaining)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-400">Budget Usage</span>
            <span className="text-sm text-white">{percentage.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Recent Spendings */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg text-white mb-4 tracking-wider">Recent Spendings</h2>
          
          {spendings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No spendings recorded yet</p>
              <p className="text-sm text-gray-600 mt-2">Use the control panel to add spendings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {spendings.map((spending) => (
                <div
                  key={spending.id}
                  className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-black rounded-lg">
                      <DollarSign size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-white">{spending.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 bg-gray-800 uppercase px-2 py-0.5 rounded">
                          {spending.category}
                        </span>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar size={12} />
                          {spending.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg text-white">
                    {formatCurrency(convertToDisplayCurrency(spending.amount))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
