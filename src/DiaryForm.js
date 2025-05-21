import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiaryForm = ({ onAdd, editingDiary }) => {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('😊');
  const [loading, setLoading] = useState(false);

  const emotionMap = {
    "기쁨": "😊", "슬픔": "😢", "화남": "😠", "불안": "😨",
    "사랑": "❤️", "자신감": "😎", "눈물": "😭", "피곤함": "😴",
    "당황": "😳", "혐오": "🤢", "설렘": "😍", "불편함": "😬",
    "혼란": "🤯", "평온함": "😇", "고민중": "🤔", "위로": "🤗",
    "무감정": "😶", "격노": "🤬"
  };

  useEffect(() => {
    if (editingDiary) {
      setText(editingDiary.text || '');
      setEmotion(editingDiary.emotion || '😊');
    } else {
      setText('');
      setEmotion('😊');
    }
  }, [editingDiary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      text,
      emotion,
      date: editingDiary?.date || new Date().toISOString()
    };
    if (editingDiary?.id !== undefined) entry.id = editingDiary.id;
    onAdd(entry);
    setText('');
    setEmotion('😊');
  };

  const handleRecommend = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/emotion", { text });
      const label = response.data.emotion?.trim();
      const mapped = emotionMap[label];
      setEmotion(mapped || "😶");
    } catch (err) {
      if (err.response?.status === 429) {
        alert("요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        console.error("감정 분석 오류:", err);
        alert("감정 추천에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#fff8dc',
      padding: '1rem',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '1rem'
    }}>
      <h3>📝 오늘의 마음을 적어보세요</h3>
      <textarea
        rows="4"
        cols="50"
        placeholder="내용 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{ width: '100%', fontSize: '16px', marginBottom: '0.5rem' }}
      />
      <div>
        <label>감정 선택: </label>
        <select value={emotion} onChange={(e) => setEmotion(e.target.value)} style={{ fontSize: '18px' }}>
          {Object.entries(emotionMap).map(([label, emoji]) => (
            <option key={label} value={emoji}>{emoji} {label}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <button type="button" onClick={handleRecommend} disabled={loading} style={{
          backgroundColor: '#ffa726',
          color: 'white',
          marginRight: '0.5rem',
          padding: '0.4rem 1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          {loading ? "분석 중..." : "🤖 감정 추천"}
        </button>
        <button type="submit" style={{
          backgroundColor: editingDiary ? '#4caf50' : '#2196f3',
          color: 'white',
          padding: '0.5rem 1rem',
          fontSize: '16px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}>{editingDiary ? "✏️ 수정" : "💾 저장"}</button>
      </div>
    </form>
  );
};

export default DiaryForm;
