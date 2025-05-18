
export interface AudioContextState {
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  source: MediaElementAudioSourceNode | null;
  gainNode: GainNode | null;
  dataArray: Uint8Array | null;
}

export const createAudioContext = (audioElement: HTMLAudioElement | null): AudioContextState => {
  if (!audioElement) {
    return {
      audioContext: null,
      analyser: null,
      source: null,
      gainNode: null,
      dataArray: null
    };
  }

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const source = audioContext.createMediaElementSource(audioElement);
    const gainNode = audioContext.createGain();
    
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.value = 0.8; // Initial volume at 80%
    
    return {
      audioContext,
      analyser,
      source,
      gainNode,
      dataArray
    };
  } catch (error) {
    console.error('Failed to create audio context:', error);
    return {
      audioContext: null,
      analyser: null,
      source: null,
      gainNode: null,
      dataArray: null
    };
  }
};

export const setVolume = (gainNode: GainNode | null, level: number) => {
  if (gainNode) {
    const clampedLevel = Math.max(0, Math.min(1, level));
    gainNode.gain.value = clampedLevel;
  }
};

export const getAudioData = (analyser: AnalyserNode | null, dataArray: Uint8Array | null): Uint8Array | null => {
  if (!analyser || !dataArray) return null;
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
};

// Sample data for demo purposes
export const placeholderTracks = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    platform: 'spotify'
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    platform: 'youtube'
  },
  {
    id: '3',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
    cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    platform: 'deezer'
  },
  {
    id: '4',
    title: 'Moth To A Flame',
    artist: 'Swedish House Mafia ft. The Weeknd',
    album: 'Paradise Again',
    duration: '4:00',
    cover: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    platform: 'spotify'
  },
  {
    id: '5',
    title: 'Take My Breath',
    artist: 'The Weeknd',
    album: 'Dawn FM',
    duration: '3:40',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    platform: 'youtube'
  }
];
