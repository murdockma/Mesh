export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  timestamp: string;
  reactions: Reaction[];
  attachments?: Attachment[];
  mentions?: string[];
  isEdited?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'link';
  url: string;
  name: string;
  size?: number;
  previewUrl?: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: string[];
  createdAt: string;
  lastActivity: string;
  unreadCount: number;
  mentionsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'offline' | 'in-meeting';
  timezone: string;
  role: 'admin' | 'member';
  title: string;
  department: string;
  location: string;
  joinDate: string;
  bio: string;
  skills: string[];
  githubUsername?: string;
  linkedinUrl?: string;
}

export interface ChatState {
  messages: Record<string, Message[]>;
  channels: Channel[];
  users: User[];
  currentChannel: string | null;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}
