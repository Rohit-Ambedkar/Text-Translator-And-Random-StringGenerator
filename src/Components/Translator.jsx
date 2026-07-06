import React, { useState } from 'react';

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // Default: Spanish
  const [loading, setLoading] = useState(false);

const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTranslatedText('');

    // Hum use kar rahe hain text-translator2 API ka working endpoint
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    
    // FormData format me data bhejna is API ki requirement hoti hai
    const formData = new FormData();
    formData.append('source_language', 'en');
    formData.append('target_language', targetLang);
    formData.append('text', inputText);

    const options = {
      method: 'POST',
      headers: {
        // ⚠️ APNI REAL RAPIDAPI KEY YAHA PASTE KAREIN
        'X-RapidAPI-Key': '687099f8bamshc8d4f3b4b20dba9p1fe673jsnfa631fd54f24',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: formData
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      console.log("Naya API Response:", data);

      if (data && data.status === "success" && data.data && data.data.translatedText) {
        setTranslatedText(data.data.translatedText);
      } else if (data && data.message) {
        setTranslatedText(`API Error: ${data.message}`);
      } else {
        setTranslatedText("Translation Error: Service temporary unavailable.");
      }
    } catch (error) {
      console.error(error);
      setTranslatedText("Network Error: Failed to fetch translation.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">English Text Translator</h2>
      
      <div className="space-y-4">
        {/* Input box */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">English Text</label>
          <textarea
            className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Type your English text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Language Selection & Submit */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-slate-400 mb-2">Translate To</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 w-full"
            >
              <option value="es">Spanish (Español)</option>
              <option value="fr">French (Français)</option>
              <option value="de">German (Deutsch)</option>
              <option value="it">Italian (Italiano)</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold rounded-lg shadow transition-all duration-200 mt-auto"
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {/* Output Box */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-400 mb-2">Translation Result</label>
          <div className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 overflow-y-auto">
            {translatedText ? translatedText : <span className="text-slate-600 italic">Your translation will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}