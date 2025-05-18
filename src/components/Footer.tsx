
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue"></div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                HarmonyHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Unifying your music experience across Spotify, Deezer, and YouTube with immersive 3D visualization
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Navigation</h3>
              <ul className="space-y-1">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore</Link></li>
                <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Legal</h3>
              <ul className="space-y-1">
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Connect</h3>
              <ul className="space-y-1">
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HarmonyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
