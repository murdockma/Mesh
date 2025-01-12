'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { 
  Sparkles, TrendingUp, PieChart, CreditCard, 
  ArrowUpRight, ArrowDownRight, Bell, 
  Home, Settings, Users, Search, Menu,
  ShoppingCart, Store, BarChart3, Filter
} from 'lucide-react';

const Dashboard = () => {
  const [activeToolCategory, setActiveToolCategory] = useState(0);

  const marketTrends = [
    { month: 'Jan', listings: 240, sales: 180, newTools: 45 },
    { month: 'Feb', listings: 320, sales: 250, newTools: 65 },
    { month: 'Mar', listings: 380, sales: 310, newTools: 85 },
    { month: 'Apr', listings: 450, sales: 380, newTools: 95 },
    { month: 'May', listings: 520, sales: 450, newTools: 110 },
    { month: 'Jun', listings: 600, sales: 520, newTools: 130 },
  ];

  const toolCategories = [
    { name: 'Text & Chat', value: 30, color: '#38bdf8' },
    { name: 'Image Generation', value: 25, color: '#4ade80' },
    { name: 'Data Analysis', value: 20, color: '#f472b6' },
    { name: 'Code Assistant', value: 15, color: '#fb923c' },
    { name: 'Audio & Speech', value: 10, color: '#a78bfa' },
    { name: 'Others', value: 5, color: '#94a3b8' }
  ];

  const trendingTools = [
    { id: 1, name: 'SmartChat Pro', price: 29.99, category: 'Text & Chat', status: 'Trending', rating: '4.8' },
    { id: 2, name: 'ImageMaster AI', price: 49.99, category: 'Image Generation', status: 'New', rating: '4.9' },
    { id: 3, name: 'CodeCompanion', price: 19.99, category: 'Code Assistant', status: 'Popular', rating: '4.7' },
    { id: 4, name: 'DataWizard', price: 39.99, category: 'Data Analysis', status: 'Featured', rating: '4.6' }
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-4 flex flex-col border-r border-slate-700">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">AI Marketplace</h1>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-1">
            {[
              { icon: Home, label: 'Overview', active: true },
              { icon: ShoppingCart, label: 'Shop' },
              { icon: Store, label: 'Sell' },
              { icon: BarChart3, label: 'Analytics' },
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
                  <p className="text-sm font-medium text-white">Michael M</p>
                  <p className="text-xs text-slate-400">michael@example.com</p>
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
                  placeholder="Search AI tools..."
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
                title: 'Total Tools Listed', 
                value: '2,450', 
                change: '+24%',
                trend: 'up',
                description: 'vs. previous month'
              },
              { 
                title: 'Active Users', 
                value: '18,890', 
                change: '+12.3%',
                trend: 'up',
                description: 'vs. previous month'
              },
              { 
                title: 'Total Sales', 
                value: '$83,800', 
                change: '+18.3%',
                trend: 'up',
                description: 'vs. previous month'
              },
              { 
                title: 'Satisfaction Rate', 
                value: '94%', 
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
                      <ArrowUpRight className="h-4 w-4" />
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
                  <CardTitle className="text-white">Market Trends</CardTitle>
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
                    <AreaChart data={marketTrends}>
                      <defs>
                        <linearGradient id="listingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
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
                        dataKey="listings" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#listingsGradient)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#4ade80" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#salesGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tool Categories */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="border-b border-slate-700">
                <CardTitle className="text-white">Tool Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[250px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={toolCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveToolCategory(index)}
                      >
                        {toolCategories.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            opacity={activeToolCategory === index ? 1 : 0.7}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {toolCategories.map((category, index) => (
                    <div 
                      key={category.name}
                      className="flex items-center gap-2"
                      onMouseEnter={() => setActiveToolCategory(index)}
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

          {/* Trending Tools */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Trending Tools</CardTitle>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View all
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {trendingTools.map(tool => (
                  <div 
                    key={tool.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{tool.name}</p>
                        <p className="text-sm text-slate-400">{tool.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-400">
                        ${tool.price}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="px-2 py-1 rounded-full bg-slate-600 text-xs">
                          {tool.status}
                        </span>
                        <span>•</span>
                        <span>⭐ {tool.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-4 py-3 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 transition-colors">
                  Explore More Tools
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