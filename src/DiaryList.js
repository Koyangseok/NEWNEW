
import React from 'react';
import html2canvas from 'html2canvas';

const DiaryList = ({ diaries, onDelete, onEdit }) => {
  const handleSaveImage = (id) => {
    const card = document.getElementById(`diary-${id}`);
    if (!card) return;
    html2canvas(card, { scale: 3 }).then(canvas => {
      const link = document.createElement('a');
      link.download = '일기.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <h3>📚 내 마음 일기</h3>
      {diaries.length === 0 && <p>일기가 없습니다.</p>}
      {diaries.map(({ id, text, emotion, date }) => (
        <div key={id} id={`diary-${id}`} style={{
          backgroundColor: '#f0f8ff',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p><strong style={{ fontSize: '20px' }}>{emotion}</strong> | {new Date(date).toLocaleDateString()}</p>
          <p style={{ fontSize: '16px' }}>{text}</p>
          <button onClick={() => onEdit({ id, text, emotion, date })} style={{ marginRight: '0.5rem' }}>✏️ 수정</button>
          <button onClick={() => onDelete(id)} style={{
            color: 'white', backgroundColor: '#f44336',
            border: 'none', borderRadius: '6px', padding: '0.3rem 0.6rem',
            marginRight: '0.5rem'
          }}>🗑 삭제</button>
          <button onClick={() => handleSaveImage(id)} style={{
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.3rem 0.6rem'
          }}>📷 이미지로 저장</button>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
