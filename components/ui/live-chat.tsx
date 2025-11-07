'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with any questions about buying or selling real estate. How can I assist you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    hasProvidedInfo: false
  })
  const [showUserForm, setShowUserForm] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  // Auto-responses based on keywords
  const getAutoResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return "Property prices vary by location and features. I'd be happy to provide you with current market data for specific areas you're interested in. What neighborhoods are you considering?"
    }
    
    if (lowerMessage.includes('sell') || lowerMessage.includes('selling')) {
      return "Great! I can help you get the best value for your home. Would you like a free market analysis? I'll need your property address to get started."
    }
    
    if (lowerMessage.includes('buy') || lowerMessage.includes('buying')) {
      return "Excellent! I'd love to help you find your perfect home. What type of property are you looking for and what's your preferred area?"
    }
    
    if (lowerMessage.includes('area') || lowerMessage.includes('neighborhood') || lowerMessage.includes('location')) {
      return "I specialize in Jupiter, Palm Beach Gardens, Delray Beach, and Boca Raton. Each area has unique characteristics. What lifestyle features are most important to you?"
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('meet') || lowerMessage.includes('appointment')) {
      return "I'd be happy to schedule a consultation! Let me get your contact information and we can set up a time that works for you."
    }
    
    return "Thanks for your message! I'll get back to you shortly with detailed information. In the meantime, feel free to browse our featured properties or ask any other questions."
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg])
    setNewMessage('')
    setIsTyping(true)

    // Simulate typing delay and auto-response
    setTimeout(() => {
      const autoResponse = getAutoResponse(newMessage)
      const agentMsg = {
        id: messages.length + 2,
        text: autoResponse,
        sender: 'agent' as const,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, agentMsg])
      setIsTyping(false)
      
      // Show user form for contact info after a few messages
      if (messages.length >= 4 && !userInfo.hasProvidedInfo) {
        setTimeout(() => setShowUserForm(true), 2000)
      }
    }, 1500)

    // Save chat to leads if user provided info
    if (userInfo.hasProvidedInfo) {
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            message: `Live Chat: ${newMessage}`,
            type: 'chat',
            source: 'live-chat'
          })
        })
      } catch (error) {
        console.error('Failed to save chat lead:', error)
      }
    }
  }

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserInfo(prev => ({ ...prev, hasProvidedInfo: true }))
    setShowUserForm(false)
    
    const welcomeMsg = {
      id: messages.length + 1,
      text: `Thanks ${userInfo.name}! I have your contact information and will follow up with you directly. Feel free to continue asking questions here.`,
      sender: 'agent' as const,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, welcomeMsg])
  }

  // Auto-open chat after 30 seconds on first visit
  useEffect(() => {
    const hasSeenChat = localStorage.getItem('kw-chat-seen')
    if (!hasSeenChat) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('kw-chat-seen', 'true')
      }, 30000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Chat bubble (closed state)
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-kwRed hover:bg-kwRed/90 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z"/>
          </svg>
        </Button>
        
        {/* Notification badge */}
        <div className="absolute -top-2 -left-2 bg-kwRed text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          1
        </div>
        
        {/* Chat preview bubble */}
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
          <p className="text-sm text-kwBlack">👋 Hi! Questions about real estate?</p>
          <div className="absolute bottom-[-8px] right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
        </div>
      </div>
    )
  }

  // Chat window (open state)
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'h-16' : 'h-96'} w-80 transition-all duration-300`}>
      <Card className="h-full shadow-2xl border-kwRed/20">
        {/* Header */}
        <div className="bg-kwRed text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">TJ</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Tracey Joiner</h3>
              <p className="text-xs text-white/80">Keller Williams Agent</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              {isMinimized ? '▲' : '▼'}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              ✕
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* User info form overlay */}
            {showUserForm && (
              <div className="absolute inset-0 bg-white/95 z-10 p-4 rounded-b-2xl">
                <h4 className="font-semibold text-kwBlack mb-3">Let's connect!</h4>
                <form onSubmit={handleUserInfoSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="bg-kwRed hover:bg-kwRed/90 text-xs">
                      Connect
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setShowUserForm(false)} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Later
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.sender === 'user'
                        ? 'bg-kwRed text-white rounded-br-sm'
                        : 'bg-gray-100 text-kwBlack rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-kwGrayMedium rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-kwGrayMedium rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-kwGrayMedium rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kwRed/20"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-kwRed hover:bg-kwRed/90 px-3"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}