import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

interface Chat {
  id: string;
  athleteName: string;
  athleteAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

interface ChatContextType {
  chats: Chat[];
  addMessage: (chatId: string, text: string, isMe: boolean) => void;
  markAsRead: (chatId: string) => void;
  getChatById: (chatId: string) => Chat | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      athleteName: 'Sarah Johnson',
      lastMessage: 'Thanks for the workout plan!',
      timestamp: '2m ago',
      unread: true,
      messages: [
        { id: '1', text: 'Hi! I just finished today\'s workout', timestamp: '10:23 AM', isMe: false },
        { id: '2', text: 'That\'s awesome! How did it feel?', timestamp: '10:24 AM', isMe: true },
        { id: '3', text: 'Really good! The squats were challenging but manageable', timestamp: '10:25 AM', isMe: false },
        { id: '4', text: 'Perfect! That\'s exactly where we want to be. Keep it up! 💪', timestamp: '10:26 AM', isMe: true },
        { id: '5', text: 'Thanks for the workout plan!', timestamp: '10:28 AM', isMe: false },
      ],
    },
    {
      id: '2',
      athleteName: 'Mike Chen',
      lastMessage: 'Can we adjust the squat weight?',
      timestamp: '1h ago',
      unread: true,
      messages: [
        { id: '1', text: 'Hey coach, quick question', timestamp: '9:15 AM', isMe: false },
        { id: '2', text: 'Sure, what\'s up?', timestamp: '9:16 AM', isMe: true },
        { id: '3', text: 'Can we adjust the squat weight? I feel like I could go heavier', timestamp: '9:17 AM', isMe: false },
      ],
    },
    {
      id: '3',
      athleteName: 'Emma Davis',
      lastMessage: 'Completed today\'s session 💪',
      timestamp: '3h ago',
      unread: false,
      messages: [
        { id: '1', text: 'Morning coach! Ready for today\'s workout', timestamp: '7:30 AM', isMe: false },
        { id: '2', text: 'Great! Remember to focus on form today', timestamp: '7:32 AM', isMe: true },
        { id: '3', text: 'Completed today\'s session 💪', timestamp: '8:45 AM', isMe: false },
        { id: '4', text: 'Great work! How are you feeling?', timestamp: '8:46 AM', isMe: true },
        { id: '5', text: 'Feeling strong! Those deadlifts felt great', timestamp: '8:47 AM', isMe: false },
      ],
    },
    {
      id: '4',
      athleteName: 'John Smith',
      lastMessage: 'Question about rest days',
      timestamp: 'Yesterday',
      unread: false,
      messages: [
        { id: '1', text: 'Hey, I have a question about rest days', timestamp: 'Yesterday 3:20 PM', isMe: false },
        { id: '2', text: 'Sure, what would you like to know?', timestamp: 'Yesterday 3:25 PM', isMe: true },
        { id: '3', text: 'Should I be doing any active recovery or just full rest?', timestamp: 'Yesterday 3:26 PM', isMe: false },
        { id: '4', text: 'Light active recovery is great - maybe a 20min walk or easy bike ride', timestamp: 'Yesterday 3:30 PM', isMe: true },
      ],
    },
  ]);

  const simulateAthleteResponse = useCallback((chatId: string, text: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: Date.now().toString(),
            text,
            timestamp: timeString,
            isMe: false,
          };
          
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: text,
            timestamp: 'Just now',
            unread: true,
          };
        }
        return chat;
      })
    );
  }, []);

  const addMessage = useCallback((chatId: string, text: string, isMe: boolean) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: Date.now().toString(),
            text,
            timestamp: timeString,
            isMe,
          };
          
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: text,
            timestamp: 'Just now',
            unread: !isMe,
          };
        }
        return chat;
      })
    );

    // Simulate athlete response after coach sends message
    if (isMe) {
      const responses = [
        'Thanks coach! 💪',
        'Got it, I\'ll keep that in mind',
        'Sounds good!',
        'Perfect, thanks for the advice',
        'Will do!',
        'Appreciate the help!',
        'That makes sense',
        'Looking forward to it!',
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setTimeout(() => {
        simulateAthleteResponse(chatId, randomResponse);
      }, 2000 + Math.random() * 3000);
    }
  }, [simulateAthleteResponse]);

  const markAsRead = useCallback((chatId: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, unread: false } : chat
      )
    );
  }, []);

  const getChatById = useCallback((chatId: string) => {
    return chats.find(chat => chat.id === chatId);
  }, [chats]);

  return (
    <ChatContext.Provider value={{ chats, addMessage, markAsRead, getChatById }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}