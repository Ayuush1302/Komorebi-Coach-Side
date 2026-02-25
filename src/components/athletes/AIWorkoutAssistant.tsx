import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Mic, Type, ArrowRight, Loader2, Copy, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

const AI_API_BASE_URL = import.meta.env.PROD
    ? 'https://komorebi-coach-side.onrender.com'
    : 'http://localhost:8000';

export default function AIWorkoutAssistant() {
    const { athleteId } = useParams();
    const navigate = useNavigate();
    const { athletes } = useData();
    const athlete = athletes.find(a => a.id === athleteId);

    const [workoutData, setWorkoutData] = useState<any>(null);
    const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
    const [textInput, setTextInput] = useState('');
    const [isProcessingText, setIsProcessingText] = useState(false);

    const handleAnalysisComplete = (data: any) => {
        setWorkoutData(data);
    };

    const handleTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textInput.trim()) return;

        setIsProcessingText(true);
        setWorkoutData(null);

        try {
            const response = await fetch(`${AI_API_BASE_URL}/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textInput })
            });
            const data = await response.json();
            setWorkoutData(data);
        } catch (error) {
            console.error("Error processing text:", error);
            setWorkoutData({ error: "Could not process text. Ensure the AI backend is running." });
        } finally {
            setIsProcessingText(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(`/athletes/${athleteId}/dashboard`)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">AI Workout Assistant</h1>
                    {athlete && (
                        <p className="text-sm text-gray-500 mt-0.5">
                            Assigning workout for <span className="font-medium text-gray-700">{athlete.name || athlete.email}</span>
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    AI Powered
                </div>
            </div>

            {/* Intro */}
            <div className="mb-8 text-center">
                <p className="text-gray-600 max-w-xl mx-auto">
                    Assign workouts using voice commands or text instructions. The AI will parse your instructions and create a structured workout assignment.
                </p>
            </div>

            {/* Input Mode Switcher */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex relative">
                    <div
                        className={`absolute inset-y-1 bg-white rounded-md shadow-sm transition-all duration-200 ${inputMode === 'voice' ? 'left-1' : 'left-1/2 -ml-1 translate-x-0.5'}`}
                        style={{ width: 'calc(50% - 4px)' }}
                    />
                    <button
                        onClick={() => setInputMode('voice')}
                        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${inputMode === 'voice' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Mic className="w-4 h-4" />
                        Voice
                    </button>
                    <button
                        onClick={() => setInputMode('text')}
                        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${inputMode === 'text' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Type className="w-4 h-4" />
                        Text
                    </button>
                </div>
            </div>

            {/* Input Areas */}
            <div className="max-w-md mx-auto min-h-[200px]">
                {inputMode === 'voice' ? (
                    <AudioRecorder onAnalysisComplete={handleAnalysisComplete} />
                ) : (
                    <form onSubmit={handleTextSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Workout Instructions
                        </label>
                        <textarea
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder={`e.g., Assign a 10km run${athlete ? ` to ${athlete.name || 'athlete'}` : ''} at 7am`}
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-800 placeholder:text-gray-400"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleTextSubmit(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!textInput.trim() || isProcessingText}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {isProcessingText ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Process Instruction
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                        <p className="mt-2 text-xs text-gray-400 text-center">Press Enter to submit</p>
                    </form>
                )}
            </div>

            {/* Error State */}
            {workoutData && workoutData.error && (
                <div className="mt-8 mx-auto max-w-md bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-red-700">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{workoutData.error} Please try again.</p>
                </div>
            )}

            {/* Success State - Dynamic Table View */}
            {workoutData && !workoutData.error && workoutData.assignments && workoutData.assignments.length > 0 && (
                <div className="mt-12 max-w-2xl mx-auto space-y-6">
                    {workoutData.assignments.map((assignment: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">
                                    {workoutData.assignments.length > 1
                                        ? `Assignment ${idx + 1}`
                                        : 'Parsed Assignment'}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full border ${workoutData.confidence === 'High' ? 'bg-green-50 border-green-200 text-green-700' :
                                    workoutData.confidence === 'Medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                                        'bg-gray-100 border-gray-200 text-gray-600'
                                    }`}>
                                    {workoutData.confidence} Confidence
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50/50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 w-1/3">Attribute</th>
                                            <th className="px-6 py-3">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {assignment.attributes.map((attr: any, attrIdx: number) => (
                                            <tr key={attrIdx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-3 font-medium text-gray-700">{attr.key}</td>
                                                <td className="px-6 py-3 text-gray-900">
                                                    {attr.key === 'Activity' ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {attr.value}
                                                        </span>
                                                    ) : attr.key === 'Intensity' ? (
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${attr.value === 'Easy' ? 'bg-green-100 text-green-800' :
                                                            attr.value === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                                                attr.value === 'Hard' ? 'bg-red-100 text-red-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {attr.value}
                                                        </span>
                                                    ) : (
                                                        attr.value
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6">
                        <details className="group">
                            <summary className="list-none flex items-center cursor-pointer text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                <span className="mr-2 group-open:rotate-90 transition-transform">▸</span>
                                View Debug Data (JSON)
                            </summary>
                            <div className="mt-2 bg-gray-900 rounded-lg p-4 relative">
                                <button
                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(workoutData, null, 2))}
                                    className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                                    title="Copy JSON"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <pre className="text-gray-300 font-mono text-xs overflow-auto max-h-60">
                                    {JSON.stringify(workoutData, null, 2)}
                                </pre>
                            </div>
                        </details>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={() => setWorkoutData(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Discard
                        </button>
                        <button className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Confirm Assignment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
