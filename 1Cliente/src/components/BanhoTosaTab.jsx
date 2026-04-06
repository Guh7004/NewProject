import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const BanhoTosaTab = () => {
  const [porte, setPorte] = useState('');
  const [servicoPrincipal, setServicoPrincipal] = useState('');
  const [extras, setExtras] = useState({
    hidratacaoSimples: false,
    hidratacaoProfunda: false,
    corteUnhas: false,
    limpezaOuvidos: false,
  });
  const [calculatedValue, setCalculatedValue] = useState(null);

  const precos = {
    banho: { p: 85, m: 105, g: 140, gg: 180 },
    tosaHigienica: { p: 120, m: 150, g: undefined, gg: undefined },
    tosaRaca: { p: 120, m: 120, g: 120, gg: 120 },
    tosaBebe: { p: 150, m: 150, g: 150, gg: 150 },
    extras: {
      hidratacaoSimples: 20,
      hidratacaoProfunda: 30,
      corteUnhas: 10,
      limpezaOuvidos: 10,
    }
  };

  const portes = [
      { id: 'p', label: 'Pequeno (até 10kg)' },
      { id: 'm', label: 'Médio (10-25kg)' },
      { id: 'g', label: 'Grande (25-45kg)' },
      { id: 'gg', label: 'Gigante (45kg+)' },
  ];

  const servicosPorPorte = {
    p: [
      { id: 'banho', label: '🛁 Banho Simples' },
      { id: 'tosaHigienica', label: '✂️ Tosa Higiênica' },
      { id: 'tosaRaca', label: '✂️ Tosa da Raça' },
      { id: 'tosaBebe', label: '✂️ Tosa Bebê' },
    ],
    m: [
      { id: 'banho', label: '🛁 Banho Simples' },
      { id: 'tosaHigienica', label: '✂️ Tosa Higiênica' },
      { id: 'tosaRaca', label: '✂️ Tosa da Raça' },
      { id: 'tosaBebe', label: '✂️ Tosa Bebê' },
    ],
    g: [
      { id: 'banho', label: '🛁 Banho Simples' },
      { id: 'tosaRaca', label: '✂️ Tosa da Raça' },
      { id: 'tosaBebe', label: '✂️ Tosa Bebê' },
    ],
    gg: [
      { id: 'banho', label: '🛁 Banho Simples' },
      { id: 'tosaRaca', label: '✂️ Tosa da Raça' },
      { id: 'tosaBebe', label: '✂️ Tosa Bebê' },
    ],
  };

  const handleExtraChange = (id) => {
    setExtras(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!porte || !servicoPrincipal) {
      setCalculatedValue(null);
      return;
    }

    let total = precos[servicoPrincipal]?.[porte] || 0;
    
    for (const extra in extras) {
      if (extras[extra]) {
        total += precos.extras[extra];
      }
    }
    
    setCalculatedValue(total);

  }, [porte, servicoPrincipal, extras]);
  
  const handleAgendar = () => {
    if (!calculatedValue || !servicoPrincipal || !porte) {
        toast({
            title: "Atenção!",
            description: "Por favor, selecione o porte, o serviço principal e os extras desejados.",
            variant: "destructive",
        });
        return;
    }

    const porteLabel = portes.find(p => p.id === porte)?.label;
    const servicoLabel = servicosPorPorte[porte].find(s => s.id === servicoPrincipal)?.label;

    let extrasMessage = "";
    if (extras.hidratacaoSimples) extrasMessage += "\n- Hidratação Simples";
    if (extras.hidratacaoProfunda) extrasMessage += "\n- Hidratação Profunda";
    if (extras.corteUnhas) extrasMessage += "\n- Corte de Unhas";
    if (extras.limpezaOuvidos) extrasMessage += "\n- Limpeza de Ouvidos";
    
    if (extrasMessage) {
        extrasMessage = "\n*Serviços Extras:*" + extrasMessage;
    }

    const message = `Olá! 👋 Gostaria de agendar um serviço de Banho & Tosa:
- *Porte do Pet:* ${porteLabel}
- *Serviço Principal:* ${servicoLabel}${extrasMessage}
- *Valor Total:* R$ ${calculatedValue.toFixed(2)}

Aguardo a confirmação do agendamento. Obrigado!`;

    const whatsappUrl = `https://wa.me/5511992568717?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/30 backdrop-blur-sm border-primary/20 p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🧼</span> Banho & Tosa
        </h2>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-6">Escolha o Serviço</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="text-white text-lg mb-2 block">Porte do Pet</Label>
              <Select value={porte} onValueChange={(value) => {setPorte(value); setServicoPrincipal('');}}>
                <SelectTrigger className="bg-black/20 border-primary/30 text-white">
                  <SelectValue placeholder="Selecione o porte" />
                </SelectTrigger>
                <SelectContent>
                  {portes.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white text-lg mb-2 block">Serviço Principal</Label>
              <Select value={servicoPrincipal} onValueChange={setServicoPrincipal} disabled={!porte}>
                <SelectTrigger className="bg-black/20 border-primary/30 text-white" disabled={!porte}>
                  <SelectValue placeholder={porte ? "Selecione o serviço" : "Escolha o porte primeiro"} />
                </SelectTrigger>
                <SelectContent>
                  {porte && servicosPorPorte[porte].map(serv => (
                    <SelectItem key={serv.id} value={serv.id}>{serv.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <Label className="text-white text-lg mb-4 block flex items-center gap-2"><Sparkles className="text-accent w-5 h-5"/> Serviços Extras</Label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                  <Checkbox id="hidratacaoSimples" checked={extras.hidratacaoSimples} onCheckedChange={() => handleExtraChange('hidratacaoSimples')} />
                  <Label htmlFor="hidratacaoSimples" className="text-white">Hidratação Simples (+R$20)</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="hidratacaoProfunda" checked={extras.hidratacaoProfunda} onCheckedChange={() => handleExtraChange('hidratacaoProfunda')} />
                  <Label htmlFor="hidratacaoProfunda" className="text-white">Hidratação Profunda (+R$30)</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="corteUnhas" checked={extras.corteUnhas} onCheckedChange={() => handleExtraChange('corteUnhas')} />
                  <Label htmlFor="corteUnhas" className="text-white">Corte de Unhas (+R$10)</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="limpezaOuvidos" checked={extras.limpezaOuvidos} onCheckedChange={() => handleExtraChange('limpezaOuvidos')} />
                  <Label htmlFor="limpezaOuvidos" className="text-white">Limpeza de Ouvidos (+R$10)</Label>
              </div>
            </div>
          </div>

          {calculatedValue && calculatedValue > 0 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-white">
                <DollarSign className="w-6 h-6" />
                <span className="text-2xl font-bold">R$ {calculatedValue.toFixed(2)}</span>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
             <Button onClick={handleAgendar} className="flex-1 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-white font-bold py-3 h-auto text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5"/>
              Agendar
            </Button>
          </div>
        </div>

        <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4 text-accent">
          <p className="text-center font-semibold">
            ⭐ Produtos premium • Profissionais qualificadas • Seu pet merece o melhor!
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default BanhoTosaTab;