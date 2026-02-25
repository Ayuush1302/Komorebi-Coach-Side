import { Upload } from 'lucide-react';

interface PhotoCategory {
    id: string;
    title: string;
    count: number;
}

export default function AthletePhotos() {
    const photoCategories: PhotoCategory[] = [
        { id: 'body-scans', title: 'Body Scans', count: 0 },
        { id: 'progress-front', title: 'Progress Photo - Front', count: 0 },
        { id: 'progress-side', title: 'Progress Photo - Side', count: 0 },
        { id: 'progress-back', title: 'Progress Photo - Back', count: 0 },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {photoCategories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-4 hover:border-blue-300 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                            <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">Upload a photo</p>
                    </div>
                    <div className="text-center border-t border-gray-100 pt-3 mt-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{category.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{category.count} photos</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
