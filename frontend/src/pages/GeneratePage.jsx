import React, { useMemo, useState } from 'react';
import { shellStyles } from './shared';

const pantryIdeas = {
  chicken: ['Yakitori-style skewers', 'Quick stir-fried chicken bowl'],
  rice: ['Vegetable fried rice', 'Simple rice bowl with sauce and egg'],
  egg: ['Egg fried rice', 'Soft omelette with herbs'],
  potato: ['Crispy skillet potatoes', 'Hearty potato soup'],
  tomato: ['Tomato braise', 'Simple pasta sauce'],
  onion: ['Caramelized onion base', 'Savory stir-fry starter'],
};

export default function GeneratePage({ user, onLogout, onGoRecipes, onGoProfile }) {
  const [ingredients, setIngredients] = useState('chicken, rice, onion');
  const [goal, setGoal] = useState('Quick dinner');

  const suggestions = useMemo(() => {
    const tokens = ingredients
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    const matches = tokens.flatMap((token) => pantryIdeas[token] || []);
    const unique = [...new Set(matches)];

    if (unique.length) {
      return unique.map((title, index) => ({
        title,
        summary: `Built from your pantry list for ${goal.toLowerCase()}. Keep it simple and cook what you actually have.`,
        time: `${20 + index * 10} min`,
      }));
    }

    return [
      {
        title: 'Flexible pantry skillet',
        summary: 'Start with onion or garlic, cook protein first, add vegetables, then starch and sauce.',
        time: '25 min',
      },
    ];
  }, [goal, ingredients]);

  return (
    <div style={shellStyles.page}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
        <button onClick={onGoRecipes} style={shellStyles.navButton}>Dashboard</button>
        <button onClick={onGoProfile} style={shellStyles.navButton}>Profile</button>
        <button onClick={onLogout} style={shellStyles.secondaryButton}>Logout</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr', gap: 18 }}>
        <div style={{ ...shellStyles.card, padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Recipe Planner</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>This is a practical local planner, not fake AI magic. It gives you usable ideas from the ingredients you type.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            <textarea style={{ ...shellStyles.input, minHeight: 140, resize: 'vertical' }} value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            <input style={shellStyles.input} value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal" />
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Signed in as {user?.name}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          {suggestions.map((idea) => (
            <div key={idea.title} style={{ ...shellStyles.card, padding: 20 }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 13, textTransform: 'uppercase' }}>{idea.time}</div>
              <h3 style={{ margin: '8px 0' }}>{idea.title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.6 }}>{idea.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
