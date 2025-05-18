
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeScene from '@/components/ThreeScene';
import { placeholderTracks } from '@/lib/audioUtils';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tracks, setTracks] = useState(placeholderTracks);
  const [filteredTracks, setFilteredTracks] = useState(placeholderTracks);
  
  // Filter tracks based on search query and active tab
  useEffect(() => {
    let results = [...tracks];
    
    // Filter by platform if not "all"
    if (activeTab !== 'all') {
      results = results.filter(track => track.platform === activeTab);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        track => 
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query) ||
          track.album.toLowerCase().includes(query)
      );
    }
    
    setFilteredTracks(results);
  }, [searchQuery, activeTab, tracks]);
  
  // Platform icon component
  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'spotify':
        return <div className="w-3 h-3 bg-spotify rounded-full" />;
      case 'youtube':
        return <div className="w-3 h-3 bg-youtube rounded-full" />;
      case 'deezer':
        return <div className="w-3 h-3 bg-deezer rounded-full" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Background with reduced intensity */}
      <div className="opacity-50">
        <ThreeScene />
      </div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Music</h1>
          <p className="text-muted-foreground">
            Discover tracks across all your favorite platforms
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glassmorphism"
            />
            <Button>
              Search
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="glassmorphism">
            <TabsTrigger value="all">All Platforms</TabsTrigger>
            <TabsTrigger value="spotify">Spotify</TabsTrigger>
            <TabsTrigger value="deezer">Deezer</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTracks.map(track => (
                <div key={track.id} className="glassmorphism p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={track.cover} 
                      alt={track.album}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={track.platform} />
                        <h3 className="font-medium truncate">{track.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      <p className="text-xs text-muted-foreground">{track.album}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="spotify" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTracks.map(track => (
                <div key={track.id} className="glassmorphism p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={track.cover} 
                      alt={track.album}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div className="overflow-hidden">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      <p className="text-xs text-muted-foreground">{track.album}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="deezer" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTracks.map(track => (
                <div key={track.id} className="glassmorphism p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={track.cover} 
                      alt={track.album}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div className="overflow-hidden">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      <p className="text-xs text-muted-foreground">{track.album}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="youtube" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTracks.map(track => (
                <div key={track.id} className="glassmorphism p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={track.cover} 
                      alt={track.album}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div className="overflow-hidden">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      <p className="text-xs text-muted-foreground">{track.album}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
