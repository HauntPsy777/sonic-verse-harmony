
import React, { useRef, useEffect, useState } from 'react';

interface MusicVisualizerProps {
  audioData: Uint8Array | null;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ audioData }) => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    if (!audioData) {
      // Generate placeholder bars when no audio data
      setBars(Array(20).fill(0).map(() => Math.random() * 50 + 10));
      return;
    }
    
    // Sample the audio data to get reasonable number of bars
    const sampleSize = Math.floor(audioData.length / 20);
    const sampledData: number[] = [];
    
    for (let i = 0; i < 20; i++) {
      const startIndex = i * sampleSize;
      const endIndex = startIndex + sampleSize;
      
      // Calculate average value for this segment
      let sum = 0;
      for (let j = startIndex; j < endIndex && j < audioData.length; j++) {
        sum += audioData[j];
      }
      
      const average = sum / sampleSize;
      sampledData.push(average);
    }
    
    setBars(sampledData);
  }, [audioData]);

  return (
    <div className="flex items-end justify-center h-16 space-x-1 px-2">
      {bars.map((height, index) => {
        const calculatedHeight = (height / 255) * 100; // Normalize to percentage
        
        return (
          <div
            key={index}
            className="music-visualizer-bar"
            style={{
              height: `${calculatedHeight}%`,
              animationDelay: `${index * 0.05}s`
            }}
          />
        );
      })}
    </div>
  );
};

export default MusicVisualizer;
