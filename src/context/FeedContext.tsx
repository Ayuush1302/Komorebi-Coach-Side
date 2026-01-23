import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Post {
    id: number;
    user: {
        name: string;
        avatar: string;
        color: string;
    };
    time: string;
    caption: string;
    image?: string;
    metrics?: {
        distance?: string;
        steps?: string;
        duration?: string;
    };
    location?: string;
}

const MOCK_POSTS: Post[] = [
    {
        id: 1,
        user: {
            name: "Sarah Chen",
            avatar: "SC",
            color: "bg-emerald-500"
        },
        time: "2h ago",
        caption: "Morning run by the river! 🏃‍♀️ Great weather for it.",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800",
        metrics: {
            distance: "5.2 km",
            steps: "6,432",
            duration: "00:45"
        },
        location: "River Thames Path"
    },
    {
        id: 2,
        user: {
            name: "Mike Ross",
            avatar: "MR",
            color: "bg-blue-500"
        },
        time: "4h ago",
        caption: "Hit a new personal best on steps today! recovering nicely.",
        metrics: {
            distance: "3.1 km",
            steps: "12,045",
            duration: "1:15"
        },
        location: "Central Park"
    },
    {
        id: 3,
        user: {
            name: "Emma Wilson",
            avatar: "EW",
            color: "bg-purple-500"
        },
        time: "Yesterday",
        caption: "Evening stroll to clear the mind.",
        image: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800",
        metrics: {
            distance: "2.5 km",
            steps: "3,200",
            duration: "00:30"
        },
        location: "Hyde Park"
    }
];

interface FeedContextType {
    posts: Post[];
    addPost: (post: Omit<Post, 'id' | 'user' | 'time'>) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

    const addPost = (newPostData: Omit<Post, 'id' | 'user' | 'time'>) => {
        const newPost: Post = {
            id: Date.now(),
            user: {
                name: "You", // Hardcoded for now until we have real user data
                avatar: "Y",
                color: "bg-blue-600"
            },
            time: "Just now",
            ...newPostData
        };

        setPosts(prev => [newPost, ...prev]);
    };

    return (
        <FeedContext.Provider value={{ posts, addPost }}>
            {children}
        </FeedContext.Provider>
    );
}

export function useFeed() {
    const context = useContext(FeedContext);
    if (context === undefined) {
        throw new Error('useFeed must be used within a FeedProvider');
    }
    return context;
}
