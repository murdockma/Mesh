import { create } from 'zustand';
import { ChatState, Message, Channel, User } from '@/types/chat';

const initialState: ChatState = {
  messages: {},
  channels: [],
  users: [],
  currentChannel: null,
  currentUser: null,
  isLoading: false,
  error: null,
};

export const useChatStore = create<ChatState & {
  setCurrentChannel: (channelId: string) => void;
  addMessage: (message: Message) => void;
  addReaction: (messageId: string, channelId: string, reaction: string, userId: string) => void;
  setUserStatus: (userId: string, status: User['status']) => void;
  markChannelAsRead: (channelId: string) => void;
}>((set, get) => ({
  ...initialState,

  setCurrentChannel: (channelId) => {
    console.log('Setting current channel to:', channelId);
    set((state) => ({ ...state, currentChannel: channelId }));
  },

  addMessage: (message) => {
    console.log('Adding message:', message);
    set((state) => {
      console.log('Current state:', JSON.stringify(state, null, 2));
      
      const channelMessages = state.messages[message.channelId] || [];
      const newMessages = {
        ...state.messages,
        [message.channelId]: [...channelMessages, message],
      };
      
      console.log('New messages state:', JSON.stringify(newMessages, null, 2));
      
      // Update unread count for the channel
      const updatedChannels = state.channels.map(channel => 
        channel.id === message.channelId
          ? {
              ...channel,
              lastActivity: message.timestamp,
              unreadCount: channel.unreadCount + 1,
              mentionsCount: message.content.includes('@') ? channel.mentionsCount + 1 : channel.mentionsCount
            }
          : channel
      );

      return {
        ...state,
        messages: newMessages,
        channels: updatedChannels
      };
    });
  },

  addReaction: (messageId, channelId, reaction, userId) =>
    set((state) => {
      const channelMessages = state.messages[channelId] || [];
      const messageIndex = channelMessages.findIndex((m) => m.id === messageId);
      
      if (messageIndex === -1) return state;

      const message = channelMessages[messageIndex];
      const existingReactionIndex = message.reactions.findIndex((r) => r.emoji === reaction);

      let updatedReactions = [...message.reactions];
      if (existingReactionIndex >= 0) {
        const existingReaction = message.reactions[existingReactionIndex];
        if (existingReaction.users.includes(userId)) {
          // Remove user's reaction
          updatedReactions[existingReactionIndex] = {
            ...existingReaction,
            count: existingReaction.count - 1,
            users: existingReaction.users.filter((u) => u !== userId),
          };
        } else {
          // Add user's reaction to existing emoji
          updatedReactions[existingReactionIndex] = {
            ...existingReaction,
            count: existingReaction.count + 1,
            users: [...existingReaction.users, userId],
          };
        }
      } else {
        // Add new reaction
        updatedReactions.push({
          emoji: reaction,
          count: 1,
          users: [userId],
        });
      }

      // Remove reactions with count 0
      updatedReactions = updatedReactions.filter((r) => r.count > 0);

      const updatedMessage = {
        ...message,
        reactions: updatedReactions,
      };

      return {
        ...state,
        messages: {
          ...state.messages,
          [channelId]: [
            ...channelMessages.slice(0, messageIndex),
            updatedMessage,
            ...channelMessages.slice(messageIndex + 1),
          ],
        },
      };
    }),

  setUserStatus: (userId, status) =>
    set((state) => ({
      ...state,
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status } : user
      ),
    })),

  markChannelAsRead: (channelId) =>
    set((state) => ({
      ...state,
      channels: state.channels.map((channel) =>
        channel.id === channelId
          ? { ...channel, unreadCount: 0, mentionsCount: 0 }
          : channel
      ),
    })),
}));
