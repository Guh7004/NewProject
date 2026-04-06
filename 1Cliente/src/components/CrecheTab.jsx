import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Star, MessageCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import AmbientCarousel from '@/components/AmbientCarousel';
import { cn } from "@/lib/utils";

const CrecheTab = () => {
  const [weeklyFrequency, setWeeklyFrequency] = useState([2]);
  const [planDuration, setPlanDuration] = useState('monthly');
  const [calculatedValue, setCalculatedValue] = useState(null);

  const prices = {
    1: 298,
    2: 498,
    3: 667,
    4: 848,
    5: 1088,
  };

  const discounts = {
    monthly: 0,
    semiannual: 20,
    annual: 40,
  };

  const planLabels = {
    monthly: 'Mensal',
    semiannual: 'Semestral',
    annual: 'Anual',
  }

  const calculateValue = () => {
    const freq = weeklyFrequency[0];
    const basePrice = prices[freq];
    const discount = discounts[planDuration];
    const total = basePrice - discount;
    setCalculatedValue(total);
  };
  
  useEffect(() => {
    calculateValue();
  }, [weeklyFrequency, planDuration]);

  const handleAgendar = () => {
    if (!calculatedValue) {
      toast({
        title: "Atenção!",
        description: "Selecione a frequência e o plano para poder agendar.",
        variant: "destructive",
      });
      return;
    }

    const message = `Olá! 👋 Gostaria de contratar um plano de creche:
- *Plano:* ${planLabels[planDuration]}
- *Frequência:* ${weeklyFrequency[0]}x por semana
- *Valor Mensal:* R$ ${calculatedValue.toFixed(2)}

Aguardo confirmação e os próximos passos. Obrigado!`;
    
    const whatsappUrl = `https://wa.me/5511971879461?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/30 backdrop-blur-sm border-primary/20 p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🎉</span> Creche Temática
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-secondary mb-4">Nossos Ambientes</h3>
          <AmbientCarousel />
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-6">Monte seu Plano</h3>

          <div className="mb-8">
            <Label className="text-white text-lg mb-4 block flex items-center gap-2"><CalendarDays className="text-accent w-5 h-5"/> Duração do Plano</Label>
            <div className="grid grid-cols-3 gap-2 bg-black/30 p-1 rounded-lg mb-8">
              <Button onClick={() => setPlanDuration('monthly')} variant={planDuration === 'monthly' ? 'default' : 'ghost'} className={cn("w-full", planDuration === 'monthly' && 'bg-primary')}>Mensal</Button>
              <Button onClick={() => setPlanDuration('semiannual')} variant={planDuration === 'semiannual' ? 'default' : 'ghost'} className={cn("w-full", planDuration === 'semiannual' && 'bg-primary')}>Semestral <span className="hidden sm:inline ml-1">(-R$20)</span></Button>
              <Button onClick={() => setPlanDuration('annual')} variant={planDuration === 'annual' ? 'default' : 'ghost'} className={cn("w-full", planDuration === 'annual' && 'bg-primary')}>Anual <span className="hidden sm:inline ml-1">(-R$40)</span></Button>
            </div>
          </div>
          
          <div className="mb-8">
            <Label className="text-white text-lg mb-4 block">
              Frequência Semanal: <span className="text-secondary font-bold">{weeklyFrequency[0]} {weeklyFrequency[0] === 1 ? 'dia' : 'dias'}</span>
            </Label>
            <Slider
              value={weeklyFrequency}
              onValueChange={setWeeklyFrequency}
              min={1}
              max={5}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-secondary/70">
              <span>1 dia</span>
              <span>2 dias</span>
              <span>3 dias</span>
              <span>4 dias</span>
              <span>5 dias</span>
            </div>
          </div>
          
          {calculatedValue && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-white">
                <DollarSign className="w-6 h-6" />
                <span className="text-2xl font-bold">R$ {calculatedValue.toFixed(2)}/mês</span>
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
            <div className="flex items-center gap-3">
                <Star className="w-6 h-6"/>
                <div>
                    <p className="font-bold">Planos Especiais!</p>
                    <p className="text-sm">Planos semestral e anual possuem benefícios como banhos e diárias de hotel.</p>
                </div>
            </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CrecheTab;