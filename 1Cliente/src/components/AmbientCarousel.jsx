import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AmbientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ambients = [
    { name: '🏖️ Praia', description: 'Areia, sol e diversão à beira-mar', imageDescription: 'An indoor pet play area designed like a beach with sand, beach toys, and ocean decorations.' },
    { name: '🎬 Cinema', description: 'Sessão de filmes para pets relaxarem', imageDescription: 'A cozy pet cinema room with comfortable beds and a large screen showing pet-friendly content.' },
    { name: '🎈 Piscina de Bolinha', description: 'Mergulho em diversão colorida', imageDescription: 'A large, colorful ball pit for pets, filled with vibrant balls in a safe play area.' },
    { name: '💦 Piscina de Água', description: 'Refrescância e exercício aquático', imageDescription: 'A clean indoor pet swimming pool with clear water, safety features, and floating pool toys.' },
    { name: '🎪 Playground', description: 'Brinquedos e obstáculos divertidos', imageDescription: 'A fun pet playground featuring tunnels, ramps, toys, and various agility equipment.' },
    { name: '🏕️ Acampamento', description: 'Aventura ao ar livre indoor', imageDescription: 'An indoor camping-themed area for pets with small tents, artificial grass, and nature elements.' },
    { name: '🌈 Cromoterapia', description: 'Cores que acalmam e energizam', imageDescription: 'A peaceful pet room illuminated by chromotherapy colored lights, creating a relaxing atmosphere.' },
    { name: '🎵 Musicoterapia', description: 'Sons relaxantes para bem-estar', imageDescription: 'A serene pet room equipped with speakers, soft lighting, and comfortable resting areas for music therapy.' },
  ];
  
  const getCurrentImage = (index) => {
    switch(index) {
        case 0: return <img className="w-full h-full object-cover" alt="Praia para cachorros" src="https://images.unsplash.com/photo-1582869503246-933713107424" />;
        case 1: return <img className="w-full h-full object-cover" alt="Cinema para cachorros" src="https://images.unsplash.com/photo-1571985224468-bfb817a845be" />;
        case 2: return <img className="w-full h-full object-cover" alt="Piscina de bolinhas para cachorros" src="https://images.unsplash.com/photo-1551902751-53e4614481aa" />;
        case 3: return <img className="w-full h-full object-cover" alt="Piscina de água para cachorros" src="https://images.unsplash.com/photo-1551902751-53e4614481aa" />;
        case 4: return <img className="w-full h-full object-cover" alt="Playground para cachorros" src="https://images.unsplash.com/photo-1543449237-511ee1d15a72" />;
        case 5: return <img className="w-full h-full object-cover" alt="Acampamento para cachorros" src="https://images.unsplash.com/photo-1614863582337-a64abf747b1d" />;
        case 6: return <img className="w-full h-full object-cover" alt="Cromoterapia para cachorros" src="https://images.unsplash.com/photo-1671727896165-a109f599f8fa" />;
        case 7: return <img className="w-full h-full object-cover" alt="Musicoterapia para cachorros" src="https://images.unsplash.com/photo-1536968637674-f4766dcdc2a5" />;
        default: return <img className="w-full h-full object-cover" alt="Ambiente de creche para cachorros" src="https://images.unsplash.com/photo-1669324735864-d8007bf3e645" />;
    }
  }


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ambients.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ambients.length) % ambients.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative h-80 bg-primary/20 rounded-xl overflow-hidden"
          >
            {getCurrentImage(currentIndex)}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h4 className="text-2xl font-bold text-white mb-2">
                {ambients[currentIndex].name}
              </h4>
              <p className="text-white/90">
                {ambients[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2"
        size="icon"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2"
        size="icon"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {ambients.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AmbientCarousel;