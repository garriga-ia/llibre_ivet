
import React, { useState, useMemo, useRef, useEffect } from 'react';
import StoryPage from './components/StoryPage';
import { storyData } from './constants/storyData';
import { Page } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<number[]>([0]);
  const [isFading, setIsFading] = useState(false);
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const waterAudioRef = useRef<HTMLAudioElement>(null);
  const caveAudioRef = useRef<HTMLAudioElement>(null);
  const roureAudioRef = useRef<HTMLAudioElement>(null);

  const currentPageId = history[history.length - 1];
  
  const currentPageData = useMemo(
    () => storyData.find(p => p.id === currentPageId) as Page,
    [currentPageId]
  );

  useEffect(() => {
    const backgroundAudioEl = backgroundAudioRef.current;
    const waterAudioEl = waterAudioRef.current;
    const caveAudioEl = caveAudioRef.current;
    const roureAudioEl = roureAudioRef.current;

    if (!backgroundAudioEl || !waterAudioEl || !caveAudioEl || !roureAudioEl) return;

    const mainMusicPages = [1, 2, 3];
    const waterMusicPages = [4, 7, 8, 14];
    const caveMusicPages = [5, 10, 11];
    const roureMusicPages = [6, 12, 13];

    const playAudio = (audioToPlay: HTMLAudioElement) => {
      audioToPlay.play().catch(error => {
        console.error("Error en reproduir l'àudio:", error);
      });
    };

    backgroundAudioEl.pause();
    waterAudioEl.pause();
    caveAudioEl.pause();
    roureAudioEl.pause();

    if (mainMusicPages.includes(currentPageId)) {
      playAudio(backgroundAudioEl);
    } else if (waterMusicPages.includes(currentPageId)) {
      playAudio(waterAudioEl);
    } else if (caveMusicPages.includes(currentPageId)) {
      playAudio(caveAudioEl);
    } else if (roureMusicPages.includes(currentPageId)) {
      playAudio(roureAudioEl);
    }
  }, [currentPageId]);

  const handleNavigate = (pageId: number) => {
    setIsFading(true);
    setTimeout(() => {
      setHistory(prev => [...prev, pageId]);
      window.scrollTo(0, 0);
      setIsFading(false);
    }, 500); // Corresponds to fade-out duration
  };
  
  const handleGoBack = () => {
    if (history.length <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      setHistory(prev => prev.slice(0, -1));
      window.scrollTo(0, 0);
      setIsFading(false);
    }, 500);
  };

  const handleRestart = () => {
    setIsFading(true);
    setTimeout(() => {
      setHistory([0]);
      window.scrollTo(0, 0);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-blue-200 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-y-auto">
      <audio ref={backgroundAudioRef} src="https://files.catbox.moe/9jb88e.mp3" loop />
      <audio ref={waterAudioRef} src="https://files.catbox.moe/xpp05i.mp3" loop />
      <audio ref={caveAudioRef} src="https://files.catbox.moe/4cp00x.mp3" loop />
      <audio ref={roureAudioRef} src="https://files.catbox.moe/fgwe3d.mp3" loop />
      <main className={`w-full flex-grow flex items-center justify-center transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {currentPageData && (
          <StoryPage page={currentPageData} onNavigate={handleNavigate} onRestart={handleRestart} />
        )}
      </main>
      
      <footer className="w-full max-w-4xl mt-8">
        {currentPageData && (
            <div className="relative h-10 flex justify-center items-center text-purple-800 font-bold">
              <div className="absolute left-0">
                  {history.length > 1 && (
                  <button 
                      onClick={handleGoBack}
                      className="px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md hover:bg-white/90 transition-all duration-300 text-lg"
                      aria-label="Pàgina anterior"
                  >
                      &larr; Pàgina anterior
                  </button>
                  )}
              </div>
              <div className="px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md text-lg">
                  {currentPageData.id === 0 ? 'Portada' : `Pàgina ${currentPageData.id}`}
              </div>
            </div>
        )}
      </footer>
    </div>
  );
};

export default App;

