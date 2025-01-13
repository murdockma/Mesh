import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Smile } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useChatStore } from '@/lib/store/chat-store';
import { Message as MessageType } from '@/types/chat';
import { formatDistanceToNow, format } from 'date-fns';
import { UserProfile } from './UserProfile';

interface MessageListProps {
  className?: string;
}

export function MessageList({ className }: MessageListProps) {
  const messages = useChatStore((state) => state.messages);
  const currentChannel = useChatStore((state) => state.currentChannel);
  const users = useChatStore((state) => state.users);
  const currentUser = useChatStore((state) => state.currentUser);

  const channelMessages = currentChannel ? messages[currentChannel] || [] : [];

  console.log('Current Channel:', currentChannel);
  console.log('Messages:', messages);
  console.log('Channel Messages:', channelMessages);

  if (!currentChannel) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a channel to view messages
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      {channelMessages.map((message, index) => (
        <div key={message.id} className={
          index > 0 && 
          (!message.reactions || message.reactions.length === 0) && 
          (!channelMessages[index - 1].reactions || channelMessages[index - 1].reactions.length === 0)
          ? 'mt-1.5' 
          : 'mt-2'
        }>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}

function Message({ message }: { message: MessageType }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const [showUserProfile, setShowUserProfile] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const users = useChatStore((state) => state.users);
  const currentUser = useChatStore((state) => state.currentUser);
  const addReaction = useChatStore((state) => state.addReaction);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showEmojiPicker &&
          pickerRef.current &&
          buttonRef.current &&
          !pickerRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const sender = users.find((u) => u.id === message.userId);

  if (!sender) {
    console.log('Sender not found for message:', message);
    return null;
  }

  const handleEmojiSelect = (emoji: any) => {
    if (currentUser && message.channelId) {
      addReaction(message.id, message.channelId, emoji.native, currentUser.id);
      setShowEmojiPicker(false);
    }
  };

  const handleReactionClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPickerPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className={`group flex items-start gap-3 hover:bg-slate-800/50 ${
      message.reactions && message.reactions.length > 0 ? 'p-1.5' : 'py-1.5 px-2'
    } rounded-lg relative`}>
      <img
        src={sender.avatar}
        alt={sender.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span 
            className="font-medium text-slate-200 hover:text-indigo-400 cursor-pointer"
            onClick={() => setShowUserProfile(true)}
          >
            {sender.name}
          </span>
          <span className="text-xs text-slate-400">
            {format(new Date(message.timestamp), 'p')}
          </span>
        </div>
        <p className="text-slate-300 break-words">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 p-2 rounded-md bg-slate-700/50"
              >
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.previewUrl || attachment.url}
                    alt={attachment.name}
                    className="max-w-xs rounded"
                  />
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">{attachment.name}</p>
                      {attachment.size && (
                        <p className="text-xs text-slate-400">
                          {formatFileSize(attachment.size)}
                        </p>
                      )}
                    </div>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Download
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {message.reactions && message.reactions.length > 0 ? (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex flex-wrap gap-1">
              {message.reactions.map((reaction, index) => (
                <button
                  key={`${reaction.emoji}-${index}`}
                  onClick={() => {
                    if (currentUser) {
                      addReaction(message.id, message.channelId, reaction.emoji, currentUser.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2 py-[5px] rounded-full text-xs ${
                    currentUser && reaction.users.includes(currentUser.id)
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="text-sm leading-none">{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleReactionClick}
              ref={buttonRef}
              className="opacity-0 group-hover:opacity-100 p-[5px] hover:bg-slate-700 rounded transition-opacity"
            >
              <Smile className="h-[18px] w-[18px] text-slate-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleReactionClick}
            ref={buttonRef}
            className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 -translate-y-1/2 p-[5px] hover:bg-slate-700 rounded transition-opacity"
          >
            <Smile className="h-[18px] w-[18px] text-slate-400" />
          </button>
        )}
      </div>
      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="fixed z-50"
          style={{
            top: Math.min(pickerPosition.top, window.innerHeight - 400),
            left: Math.min(pickerPosition.left, window.innerWidth - 352),
          }}
        >
          <div className="bg-slate-800 rounded-lg shadow-lg">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
              skinTonePosition="none"
              previewPosition="none"
              navPosition="none"
            />
          </div>
        </div>
      )}
      {showUserProfile && (
        <UserProfile user={sender} onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
