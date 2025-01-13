import React, { useState, useRef } from 'react';
import { Plus, Mic, Paperclip, Smile } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import { v4 as uuidv4 } from 'uuid';

interface MessageInputProps {
  className?: string;
}

export function MessageInput({ className }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentChannel = useChatStore(state => state.currentChannel);
  const currentUser = useChatStore(state => state.currentUser);
  const addMessage = useChatStore(state => state.addMessage);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentChannel || !currentUser) {
      console.log('Cannot send message:', {
        message: message.trim(),
        currentChannel,
        currentUser
      });
      return;
    }

    console.log('Sending message with:', {
      content: message.trim(),
      userId: currentUser.id,
      channelId: currentChannel
    });

    const newMessage = {
      id: uuidv4(),
      content: message.trim(),
      userId: currentUser.id,
      channelId: currentChannel,
      timestamp: new Date().toISOString(),
      reactions: [],
    };

    addMessage(newMessage);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    const files = e.target.files;
    if (!files || !currentChannel || !currentUser) return;

    // Example: Create a message with attachment
    // In a real app, you'd upload the file to a server first
    Array.from(files).forEach((file) => {
      const newMessage = {
        id: uuidv4(),
        content: '',
        userId: currentUser.id,
        channelId: currentChannel,
        timestamp: new Date().toISOString(),
        reactions: [],
        attachments: [
          {
            id: uuidv4(),
            type: file.type.startsWith('image/') ? 'image' : 'file',
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
          },
        ],
      };

      addMessage(newMessage);
    });

    // Clear the input
    e.target.value = '';
  };

  if (!currentUser) {
    return (
      <div className={`p-4 border-t border-slate-700 ${className}`}>
        <div className="text-slate-400 text-center">
          You need to be logged in to send messages
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border-t border-slate-700 ${className}`}>
      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleFileClick}
          className="p-2 hover:bg-slate-700 rounded-lg"
        >
          <Paperclip className="h-5 w-5 text-slate-400" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${currentChannel ? `#${currentChannel}` : ''}`}
            className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            rows={1}
            style={{
              minHeight: '44px',
              maxHeight: '120px',
            }}
          />
        </div>
        <button
          type="button"
          className="p-2 hover:bg-slate-700 rounded-lg"
          onClick={() => setIsRecording(!isRecording)}
        >
          <Mic
            className={`h-5 w-5 ${
              isRecording ? 'text-red-500' : 'text-slate-400'
            }`}
          />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-slate-700 rounded-lg"
        >
          <Smile className="h-5 w-5 text-slate-400" />
        </button>
      </form>
    </div>
  );
}
