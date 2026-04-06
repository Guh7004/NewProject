import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GalleryHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const rooms = [{
  name: 'Quarto - Fundo do mar 🌊',
  description: 'Um mergulho divertido em um ambiente marinho vibrante.',
  images: ['https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/30468a1b7bb60608130755bc89e322a4.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/03bb399a56f13ceac9894f2cd9da44e8.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/654b4b547c070b7de7902fd0da720fa0.png']
}, {
  name: 'Quarto - Astronauta 👩‍🚀',
  description: 'Uma aventura espacial com estrelas e planetas.',
  images: ['https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/370ad53c3799a7f7cacddf840ab8a781.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/fd163dac606fd83d2f001713a6dec24a.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/2509764d839111161d5a12fe775cf8e2.png']
}, {
  name: 'Quarto - Safari',
  description: 'Explore a selva com seus amigos animais.',
  images: ['https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/a1fcf412bcb07ea26279ba9987e314aa.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/cd8947467d831616337faf7432f6bd06.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/ab52fbdb836b08bf7e3fabbfd6406c1b.png']
}, {
  name: 'Quarto - Acampamento ⛺️',
  description: 'Uma noite sob as estrelas em um acampamento aconchegante.',
  images: ['https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/cb1ea016a4f6d6f519686dc732a5ea85.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/930dfcc7f82342f7a59385ab8ccef9d2.png', 'https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/920130f09f0ec2d476739f3a3f1b9c97.png']
}];

const RoomGalleryModal = ({
  room,
  open,
  onOpenChange,
  initialImageIndex
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  if (!room) return null;
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % room.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + room.images.length) % room.images.length);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/80 backdrop-blur-md border-primary/30 p-4 max-w-4xl w-full text-white">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img key={currentImageIndex} src={room.images[currentImageIndex]} alt={`${room.name} - Imagem ${currentImageIndex + 1}`} className="w-full h-[65vh] object-contain rounded-md" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.2
          }} />
          </AnimatePresence>
          <Button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2" size="icon">
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
          <Button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2" size="icon">
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {room.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-12 h-12 rounded-md overflow-hidden transition-all border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`}>
              <img src={_} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>)}
        </div>
        <div className="text-center mt-4 p-2">
          <h3 className="text-xl font-bold text-primary">{room.name}</h3>
          <p className="text-white/80 mt-1 text-sm">{room.description}</p>
        </div>
      </DialogContent>
    </Dialog>;
};

const RoomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % rooms.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + rooms.length) % rooms.length);
  };
  const openGallery = roomIndex => {
    setSelectedRoomIndex(roomIndex);
    setIsModalOpen(true);
  };
  return <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={currentIndex} initial={{
          opacity: 0,
          x: 100
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -100
        }} transition={{
          duration: 0.3
        }} className="relative h-80 bg-primary/20 rounded-xl overflow-hidden group">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={rooms[currentIndex].name} src={rooms[currentIndex].images[0]} />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {rooms[currentIndex].name}
                </h4>
                <p className="text-white/90 mb-4">
                  {rooms[currentIndex].description}
                </p>
              </div>
              <Button onClick={() => openGallery(currentIndex)} className="bg-primary/80 backdrop-blur-sm hover:bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 self-start">
                <GalleryHorizontal className="w-5 h-5" />
                Ver mais fotos deste quarto!
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2" size="icon">
        <ChevronLeft className="w-6 h-6 text-white" />
      </Button>

      <Button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2" size="icon">
        <ChevronRight className="w-6 h-6 text-white" />
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {rooms.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-primary/30'}`} />)}
      </div>
      
      {selectedRoomIndex !== null && <RoomGalleryModal room={rooms[selectedRoomIndex]} open={isModalOpen} onOpenChange={setIsModalOpen} initialImageIndex={0} />}
    </div>;
};
export default RoomCarousel;