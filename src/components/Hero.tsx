
import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = "Discover Your Perfect Sound",
  subtitle = "Stream music from Spotify, Deezer, and YouTube all in one place with immersive 3D visualization",
  ctaLabel = "Start Exploring",
  onCtaClick
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-neon-purple/20 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-neon-blue/20 blur-3xl"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
          {title}
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        {subtitle}
      </p>
      
      <Button 
        size="lg" 
        className="neon-border bg-transparent hover:bg-primary/10 text-white font-medium px-8 py-6"
        onClick={onCtaClick}
      >
        {ctaLabel}
      </Button>
      
      <div className="mt-12 flex items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-spotify flex items-center justify-center mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.14 12.94a.57.57 0 0 1-.76.22 10.93 10.93 0 0 0-5.22-1.35c-1.09 0-2.17.13-3.23.4a.57.57 0 0 1-.23-1.12c1.16-.3 2.36-.45 3.55-.45 2.07 0 4.06.52 5.66 1.54a.55.55 0 0 1 .23.76zm1.1-2.45a.7.7 0 0 1-.96.28c-1.82-1.13-4.2-1.78-6.8-1.78-1.26 0-2.5.16-3.7.47a.71.71 0 0 1-.35-1.36c1.36-.35 2.77-.53 4.18-.53 2.87 0 5.54.72 7.63 2a.7.7 0 0 1 0 .92zm.1-2.55a.83.83 0 0 1-1.15.32 15.62 15.62 0 0 0-8.1-2.1c-1.51 0-2.99.18-4.41.54a.84.84 0 0 1-.42-1.62c1.58-.4 3.24-.61 4.9-.61 3.27 0 6.73.84 8.86 2.32a.83.83 0 0 1 .32 1.15z" fill="white" />
            </svg>
          </div>
          <span className="text-sm">Spotify</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-deezer flex items-center justify-center mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6h-3v3h3V6zm-5 0h-3v3h3V6zm-5 0H7v3h3V6zm-5 0H2v3h3V6zm15 4h-3v3h3v-3zm-5 0h-3v3h3v-3zm-5 0H7v3h3v-3zm-5 0H2v3h3v-3zm15 4h-3v3h3v-3zm-5 0h-3v3h3v-3zm-5 0H7v3h3v-3zm-5 0H2v3h3v-3z" fill="white" />
            </svg>
          </div>
          <span className="text-sm">Deezer</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-youtube flex items-center justify-center mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="white" />
              <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="black" />
            </svg>
          </div>
          <span className="text-sm">YouTube</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
