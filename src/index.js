
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const now = new Date();
const cutoff = new Date('2026-03-01');

// 실행 제한 조건
if (now < cutoff) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
} else {
  document.body.innerHTML = `
    <div style="text-align: center; padding: 2rem; font-size: 1.5rem;">
      ⚠️ 이 프로그램은 2026년 3월 1일 이후로 사용할 수 없습니다. 고양석 선생님께 문의하세요.
    </div>
  `;
}
