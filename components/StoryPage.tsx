
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import ChoiceButton from './ChoiceButton';

interface StoryPageProps {
  page: Page;
  onNavigate: (pageId: number) => void;
  onRestart: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ page, onNavigate, onRestart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    const timer = setTimeout(() => {
      // Preload image before fading in
      const img = new Image();
      img.src = page.image;
      img.onload = () => {
        setImageLoaded(true);
      };
    }, 100); // short delay to allow transition
    return () => clearTimeout(timer);
  }, [page.id, page.image]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 w-full max-w-4xl mx-auto">
      <img
        key={page.id} // Add key to force re-render and re-trigger transition
        src={page.image}
        alt={page.title}
        className={`w-full h-auto max-h-96 object-contain rounded-xl shadow-lg mb-8 transition-opacity duration-1000 ease-in-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="text-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800">{page.title}</h1>
        <p className="text-xl md:text-2xl leading-loose whitespace-pre-line">{page.text}</p>
        
        {page.choices.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">Què fas?</h2>
            <div className="flex flex-col">
              {page.choices.map((choice, index) => (
                <ChoiceButton key={index} onClick={() => onNavigate(choice.goToPage)}>
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)})</span>
                  {choice.text}
                </ChoiceButton>
              ))}
            </div>
          </div>
        )}
        
        {page.ending && (
          <div className="mt-10 text-center p-6 bg-purple-100/50 rounded-lg">
            <p className="text-3xl font-bold text-purple-900">{page.ending}</p>
            <button
              onClick={onRestart}
              className="mt-6 px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Tornar a començar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;