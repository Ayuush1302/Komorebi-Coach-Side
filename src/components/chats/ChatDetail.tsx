import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export default function ChatDetail() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getChatById, addMessage, markAsRead } = useChat();

  const chat = getChatById(chatId || '');

  useEffect(() => {
    if (chatId) {
      markAsRead(chatId);
    }
  }, [chatId, markAsRead]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 mb-4">Chat not found</p>
          <button
            onClick={() => navigate('/chats')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Messages
          </button>
        </div>
      </AppLayout>
    );
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleSendMessage = () => {
    if (!message.trim() || !chatId) return;
    addMessage(chatId, message.trim(), true);
    setMessage('');
  };

  return (
    <AppLayout>
      <div className="fixed inset-0 flex flex-col bg-white" style={{ paddingTop: '0', paddingBottom: '72px' }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/chats')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              {getInitials(chat.athleteName)}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-medium text-gray-900">{chat.athleteName}</h2>
              <p className="text-xs text-gray-500">Active now</p>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  msg.isMe
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white text-gray-900 rounded-tl-sm border border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    msg.isMe ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3" style={{ paddingBottom: '88px' }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}