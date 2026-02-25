import { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

const AI_API_BASE_URL = import.meta.env.PROD
    ? 'https://komorebi-coach-side.onrender.com'
    : 'http://localhost:8000';

interface AudioRecorderProps {
    onAnalysisComplete: (data: any) => void;
}

export default function AudioRecorder({ onAnalysisComplete }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [transcript, setTranscript] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setAudioURL(null);
            setTranscript('');
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone. Please enable permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleStop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setIsProcessing(true);

        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');

        try {
            // 1. Transcribe
            const transcribeResponse = await fetch(`${AI_API_BASE_URL}/transcribe`, {
                method: 'POST',
                body: formData
            });
            const transcribeData = await transcribeResponse.json();
            const text = transcribeData.text;
            setTranscript(text);

            // 2. Parse
            const parseResponse = await fetch(`${AI_API_BASE_URL}/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const parseData = await parseResponse.json();
            onAnalysisComplete(parseData);
        } catch (error) {
            console.error("Error processing audio:", error);
            onAnalysisComplete({ error: "Could not process audio. Ensure the AI backend is running." });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-sm w-full max-w-md mx-auto border border-gray-200">
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Voice Command</h2>
                <p className="text-gray-500 text-sm">Speak clearly to assign a workout.</p>
            </div>

            <div className="relative group">
                <div className={`absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isProcessing}
                    className={`relative w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/50'
                        } shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isProcessing ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                    ) : isRecording ? (
                        <Square className="w-8 h-8 fill-current" />
                    ) : (
                        <Mic className="w-8 h-8" />
                    )}
                </button>
            </div>

            {isRecording && (
                <div className="flex items-center gap-2 text-red-500 font-medium animate-pulse text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Recording...
                </div>
            )}

            {transcript && (
                <div className="w-full text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Transcript</p>
                    <p className="text-gray-700 italic">"{transcript}"</p>
                </div>
            )}

            {audioURL && (
                <audio src={audioURL} controls className="w-full h-8 mt-2" />
            )}
        </div>
    );
}
