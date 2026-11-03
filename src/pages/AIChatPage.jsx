import React from 'react';
import AIChat from '../components/AIChat';

export default function AIChatPage() {
  return <div className="dashboard-container ai-coach-page">
    <header className="page-head">
      <p className="eyebrow">Your wellness companion</p>
      <h1>AI Coach</h1>
      <p className="page-sub">Get practical fitness and wellness guidance designed around your CUET routine.</p>
    </header>
    <AIChat fullPage />
  </div>;
}
