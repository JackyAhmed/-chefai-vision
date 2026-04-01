import React from 'react';
import { shellStyles } from './shared';

const highlights = [
  { title: 'Live recipe coach', text: 'Hands-free step guidance with timer and voice prompts.' },
  { title: 'Camera support', text: 'Phone, laptop, and Wi‑Fi camera flows are already wired into the core app.' },
  { title: 'Regional recipe library', text: 'The main cooking screen includes a large curated recipe collection.' },
];

export default function RecipesPage({ user, onLogout, onGoProfile, onGoGenerate, onStartRecipe }) {
  return (
    <div style={shellStyles.page}>
      <div style={{ ...shellStyles.card, padding: 24, marginBottom: 20, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 13 }}>Dashboard</div>
          <h1 style={{ margin: '8px 0 6px', fontSize: 34 }}>Welcome back, {user?.name || 'Cook'}</h1>
          <p style={{ margin: 0, color: '#94a3b8' }}>Your app shell is fixed and now routes cleanly into the cooking assistant.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button onClick={onGoProfile} style={shellStyles.navButton}>Profile</button>
          <button onClick={onGoGenerate} style={shellStyles.navButton}>Recipe Planner</button>
          <button onClick={onLogout} style={shellStyles.secondaryButton}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
        {highlights.map((item) => (
          <div key={item.title} style={{ ...shellStyles.card, padding: 20 }}>
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <p style={{ marginBottom: 0, color: '#94a3b8', lineHeight: 1.6 }}>{item.text}</p>
          </div>
        ))}
      </div>

      <div style={{ ...shellStyles.card, padding: 24 }}>
        <h2 style={{ marginTop: 0, fontSize: 26 }}>Start cooking</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>The heavy lifting is inside the original CookingAssistant component. Use the button below to open it. From there you can browse regions, choose recipes, use timers, voice controls, and optional vision support.</p>
        <button onClick={onStartRecipe} style={{ ...shellStyles.button, marginTop: 8 }}>Open cooking assistant</button>
      </div>
    </div>
  );
}
