
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PawPrint } from 'lucide-react';
const Header = () => {
  return <header className="relative overflow-hidden bg-gradient-to-r from-primary via-[#9646ff] to-secondary py-8 shadow-2xl shadow-primary/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OS00IDQgNCA0LTEuNzktNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLNzktNC0NHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
            <img src="https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/imagem_2025-10-17_122208666-P42lv.png" alt="Logo do Club Do Pet" className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border-4 border-white/50 shadow-lg" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <PawPrint className="w-8 h-8 text-accent transform -rotate-12" />
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight" style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
              }}>Club Do Pet</h1>
                <PawPrint className="w-8 h-8 text-accent transform rotate-12" />
              </div>
              <p className="text-lg md:text-xl text-white/80 font-medium">Seu Club de Estimação</p>
            </div>
          </div>
          
          <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.5,
          type: 'spring',
          stiffness: 200
        }} className="bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full inline-block mb-4 shadow-lg">
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Reservas abertas para o final do ano!
            </span>
          </motion.div>

          <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
            Hospedagem 100% monitorada • Só mulheres • Estrutura completa para seu pet
          </p>
        </motion.div>
      </div>
    </header>;
};
export default Header;
