import React, { useState, useEffect } from 'react';
import { Building2, MessageCircle, Video, Users, Clock, Coffee, Settings, Home, LogOut, Activity, Sun, Moon, 
  Cloud, ChevronUp, ChevronDown, Send, Sparkles, BarChart3, Calendar, Globe, Bot, X, Maximize2, Minimize2,
  Bell, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import OpenAI from "openai";

// Animated Gradient Background
const GradientBackground = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient" />
);

// Quick Actions Menu
const QuickActions = () => {
  const actions = [
    { icon: Video, label: 'Start Meeting', color: 'text-purple-400' },
    { icon: MessageCircle, label: 'New Message', color: 'text-blue-400' },
    { icon: Calendar, label: 'Schedule', color: 'text-green-400' },
    { icon: Globe, label: 'Team Map', color: 'text-orange-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-700/50 
                    transition-all duration-300 group"
        >
          <div className="flex flex-col items-center gap-2">
            <Icon className={`h-6 w-6 ${color} group-hover:scale-110 transition-transform`} />
            <span className="text-sm text-slate-300">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

// Team Activity Pulse
const ActivityPulse = () => (
  <div className="relative">
    <Activity className="h-5 w-5 text-green-400" />
    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full">
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
    </span>
  </div>
);

// Weather Status Component
const WeatherStatus = () => {
  const [timeOfDay, setTimeOfDay] = useState('day');
  
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');
  }, []);

  return (
    <div className="flex items-center gap-2 bg-slate-700/50 p-2 rounded-lg">
      {timeOfDay === 'day' ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-300" />
      )}
      <span className="text-xs text-slate-300">San Francisco, 72°F</span>
    </div>
  );
};

// Team Activity Timeline
const ActivityTimeline = () => {
  const activities = [
    { user: 'Sarah', action: 'committed to main', time: '2m ago', icon: RefreshCw },
    { user: 'Alex', action: 'started a meeting', time: '15m ago', icon: Video },
    { user: 'Emma', action: 'updated docs', time: '1h ago', icon: MessageCircle },
  ];

  return (
    <Card className="bg-slate-800/30 border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
            <activity.icon className="h-5 w-5 text-blue-400" />
            <div className="flex-1">
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// const openai = new OpenAI();
// console.log(process.env.OPENAI_API_KEY);

// Simple AI Assistant Widget
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   organization: "org-zP0neGmaJR18U0LnBEdqE5fs",
//   project: "proj_ns7DlNWIiiUu5k7bx3w1CLkx"
// });

const AIAssistant = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Make API call to OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Specify the model you want to use
        messages: newMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        max_tokens: 100, // Limit the response length
      });

      const aiResponse = response.choices[0]?.message?.content || 
                         'I\'m sorry, I wasn\'t able to understand that.';

      // Update messages with the AI response
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-sm font-medium text-white">AI Assistant</CardTitle>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 hover:bg-slate-700 rounded"
        >
          <Minimize2 className="h-4 w-4 text-slate-400" />
        </button>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center text-slate-400">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce delay-100">●</div>
              <div className="animate-bounce delay-200">●</div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// Productivity Chart
const ProductivityChart = () => {
  const data = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 35 },
    { name: 'Thu', value: 55 },
    { name: 'Fri', value: 40 },
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Team Productivity</CardTitle>
      </CardHeader>
      <CardContent className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Main Overview Content
export const OverviewContent = () => {
  const [notifications, setNotifications] = useState([
    "New team member joined • Engineering",
    "Project deadline approaching • Design System",
    "3 pull requests need review"
  ]);

  return (
    <div className="relative flex-1 p-6 space-y-6 overflow-y-auto">
      <GradientBackground />
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Welcome back, Michael</h2>
          <ActivityPulse />
        </div>
        <WeatherStatus />
      </div>

      {/* Notifications */}
      <div className="space-y-2">
        {notifications.map((notification, idx) => (
          <Alert key={idx} className="bg-blue-500/10 border-blue-500/20">
            <Bell className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-sm text-blue-400">
              {notification}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats and Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProductivityChart />
        </div>
        <ActivityTimeline />
      </div>

      {/* AI Assistant */}
      {/* <div className={`assistant-widget ${isMinimized ? 'minimized' : ''}`}>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        {isTyping && <div className="typing-indicator">Assistant is typing...</div>}
        <div className="input-bar">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your message..." 
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div> */}
      {/* <AIAssistant /> */}
    </div>
  );
};

// Add some global styles
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }
`;
document.head.appendChild(style);
