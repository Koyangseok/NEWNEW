
import React, { useEffect, useState } from 'react';
import { getDiaries, addDiary, deleteDiary, updateDiary } from './idb';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import EmotionStats from './EmotionStats';

const App = () => {
  const [diaries, setDiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [editingDiary, setEditingDiary] = useState(null);
  const [tab, setTab] = useState('diary');

  const loadDiaries = async () => {
    const all = await getDiaries();
    setDiaries(all);
  };

  useEffect(() => {
    loadDiaries();
  }, []);

  const handleAdd = async (entry) => {
    if (entry.id) {
      await updateDiary(entry);
    } else {
      await addDiary(entry);
    }
    setEditingDiary(null);
    loadDiaries();
  };

  const handleDelete = async (id) => {
    await deleteDiary(id);
    loadDiaries();
  };

  const handleEdit = (diary) => {
    setEditingDiary(diary);
  };

  const filteredDiaries = diaries.filter(diary =>
    diary.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterDate || diary.date.startsWith(filterDate))
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fef8f3'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>🏫 신항초 3학년 마음일기</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setTab('diary')} style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: tab === 'diary' ? '#ffd54f' : '#e0e0e0', border: 'none', borderRadius: '10px' }}>✍️ 일기</button>
        <button onClick={() => setTab('stats')} style={{ padding: '0.5rem 1rem', backgroundColor: tab === 'stats' ? '#ffd54f' : '#e0e0e0', border: 'none', borderRadius: '10px' }}>📊 통계</button>
      </div>

      {tab === 'diary' && (
        <>
          <DiaryForm onAdd={handleAdd} editingDiary={editingDiary} />
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <DiaryList diaries={filteredDiaries} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </>
      )}

      {tab === 'stats' && <EmotionStats diaries={diaries} />}
    </div>
  );
};

export default App;
