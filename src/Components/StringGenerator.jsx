import React, { useState, useCallback, useEffect } from 'react';

export default function StringGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedString, setGeneratedString] = useState('');

  // useCallback memoizes this function so it isn't recreated on every single render
  const generateString = useCallback(() => {
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
    setGeneratedString(result);
  }, [length, includeNumbers, includeSymbols]);

  // useEffect runs once when the component mounts, and auto-fires when dependencies tweak
  useEffect(() => {
    generateString();
  }, [length, includeNumbers, includeSymbols, generateString]);

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Random String Generator</h2>

      {/* Result Display */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6 flex items-center justify-between font-mono text-lg break-all select-all">
        <span className="text-emerald-400">{generatedString}</span>
      </div>

      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
            <span>String Length</span>
            <span className="text-indigo-400 font-bold">{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Options Toggles */}
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 accent-indigo-500"
            />
            <span className="text-slate-300 group-hover:text-slate-100 transition-colors">Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 accent-indigo-500"
            />
            <span className="text-slate-300 group-hover:text-slate-100 transition-colors">Include Symbols (!@#$)</span>
          </label>
        </div>

        {/* Manual Regenerate Button */}
        <button
          onClick={generateString}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          Regenerate String
        </button>
      </div>
    </div>
  );
}