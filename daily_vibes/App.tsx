import { useState } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';

interface MoodEntry {
  id: number;
  date: string;
  mood: string;
  note: string;
}

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thoughtful' },
];

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
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
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#646cff' : '#ddd'};
  border-radius: 8px;
  background: ${props => props.selected ? '#f0f0ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const NoteInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background: #646cff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background: #535bf2;
  }
`;

const HistorySection = styled.div`
  margin-top: 3rem;
`;

const HistoryTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Entry = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
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
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const handleSubmit = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim(),
    };

    setEntries([newEntry, ...entries]);
    setSelectedMood('');
    setNote('');
  };

  return (
    <AppContainer>
      <Title>Daily Vibes</Title>
      
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
              {entry.note && <p>{entry.note}</p>}
            </Entry>
          ))}
        </EntryList>
      </HistorySection>
    </AppContainer>
  );
}

export default App; 