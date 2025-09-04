// src/pages/Home.jsx
import React from "react";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo ao MeuSite
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Um site moderno e responsivo criado com React, Vite e Tailwind CSS
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
            Saiba Mais
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Sobre Nós
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Somos uma equipe dedicada a criar experiências digitais excepcionais. 
              Nosso foco está em desenvolver soluções modernas, responsivas e 
              centradas no usuário, utilizando as mais recentes tecnologias web.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance</h3>
                <p className="text-gray-600">
                  Sites otimizados para velocidade e performance máxima
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsivo</h3>
                <p className="text-gray-600">
                  Design adaptável para todos os dispositivos e tamanhos de tela
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Qualidade</h3>
                <p className="text-gray-600">
                  Código limpo e bem estruturado seguindo as melhores práticas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos criar algo incrível juntos
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3">
            Entre em Contato
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
