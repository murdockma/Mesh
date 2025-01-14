import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Mail, Github, Linkedin, MapPin, Search, Filter,
  ChevronDown, ChevronRight, Building2, MessageCircle,
  Video, Clock, Coffee, Settings, LogOut, Plus,
  Briefcase, Sparkles, BarChart2, Target, Award
} from 'lucide-react';

// Team member type definition
type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  avatar: string;
  email: string;
  github?: string;
  linkedin?: string;
  skills: string[];
  projects: string[];
  reportsTo?: number;
  achievements?: string[];
  status?: 'online' | 'away' | 'offline';
  timeZone?: string;
  teamSize?: number;
};

// Org Tree Node Component
const OrgTreeNode = ({ 
  member, 
  members, 
  level = 0,
  onSelect
}: { 
  member: TeamMember; 
  members: TeamMember[];
  level?: number;
  onSelect: (member: TeamMember) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const directReports = members.filter(m => m.reportsTo === member.id);
  
  return (
    <div className="relative" style={{ marginLeft: `${level * 40}px` }}>
      <div className={`
        absolute -left-8 h-full w-8 pointer-events-none
        ${directReports.length > 0 ? 'border-l border-slate-600' : ''}
      `} />
      
      <div className="relative mb-4">
        <div className={`
          absolute -left-8 top-1/2 w-8 border-t border-slate-600
          ${directReports.length > 0 ? '' : 'hidden'}
        `} />
        
        <Card 
          className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer"
          onClick={() => onSelect(member)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {directReports.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="p-1 hover:bg-slate-700 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              )}
              
              <Avatar className="h-10 w-10">
                <img src={member.avatar} alt={member.name} className="rounded-full" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800
                  ${member.status === 'online' ? 'bg-green-500' : 
                    member.status === 'away' ? 'bg-yellow-500' : 'bg-slate-500'}`} 
                />
              </Avatar>
              
              <div>
                <h3 className="text-sm font-semibold text-white">{member.name}</h3>
                <p className="text-xs text-slate-400">{member.role}</p>
              </div>
              
              {member.teamSize && (
                <Badge className="ml-auto bg-blue-500/20 text-blue-400">
                  Team of {member.teamSize}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isExpanded && directReports.map(report => (
        <OrgTreeNode 
          key={report.id} 
          member={report} 
          members={members} 
          level={level + 1}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend }: any) => (
  <Card className="bg-slate-800/50 border-slate-700">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-sm ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-sm text-slate-400">vs last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const TeamPage = () => {
  const [activeView, setActiveView] = useState<'grid' | 'tree'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsProfileExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Enhanced sample team data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      department: "Engineering",
      location: "San Francisco, CA",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "sarah.chen@company.com",
      github: "sarahc",
      linkedin: "sarahchen",
      skills: ["System Architecture", "Team Leadership", "Strategy"],
      projects: ["Platform Migration", "Security Initiative"],
      status: "online",
      timeZone: "PST",
      teamSize: 15,
      achievements: ["Led successful Series B", "10x team growth"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Engineering Manager",
      department: "Engineering",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "marcus.r@company.com",
      github: "marcusr",
      linkedin: "marcusrodriguez",
      skills: ["React", "Node.js", "Team Management"],
      projects: ["Dashboard Redesign", "API Development"],
      reportsTo: 1,
      status: "away",
      timeZone: "EST",
      teamSize: 8,
      achievements: ["Reduced deploy time by 50%"]
    },
    // Add more team members as needed
  ];

  const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  
  const teamStats = {
    totalMembers: teamMembers.length,
    departmentsCount: new Set(teamMembers.map(m => m.department)).size,
    onlineMembers: teamMembers.filter(m => m.status === 'online').length,
    openPositions: 5
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Quick Add Modal
  const QuickAddModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-white">Add Team Member</CardTitle>
          <button 
            onClick={() => setShowQuickAdd(false)}
            className="p-2 hover:bg-slate-700 rounded"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white"
          />
          <select className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white">
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
            Add Member
          </button>
        </CardContent>
      </Card>
    </div>
  );

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card 
      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer"
      onClick={() => {
        setSelectedMember(member);
        setIsProfileExpanded(true);
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <img src={member.avatar} alt={member.name} className="rounded-full" />
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-slate-400">{member.role}</p>
            </div>
          </div>
          <Badge 
            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          >
            {member.department}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{member.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {member.skills.slice(0, 3).map((skill, idx) => (
              <Badge 
                key={idx}
                variant="outline" 
                className="bg-slate-700/50 text-slate-300 border-slate-600"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ExpandedProfile = () => {
    if (!selectedMember) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <Card className="bg-slate-800 border-slate-700 w-full max-w-2xl" ref={profileRef}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white">Team Member Profile</CardTitle>
            <button 
              onClick={() => setIsProfileExpanded(false)}
              className="p-2 hover:bg-slate-700 rounded"
            >
              ✕
            </button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <img src={selectedMember.avatar} alt={selectedMember.name} className="rounded-full" />
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">{selectedMember.name}</h2>
                <p className="text-slate-400">{selectedMember.role}</p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {selectedMember.department}
                  </Badge>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedMember.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <div className="space-y-2">
                  <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400">
                    <Mail className="h-4 w-4" />
                    <span>{selectedMember.email}</span>
                  </a>
                  {selectedMember.github && (
                    <a href={`https://github.com/${selectedMember.github}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400">
                      <Github className="h-4 w-4" />
                      <span>{selectedMember.github}</span>
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a href={`https://linkedin.com/in/${selectedMember.linkedin}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400">
                      <Linkedin className="h-4 w-4" />
                      <span>{selectedMember.linkedin}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline" 
                      className="bg-slate-700/50 text-slate-300 border-slate-600"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Current Projects</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedMember.projects.map((project, idx) => (
                  <Card key={idx} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-400" />
                        <span className="text-slate-200">{project}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const [sprintLog, setSprintLog] = useState([
    { id: 1, member: 'Sarah Chen', action: 'Completed user authentication feature', date: '2025-01-10' },
    { id: 2, member: 'Marcus Rodriguez', action: 'Fixed bug in payment processing', date: '2025-01-11' },
    { id: 3, member: 'Michael Murdock', action: 'Reviewed pull request for dashboard', date: '2025-01-12' },
  ]);

  const [commitLog, setCommitLog] = useState([
    { id: 1, member: 'Sarah Chen', message: 'Refactored API calls', date: '2025-01-10', link: '#' },
    { id: 2, member: 'Marcus Rodriguez', message: 'Updated README with installation instructions', date: '2025-01-11', link: '#' },
    { id: 3, member: 'Michael Murdock', message: 'Added unit tests for user model', date: '2025-01-12', link: '#' },
  ]);

  return (
    <div className="relative flex-1 px-8 py-6 space-y-6 overflow-y-auto">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient -z-10" />
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Our Team</h1>
        </div>
        <button
          onClick={() => setShowQuickAdd(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Members"
          value={teamStats.totalMembers}
          icon={Users}
          trend={12}
        />
        <StatsCard 
          title="Departments"
          value={teamStats.departmentsCount}
          icon={Building2}
        />
        <StatsCard 
          title="Online Now"
          value={teamStats.onlineMembers}
          icon={Target}
        />
        <StatsCard 
          title="Open Positions"
          value={teamStats.openPositions}
          icon={BarChart2}
          trend={-5}
        />
      </div>

      {/* View Toggle & Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
          <button
            onClick={() => setActiveView('grid')}
            className={`px-4 py-2 rounded ${
              activeView === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'text-slate-400'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setActiveView('tree')}
            className={`px-4 py-2 rounded ${
              activeView === 'tree' 
                ? 'bg-blue-500 text-white' 
                : 'text-slate-400'
            }`}
          >
            Org Tree
          </button>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-slate-800/50 border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Team Content */}
      <div className="min-h-0 flex-1">
        {activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/30 rounded-lg p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              {teamMembers
                .filter(member => !member.reportsTo)
                .map(member => (
                  <OrgTreeNode
                    key={member.id}
                    member={member}
                    members={teamMembers}
                    onSelect={(member) => {
                      setSelectedMember(member);
                      setIsProfileExpanded(true);
                    }}
                  />
                ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Sprint Log Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mt-12 mb-4">Sprint Log</h2>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {sprintLog.map(log => (
                <li key={log.id} className="text-gray-400 flex justify-between">
                  <span>{log.member}: {log.action}</span>
                  <span className="text-slate-500 text-sm">{log.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Commit Log Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">Commit Log</h2>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {commitLog.map(commit => (
                <li key={commit.id} className="text-gray-400 flex justify-between">
                  <span>{commit.member}: <a href={commit.link} className="text-blue-400 hover:underline">{commit.message}</a></span>
                  <span className="text-slate-500 text-sm">{commit.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {isProfileExpanded && <ExpandedProfile />}
      {showQuickAdd && <QuickAddModal />}
    </div>
  );
};

export default TeamPage;
