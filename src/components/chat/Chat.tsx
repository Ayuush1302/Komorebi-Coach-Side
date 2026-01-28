
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl mb-8">Chat</h1>

      <div className="bg-white rounded-lg border border-gray-200 h-[600px] flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center text-gray-500 mt-32">
            <p className="mb-2">No messages yet</p>
            <p className="text-sm">Start a conversation with your athletes</p>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
