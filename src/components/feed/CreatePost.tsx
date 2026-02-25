import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Clock, Footprints, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { useFeed } from '../../context/FeedContext';

export default function CreatePost() {
    const navigate = useNavigate();
    const { addPost } = useFeed();
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
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

        addPost({
            caption,
            location,
            image: selectedImage || undefined,
            metrics: {
                distance: metrics.distance ? `${metrics.distance} km` : undefined,
                steps: metrics.steps ? parseInt(metrics.steps).toLocaleString() : undefined,
                duration: metrics.duration
            }
        });

        toast.success("Post shared successfully!");
        navigate('/activity');
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between px-4 h-14">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-semibold">New Post</h1>
                    <button
                        onClick={handleSubmit}
                        className="text-blue-600 font-medium px-2 py-1 hover:bg-blue-50 rounded-md"
                    >
                        Post
                    </button>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6">
                {/* Caption */}
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium shrink-0">
                        You
                    </div>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full min-h-[100px] p-2 text-lg placeholder-gray-400 border-none resize-none focus:ring-0"
                    />
                </div>

                {/* Photo Upload */}
                <div>
                    {selectedImage ? (
                        <div className="relative rounded-xl overflow-hidden border border-gray-100">
                            <img src={selectedImage} alt="Preview" className="w-full object-cover max-h-[400px]" />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="block w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-500">
                            <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                                <Camera className="w-6 h-6" />
                            </div>
                            <span className="font-medium">Add a photo</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                    )}
                </div>

                {/* Metrics Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Activity Metrics</h3>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                                <RotateCcw className="w-4 h-4" />
                                <span className="text-xs">Distance</span>
                            </div>
                            <input
                                type="text"
                                placeholder="0.0 km"
                                value={metrics.distance}
                                onChange={(e) => setMetrics({ ...metrics, distance: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                                <Footprints className="w-4 h-4" />
                                <span className="text-xs">Steps</span>
                            </div>
                            <input
                                type="text"
                                placeholder="0"
                                value={metrics.steps}
                                onChange={(e) => setMetrics({ ...metrics, steps: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs">Time</span>
                            </div>
                            <input
                                type="text"
                                placeholder="00:00"
                                value={metrics.duration}
                                onChange={(e) => setMetrics({ ...metrics, duration: e.target.value })}
                                className="bg-transparent font-semibold w-full focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Add location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
