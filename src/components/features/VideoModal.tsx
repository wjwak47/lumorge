"use client";
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Resource } from '@/data/resources';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface VideoModalProps {
  videoResource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasNavigation?: boolean;
}

export default function VideoModal({ 
  videoResource, 
  isOpen, 
  onClose, 
  onPrev, 
  onNext, 
  hasNavigation = false 
}: VideoModalProps) {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <VideoPlayer
          title={videoResource.title}
          thumbnail={videoResource.thumbnail || ''}
          duration={videoResource.watchTime}
          onClose={onClose}
          isModal={true}
        />
        
        {hasNavigation && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <button 
                onClick={onPrev}
                className="bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                title="Previous Video"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
              <button 
                onClick={onNext}
                className="bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                title="Next Video"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          </>
        )}
        
        <div className="bg-white p-4 rounded-b-lg">
          <h3 className="text-xl font-bold mb-2">{videoResource.title}</h3>
          <p className="text-sm text-gray-600">{videoResource.description}</p>
        </div>
      </div>
    </div>
  );
} 