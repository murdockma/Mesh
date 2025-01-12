'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { 
  Wallet, TrendingUp, PieChart, CreditCard, 
  ArrowUpRight, ArrowDownRight, Bell, 
  Home, Settings, Users, Search, Menu,
  BarChart3, Clock, Filter
} from 'lucide-react';

const Dashboard = () => {
  const [activeSpendingCategory, setActiveSpendingCategory] = useState(0);

  const monthlyData = [
    { month: 'Jan', spending: 2400, income: 4000, savings: 1600 },
    { month: 'Feb', spending: 1398, income: 3000, savings: 1602 },
    { month: 'Mar', spending: 9800, income: 2000, savings: -7800 },
    { month: 'Apr', spending: 3908, income: 2780, savings: -1128 },
    { month: 'May', spending: 4800, income: 5890, savings: 1090 },
    { month: 'Jun', spending: 3800, income: 4890, savings: 1090 },
  ];

  const spendingCategories = [
    { name: 'Housing', value: 35, color: '#38bdf8' },
    { name: 'Food', value: 20, color: '#4ade80' },
    { name: 'Transport', value: 15, color: '#f472b6' },
    { name: 'Entertainment', value: 10, color: '#fb923c' },
    { name: 'Utilities', value: 12, color: '#a78bfa' },
    { name: 'Others', value: 8, color: '#94a3b8' }
  ];

  const recentTransactions = [
    { id: 1, name: 'Grocery Shopping', amount: -82.33, category: 'Food', date: 'Today', time: '14:30' },
    { id: 2, name: 'Salary Deposit', amount: 4800.00, category: 'Income', date: 'Yesterday', time: '09:15' },
    { id: 3, name: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2 days ago', time: '00:00' },
    { id: 4, name: 'Electric Bill', amount: -124.50, category: 'Utilities', date: '3 days ago', time: '11:45' }
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-4 flex flex-col border-r border-slate-700">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Finance</h1>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-1">
            {[
              { icon: Home, label: 'Overview', active: true },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Clock, label: 'History' },
              { icon: Users, label: 'Accounts' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  item.active 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-auto">
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-600" />
                <div>
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-slate-400">john@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button className="p-2 hover:bg-slate-700 rounded-lg">
                <Menu className="h-5 w-5 text-slate-400" />
              </button>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..."
                  className="w-full bg-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-700 rounded-lg relative">
                <Bell className="h-5 w-5 text-slate-400" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Total Balance', 
                value: '$12,450', 
                change: '+14%',
                trend: 'up',
                description: 'vs. previous month'
              },
              { 
                title: 'Monthly Income', 
                value: '$4,890', 
                change: '+2.3%',
                trend: 'up',
                description: 'vs. previous month'
              },
              { 
                title: 'Monthly Spending', 
                value: '$3,800', 
                change: '-4.3%',
                trend: 'down',
                description: 'vs. previous month'
              },
              { 
                title: 'Savings Rate', 
                value: '22%', 
                change: '+2.1%',
                trend: 'up',
                description: 'vs. previous month'
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                      {stat.trend === 'up' ? 
                        <ArrowUpRight className="h-4 w-4" /> : 
                        <ArrowDownRight className="h-4 w-4" />
                      }
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Cash Flow Analysis</CardTitle>
                  <select className="bg-slate-700 text-slate-200 px-3 py-1 rounded-lg border border-slate-600">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>All time</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#incomeGradient)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="spending" 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#spendingGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Spending Breakdown */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="border-b border-slate-700">
                <CardTitle className="text-white">Spending Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[250px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={spendingCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveSpendingCategory(index)}
                      >
                        {spendingCategories.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            opacity={activeSpendingCategory === index ? 1 : 0.7}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {spendingCategories.map((category, index) => (
                    <div 
                      key={category.name}
                      className="flex items-center gap-2"
                      onMouseEnter={() => setActiveSpendingCategory(index)}
                    >
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-slate-400">{category.name}</span>
                      <span className="text-white font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Transactions</CardTitle>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View all
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.amount > 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.amount > 0 ? <TrendingUp className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.name}</p>
                        <p className="text-sm text-slate-400">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-4 py-3 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 transition-colors">
                  Load More Transactions
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;