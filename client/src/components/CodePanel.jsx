import React from 'react';
import { BUBBLE_SORT_CODE } from '../data/bubbleSortCode';
import { Copy, Terminal, Check } from 'lucide-react';

/**
 * CodePanel Component (Dracula Theme - Bidirectional Manual Scroll)
 * 
 * Styled exactly like AlgoMaster:
 * - Manual Scroll: Keeps code static during step playback (no auto-scroll hooks).
 *   Allows the user to slide and scroll manually both vertically and horizontally.
 * - Bidirectional Scroll: Supports overflow-auto and min-w-max for wide lines.
 * - Height: Reverted back to h-full min-h-[330px] stretching.
 * - Dynamic Highlight Colors: Colored loops, comparisons, and swaps.
 * 
 * @param {Object} props
 * @param {number[]} props.highlightedLines - Lines executing in this step
 */
export default function CodePanel({ highlightedLines = [] }) {
  const [language, setLanguage] = React.useState('java');
  const [copied, setCopied] = React.useState(false);
  const scrollContainerRef = React.useRef(null);

  const codeData = BUBBLE_SORT_CODE[language] || BUBBLE_SORT_CODE.java;

  const handleCopy = () => {
    const rawCodeText = codeData.map(line => line.text).join('\n');
    navigator.clipboard.writeText(rawCodeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Semantic highlighting calculator
  const getLineHighlightStyle = (num, lang) => {
    if (lang === 'java') {
      if (num === 8) {
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-l-[3px] border-[#facc15]',
          numberColor: 'text-[#facc15] font-bold'
        };
      }
      if ([10, 11, 12, 13].includes(num)) {
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-l-[3px] border-[#50fa7b]',
          numberColor: 'text-[#50fa7b] font-bold'
        };
      }
      if ([18, 19, 20].includes(num)) {
        return {
          bg: 'bg-pink-500/10',
          border: 'border-l-[3px] border-[#ff79c6]',
          numberColor: 'text-[#ff79c6] font-bold'
        };
      }
      return {
        bg: 'bg-[#44475a]/75',
        border: 'border-l-[3px] border-[#bd93f9]',
        numberColor: 'text-[#bd93f9] font-bold'
      };
    }

    if (lang === 'cpp') {
      if (num === 7) {
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-l-[3px] border-[#facc15]',
          numberColor: 'text-[#facc15] font-bold'
        };
      }
      if (num === 9) {
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-l-[3px] border-[#50fa7b]',
          numberColor: 'text-[#50fa7b] font-bold'
        };
      }
      if (num === 12) {
        return {
          bg: 'bg-pink-500/10',
          border: 'border-l-[3px] border-[#ff79c6]',
          numberColor: 'text-[#ff79c6] font-bold'
        };
      }
      return {
        bg: 'bg-[#44475a]/75',
        border: 'border-l-[3px] border-[#bd93f9]',
        numberColor: 'text-[#bd93f9] font-bold'
      };
    }

    if (lang === 'python') {
      if (num === 5) {
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-l-[3px] border-[#facc15]',
          numberColor: 'text-[#facc15] font-bold'
        };
      }
      if (num === 6) {
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-l-[3px] border-[#50fa7b]',
          numberColor: 'text-[#50fa7b] font-bold'
        };
      }
      if (num === 7) {
        return {
          bg: 'bg-pink-500/10',
          border: 'border-l-[3px] border-[#ff79c6]',
          numberColor: 'text-[#ff79c6] font-bold'
        };
      }
      return {
        bg: 'bg-[#44475a]/75',
        border: 'border-l-[3px] border-[#bd93f9]',
        numberColor: 'text-[#bd93f9] font-bold'
      };
    }

    return {
      bg: 'bg-[#44475a]/75',
      border: 'border-l-[3px] border-[#8be9fd]',
      numberColor: 'text-[#8be9fd] font-bold'
    };
  };

  const renderSyntaxColoring = (text) => {
    const keywords = ['public', 'void', 'def', 'int', 'boolean', 'bool', 'for', 'if', 'not', 'break', 'temp', 'false', 'true', 'len', 'range', 'in'];
    const operators = ['>', '<', '=', '-', '+', '!', '=='];
    const parts = text.split(/(\s+|\W)/);

    return parts.map((part, idx) => {
      if (part.startsWith('//') || part.startsWith('#')) {
        return <span key={idx} className="text-[#6272a4] italic">{part}</span>;
      }
      if (keywords.includes(part)) {
        return <span key={idx} className="text-[#ff79c6] font-semibold">{part}</span>;
      }
      if (operators.includes(part)) {
        return <span key={idx} className="text-[#ff79c6] font-bold">{part}</span>;
      }
      if (!isNaN(part) && part.trim() !== '') {
        return <span key={idx} className="text-[#bd93f9] font-mono">{part}</span>;
      }
      if (part === 'bubbleSort') {
        return <span key={idx} className="text-[#50fa7b] font-bold">{part}</span>;
      }
      return <span key={idx} className="text-[#f8f8f2]">{part}</span>;
    });
  };

  return (
    <div className="w-full bg-[#1e1f29] border border-[#20212b]/80 rounded-2xl flex flex-col overflow-hidden shadow-2xl h-full min-h-[330px]">
      
      {/* Dracula Header */}
      <div className="bg-[#21222c] px-4 py-3 border-b border-[#181920] flex justify-between items-center shrink-0">
        
        {/* Language select Dropdown */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#8be9fd]" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#282a36] border border-slate-800 text-xs font-semibold text-[#f8f8f2] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#ff79c6]/50 cursor-pointer"
          >
            <option value="java">☕ Java</option>
            <option value="cpp">⚙️ C++</option>
            <option value="python">🐍 Python</option>
          </select>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-[#282a36] hover:bg-[#282a36]/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#50fa7b]" />
              <span className="text-[10px] text-[#50fa7b]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#f8f8f2]" />
              <span className="text-[10px] text-[#f8f8f2]">Copy Code</span>
            </>
          )}
        </button>

      </div>

      {/* Editor Content Area (Dracula Background with Bidirectional scrollbars) */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-auto bg-[#282a36] p-4 font-mono text-[13px] leading-[22px] select-none scrollbar-thin scroll-smooth"
        style={{
          scrollbarColor: '#44475a #282a36',
          scrollbarWidth: 'thin'
        }}
      >
        {/* min-w-max prevents horizontal cutoff of highlighted line backgrounds */}
        <div className="min-w-max pr-6">
          {codeData.map((line) => {
            const isHighlighted = highlightedLines.includes(line.num);
            const style = isHighlighted 
              ? getLineHighlightStyle(line.num, language)
              : { bg: '', border: 'border-l-[3px] border-transparent', numberColor: 'text-[#6272a4]' };

            return (
              <div
                key={line.num}
                data-line-num={line.num}
                className={`flex items-center w-full transition-all duration-200 ${style.bg} ${style.border}`}
              >
                {/* Line numbers column */}
                <span className={`w-8 text-right select-none pr-3 font-mono text-[11px] ${style.numberColor}`}>
                  {line.num}
                </span>

                {/* Code text column */}
                <span className="flex-1 whitespace-pre pl-2">
                  {renderSyntaxColoring(line.text)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
