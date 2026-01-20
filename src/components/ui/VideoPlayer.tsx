"use client";
import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  thumbnail: string;
  duration?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export default function VideoPlayer({ title, thumbnail, duration, onClose, isModal = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Estimate total seconds from duration string (e.g. "5:43" -> 343 seconds)
  const getTotalSeconds = () => {
    if (!duration) return 300; // Default 5 minutes
    
    const parts = duration.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 300;
  };
  
  const totalSeconds = getTotalSeconds();
  const currentTime = formatTime(Math.floor(progress * totalSeconds / 100));
  const totalTime = duration || '5:00';
  
  return (
    <div className={`${isModal ? 'w-full max-w-4xl' : 'w-full h-full'} bg-black relative overflow-hidden`}>
      {/* Video container */}
      <div className={`relative ${isModal ? 'aspect-video' : 'w-full h-full'}`}>
        {thumbnail && !imageError ? (
          <img 
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-[#0A1F44]/80 flex items-center justify-center">
            <div className="text-white/50 text-center">
              <Play size={48} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Video Preview</p>
            </div>
          </div>
        )}
        
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button 
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 border border-white/30"
            >
              <Play size={40} fill="white" className="ml-2" />
            </button>
          </div>
        )}
        
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 flex-col">
            <div className="text-white font-bold text-xl mb-3">Video Playback Simulation</div>
            <p className="text-white/70 text-sm max-w-md text-center">
              This is a UI simulation. In actual deployment, real video will play here.
            </p>
          </div>
        )}
      </div>
      
      {/* Video controls */}
      <div className="p-4 bg-black">
        {/* Title */}
        <div className="text-white font-semibold mb-2">{title}</div>
        
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white/80 text-xs">{currentTime}</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #0052CC ${progress}%, #ffffff20 ${progress}%)`,
            }}
          />
          <span className="text-white/80 text-xs">{totalTime}</span>
        </div>
        
        {/* Controls */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-blue-300 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button 
              onClick={toggleMute}
              className="text-white hover:text-blue-300 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <div className="text-white/80 text-xs">{isPlaying ? 'Playing' : 'Paused'}</div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-blue-300 transition-colors">
              <Maximize size={18} />
            </button>
            
            {isModal && onClose && (
              <button 
                onClick={onClose}
                className="text-white hover:text-blue-300 transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 