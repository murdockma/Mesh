'use client';

import React, { useState, useEffect } from 'react';
import { Building2, MessageCircle, Video, Users, Clock, Coffee, Settings, Home, LogOut } from 'lucide-react';
import { Chat } from '@/components/chat/Chat';
import { OverviewContent } from '@/components/overview/Overview';
import { useChatStore } from '@/lib/store/chat-store';
import { v4 as uuidv4 } from 'uuid';
import { AuthProviders } from '../auth/providers';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  return (
    <AuthProviders>
      <DashboardContent />
    </AuthProviders>
  );
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('chat');
  const { currentUser } = useChatStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  // Initialize chat data
  useEffect(() => {
    // This would normally come from an API
    const mockData = {
      currentUser: {
        id: 'you',
        name: 'Michael Murdock',
        email: 'michael@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        status: 'online',
        timezone: 'PST',
        role: 'admin',
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'Denver, CO',
        joinDate: '2023-01-15',
        bio: 'Full-stack developer passionate about building great user experiences',
        skills: ['React', 'TypeScript', 'Node.js', 'Python'],
        githubUsername: 'michaelm',
        linkedinUrl: 'https://linkedin.com/in/michaelm'
      },
      currentChannel: 'general',
      channels: [
        {
          id: 'general',
          name: 'general',
          description: 'General discussion for the team',
          isPrivate: false,
          members: ['you', 'sarah', 'alex', 'emma', 'james'],
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          unreadCount: 2,
          mentionsCount: 0,
        },
        {
          id: 'team-updates',
          name: 'team-updates',
          description: 'Important team announcements and updates',
          isPrivate: false,
          members: ['you', 'sarah', 'alex', 'emma', 'james'],
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          unreadCount: 5,
          mentionsCount: 2,
        },
        {
          id: 'random',
          name: 'random',
          description: 'Random discussions and water cooler chat',
          isPrivate: false,
          members: ['you', 'sarah', 'alex', 'emma', 'james'],
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          unreadCount: 0,
          mentionsCount: 0,
        }
      ],
      messages: {
        'general': [
          {
            id: '1',
            content: 'Hey team! I just pushed some updates to the main branch. Could someone review my PR? 👨‍💻',
            userId: 'sarah',
            channelId: 'general',
            timestamp: new Date().toISOString(),
            reactions: [
              { emoji: '👍', count: 2, users: ['you', 'alex'] }
            ],
          },
          {
            id: '2',
            content: 'I\'ll take a look at it now, Sarah!',
            userId: 'alex',
            channelId: 'general',
            timestamp: new Date().toISOString(),
            reactions: [
              { emoji: '🙌', count: 1, users: ['sarah'] }
            ],
          },
          {
            id: '3',
            content: 'Great work on the new feature implementation!',
            userId: 'you',
            channelId: 'general',
            timestamp: new Date().toISOString(),
            reactions: [
              { emoji: '🚀', count: 3, users: ['sarah', 'alex', 'emma'] }
            ],
          }
        ],
        'team-updates': [
          {
            id: '4',
            content: '📢 Team sync tomorrow at 10 AM PST. Please update your status reports before the meeting.',
            userId: 'emma',
            channelId: 'team-updates',
            timestamp: new Date().toISOString(),
            reactions: [
              { emoji: '👍', count: 4, users: ['you', 'sarah', 'alex', 'james'] }
            ],
          }
        ],
        'random': [
          {
            id: '5',
            content: 'Anyone up for virtual coffee chat? ☕',
            userId: 'james',
            channelId: 'random',
            timestamp: new Date().toISOString(),
            reactions: [
              { emoji: '☕', count: 3, users: ['you', 'emma', 'sarah'] }
            ],
          }
        ]
      },
      users: [
        {
          id: 'you',
          name: 'Michael Murdock',
          email: 'michael@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          status: 'online',
          timezone: 'PST',
          role: 'admin',
          title: 'Senior Software Engineer',
          department: 'Engineering',
          location: 'Denver, CO',
          joinDate: '2023-01-15',
          bio: 'Full-stack developer passionate about building great user experiences',
          skills: ['React', 'TypeScript', 'Node.js', 'Python'],
          githubUsername: 'michaelm',
          linkedinUrl: 'https://linkedin.com/in/michaelm'
        },
        {
          id: 'sarah',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          status: 'in-meeting',
          timezone: 'EST',
          role: 'member',
          title: 'Frontend Developer',
          department: 'Engineering',
          location: 'New York, NY',
          joinDate: '2023-03-01',
          bio: 'UI/UX enthusiast with a passion for creating beautiful interfaces',
          skills: ['React', 'Vue.js', 'CSS', 'Figma'],
          githubUsername: 'sarahj',
          linkedinUrl: 'https://linkedin.com/in/sarahjohnson'
        },
        {
          id: 'alex',
          name: 'Alex Rodriguez',
          email: 'alex@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          status: 'away',
          timezone: 'CST',
          role: 'member',
          title: 'Backend Engineer',
          department: 'Engineering',
          location: 'Austin, TX',
          joinDate: '2023-02-15',
          bio: 'System architecture specialist focused on scalable solutions',
          skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'],
          githubUsername: 'alexr',
          linkedinUrl: 'https://linkedin.com/in/alexrodriguez'
        },
        {
          id: 'emma',
          name: 'Emma Wilson',
          email: 'emma@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          status: 'online',
          timezone: 'GMT',
          role: 'member',
          title: 'Product Manager',
          department: 'Product',
          location: 'London, UK',
          joinDate: '2023-04-01',
          bio: 'Product strategist with a technical background',
          skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis'],
          githubUsername: 'emmaw',
          linkedinUrl: 'https://linkedin.com/in/emmawilson'
        },
        {
          id: 'james',
          name: 'James Lee',
          email: 'james@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
          status: 'online',
          timezone: 'PST',
          role: 'member',
          title: 'DevOps Engineer',
          department: 'Engineering',
          location: 'Seattle, WA',
          joinDate: '2023-01-20',
          bio: 'Infrastructure and automation specialist',
          skills: ['Docker', 'Jenkins', 'Terraform', 'GitOps'],
          githubUsername: 'jameslee',
          linkedinUrl: 'https://linkedin.com/in/jameslee'
        }
      ],
    };

    console.log('Initializing chat store with:', mockData);
    // Reset the store first
    useChatStore.setState({
      messages: {},
      channels: [],
      users: [],
      currentChannel: null,
      currentUser: null,
      isLoading: false,
      error: null,
    });

    // Then set the new state
    useChatStore.setState(mockData);
  }, []);

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Main Sidebar */}
      <div className="w-64 bg-slate-800 p-4 flex flex-col border-r border-slate-700">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">RemoteHub</h1>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-1">
            {[
              { icon: Home, label: 'Overview', value: 'overview' },
              { icon: MessageCircle, label: 'Chat', value: 'chat' },
              { icon: Video, label: 'Virtual Rooms' },
              { icon: Users, label: 'Team' },
              { icon: Clock, label: 'Time Zones' },
              { icon: Coffee, label: 'Social' },
              { icon: Settings, label: 'Settings' },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                {index < 6 && (
                  <button
                    onClick={() => setActiveTab(item.label.toLowerCase())}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      item.label.toLowerCase() === activeTab
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                )}
                {index === 6 && (
                  <div>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </button>
                    <div className="mt-4 flex items-start justify-start pl-4">
                      <p
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="text-slate-400 cursor-pointer hover:text-slate-300 text-sm flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'overview' && <OverviewContent />}
        {activeTab === 'chat' && <Chat />}
        {/* Add other tab content here */}
      </div>
    </div>
  );
}