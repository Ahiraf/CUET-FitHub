import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';

const suggestions = [
  'Build me a 30-minute workout',
  'What should I eat before training?',
  'Help me improve my consistency',
];

const starterMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi! I’m FitBuddy, your CUET FitHub AI coach. I can help you plan workouts, understand exercises, and build healthier habits around your campus schedule.',
};

function getLocalReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('workout') || lower.includes('routine')) {
    return 'Here’s a simple 30-minute full-body session: 5 minutes of warm-up, then 3 rounds of 10 squats, 8 push-ups, 12 alternating lunges, and a 30-second plank. Rest for 60–90 seconds between rounds. Start easy and focus on good form.';
  }
  if (lower.includes('eat') || lower.includes('food') || lower.includes('protein')) {
    return 'For a pre-workout meal, keep it light: a banana with yoghurt, oats with milk, or rice with dal 60–90 minutes before training. Drink water and add a protein source after your session to support recovery.';
  }
  if (lower.includes('consisten') || lower.includes('habit') || lower.includes('motivat')) {
    return 'Make the goal smaller: pick three fixed training windows this week and show up for just 20 minutes. Log each session in My workout, prepare your clothes beforehand, and celebrate consistency before intensity.';
  }
  return 'That’s a great goal. Tell me a little more about your current fitness level, available equipment, and how much time you have. I’ll shape the advice around your CUET FitHub routine.';
}

function ChatPanel({ onClose, fullPage = false }) {
  const [messages, setMessages] = useState([starterMessage]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const submit = async (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || loading) return;
    setMessages((current) => [...current, { id: Date.now(), role: 'user', content: text }]);
    setValue('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }].map(({ role, content }) => ({ role, content })) }),
      });
      if (!response.ok) throw new Error('AI endpoint unavailable');
      const data = await response.json();
      if (!data.content) throw new Error('AI endpoint returned no content');
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: data.content }]);
    } catch {
      // Keep local demo behavior available during Vite development or if the
      // serverless endpoint has not been configured yet.
      window.setTimeout(() => setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: getLocalReply(text) }]), 350);
    } finally {
      setLoading(false);
    }
  };

  const chooseSuggestion = (prompt) => {
    setValue(prompt);
    inputRef.current?.focus();
  };

  return (
    <section className={`ai-chat-panel ${fullPage ? 'ai-chat-panel--page' : ''}`}>
      <header className="ai-chat-header">
        <div className="ai-chat-brand">
          <div className="ai-chat-avatar"><Icon name="sparkles" size={22} /></div>
          <div><strong>FitBuddy AI</strong><span>Your personal wellness coach</span></div>
        </div>
        <div className="ai-chat-header-actions">
          <span className="ai-chat-status"><i /> Online</span>
          {onClose && <button className="ai-chat-close" onClick={onClose} type="button" aria-label="Close AI chat">×</button>}
        </div>
      </header>

      <div className="ai-chat-body">
        <div className="ai-chat-messages" ref={listRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <div className={`ai-chat-message ${message.role === 'user' ? 'is-user' : ''}`} key={message.id}>
              {message.role === 'assistant' && <div className="ai-message-avatar"><Icon name="sparkles" size={14} /></div>}
              <div className="ai-message-content">
                <span>{message.role === 'user' ? 'You' : 'FitBuddy'}</span>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {loading && <div className="ai-chat-message"><div className="ai-message-avatar"><Icon name="sparkles" size={14} /></div><div className="ai-message-content"><span>FitBuddy</span><div className="ai-typing"><i /><i /><i /></div></div></div>}
        </div>

        <div className="ai-chat-suggestions">
          <span>Try asking</span>
          <div>{suggestions.map((item) => <button key={item} type="button" onClick={() => chooseSuggestion(item)} disabled={loading}>{item}</button>)}</div>
        </div>

        <form className="ai-chat-composer" onSubmit={submit}>
          <textarea ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask FitBuddy anything..." rows={1} aria-label="Message FitBuddy" />
          <button type="submit" disabled={!value.trim() || loading} aria-label="Send message"><Icon name="send" size={17} /></button>
        </form>
        <p className="ai-chat-disclaimer">FitBuddy provides general wellness guidance, not medical advice.</p>
      </div>
    </section>
  );
}

export default function AIChat({ fullPage = false }) {
  const [open, setOpen] = useState(fullPage);
  if (fullPage) return <ChatPanel fullPage />;
  return <>
    {!open && <div className="ai-chat-launcher-wrap"><div className="ai-chat-callout">Need a little help? <span>↓</span></div><button className="ai-chat-launcher" onClick={() => setOpen(true)} type="button" aria-label="Open FitBuddy AI"><Icon name="sparkles" size={26} /></button></div>}
    {open && <div className="ai-chat-window"><ChatPanel onClose={() => setOpen(false)} /></div>}
  </>;
}

