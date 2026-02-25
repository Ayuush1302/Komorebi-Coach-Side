import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Clock, Footprints, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';
import { useFeed } from '../../context/FeedContext';

const MOOD_OPTIONS = [
    { emoji: '💪', label: 'Strong' },
    { emoji: '😊', label: 'Good' },
    { emoji: '😤', label: 'Hard' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🔥', label: 'On Fire' },
];

const WORKOUT_TAGS = [
    'Upper Body Strength',
    'Lower Body Power',
    'HIIT Session',
    'Recovery Run',
    'Cardio Endurance',
    'Flexibility & Mobility',
];

export default function AthleteCreatePost() {
    const navigate = useNavigate();
    const { addPost } = useFeed();
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [metrics, setMetrics] = useState({
        distance: '',
        steps: '',
        duration: ''
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!caption && !selectedImage) {
            toast.error("Please add a photo or caption");
            return;
        }

        // Build caption with mood and tag
        let fullCaption = caption;
        if (selectedMood) {
            const mood = MOOD_OPTIONS.find(m => m.label === selectedMood);
            if (mood) fullCaption = `${mood.emoji} Feeling ${mood.label} — ${fullCaption}`;
        }
        if (selectedTag) {
            fullCaption += ` 🏋️ ${selectedTag}`;
        }

        addPost({
            caption: fullCaption,
            location,
            image: selectedImage || undefined,
            metrics: {
                distance: metrics.distance ? `${metrics.distance} km` : undefined,
                steps: metrics.steps ? parseInt(metrics.steps).toLocaleString() : undefined,
                duration: metrics.duration
            }
        });

        toast.success("Post shared successfully!");
        navigate('/athlete/activity');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 h-14">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">New Post</h1>
                    <button
                        onClick={handleSubmit}
                        className="text-blue-600 font-semibold px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-5">
                {/* Caption */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                            You
                        </div>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Share your workout experience..."
                            className="w-full min-h-[80px] p-1 text-base placeholder-gray-400 border-none resize-none focus:ring-0 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Mood / Feeling Selector */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How are you feeling?</h3>
                    <div className="flex gap-2 flex-wrap">
                        {MOOD_OPTIONS.map((mood) => (
                            <button
                                key={mood.label}
                                onClick={() => setSelectedMood(selectedMood === mood.label ? null : mood.label)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border transition-all ${selectedMood === mood.label
                                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="text-base">{mood.emoji}</span>
                                {mood.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workout Tag */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tag Workout</h3>
                    <div className="flex gap-2 flex-wrap">
                        {WORKOUT_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${selectedTag === tag
                                        ? 'bg-gray-900 border-gray-900 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Photo Upload */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Photo</h3>
                    {selectedImage ? (
                        <div className="relative rounded-xl overflow-hidden border border-gray-100">
                            <img src={selectedImage} alt="Preview" className="w-full object-cover max-h-[300px]" />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="block w-full aspect-[16/9] rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400">
                            <div className="p-3 bg-gray-100 rounded-full text-gray-500">
                                <Camera className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-sm">Tap to add a photo</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                    )}
                </div>

                {/* Activity Metrics */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Activity Metrics</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <RotateCcw className="w-4 h-4" />
                                <span className="text-xs font-medium">Distance</span>
                            </div>
                            <input
                                type="text"
                                placeholder="0.0 km"
                                value={metrics.distance}
                                onChange={(e) => setMetrics({ ...metrics, distance: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none text-gray-900"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <Footprints className="w-4 h-4" />
                                <span className="text-xs font-medium">Steps</span>
                            </div>
                            <input
                                type="text"
                                placeholder="0"
                                value={metrics.steps}
                                onChange={(e) => setMetrics({ ...metrics, steps: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none text-gray-900"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs font-medium">Time</span>
                            </div>
                            <input
                                type="text"
                                placeholder="00:00"
                                value={metrics.duration}
                                onChange={(e) => setMetrics({ ...metrics, duration: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Add location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 focus:outline-none bg-transparent text-gray-900"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
