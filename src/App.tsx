import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import NeverPage from './pages/NeverPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<div>MAIN</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NeverPage />} />
      </Routes>
    </div>
  );
}

export default App;
