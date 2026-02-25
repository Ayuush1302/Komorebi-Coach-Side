import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Footprints, RotateCcw, Plus } from 'lucide-react';
import { useFeed } from '../../context/FeedContext';

export default function AthleteActivity() {
    const navigate = useNavigate();
    const { posts } = useFeed();

    return (
        <div className="pb-20 space-y-6 relative">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center">
                <h1 className="text-lg font-semibold">Community Activity</h1>
            </div>

            {/* Feed */}
            <div className="px-4 space-y-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                        {/* Header: Avatar, Name, Time, Location */}
                        <div className="flex gap-3 p-4">
                            <div className={`w-10 h-10 rounded-full ${post.user.color} flex items-center justify-center text-white font-medium text-sm shrink-0`}>
                                {post.user.avatar}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-semibold text-gray-900">{post.user.name}</span>
                                    <span className="text-xs text-gray-500">{post.time}</span>
                                </div>
                                {post.location && (
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin className="w-3 h-3" />
                                        <span>{post.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="px-4 pb-4">
                            <p className="text-gray-800 leading-relaxed">{post.caption}</p>
                        </div>

                        {/* Metrics Grid */}
                        {post.metrics && (
                            <div className="px-4">
                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50">
                                    <div className="flex flex-col items-center gap-1">
                                        <RotateCcw className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-semibold text-gray-700">{post.metrics.distance || '-'}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Dist</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 border-l border-gray-100">
                                        <Footprints className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-semibold text-gray-700">{post.metrics.steps || '-'}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Steps</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 border-l border-gray-100">
                                        <Clock className="w-4 h-4 text-purple-500" />
                                        <span className="text-sm font-semibold text-gray-700">{post.metrics.duration || '-'}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Time</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Post Image */}
                        {post.image && (
                            <div className="pt-4">
                                <div className="aspect-video w-full bg-gray-100">
                                    <img src={post.image} alt="Post activity" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Floating Add Post Button */}
            <button
                onClick={() => navigate('/athlete/create-post')}
                className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 z-40 hover:scale-105 transition-transform hover:bg-blue-700"
            >
                <Plus className="w-7 h-7" />
            </button>
        </div>
    );
}
