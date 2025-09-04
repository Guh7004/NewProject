const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            Sobre Nós
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8 text-center leading-relaxed">
              Conheça mais sobre nossa história, missão e valores
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossa História</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fundada em 2025, nossa empresa nasceu da paixão por criar experiências 
                  digitais excepcionais. Começamos como uma pequena equipe de desenvolvedores 
                  e designers com um grande sonho: transformar ideias em realidade digital.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Hoje, somos reconhecidos por nossa expertise em desenvolvimento web moderno, 
                  sempre utilizando as tecnologias mais atuais e seguindo as melhores práticas 
                  da indústria.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="leading-relaxed">
                  Criar soluções digitais inovadoras que impactem positivamente a vida das 
                  pessoas e o sucesso dos negócios, sempre priorizando qualidade, 
                  performance e experiência do usuário.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Nossos Valores
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Inovação</h3>
                  <p className="text-gray-600 text-sm">
                    Sempre buscando novas tecnologias e abordagens
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Qualidade</h3>
                  <p className="text-gray-600 text-sm">
                    Comprometimento com a excelência em cada projeto
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Colaboração</h3>
                  <p className="text-gray-600 text-sm">
                    Trabalho em equipe e parceria com nossos clientes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Agilidade</h3>
                  <p className="text-gray-600 text-sm">
                    Entrega rápida sem comprometer a qualidade
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Vamos Trabalhar Juntos?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Estamos sempre prontos para novos desafios e parcerias
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contato@meusite.com" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Entre em Contato
                </a>
                <a 
                  href="/" 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Voltar ao Início
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

