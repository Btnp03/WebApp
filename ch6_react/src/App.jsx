import { useState } from 'react';
import FoodContainer from './components/menu/FoodContainer';
import GetStartedContainer from './components/get-start/GetStartedContainer';
import './App.css';
import './styles/GetStarted.css';
import './styles/Food.css';

function App() {
  // สร้าง State สำหรับเลือกแท็บที่ต้องการดู: 'all', 'menu', 'get-start'
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="app-container">
      {/* Header และแถบเมนูนำทาง */}
      <header className="app-navbar">
        <div className="navbar-brand">
          <h1>
            ⚛️ CH6 React.js Homework
            <span className="brand-badge">Vite + React</span>
          </h1>
          <p>
            แบบฝึกหัดและการบ้านวิชา React.js จากเนื้อหาในสไลด์บทที่ 6 (ch6 ReactJs.pptx)
          </p>
        </div>

        <nav className="tabs-nav">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'menu' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            📋 Menu Management (ข้อ B & C)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'get-start' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('get-start')}
          >
            🚀 Get Start with React (ข้อ A)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            📑 แสดงทั้งหมด (All in One)
          </button>
        </nav>
      </header>

      {/* ส่วนเนื้อหาหลัก */}
      <main className="app-content">
        {(activeTab === 'menu' || activeTab === 'all') && (
          <section id="menu-management-section">
            <FoodContainer />
          </section>
        )}

        {(activeTab === 'get-start' || activeTab === 'all') && (
          <section id="get-started-section">
            <GetStartedContainer />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          สร้างขึ้นตามแนวทางในสไลด์ <code>ch6 ReactJs.pptx</code> | Function Components, useState, Props, map(), filter(), Spread Operator &amp; localStorage
        </p>
      </footer>
    </div>
  );
}

export default App;
