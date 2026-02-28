'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FiHelpCircle, FiSend, FiX, FiAlertTriangle } from 'react-icons/fi'
import { callAIAgent } from '@/lib/aiAgent'
/* plain HTML/Tailwind used instead of shadcn/ui */

interface ChatMessage {
  role: 'user' | 'agent'
  text: string
  actionTaken?: string
  requiresEscalation?: boolean
  suggestedActions?: string[]
}

const ORDER_SUPPORT_AGENT_ID = '69a2cb5b978d93f884782db2'
const QUICK_ACTIONS = ['Track Order', 'Request Refund', 'Cancel Order', 'Payment Issue', 'Other']

export default function OrderSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMessage = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setLoading(true)

    try {
      const result = await callAIAgent(text, ORDER_SUPPORT_AGENT_ID)
      if (result.success) {
        const data = result?.response?.result
        const agentMsg: ChatMessage = {
          role: 'agent',
          text: data?.message ?? 'I received your request. Let me help you with that.',
          actionTaken: data?.action_taken ?? '',
          requiresEscalation: data?.requires_escalation ?? false,
          suggestedActions: Array.isArray(data?.suggested_actions) ? data.suggested_actions : [],
        }
        setMessages(prev => [...prev, agentMsg])
      } else {
        setMessages(prev => [...prev, { role: 'agent', text: 'Sorry, I encountered an issue. Please try again.' }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'agent', text: 'Network error. Please try again.' }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  return (
    <>
      {/* Floating Help Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #FF6B35, #E55A2B)' }}>
          <FiHelpCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[400px] h-[85vh] md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ border: '1px solid #F0DED0' }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #E55A2B)' }}>
            <div className="flex items-center gap-2">
              <FiHelpCircle className="w-5 h-5 text-white" />
              <div>
                <h3 className="text-white font-bold text-sm">Order Support</h3>
                <p className="text-white/70 text-xs">We are here to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <FiX className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="px-4 py-3 border-b flex-shrink-0" style={{ borderColor: '#F0DED0' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#9C7A5A' }}>Quick Actions</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map(action => (
                  <button key={action} onClick={() => sendMessage(action)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:shadow-sm" style={{ backgroundColor: '#FFF8F0', color: '#FF6B35', border: '1px solid #FFB347' }}>
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ backgroundColor: '#FFF8F0' }}>
            {messages.length === 0 && (
              <div className="text-center py-8">
                <FiHelpCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#F0DED0' }} />
                <p className="text-sm font-medium" style={{ color: '#6B4423' }}>How can we help you?</p>
                <p className="text-xs" style={{ color: '#9C7A5A' }}>Select a quick action or type your question</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%] space-y-1">
                  <div className="px-3 py-2.5 rounded-2xl text-sm" style={{
                    backgroundColor: msg.role === 'user' ? '#FF6B35' : '#FFFFFF',
                    color: msg.role === 'user' ? '#FFFFFF' : '#2D1810',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.role === 'agent' ? '4px' : '16px',
                    border: msg.role === 'agent' ? '1px solid #F0DED0' : 'none',
                  }}>
                    {msg.text}
                  </div>
                  {msg.role === 'agent' && msg.actionTaken && (
                    <div className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}>
                      Action: {msg.actionTaken}
                    </div>
                  )}
                  {msg.role === 'agent' && msg.requiresEscalation && (
                    <div className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1" style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
                      <FiAlertTriangle className="w-3 h-3" />
                      Connecting to human support...
                    </div>
                  )}
                  {msg.role === 'agent' && Array.isArray(msg.suggestedActions) && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.suggestedActions.map((action, ai) => (
                        <button key={ai} onClick={() => sendMessage(action)} className="px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:shadow-sm" style={{ backgroundColor: '#FFF8F0', color: '#FF6B35', border: '1px solid #FFB347' }}>
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white border" style={{ borderColor: '#F0DED0' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#FFB347', animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#FF6B35', animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#D4351C', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t bg-white flex-shrink-0" style={{ borderColor: '#F0DED0' }}>
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {QUICK_ACTIONS.slice(0, 3).map(action => (
                  <button key={action} onClick={() => sendMessage(action)} className="px-2 py-1 rounded-full text-xs transition-all" style={{ backgroundColor: '#FFF8F0', color: '#9C7A5A', border: '1px solid #F0DED0' }}>
                    {action}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 h-10 text-sm rounded-xl px-3 border outline-none" style={{ borderColor: '#F0DED0', backgroundColor: '#FFF8F0' }} disabled={loading} />
              <button onClick={() => sendMessage(inputValue)} disabled={loading || !inputValue.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40" style={{ backgroundColor: '#FF6B35' }}>
                <FiSend className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
