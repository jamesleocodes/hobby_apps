import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';

interface MoodEntry {
  id: number;
  date: string;
  mood: string;
  note: string;
  user: string;
}

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thoughtful' },
];

const users = ['Shin', 'Zaw', 'Cho'];

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
  background: #e3e3e3;
  min-height: 100vh;
  border: 8px solid #5d4037; /* Minecraft dirt brown */
  box-shadow: 0 0 0 8px #bca16b, 0 0 32px #222;
`;

const Title = styled.h1`
  text-align: center;
  color: #388e3c; /* Minecraft green */
  margin-bottom: 2rem;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #5d4037;
  font-size: 2rem;
`;

const MoodSelector = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MoodButton = styled.button<{ selected?: boolean }>`
  font-size: 2rem;
  padding: 1.2rem 1.2rem 0.8rem 1.2rem;
  border: 4px solid #222;
  border-radius: 0;
  background: ${props => props.selected ? '#bca16b' : '#fff'};
  color: #222;
  cursor: pointer;
  box-shadow: 2px 2px 0 #bca16b, 4px 4px 0 #5d4037;
  font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
  transition: background 0.2s, border 0.2s;

  &:hover {
    background: #b6e3a6;
    border-color: #388e3c;
  }
`;

const NoteInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 4px solid #222;
  border-radius: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
  background: #fffbe6;
  color: #222;
  box-shadow: 2px 2px 0 #bca16b;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background: #388e3c;
  color: #fff;
  border: 4px solid #222;
  border-radius: 0;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
  cursor: pointer;
  width: 100%;
  box-shadow: 2px 2px 0 #bca16b, 4px 4px 0 #5d4037;
  transition: background 0.2s;

  &:hover {
    background: #5d4037;
    color: #fffbe6;
  }
`;

const HistorySection = styled.div`
  margin-top: 3rem;
`;

const HistoryTitle = styled.h2`
  color: #388e3c;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-shadow: 1px 1px 0 #fff, 2px 2px 0 #5d4037;
`;

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Entry = styled.div`
  padding: 1rem;
  border: 4px solid #222;
  border-radius: 0;
  background: #fffbe6;
  box-shadow: 2px 2px 0 #bca16b;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
`;

const EntryMood = styled.span`
  font-size: 1.5rem;
`;

function App() {
  const [selectedUser, setSelectedUser] = useState<string>(users[0]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('daily-vibes-entries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        } else {
          console.warn('Saved mood history is not an array:', parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load mood history from localStorage:', e);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('daily-vibes-entries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = () => {
    if (!selectedMood || !selectedUser) return;

    const newEntry: MoodEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim(),
      user: selectedUser,
    };

    setEntries([newEntry, ...entries]);
    setSelectedMood('');
    setNote('');
  };

  return (
    <AppContainer>
      <Title>Daily Vibes</Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <label htmlFor="user-select" style={{ marginRight: 8, fontWeight: 500 }}>User:</label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
          style={{ fontSize: '1rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #e0e0e0' }}
        >
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
      
      <MoodSelector>
        {moods.map(({ emoji, label }) => (
          <MoodButton
            key={label}
            selected={selectedMood === emoji}
            onClick={() => setSelectedMood(emoji)}
            title={label}
          >
            {emoji}
          </MoodButton>
        ))}
      </MoodSelector>

      <NoteInput
        placeholder="How are you feeling today? (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <SubmitButton onClick={handleSubmit} disabled={!selectedMood}>
        Save Mood
      </SubmitButton>

      <HistorySection>
        <HistoryTitle>Mood History</HistoryTitle>
        <EntryList>
          {entries.map((entry) => (
            <Entry key={entry.id}>
              <EntryHeader>
                <span>{format(new Date(entry.date), 'MMM d, yyyy h:mm a')}</span>
                <EntryMood>{entry.mood}</EntryMood>
              </EntryHeader>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>User: {entry.user}</div>
              {entry.note && <p>{entry.note}</p>}
            </Entry>
          ))}
        </EntryList>
      </HistorySection>
    </AppContainer>
  );
}

export default App; 