
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeScene from '@/components/ThreeScene';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placeholderTracks } from '@/lib/audioUtils';

const Profile = () => {
  const userPlaylists = [
    {
      id: '1',
      title: 'Electronic Vibes',
      tracks: 24,
      cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    },
    {
      id: '2',
      title: 'Chill & Work',
      tracks: 42,
      cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    },
    {
      id: '3',
      title: 'Weekend Mix',
      tracks: 18,
      cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1'
    }
  ];

  const connectedServices = [
    { name: 'Spotify', connected: true, color: 'bg-spotify' },
    { name: 'YouTube', connected: false, color: 'bg-youtube' },
    { name: 'Deezer', connected: true, color: 'bg-deezer' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Background with reduced intensity */}
      <div className="opacity-50">
        <ThreeScene />
      </div>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glassmorphism rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-neon-purple to-neon-blue">
                <div className="w-full h-full bg-background/40 flex items-center justify-center text-2xl font-bold">
                  JD
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">john.doe@example.com</p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                  {connectedServices.map(service => (
                    <div 
                      key={service.name} 
                      className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10"
                    >
                      <div className={`w-2 h-2 rounded-full ${service.connected ? service.color : 'bg-muted'}`}></div>
                      <span className="text-xs">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ml-auto">
                <Button variant="outline" className="neon-border">Edit Profile</Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="playlists">
            <TabsList className="glassmorphism mb-6">
              <TabsTrigger value="playlists">My Playlists</TabsTrigger>
              <TabsTrigger value="recent">Recently Played</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Playlists</h2>
                <Button size="sm" variant="default">Create Playlist</Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPlaylists.map(playlist => (
                  <div key={playlist.id} className="glassmorphism rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                    <img 
                      src={playlist.cover} 
                      alt={playlist.title}
                      className="w-full aspect-square object-cover" 
                    />
                    <div className="p-3">
                      <h3 className="font-medium truncate">{playlist.title}</h3>
                      <p className="text-sm text-muted-foreground">{playlist.tracks} tracks</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
              <div className="glassmorphism rounded-lg p-4">
                <div className="space-y-2">
                  {placeholderTracks.map(track => (
                    <div key={track.id} className="flex items-center p-2 hover:bg-white/5 rounded-md cursor-pointer">
                      <img 
                        src={track.cover} 
                        alt={track.album}
                        className="w-12 h-12 object-cover rounded mr-3" 
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <div className="text-sm text-muted-foreground ml-4">
                        {track.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <h2 className="text-xl font-semibold mb-4">Favorite Tracks</h2>
              <div className="glassmorphism rounded-lg p-4">
                <div className="space-y-2">
                  {placeholderTracks.slice(0, 3).map(track => (
                    <div key={track.id} className="flex items-center p-2 hover:bg-white/5 rounded-md cursor-pointer">
                      <img 
                        src={track.cover} 
                        alt={track.album}
                        className="w-12 h-12 object-cover rounded mr-3" 
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <div className="text-sm text-muted-foreground ml-4">
                        {track.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
              <div className="glassmorphism rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Connected Services</h3>
                <div className="space-y-3">
                  {connectedServices.map(service => (
                    <div key={service.name} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                        <span>{service.name}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {service.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h3 className="font-medium mb-3">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2">
                    <span>Enable 3D Visualizations</span>
                    <div className="w-10 h-5 bg-muted rounded-full p-1 flex items-center">
                      <div className="w-3 h-3 bg-neon-purple rounded-full ml-auto"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <span>Synchronize Playlists</span>
                    <div className="w-10 h-5 bg-muted rounded-full p-1 flex items-center">
                      <div className="w-3 h-3 bg-neon-purple rounded-full ml-auto"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <span>Allow Notifications</span>
                    <div className="w-10 h-5 bg-muted rounded-full p-1 flex items-center">
                      <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
