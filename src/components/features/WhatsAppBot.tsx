import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Download, 
  Coins, 
  TrendingUp,
  MapPin,
  Briefcase,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { whatsappIntegration } from '../../lib/whatsappIntegration';

interface WhatsAppBotProps {
  isOpen: boolean;
  onClose: () => void;
  userPhone?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    location?: string;
    skill?: string;
    action?: string;
  };
}

const WhatsAppBot: React.FC<WhatsAppBotProps> = ({ isOpen, onClose, userPhone }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! Welcome to Spot Hire! 🎉\n\nI can help you:\n\n🔍 Find jobs in your area\n👥 Hire workers for your business\n💰 Earn coins by referring friends\n\nWhat would you like to do?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userIntent, setUserIntent] = useState<'job_seeker' | 'employer' | 'general'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get bot response
      const botResponse = await whatsappIntegration.handleBotMessage(inputMessage, userPhone || '');
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again or contact support.',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getQuickReplies = () => {
    if (userIntent === 'general') {
      return [
        { text: '🔍 I\'m looking for a job', action: 'job_seeker' },
        { text: '👥 I want to hire workers', action: 'employer' },
        { text: '💰 How do I earn coins?', action: 'coins_info' },
        { text: '📱 Download the app', action: 'download_app' }
      ];
    } else if (userIntent === 'job_seeker') {
      return [
        { text: '🏢 Driver jobs in Mumbai', action: 'driver_mumbai' },
        { text: '🛠️ Electrician jobs near me', action: 'electrician_nearby' },
        { text: '📋 Housekeeping jobs', action: 'housekeeping' },
        { text: '📱 Download app for more', action: 'download_app' }
      ];
    } else if (userIntent === 'employer') {
      return [
        { text: '👨‍🍳 Hire cooks in Delhi', action: 'hire_cooks_delhi' },
        { text: '🚚 Need delivery partners', action: 'delivery_partners' },
        { text: '🏠 Domestic help needed', action: 'domestic_help' },
        { text: '📱 Post job in app', action: 'post_job_app' }
      ];
    }
    return [];
  };

  const handleQuickReply = (action: string) => {
    let message = '';
    
    switch (action) {
      case 'job_seeker':
        message = 'I\'m looking for a job';
        setUserIntent('job_seeker');
        break;
      case 'employer':
        message = 'I want to hire workers';
        setUserIntent('employer');
        break;
      case 'coins_info':
        message = 'How do I earn coins?';
        break;
      case 'download_app':
        message = 'Tell me about the app';
        break;
      case 'driver_mumbai':
        message = 'I\'m looking for driver jobs in Mumbai';
        break;
      case 'electrician_nearby':
        message = 'I need electrician jobs near me';
        break;
      case 'housekeeping':
        message = 'Looking for housekeeping jobs';
        break;
      case 'hire_cooks_delhi':
        message = 'I want to hire 2 cooks in Delhi';
        break;
      case 'delivery_partners':
        message = 'Need delivery partners for my business';
        break;
      case 'domestic_help':
        message = 'Looking for domestic help';
        break;
      case 'post_job_app':
        message = 'How do I post a job in the app?';
        break;
      default:
        message = action;
    }

    setInputMessage(message);
    handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <Bot className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Spot Hire Assistant</h3>
              <p className="text-green-100 text-sm">Ask me anything about jobs!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-green-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-line text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {!isTyping && getQuickReplies().length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            {getQuickReplies().map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply.action)}
                className="text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded border text-gray-700 transition-colors"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBot; 