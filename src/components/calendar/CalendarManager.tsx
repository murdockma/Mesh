import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Plus, Filter, Search, Globe, Sun, Moon, 
         Check, X, ChevronLeft, ChevronRight, MoreHorizontal, Focus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const TimeZoneCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week'); // week, day, month
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Standup',
      start: '09:00',
      end: '09:30',
      attendees: ['Sarah Johnson', 'Alex Rodriguez'],
      type: 'meeting',
      recurring: true
    },
    {
      id: 2,
      title: 'Focus Time',
      start: '10:00',
      end: '12:00',
      type: 'focus',
      color: 'purple'
    }
  ]);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      timezone: 'America/New_York',
      workingHours: { start: 9, end: 17 }
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      timezone: 'America/Los_Angeles',
      workingHours: { start: 8, end: 16 }
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      timezone: 'Europe/London',
      workingHours: { start: 10, end: 18 }
    }
  ];

  // Generate time slots for the day view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const isWorkingHour = (hour, member) => {
    return hour >= member.workingHours.start && hour < member.workingHours.end;
  };

  const getLocalTime = (time, timezone) => {
    const date = new Date();
    const options = { timeZone: timezone, hour: 'numeric', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  };

  const findOverlappingTime = () => {
    const workingHours = teamMembers.map(member => ({
      start: member.workingHours.start,
      end: member.workingHours.end,
      timezone: member.timezone
    }));

    // Calculate overlap (simplified version)
    const latestStart = Math.max(...workingHours.map(h => h.start));
    const earliestEnd = Math.min(...workingHours.map(h => h.end));

    return { start: latestStart, end: earliestEnd };
  };

  return (
    <div className="flex h-full bg-slate-900">
      {/* Left Sidebar - Team Members & Time Zones */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm p-4 border-r border-slate-700">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Team</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              placeholder="Search team members..." 
              className="pl-10 bg-slate-700 border-slate-600"
            />
          </div>
        </div>

        <div className="space-y-3">
          {teamMembers.map(member => (
            <Card 
              key={member.id}
              className="bg-slate-700/50 hover:bg-slate-600/50 transition-colors cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Globe className="h-3 w-3" />
                      <span>{getLocalTime(new Date(), member.timezone)}</span>
                    </div>
                  </div>
                  {isWorkingHour(currentHour, member) ? (
                    <Badge className="bg-green-500/20 text-green-400">
                      Working
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-500/20 text-slate-400">
                      Away
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              className="w-full justify-start bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
              variant="ghost"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button 
              className="w-full justify-start bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
              variant="ghost"
              onClick={() => setFocusMode(!focusMode)}
            >
              <Focus className="h-4 w-4 mr-2" />
              Toggle Focus Time
            </Button>
          </div>
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
            <div className="flex gap-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200 text-xs"
                onClick={() => setView('day')}
              >
                Day
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200 text-xs"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200 text-xs"
                onClick={() => setView('month')}
              >
                Month
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-3 transition duration-200"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 86400000))}
            >
              &lt;
            </Button>
            <div className="text-white font-medium mx-2">
              {selectedDate.toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-3 transition duration-200"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 86400000))}
            >
              &gt;
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-8 gap-px bg-slate-700">
            {/* Time column */}
            <div className="bg-slate-800 p-2">
              <div className="text-sm font-medium text-slate-400">Time</div>
            </div>
            {/* Day columns */}
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return (
                <div key={i} className="bg-slate-800 p-2">
                  <div className="text-sm font-medium text-slate-400">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-sm text-slate-300">
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="overflow-y-auto h-[calc(100%-3rem)]">
            {timeSlots.map((time, i) => (
              <div key={time} className="grid grid-cols-8 gap-px bg-slate-700">
                <div className="bg-slate-800 p-2 text-sm text-slate-400">
                  {time}
                </div>
                {Array.from({ length: 7 }, (_, j) => (
                  <div 
                    key={`${i}-${j}`} 
                    className={`bg-slate-800 p-2 min-h-[4rem] relative ${
                      focusMode && i >= 9 && i < 12 ? 'bg-purple-500/10' : ''
                    }`}
                  >
                    {events.map(event => (
                      event.start === time && (
                        <div 
                          key={event.id}
                          className={`absolute left-0 right-0 m-1 p-2 rounded ${
                            event.type === 'focus' 
                              ? 'bg-purple-600/30 text-purple-300 border border-purple-500'
                              : 'bg-blue-600/30 text-blue-300 border border-blue-500'
                          }`}
                          style={{
                            height: `${(parseInt(event.end) - parseInt(event.start)) * 4}rem`
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{event.title}</span>
                            {event.recurring && (
                              <Badge className="bg-slate-600/50 text-slate-300">
                                ↻
                              </Badge>
                            )}
                          </div>
                          {event.attendees && (
                            <div className="flex -space-x-2 mt-2">
                              {event.attendees.map((attendee, i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-slate-800">
                                  <AvatarImage 
                                    src={teamMembers.find(m => m.name === attendee)?.avatar} 
                                    alt={attendee} 
                                  />
                                  <AvatarFallback>{attendee[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className="mt-4 flex gap-4">
          <Card className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-white">Best Meeting Time</h3>
              <p className="text-gray-400">
                Team overlap: {findOverlappingTime().start}:00 - {findOverlappingTime().end}:00
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-white">Focus Time</h3>
              <p className="text-gray-400">
                Recommended: 10:00 - 12:00 (Minimal meetings scheduled)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneCalendar;
