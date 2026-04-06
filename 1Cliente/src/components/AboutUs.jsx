import React from 'react';
import { motion } from 'framer-motion';
const AboutUs = () => {
  return <motion.section className="mb-12" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/30 backdrop-blur-sm border border-primary/20 p-8 rounded-xl">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-white mb-4">Sobre Nós</h2>
          <p className="text-secondary mb-4">O Club do Pet é um espaço de 1000 m² pensado com amor, segurança e qualidade para o seu pet.
Contamos com amplas acomodações, ambientes monitorados 24h por dia e uma equipe dedicada ao bem-estar dos animais.
Utilizamos produtos de excelência, com higienização de ponta para garantir saúde e conforto.
Somos o hotel, creche e banho & tosa mais bem avaliado da região. Seu pet merece estar em um local seguro, confiável e preparado para cuidar dele com carinho e profissionalismo.
No Club do Pet, investimos diariamente em melhorias, novidades, brinquedos e adaptações. Tudo é pensado para garantir o máximo conforto, alegria e bem-estar dos pets em cada momento com a gente!
Escolha o Club do Pet: onde seu pet é tratado como família.</p>
          <p className="text-secondary"></p>
        </div>
        <div className="order-1 md:order-2">
          <img className="rounded-lg shadow-lg object-cover w-full h-64 md:h-80" alt="Fachada do Club do Pet" src="https://horizons-cdn.hostinger.com/6c753abf-4d4a-47e1-a78d-48ae58b199df/imagem_2025-10-14_110339633-hBkSp.png" />
        </div>
      </div>
    </motion.section>;
};
export default AboutUs;