
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeScene from '@/components/ThreeScene';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  
  const handleCtaClick = useCallback(() => {
    navigate('/explore');
  }, [navigate]);
  
  const handleAudioDataChange = useCallback((data: Uint8Array | null) => {
    setAudioData(data);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Background */}
      <ThreeScene audioData={audioData} />
      
      {/* Content */}
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Hero onCtaClick={handleCtaClick} />
        
        <section className="mt-12 md:mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience Your Music in a New Dimension</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              HarmonyHub combines your favorite music services with stunning 3D visualizations
              that react to the beat and rhythm of your music.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glassmorphism p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 21C7.66 21 9 19.66 9 18C9 16.34 7.66 15 6 15C4.34 15 3 16.34 3 18C3 19.66 4.34 21 6 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 18C19.66 18 21 16.66 21 15C21 13.34 19.66 12 18 12C16.34 12 15 13.34 15 15C15 16.66 16.34 18 18 18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unified Streaming</h3>
              <p className="text-muted-foreground">
                Access music from Spotify, Deezer, and YouTube all in one interface with seamless transitions.
              </p>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                  <path d="M12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11ZM12 8C11.45 8 11 8.45 11 9C11 9.55 11.45 10 12 10C12.55 10 13 9.55 13 9C13 8.45 12.55 8 12 8ZM12 14C11.45 14 11 14.45 11 15C11 15.55 11.45 16 12 16C12.55 16 13 15.55 13 15C13 14.45 12.55 14 12 14Z" fill="white"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3D Visualization</h3>
              <p className="text-muted-foreground">
                Watch your music come to life with beautiful 3D animations that react to the beat and rhythm.
              </p>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17H7C5.9 17 5 16.1 5 15V9C5 7.9 5.9 7 7 7H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 7H17C18.1 7 19 7.9 19 9V15C19 16.1 18.1 17 17 17H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform Sync</h3>
              <p className="text-muted-foreground">
                Your playlists and preferences stay in sync across all your devices and music services.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <MusicPlayer onAudioDataChange={handleAudioDataChange} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
