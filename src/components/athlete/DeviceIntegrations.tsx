import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Watch, Smartphone } from 'lucide-react';

interface Device {
    id: string;
    name: string;
    category: 'watch' | 'ring' | 'band' | 'tracker';
    connected: boolean;
    imageUrl?: string;
}

export default function DeviceIntegrations() {
    const navigate = useNavigate();

    const devices: Device[] = [
        { id: 'apple-watch', name: 'Apple Watch', category: 'watch', connected: false },
        { id: 'whoop', name: 'Whoop', category: 'band', connected: false },
        { id: 'oura', name: 'Oura Ring', category: 'ring', connected: false },
        { id: 'garmin', name: 'Garmin', category: 'watch', connected: false },
        { id: 'fitbit', name: 'Fitbit', category: 'tracker', connected: false },
        { id: 'samsung', name: 'Samsung Galaxy Watch', category: 'watch', connected: false },
        { id: 'polar', name: 'Polar', category: 'watch', connected: false },
        { id: 'coros', name: 'COROS', category: 'watch', connected: false },
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'watch':
                return <Watch className="w-8 h-8 text-gray-400" />;
            case 'ring':
                return <div className="w-8 h-8 rounded-full border-4 border-gray-400" />;
            default:
                return <Smartphone className="w-8 h-8 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
            </div>

            <p className="text-sm text-gray-500">Connect your wearable devices to sync health and fitness data.</p>

            {/* Device Grid */}
            <div className="grid grid-cols-2 gap-4">
                {devices.map((device) => (
                    <div
                        key={device.id}
                        onClick={() => navigate(`/athlete/integrations/${device.id}`)}
                        className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all"
                    >
                        <div className="flex flex-col items-center text-center">
                            {/* Device Icon/Image Placeholder */}
                            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                                {getCategoryIcon(device.category)}
                            </div>

                            <h3 className="font-semibold text-gray-900 text-sm">{device.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
