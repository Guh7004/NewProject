import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import './App.css';

// URLs públicas das imagens
const kijujuBg = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop';
const chrisRedfield = 'data:image/jpeg;base64,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';
const shevaAlomar = 'https://static.wikia.nocookie.net/residentevil/images/8/8a/RE5_Sheva_Alomar.jpg';
const jillValentine = 'https://static.wikia.nocookie.net/residentevil/images/f/f0/RE5_Jill_Valentine.jpg';
const albertWesker = 'https://static.wikia.nocookie.net/residentevil/images/a/a0/RE5_Albert_Wesker.jpg';
const uroboros = 'https://static.wikia.nocookie.net/residentevil/images/d/d5/Uroboros_Test_Subject.jpg';
const executionerMajini = 'https://static.wikia.nocookie.net/residentevil/images/e/e4/Executioner_Majini.jpg';
const irving = 'https://static.wikia.nocookie.net/residentevil/images/b/b5/Ricardo_Irving.jpg';
const weskerFinal = 'https://static.wikia.nocookie.net/residentevil/images/f/f8/Wesker_Uroboros.jpg';
const gameplay = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop';

// URLs das armas
const m92f = 'https://static.wikia.nocookie.net/residentevil/images/9/9a/M92F_RE5.jpg';
const swM29 = 'https://static.wikia.nocookie.net/residentevil/images/c/c4/S%26W_M29.jpg';
const lightningHawk = 'https://static.wikia.nocookie.net/residentevil/images/a/a8/Lightning_Hawk.jpg';
const ak74 = 'https://static.wikia.nocookie.net/residentevil/images/f/f1/AK-74_RE5.jpg';
const sig556 = 'https://static.wikia.nocookie.net/residentevil/images/d/d8/SIG_556.jpg';
const psg1 = 'https://static.wikia.nocookie.net/residentevil/images/b/b7/H%26K_PSG-1.jpg';
const m3Shotgun = 'https://static.wikia.nocookie.net/residentevil/images/e/e1/M3_Shotgun.jpg';
const ithacaM37 = 'https://static.wikia.nocookie.net/residentevil/images/a/a2/Ithaca_M37.jpg';
const hydra = 'https://static.wikia.nocookie.net/residentevil/images/c/c9/Hydra_RE5.jpg';
const grenadeLauncher = 'https://static.wikia.nocookie.net/residentevil/images/f/f5/Grenade_Launcher.jpg';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWeaponTab, setActiveWeaponTab] = useState('pistols');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const characters = [
    {
      name: 'Chris Redfield',
      role: 'Agente B.S.A.A.',
      image: chrisRedfield,
      stats: {
        força: 90,
        resistência: 85,
        precisão: 80
      }
    },
    {
      name: 'Sheva Alomar',
      role: 'Agente B.S.A.A. África',
      image: shevaAlomar,
      stats: {
        agilidade: 90,
        inteligência: 85,
        precisão: 88
      }
    },
    {
      name: 'Jill Valentine',
      role: 'Ex-S.T.A.R.S.',
      image: jillValentine,
      stats: {
        experiência: 95,
        sobrevivência: 90,
        combate: 85
      }
    },
    {
      name: 'Albert Wesker',
      role: 'Antagonista Principal',
      image: albertWesker,
      stats: {
        poder: 100,
        velocidade: 95,
        inteligência: 90
      }
    }
  ];

  const bosses = [
    { name: 'Uroboros', type: 'Parasita Experimental', image: uroboros },
    { name: 'Executioner Majini', type: 'Majini Executioner', image: executionerMajini },
    { name: 'Ricardo Irving', type: 'Traficante de Armas', image: irving },
    { name: 'Wesker Final', type: 'Forma Uroboros', image: weskerFinal }
  ];

  const weapons = {
    pistols: [
      { name: 'M92F', image: m92f, damage: 60, precision: 75, rate: 80 },
      { name: 'S&W M29', image: swM29, damage: 95, precision: 85, rate: 40 },
      { name: 'Lightning Hawk', image: lightningHawk, damage: 100, precision: 90, rate: 35 }
    ],
    rifles: [
      { name: 'AK-74', image: ak74, damage: 85, precision: 70, rate: 90 },
      { name: 'SIG 556', image: sig556, damage: 80, precision: 85, rate: 75 },
      { name: 'H&K PSG-1', image: psg1, damage: 100, precision: 95, rate: 30 }
    ],
    shotguns: [
      { name: 'M3 Shotgun', image: m3Shotgun, damage: 90, precision: 60, rate: 50 },
      { name: 'Ithaca M37', image: ithacaM37, damage: 85, precision: 65, rate: 70 },
      { name: 'Hydra', image: hydra, damage: 100, precision: 55, rate: 25 }
    ],
    explosives: [
      { name: 'Grenade Launcher', image: grenadeLauncher, damage: 100, precision: 80, rate: 20 },
      { name: 'Hand Grenade', image: gameplay, damage: 95, precision: 60, rate: 40 },
      { name: 'Proximity Bomb', image: gameplay, damage: 100, precision: 90, rate: 10 }
    ]
  };

  const storyEvents = [
    {
      title: '2009 - Kijuju, África',
      description: 'Chris Redfield é enviado para a África para investigar relatórios sobre a venda de armas biológicas no mercado negro. Ele se junta à agente local Sheva Alomar da B.S.A.A. África.'
    },
    {
      title: 'A Descoberta',
      description: 'A dupla descobre que Albert Wesker está por trás de um plano para infectar o mundo inteiro com um novo vírus chamado Uroboros, usando a população local como cobaias.'
    },
    {
      title: 'Jill Valentine',
      description: 'Chris reencontra Jill Valentine, que estava sendo controlada por Wesker através de um dispositivo de controle mental. Após libertá-la, ela se junta à luta contra Wesker.'
    },
    {
      title: 'Confronto Final',
      description: 'O confronto final acontece em um vulcão ativo, onde Wesker, infectado pelo vírus Uroboros, se transforma em uma criatura monstruosa. Chris e Sheva devem impedir seus planos de dominação mundial.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="re5-nav">
        <div className="re5-container">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="text-2xl font-bold text-red-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              RESIDENT EVIL 5
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['início', 'personagens', 'chefes', 'gameplay', 'arsenal', 'história'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-300 uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['início', 'personagens', 'chefes', 'gameplay', 'arsenal', 'história'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-red-500 transition-colors duration-300 uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="início" className="re5-hero">
        <img src={kijujuBg} alt="Kijuju" className="re5-hero-bg" />
        <div className="re5-biohazard text-red-500/20 text-9xl top-20 right-20">☢</div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="re5-title text-6xl md:text-8xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            RESIDENT EVIL 5
          </motion.h1>
          <motion.p
            className="re5-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Sobreviva ao terror biológico em Kijuju, África. Uma nova ameaça emerge das sombras da Umbrella Corporation.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <button
              onClick={() => scrollToSection('gameplay')}
              className="re5-button"
            >
              Explorar
            </button>
            <button
              onClick={() => scrollToSection('história')}
              className="re5-button bg-transparent border-2 border-red-600 hover:bg-red-600"
            >
              História
            </button>
          </motion.div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="personagens" className="re5-section">
        <div className="re5-container">
          <motion.h2
            className="re5-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PERSONAGENS
          </motion.h2>
          <motion.p
            className="re5-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Conheça os heróis que enfrentam o terror biológico
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                className="re5-character-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="re5-character-image"
                />
                <div className="re5-character-overlay">
                  <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                  <p className="text-red-400 text-sm mb-4">{character.role}</p>
                  <div className="space-y-2">
                    {Object.entries(character.stats).map(([stat, value]) => (
                      <div key={stat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{stat}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="re5-progress-bar">
                          <motion.div
                            className={`re5-progress-fill ${stat === 'força' || stat === 'poder' ? 'bg-red-500' :
                                stat === 'precisão' || stat === 'inteligência' ? 'bg-yellow-500' :
                                  'bg-green-500'
                              }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bosses Section */}
      <section id="chefes" className="re5-section bg-gray-900/50">
        <div className="re5-container">
          <motion.h2
            className="re5-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            CHEFES
          </motion.h2>
          <motion.p
            className="re5-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Enfrente as criaturas mais perigosas de Kijuju
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bosses.map((boss, index) => (
              <motion.div
                key={boss.name}
                className="re5-card group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={boss.image}
                    alt={boss.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{boss.name}</h3>
                <p className="text-red-400">{boss.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="re5-section">
        <div className="re5-container">
          <motion.h2
            className="re5-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            GAMEPLAY
          </motion.h2>
          <motion.p
            className="re5-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experiência cooperativa de sobrevivência e ação
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={gameplay}
                alt="Gameplay"
                className="rounded-lg border-2 border-red-600/30"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { icon: '🤝', title: 'Cooperativo', desc: 'Jogue com um amigo em modo cooperativo online ou local' },
                { icon: '⚔️', title: 'Combate Tático', desc: 'Sistema de mira aprimorado e combate corpo a corpo' },
                { icon: '🔧', title: 'Customização', desc: 'Upgrade de armas e equipamentos personalizáveis' },
                { icon: '🌍', title: 'Exploração', desc: 'Explore os vastos cenários da África em busca de segredos' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section id="arsenal" className="re5-section bg-gray-900/50">
        <div className="re5-container">
          <motion.h2
            className="re5-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ARSENAL
          </motion.h2>
          <motion.p
            className="re5-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Armas e equipamentos para sobreviver ao terror
          </motion.p>

          {/* Weapon Tabs */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-700">
            {[
              { id: 'pistols', label: 'Pistolas', icon: '🔫' },
              { id: 'rifles', label: 'Rifles', icon: '🎯' },
              { id: 'shotguns', label: 'Shotguns', icon: '💥' },
              { id: 'explosives', label: 'Explosivos', icon: '🧨' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWeaponTab(tab.id)}
                className={`re5-tab-button ${activeWeaponTab === tab.id ? 'active' : ''}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Weapon Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={activeWeaponTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {weapons[activeWeaponTab].map((weapon, index) => (
              <motion.div
                key={weapon.name}
                className="re5-weapon-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="re5-weapon-image"
                />
                <h3 className="text-xl font-bold text-white mb-4">{weapon.name}</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Dano', value: weapon.damage, color: 'bg-red-500' },
                    { label: 'Precisão', value: weapon.precision, color: 'bg-yellow-500' },
                    { label: 'Cadência', value: weapon.rate, color: 'bg-green-500' }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.value}%</span>
                      </div>
                      <div className="re5-progress-bar">
                        <motion.div
                          className={`re5-progress-fill ${stat.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="história" className="re5-section">
        <div className="re5-container">
          <motion.h2
            className="re5-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            HISTÓRIA
          </motion.h2>
          <motion.p
            className="re5-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A narrativa épica de terror e sobrevivência
          </motion.p>

          <div className="max-w-4xl mx-auto">
            <div className="re5-timeline">
              {storyEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="re5-timeline-item"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-900/80 p-6 rounded-lg border border-red-600/30">
                    <h3 className="text-xl font-bold text-red-500 mb-3">{event.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Location Showcase */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={kijujuBg}
                alt="Kijuju, África"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">Kijuju, África</h3>
                  <p className="text-gray-300">O cenário principal onde a história se desenrola</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="re5-footer">
        <div className="re5-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-4">RESIDENT EVIL 5</h3>
              <p className="text-gray-400">
                Sobreviva ao terror biológico em uma das aventuras mais intensas da franquia Resident Evil.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                {['Personagens', 'Chefes', 'Gameplay', 'Arsenal'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                {['📘', '🐦', '📷', '🎮'].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 Capcom. Todos os direitos reservados. Resident Evil é uma marca registrada da Capcom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

