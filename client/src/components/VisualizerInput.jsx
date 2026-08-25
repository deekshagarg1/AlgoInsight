import React from 'react';
import { ChevronUp, ChevronDown, Check, Edit2, AlertCircle } from 'lucide-react';

/**
 * VisualizerInput Component (Dracula / High Fidelity Redesign)
 * 
 * Styled exactly like AlgoMaster:
 * - Font: Styled with clean, modern sans-serif and monospace fonts.
 * - Collapsible card with toggle caret.
 * - Pills for dataset presets (Standard, Small, Reverse Sorted, Already Sorted, Nearly Sorted, All Equal).
 * - Edit / Custom input toggle button.
 * - Formatted, glowing display showing: arr = [64, 34, 25, ...]
 * 
 * @param {Object} props
 * @param {number[]} props.array - Current active array values
 * @param {Function} props.onGenerateArray - Callback to submit updated array
 * @param {boolean} props.disabled - Disable updates during active playback loop
 */
export default function VisualizerInput({
  array,
  onGenerateArray,
  disabled,
  selectedAlgoId,
  target = 22,
  onTargetChange
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isEditingCustom, setIsEditingCustom] = React.useState(false);
  const [customText, setCustomText] = React.useState('');
  const [error, setError] = React.useState('');
  const [activePreset, setActivePreset] = React.useState('STANDARD');

  // Sync initial custom input string
  React.useEffect(() => {
    setCustomText(array.join(', '));
  }, [array]);

  const isCountingSort = selectedAlgoId === 'counting-sort';

  const presets = isCountingSort ? [
    { id: 'STANDARD', label: 'Standard', data: [4, 2, 2, 8, 3, 3, 1] },
    { id: 'SMALL', label: 'Small', data: [3, 1, 4, 1, 5] },
    { id: 'REVERSE', label: 'Reverse Sorted', data: [9, 8, 6, 4, 3, 2, 1] },
    { id: 'SORTED', label: 'Already Sorted', data: [1, 2, 3, 4, 5, 6, 7] },
    { id: 'NEARLY_SORTED', label: 'Nearly Sorted', data: [1, 2, 4, 3, 5, 6, 7] },
    { id: 'ALL_EQUAL', label: 'All Equal', data: [5, 5, 5, 5, 5, 5, 5] }
  ] : [
    { id: 'STANDARD', label: 'Standard', data: [64, 34, 25, 12, 22, 11, 90] },
    { id: 'SMALL', label: 'Small', data: [25, 12, 34, 11, 9] },
    { id: 'REVERSE', label: 'Reverse Sorted', data: [90, 64, 34, 25, 22, 12, 11] },
    { id: 'SORTED', label: 'Already Sorted', data: [11, 12, 22, 25, 34, 64, 90] },
    { id: 'NEARLY_SORTED', label: 'Nearly Sorted', data: [11, 12, 25, 22, 34, 64, 90] },
    { id: 'ALL_EQUAL', label: 'All Equal', data: [25, 25, 25, 25, 25, 25, 25] }
  ];

  const handleSelectPreset = (preset) => {
    if (disabled) return;
    setError('');
    setIsEditingCustom(false);
    setActivePreset(preset.id);
    onGenerateArray(preset.data);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    const rawItems = customText.split(',').map((val) => val.trim());
    const numbers = rawItems.map((val) => Number(val)).filter((val) => !isNaN(val) && val > 0);

    if (numbers.length !== rawItems.length) {
      setError('Invalid entries. Input positive numbers only.');
      return;
    }

    if (numbers.length < 4 || numbers.length > 12) {
      setError('Keep array length between 4 and 12 for high fidelity visual scale.');
      return;
    }

    const maxLimit = isCountingSort ? 9 : 100;
    const outOfBounds = numbers.some((n) => n > maxLimit || n < 1);
    if (outOfBounds) {
      setError(`Please input values between 1 and ${maxLimit} ${isCountingSort ? '(to fit count indexes on screen)' : ''}.`);
      return;
    }

    setError('');
    setIsEditingCustom(false);
    setActivePreset('CUSTOM');
    onGenerateArray(numbers);
  };

  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300">
      
      {/* Top Header Card Toggle */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#21222c]/50 px-4 py-2 border-b border-[#20212b]/40 flex justify-between items-center cursor-pointer select-none"
      >
        <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">Input Config</span>
        <button className="text-slate-500 hover:text-slate-350">
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="p-4 flex flex-col gap-4 bg-[#161720]/45">
          
          {/* Preset Buttons Layer */}
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  disabled={disabled}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 border font-sans tracking-tight ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-450 border-emerald-500/35 shadow-sm'
                      : 'bg-[#21222c]/20 hover:bg-[#21222c]/40 text-slate-400 border-[#20212b]/75 disabled:opacity-40'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                  {preset.label}
                </button>
              );
            })}

            {/* Custom array trigger */}
            <button
              disabled={disabled}
              onClick={() => {
                setError('');
                setIsEditingCustom(!isEditingCustom);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border font-sans tracking-tight ${
                isEditingCustom || activePreset === 'CUSTOM'
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/35'
                  : 'bg-[#21222c]/20 hover:bg-[#21222c]/40 text-slate-400 border-[#20212b]/75'
              }`}
            >
              <Edit2 className="w-3 h-3 text-cyan-400" />
              Custom
            </button>
          </div>

          {/* Custom Input Editor Box */}
          {isEditingCustom ? (
            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2 animate-in slide-in-from-top duration-150">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. 64, 34, 25, 12"
                  className="flex-1 bg-[#1a1b24] border border-[#2c2d3a] rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/40"
                />
                <button 
                  type="submit"
                  className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer border-none font-sans"
                >
                  Apply
                </button>
              </div>
              {error && (
                <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-1 font-mono font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          ) : (
            /* Array Formatted String view (Clean custom monospace styling) */
            <div className="w-full bg-[#1c1d27]/40 border border-[#20212b]/50 rounded-xl p-3.5 flex items-center font-mono text-xs select-all shadow-inner">
              <span className="text-[#6272a4] pr-2">arr =</span>
              <span className="text-[#8be9fd] font-bold">
                [{array.join(', ')}]
              </span>
            </div>
          )}

          {/* Target Element Input (Search Algorithms Only) */}
          {(selectedAlgoId === 'linear-search' || selectedAlgoId === 'binary-search') && (
            <div className="w-full bg-[#1c1d27]/40 border border-[#20212b]/50 rounded-xl p-3 flex items-center justify-between font-mono text-xs shadow-inner animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5">
                <span className="text-[#6272a4]">target =</span>
                <span className="text-[#ffb86c] font-bold">
                  {target}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold">Change Target:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  disabled={disabled}
                  value={target}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= 100) {
                      onTargetChange(val);
                    }
                  }}
                  className="w-16 px-2.5 py-1 rounded-lg border border-[#2c2d3a] bg-[#1a1b24] text-xs font-mono text-[#ffb86c] focus:outline-none focus:border-indigo-500/50 transition-all text-center"
                />
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
