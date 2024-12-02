import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, Mail, Trash2, MessageCircle, Send, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { SearchFilter } from './SearchFilter';
import { useMessages } from '../../contexts/MessageContext';
import { sendReplyEmail, getRepliesForMessage } from '../../services/emailService';

export function MessageManagement() {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<{ id: string; email: string } | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [sending, setSending] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [messageReplies, setMessageReplies] = useState<Record<string, any[]>>({});

  useEffect(() => {
    setLoading(false);
  }, [messages]);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsRead(messageId);
      // Play a subtle sound when marking as read
      const audio = new Audio('/message-read.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'read' && message.read) || 
      (filterStatus === 'unread' && !message.read);

    return matchesSearch && matchesStatus;
  });

  const handleReply = async () => {
    if (!replyTo || !replyContent.trim()) return;

    try {
      setSending(true);
      await sendReplyEmail(replyTo.email, replyContent, replyTo.id);
      await handleMarkAsRead(replyTo.id);
      setReplyTo(null);
      setReplyContent('');
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            messages.filter(m => !m.read).length > 0 
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {messages.filter(m => !m.read).length} Unread
          </span>
        </div>
      </div>

      <SearchFilter
        searchPlaceholder="Search messages..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setFilterStatus(current => {
          if (current === 'all') return 'unread';
          if (current === 'unread') return 'read';
          return 'all';
        })}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div 
                key={message.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !message.read ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${!message.read ? 'text-orange-500' : 'text-gray-400'}`}>
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg ${!message.read ? 'font-bold' : 'font-medium'} text-gray-900`}>
                        {message.user}
                      </h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      {!message.read && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
                          title="Mark as read"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => setReplyTo({ id: message.id, email: message.email })}
                        className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        title="Reply"
                      >
                        <Reply className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="p-1 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pl-8 mt-2">
                  <p className={`text-gray-700 whitespace-pre-wrap ${!message.read ? 'font-medium' : ''}`}>
                    {message.content}
                  </p>
                </div>

                {replyTo?.id === message.id && (
                  <div className="mt-4 pl-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                        placeholder="Type your reply..."
                      />
                      <div className="flex justify-end space-x-3 mt-3">
                        <button
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent('');
                          }}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReply}
                          disabled={sending || !replyContent.trim()}
                          className="flex items-center px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {sending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}