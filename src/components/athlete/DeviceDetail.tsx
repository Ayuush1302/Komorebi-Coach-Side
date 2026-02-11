import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Watch, Smartphone, CheckCircle2 } from 'lucide-react';

interface DeviceInfo {
    name: string;
    category: string;
    steps: string[];
    description: string;
}

export default function DeviceDetail() {
    const navigate = useNavigate();
    const { deviceId } = useParams();

    const deviceData: Record<string, DeviceInfo> = {
        'apple-watch': {
            name: 'Apple Watch',
            category: 'watch',
            description: 'Sync your Apple Watch data including heart rate, workouts, and activity rings.',
            steps: [
                'Open the Health app on your iPhone',
                'Tap your profile picture in the top right',
                'Scroll down to "Apps" and select Komorebi',
                'Enable all data categories you want to share',
                'Return to this screen and tap "Connect"'
            ]
        },
        'whoop': {
            name: 'Whoop',
            category: 'band',
            description: 'Connect your Whoop band to sync strain, recovery, and sleep data.',
            steps: [
                'Log in to your Whoop account on their website',
                'Go to Settings → Connected Apps',
                'Find Komorebi and click "Authorize"',
                'Allow access to your Whoop data',
                'Return here and tap "Connect" to complete setup'
            ]
        },
        'oura': {
            name: 'Oura Ring',
            category: 'ring',
            description: 'Sync sleep, readiness, and activity data from your Oura Ring.',
            steps: [
                'Open the Oura app on your phone',
                'Go to Settings → Connected Services',
                'Select "Add New Integration"',
                'Choose Komorebi from the list',
                'Grant permission and tap "Connect" below'
            ]
        },
        'garmin': {
            name: 'Garmin',
            category: 'watch',
            description: 'Connect your Garmin device to sync workouts, heart rate, and training load data.',
            steps: [
                'Log in to Garmin Connect on your browser',
                'Go to Settings → Third-Party Apps',
                'Search for Komorebi and click "Connect"',
                'Authorize data sharing permissions',
                'Come back and tap "Connect" to finalize'
            ]
        },
        'fitbit': {
            name: 'Fitbit',
            category: 'tracker',
            description: 'Sync your Fitbit data including steps, sleep, and heart rate.',
            steps: [
                'Open the Fitbit app on your phone',
                'Tap your profile icon',
                'Select "Manage Data" → "Connected Apps"',
                'Add Komorebi and grant permissions',
                'Tap "Connect" below to complete'
            ]
        },
        'samsung': {
            name: 'Samsung Galaxy Watch',
            category: 'watch',
            description: 'Connect your Samsung Galaxy Watch to sync health and fitness metrics.',
            steps: [
                'Open Samsung Health on your phone',
                'Go to Settings → Connected Services',
                'Find Komorebi and tap "Link"',
                'Accept the data sharing permissions',
                'Return here and tap "Connect"'
            ]
        },
        'polar': {
            name: 'Polar',
            category: 'watch',
            description: 'Sync training data, heart rate, and recovery metrics from your Polar device.',
            steps: [
                'Log in to Polar Flow on your browser',
                'Go to Settings → Partner Services',
                'Find and authorize Komorebi',
                'Select the data you want to share',
                'Complete by tapping "Connect" below'
            ]
        },
        'coros': {
            name: 'COROS',
            category: 'watch',
            description: 'Connect your COROS watch to sync training, GPS, and performance data.',
            steps: [
                'Open the COROS app on your phone',
                'Go to Profile → Connected Apps',
                'Select "Add New Connection"',
                'Choose Komorebi and authorize',
                'Tap "Connect" below to finish setup'
            ]
        }
    };

    const device = deviceData[deviceId || ''] || {
        name: 'Unknown Device',
        category: 'other',
        description: 'Device information not available.',
        steps: ['Contact support for connection instructions.']
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'watch':
                return <Watch className="w-12 h-12 text-blue-500" />;
            case 'ring':
                return <div className="w-12 h-12 rounded-full border-4 border-blue-500" />;
            default:
                return <Smartphone className="w-12 h-12 text-blue-500" />;
        }
    };

    const handleConnect = () => {
        // Placeholder for actual connection logic
        alert(`Connecting to ${device.name}... This would initiate the OAuth flow.`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{device.name}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-6">
                {/* Device Icon */}
                <div className="flex justify-center py-6">
                    <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center">
                        {getCategoryIcon(device.category)}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed">{device.description}</p>
                </div>

                {/* Connection Steps */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">How to Connect</h3>
                    <div className="space-y-3">
                        {device.steps.map((step, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-sm text-gray-600 pt-0.5">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Connect Button */}
            <div className="p-4 bg-white border-t border-gray-200">
                <button
                    onClick={handleConnect}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <CheckCircle2 className="w-5 h-5" />
                    Connect {device.name}
                </button>
            </div>
        </div>
    );
}
