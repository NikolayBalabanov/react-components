import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import NeverPage from './pages/NeverPage';
import { MainPage } from './pages/MainPage';
import Forms from './pages/Forms';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/*" element={<NeverPage />} />
      </Routes>
    </div>
  );
}

export default App;
