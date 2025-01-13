import React, { useRef, useEffect } from 'react';
import { User } from '@/types/chat';
import { Github, Linkedin, MapPin, Calendar, X } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

export function UserProfile({ user, onClose }: UserProfileProps) {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={profileRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                  user.status === 'online'
                    ? 'bg-green-500'
                    : user.status === 'away'
                    ? 'bg-yellow-500'
                    : user.status === 'in-meeting'
                    ? 'bg-purple-500'
                    : 'bg-slate-500'
                }`}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              <p className="text-slate-400">{user.title}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-300 mb-6">{user.bio}</p>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {user.githubUsername && (
              <a
                href={`https://github.com/${user.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {user.linkedinUrl && (
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
