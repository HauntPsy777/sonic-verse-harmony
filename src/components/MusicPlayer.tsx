
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { placeholderTracks } from '@/lib/audioUtils';
import MusicVisualizer from './MusicVisualizer';
import { createAudioContext, setVolume, getAudioData, AudioContextState } from '@/lib/audioUtils';

interface MusicPlayerProps {
  onAudioDataChange?: (data: Uint8Array | null) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onAudioDataChange }) => {
  const [currentTrack, setCurrentTrack] = useState(placeholderTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContextState | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Initialize audio context and visualizer
  useEffect(() => {
    if (audioRef.current) {
      audioContextRef.current = createAudioContext(audioRef.current);
    }
    
    return () => {
      if (audioContextRef.current?.audioContext) {
        audioContextRef.current.audioContext.close();
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update audio data for visualization
  const updateAudioData = () => {
    if (audioContextRef.current?.analyser && audioContextRef.current?.dataArray) {
      const data = getAudioData(
        audioContextRef.current.analyser,
        audioContextRef.current.dataArray
      );
      
      setAudioData(data);
      if (onAudioDataChange) onAudioDataChange(data);
    }
    
    animationRef.current = requestAnimationFrame(updateAudioData);
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      
      // Make sure AudioContext is running (may be suspended by browser policies)
      if (audioContextRef.current?.audioContext?.state === 'suspended') {
        audioContextRef.current.audioContext.resume();
      }
      
      // Start visualization
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(updateAudioData);
      }
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle previous track
  const handlePrevious = () => {
    const currentIndex = placeholderTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + placeholderTracks.length) % placeholderTracks.length;
    setCurrentTrack(placeholderTracks[prevIndex]);
  };
  
  // Handle next track
  const handleNext = () => {
    const currentIndex = placeholderTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % placeholderTracks.length;
    setCurrentTrack(placeholderTracks[nextIndex]);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    setVolume(audioContextRef.current?.gainNode, newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setVolumeState(volume || 0.5);
      setVolume(audioContextRef.current?.gainNode, volume || 0.5);
    } else {
      setVolume(audioContextRef.current?.gainNode, 0);
    }
    setIsMuted(!isMuted);
  };
  
  // Handle audio time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle audio duration change
  const handleDurationChange = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  // Format time (seconds -> mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Update audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.source;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing new track:', error);
        });
      }
    }
  }, [currentTrack]);

  return (
    <div className="glassmorphism rounded-lg p-4 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Album cover */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden">
          <img 
            src={currentTrack.cover} 
            alt={`${currentTrack.album} cover`}
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-1 right-1">
            {currentTrack.platform === 'spotify' && (
              <div className="w-4 h-4 bg-spotify rounded-full" />
            )}
            {currentTrack.platform === 'youtube' && (
              <div className="w-4 h-4 bg-youtube rounded-full" />
            )}
            {currentTrack.platform === 'deezer' && (
              <div className="w-4 h-4 bg-deezer rounded-full" />
            )}
          </div>
        </div>
        
        {/* Track info */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold truncate">{currentTrack.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          <p className="text-xs text-muted-foreground">{currentTrack.album}</p>
          
          {/* Visualizer */}
          <div className="mt-2 w-full">
            <MusicVisualizer audioData={audioData} />
          </div>
        </div>
        
        {/* Audio element */}
        <audio
          ref={audioRef}
          src={currentTrack.source}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={handleNext}
          className="hidden"
        />
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 space-y-1">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 0)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="text-muted-foreground hover:text-primary"
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          onClick={togglePlayPause}
          className="rounded-full bg-primary hover:bg-primary/90 h-12 w-12"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="text-muted-foreground hover:text-primary"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Volume control */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-muted-foreground hover:text-primary"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
