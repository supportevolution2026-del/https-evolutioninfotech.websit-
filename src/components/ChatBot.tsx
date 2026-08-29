'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Laptop,
  Wrench,
  Code2,
  MapPin,
  RotateCcw
} from 'lucide-react';
import {
  WHATSAPP_PHONE_NUMBER,
  WHATSAPP_DISPLAY_PHONE,
  COMPANY_NAME,
  STORE_ADDRESS
} from '@/utils/whatsapp';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionUrl?: string;
  actionText?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! Welcome to ${COMPANY_NAME}. I am your AI Assistant. How can I help you today with hardware, laptop repair, or custom software development?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    { label: 'Best Gaming & AI Laptops', query: 'Recommend the best gaming & AI laptops available', icon: <Laptop size={14} /> },
    { label: 'Book Laptop / PC Repair', query: 'I need to repair my laptop / computer', icon: <Wrench size={14} /> },
    { label: 'Custom Software & App Quote', query: 'I want a custom billing software & mobile app', icon: <Code2 size={14} /> },
    { label: 'Store Address & Timings', query: 'Where is your store located and what are the timings?', icon: <MapPin size={14} /> },
    { label: 'Talk to Engineer on WhatsApp', query: 'Connect me directly to a WhatsApp engineer', icon: <MessageCircle size={14} /> }
  ];

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChat);

    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 2500);

    return () => {
      window.removeEventListener('open-chatbot', handleOpenChat);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const generateBotResponse = (userInput: string) => {
    const q = userInput.toLowerCase();
    let reply = '';
    let actionUrl = '';
    let actionText = '';

    if (q.includes('laptop') || q.includes('gaming') || q.includes('rog') || q.includes('macbook')) {
      reply = `We have cutting-edge high performance laptops in stock! For creators and gamers, we highly recommend the ASUS ROG Zephyrus G16 (2026 AI Edition) powered by Intel Core Ultra 9 & RTX 4080 (₹1,84,990). Would you like to check the catalog or order via WhatsApp?`;
      actionUrl = '/products?category=laptop';
      actionText = 'View Laptop Catalog →';
    } else if (q.includes('gpu') || q.includes('rtx') || q.includes('4090') || q.includes('graphics')) {
      reply = `We have genuine NVIDIA enterprise GPUs in stock, including the beast NVIDIA GeForce RTX 4090 OC 24GB GDDR6X with full manufacturer warranty and GST invoice.`;
      actionUrl = '/products/nvidia-geforce-rtx-4090-oc-24gb';
      actionText = 'View RTX 4090 Details →';
    } else if (q.includes('repair') || q.includes('service') || q.includes('screen') || q.includes('broken') || q.includes('amc') || q.includes('windows')) {
      reply = `We provide certified on-site and walk-in laptop repair, motherboard chip-level repair, SSD/RAM upgrades, printer repair, and corporate IT AMC maintenance across Gujarat.`;
      actionUrl = '/services';
      actionText = 'Explore IT & AMC Services →';
    } else if (q.includes('software') || q.includes('app') || q.includes('website') || q.includes('erp') || q.includes('billing') || q.includes('developer')) {
      reply = `Our dedicated engineering team builds custom billing software, business ERP/CRM systems, Android & iOS mobile apps, and e-commerce websites. You can also hire full-stack developers on demand.`;
      actionUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Evolution Infotech! I want a consultation for custom software / app development.')}`;
      actionText = 'Inquire on WhatsApp →';
    } else if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('timing') || q.includes('time') || q.includes('shop') || q.includes('store')) {
      reply = `Our Store Address:\n${STORE_ADDRESS}\n\nWorking Hours:\n• Mon - Sat: 10:00 AM - 8:00 PM\n• Sunday: 10:00 AM - 2:00 PM`;
      actionUrl = 'https://maps.google.com/?q=116,+Shayona+Arcade,+Shyam+Shikhar,+Bapunagar,+Ahmedabad,+Gujarat+380024';
      actionText = 'Open in Google Maps';
    } else if (q.includes('whatsapp') || q.includes('human') || q.includes('call') || q.includes('contact') || q.includes('phone') || q.includes('engineer')) {
      reply = `You can directly chat or call our senior engineer on ${WHATSAPP_DISPLAY_PHONE}. We are online and ready to help!`;
      actionUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Evolution Infotech! I am chatting via the website and need direct assistance.')}`;
      actionText = 'Chat on WhatsApp Now';
    } else if (q.includes('price') || q.includes('cost') || q.includes('b2b') || q.includes('gst') || q.includes('discount')) {
      reply = `We offer competitive wholesale & B2B pricing with 100% GST input tax credit invoices on all hardware and services. Contact us on WhatsApp for bulk discounts.`;
      actionUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Evolution Infotech! I need a corporate quotation with GST invoice.')}`;
      actionText = 'Get Quote on WhatsApp →';
    } else {
      reply = `Thank you for reaching out! We provide genuine IT hardware (Laptops, Servers, GPUs, CCTV, Networking) and software development. Would you like to connect directly on WhatsApp with our team?`;
      actionUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(`Hello Evolution Infotech! I have an inquiry regarding: ${userInput}`)}`;
      actionText = 'Chat on WhatsApp';
    }

    return { reply, actionUrl, actionText };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, actionUrl, actionText } = generateBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: actionUrl || undefined,
        actionText: actionText || undefined
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      {/* Expanded Chatbot Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            width: '380px',
            maxWidth: 'calc(100vw - 40px)',
            height: '560px',
            maxHeight: 'calc(100vh - 130px)',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100000
          }}
        >
          {/* Chatbot Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              padding: '16px 20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff'
                  }}
                >
                  <Bot size={24} />
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '2px solid #ffffff'
                  }}
                />
              </div>

              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  EvoAI Assistant <Sparkles size={14} color="#fde047" />
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{COMPANY_NAME} Support • Online</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    {
                      id: '1',
                      sender: 'bot',
                      text: `Hello! How can I help you today with hardware or IT software?`,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Restart Chat"
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div
            style={{
              padding: '10px 14px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              overflowX: 'auto',
              display: 'flex',
              gap: '8px',
              scrollbarWidth: 'none'
            }}
          >
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.query)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#2563eb',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#eff6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
              >
                {qp.icon}
                <span>{qp.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#f8fafc'
            }}
          >
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '88%',
                    alignSelf: isBot ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      background: isBot ? '#ffffff' : 'linear-gradient(135deg, #0284c7, #2563eb)',
                      color: isBot ? '#0f172a' : '#ffffff',
                      padding: '12px 16px',
                      borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      border: isBot ? '1px solid #e2e8f0' : 'none',
                      boxShadow: 'var(--shadow-sm)',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {msg.text}

                    {/* Action Button inside message */}
                    {msg.actionUrl && (
                      <div style={{ marginTop: '10px' }}>
                        {msg.actionUrl.startsWith('http') ? (
                          <a
                            href={msg.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: msg.actionUrl.includes('wa.me')
                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                : 'linear-gradient(135deg, #0284c7, #2563eb)',
                              color: '#ffffff',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            {msg.actionUrl.includes('wa.me') && <MessageCircle size={14} />}
                            {msg.actionText || 'Open Link →'}
                          </a>
                        ) : (
                          <a
                            href={msg.actionUrl}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                              color: '#ffffff',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            {msg.actionText || 'View Details →'}
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  padding: '10px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  width: 'fit-content',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7', animation: 'pulseGlow 1s infinite' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', animation: 'pulseGlow 1s infinite 0.2s' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed', animation: 'pulseGlow 1s infinite 0.4s' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '4px' }}>EvoAI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div
            style={{
              padding: '12px 16px',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <input
              type="text"
              placeholder="Ask about laptops, repairs, software..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                color: '#0f172a',
                outline: 'none'
              }}
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: inputText.trim() ? 'linear-gradient(135deg, #0284c7, #2563eb)' : '#e2e8f0',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputText.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bot Launcher Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Tooltip prompt when closed */}
        {!isOpen && hasPrompted && (
          <div
            className="desktop-only"
            onClick={() => setIsOpen(true)}
            style={{
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              borderRadius: '14px',
              padding: '8px 14px',
              boxShadow: '0 8px 24px -4px rgba(37, 99, 235, 0.15)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} color="#2563eb" /> Ask EvoAI Assistant
            </span>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>
              Instant Hardware & Repair Help
            </span>
          </div>
        )}

        {/* Big Clickable Launcher Circle */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen((prev) => !prev);
            }
          }}
          aria-label="Open AI Chatbot"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isOpen
              ? '#334155'
              : 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)',
            color: '#ffffff',
            border: '2px solid #ffffff',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            userSelect: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }}
        >
          {isOpen ? <X size={26} /> : <Bot size={28} />}

          {/* Active Status Beacon */}
          {!isOpen && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2px solid #ffffff'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
