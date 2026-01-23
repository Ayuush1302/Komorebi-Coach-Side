import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Search, MessageCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export default function Chats() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { chats } = useChat();

  const filteredChats = chats.filter(chat =>
    chat.athleteName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 pt-6 pb-4">
          <h1 className="text-3xl mb-4">Messages</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search athletes..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
              <MessageCircle className="w-16 h-16 mb-3" />
              <p className="text-sm text-center">No conversations found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => navigate(`/chats/${chat.id}`)}
                  className="w-full px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0 text-lg">
                      {getInitials(chat.athleteName)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{chat.athleteName}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          {chat.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm truncate ${
                        chat.unread ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}