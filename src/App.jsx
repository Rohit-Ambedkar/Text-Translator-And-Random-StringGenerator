import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Translator from './Components/Translator';
import StringGenerator from './Components/StringGenerator';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Navigation Bar */}
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-wider text-indigo-400">
              Slab 1 <span className="text-xs font-normal text-slate-400"></span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-indigo-400 transition-colors font-medium">
                Translator
              </Link>
              <Link to="/string-gen" className="hover:text-indigo-400 transition-colors font-medium">
                String Generator
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Translator />} />
            <Route path="/string-gen" element={<StringGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}