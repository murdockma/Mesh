import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, Users, Plus, Settings, Share2, MessageCircle, 
         Hand, Smile, Layout, LayoutGrid, Coffee, Crown, Clock, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const VirtualRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Team Standup',
      participants: ['Sarah Johnson', 'Alex Rodriguez', 'You'],
      isActive: true,
      type: 'meeting',
      duration: '30min',
      host: 'Sarah Johnson'
    },
    {
      id: '2',
      name: '☕ Coffee Corner',
      participants: ['Emma Wilson', 'James Lee'],
      isActive: true,
      type: 'social',
      duration: 'unlimited',
      host: 'Emma Wilson'
    },
    {
      id: '3',
      name: '🚀 Sprint Planning',
      participants: ['Michael Murdock'],
      isActive: false,
      type: 'meeting',
      duration: '1h',
      host: 'Michael Murdock'
    }
  ]);

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeRoom, setActiveRoom] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [layout, setLayout] = useState('grid');
  const [handRaised, setHandRaised] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojis = ['👍', '👏', '❤️', '🎉', '🚀', '💡'];

  useEffect(() => {
    if (reaction) {
      const timer = setTimeout(() => setReaction(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [reaction]);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const newRoom = {
        id: (rooms.length + 1).toString(),
        name: newRoomName,
        participants: ['You'],
        isActive: true,
        type: 'meeting',
        duration: '1h',
        host: 'You'
      };
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
      setShowCreateRoom(false);
      setActiveRoom(newRoom.id);
    }
  };

  const getParticipantBadgeColor = (count) => {
    if (count < 3) return 'bg-blue-500/20 text-blue-400';
    if (count < 5) return 'bg-purple-500/20 text-purple-400';
    return 'bg-green-500/20 text-green-400';
  };

  return (
    <div className="flex h-full">
      {/* Enhanced Rooms List Sidebar */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm p-4 border-r border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Virtual Rooms</h2>
            <p className="text-slate-400 text-sm mt-1">
              {rooms.filter(r => r.isActive).length} active rooms
            </p>
          </div>
          <Button
            onClick={() => setShowCreateRoom(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Room
          </Button>
        </div>

        {showCreateRoom && (
          <Card className="mb-4 border border-slate-600 bg-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Room Name
                </label>
                <Input
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="Enter room name..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateRoom}
                  className="bg-blue-500 hover:bg-blue-600 flex-1"
                >
                  Create Room
                </Button>
                <Button
                  onClick={() => setShowCreateRoom(false)}
                  variant="outline"
                  className="border-slate-600 hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className={`group relative overflow-hidden transition-all duration-300 ${
                activeRoom === room.id 
                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/50' 
                  : 'bg-slate-800/50 hover:bg-slate-700/50 border-transparent'
              } backdrop-blur-sm cursor-pointer`}
              onClick={() => setActiveRoom(room.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{room.name}</h3>
                      {room.host === 'You' && (
                        <Crown className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        className={getParticipantBadgeColor(room.participants.length)}
                      >
                        <Users className="h-3 w-3 mr-1" />
                        {room.participants.length}
                      </Badge>
                      <Badge className="bg-slate-600/50">
                        <Clock className="h-3 w-3 mr-1" />
                        {room.duration}
                      </Badge>
                    </div>
                  </div>
                  {room.isActive && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full animate-pulse">
                      Live
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Main Content Area */}
      <div className="flex-1 p-6 bg-slate-900 relative">
        {activeRoom ? (
          <div className="h-full flex flex-col">
            {/* Room Header */}
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {rooms.find(r => r.id === activeRoom)?.name}
                </h2>
                <p className="text-slate-400">
                  Hosted by {rooms.find(r => r.id === activeRoom)?.host}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLayout(layout === 'grid' ? 'spotlight' : 'grid')}
                >
                  {layout === 'grid' ? (
                    <LayoutGrid className="h-4 w-4" />
                  ) : (
                    <Layout className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Video Grid with dynamic layout */}
            <div className={`flex-1 ${
              layout === 'grid' 
                ? 'grid grid-cols-2 gap-4' 
                : 'flex flex-col gap-4'
            } mb-4`}>
              <div className={`relative aspect-video bg-slate-800 rounded-lg ${
                layout === 'spotlight' ? 'flex-1' : ''
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600" />
                </div>
                {reaction && (
                  <div className="absolute top-4 right-4 text-4xl animate-bounce">
                    {reaction}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1 rounded-full">
                  <p className="text-white text-sm">You</p>
                </div>
              </div>
              <div className={`aspect-video bg-slate-800 rounded-lg ${
                layout === 'spotlight' ? 'h-48' : ''
              }`}>
                <div className="h-full flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600" />
                </div>
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="h-20 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  variant={videoEnabled ? 'default' : 'destructive'}
                  size="icon"
                  className={`transition-all duration-200 ${
                    videoEnabled ? 'bg-blue-500 hover:bg-blue-600' : ''
                  }`}
                >
                  {videoEnabled ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <VideoOff className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  variant={audioEnabled ? 'default' : 'destructive'}
                  size="icon"
                  className={`transition-all duration-200 ${
                    audioEnabled ? 'bg-blue-500 hover:bg-blue-600' : ''
                  }`}
                >
                  {audioEnabled ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`relative ${handRaised ? 'bg-yellow-500/20 border-yellow-500/50' : ''}`}
                  onClick={() => setHandRaised(!handRaised)}
                >
                  <Hand className={`h-5 w-5 ${handRaised ? 'text-yellow-400' : ''}`} />
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  {showEmoji && (
                    <div className="absolute bottom-full mb-2 left-0 bg-slate-700 p-2 rounded-lg shadow-lg flex gap-1">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setReaction(emoji);
                            setShowEmoji(false);
                          }}
                          className="hover:bg-slate-600 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button 
                  variant="destructive"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  Leave Room
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Video className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Welcome to Virtual Rooms
              </h3>
              <p className="text-slate-400 mb-6">
                Join an existing room or create a new one to start collaborating with your team
              </p>
              <Button
                onClick={() => setShowCreateRoom(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Room
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualRooms;
