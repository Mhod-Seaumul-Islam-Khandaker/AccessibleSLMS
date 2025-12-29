// app/components/VoiceNavigation.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff } from 'lucide-react';

interface VoiceNavigationProps {
  role: 'student' | 'admin' | 'teacher';
}

const VoiceNavigation: React.FC<VoiceNavigationProps> = ({ role }) => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const rec = new (window as any).webkitSpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        handleCommand(transcript);
      };
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  const handleCommand = (command: string) => {
    const commands = getCommands(role);
    const route = commands[command];
    if (route) {
      router.push(route);
    } else {
      console.log('Command not recognized:', command);
    }
  };

  const getCommands = (role: string): Record<string, string> => {
    const commonCommands: Record<string, string> = {
      'settings': '/dashboard/settings'
    };

    if (role === 'student') {
      return {
        ...commonCommands,
        'home': '/student',
        'advising': '/student/advising',
        'class schedule': '/student/schedule',
        'faculties': '/student/faculties'
      };
    } else if (role === 'admin') {
      return {
        ...commonCommands,
        'dashboard': '/admin',
        'courses': '/admin/courses',
        'sections': '/admin/sections',
        'users': '/admin/users'
      };
    } else if (role === 'teacher') {
      return {
        ...commonCommands,
        // Add teacher commands if needed
      };
    }
    return commonCommands;
  };

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      disabled={!recognition}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isListening
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
      aria-label={isListening ? 'Stop voice command' : 'Start voice command'}
    >
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      <span>{isListening ? 'Listening...' : 'Voice'}</span>
    </button>
  );
};

export default VoiceNavigation;