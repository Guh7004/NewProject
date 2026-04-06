import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import AboutUs from '@/components/AboutUs';
import HospedagemTab from '@/components/HospedagemTab';
import CrecheTab from '@/components/CrecheTab';
import BanhoTosaTab from '@/components/BanhoTosaTab';
import Footer from '@/components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('hospedagem');

  return (
    <>
      <Helmet>
        <title>Clube do Pet - Hospedagem, Creche e Banho &amp; Tosa</title>
        <meta name="description" content="Hospedagem 100% monitorada, creche temática e serviços de banho &amp; tosa para seu pet. Reservas abertas de novembro a março!" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#11051a] to-gray-900 flex flex-col">
        <Header />
        
        <main className="container mx-auto px-4 py-8 flex-grow">
          <AboutUs />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/30 backdrop-blur-sm p-1 rounded-xl border border-primary/20">
              <TabsTrigger 
                value="hospedagem"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300 text-secondary"
              >
                🏠 Hospedagem
              </TabsTrigger>
              <TabsTrigger 
                value="creche"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300 text-secondary"
              >
                🎉 Creche
              </TabsTrigger>
              <TabsTrigger 
                value="banho"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300 text-secondary"
              >
                🧼 Banho &amp; Tosa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hospedagem">
              <HospedagemTab />
            </TabsContent>

            <TabsContent value="creche">
              <CrecheTab />
            </TabsContent>

            <TabsContent value="banho">
              <BanhoTosaTab />
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;