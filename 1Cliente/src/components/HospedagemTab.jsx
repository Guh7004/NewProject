import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Info, MessageCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import RoomCarousel from '@/components/RoomCarousel';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";

const HospedagemTab = () => {
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [time, setTime] = useState({ checkin: '09:00', checkout: '18:00' });
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [days, setDays] = useState(0);

  const calculateValue = () => {
    if (!dateRange.from || !dateRange.to) {
      setCalculatedValue(null);
      setDays(0);
      return;
    }

    const fromDate = dateRange.from;
    const toDate = dateRange.to;

    if (fromDate >= toDate) {
      setCalculatedValue(null);
      setDays(0);
      return;
    }

    const highSeasonStart = new Date('2025-11-01T00:00:00');
    const highSeasonEnd = new Date('2026-03-30T00:00:00');
    const lowSeasonRate = 120;
    const highSeasonRate = 150;

    let total = 0;
    let currentDay = new Date(fromDate);
    let numDays = 0;

    while (currentDay < toDate) {
      const isHighSeason = currentDay >= highSeasonStart && currentDay <= highSeasonEnd;
      total += isHighSeason ? highSeasonRate : lowSeasonRate;
      currentDay.setDate(currentDay.getDate() + 1);
      numDays++;
    }
    
    if (numDays <= 0) {
      setCalculatedValue(null);
      setDays(0);
      return;
    }

    setDays(numDays);
    setCalculatedValue(total);
  };
  
  const handleAgendar = () => {
    if (!calculatedValue || !dateRange.from || !dateRange.to) {
      toast({
        title: "Atenção!",
        description: "Por favor, selecione as datas de entrada e saída para agendar.",
        variant: "destructive",
      });
      return;
    }

    const checkIn = format(dateRange.from, "dd/MM/yyyy");
    const checkOut = format(dateRange.to, "dd/MM/yyyy");

    const message = `Olá! 👋 Gostaria de agendar uma hospedagem:
- *Check-in:* ${checkIn} às ${time.checkin}
- *Check-out:* ${checkOut} às ${time.checkout}
- *Total de diárias:* ${days}
- *Valor Total:* R$ ${calculatedValue.toFixed(2)}

Aguardo confirmação e os próximos passos. Obrigado!`;
    
    const whatsappUrl = `https://wa.me/5511971879461?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    calculateValue();
  }, [dateRange]);

  const handleDateChange = (field, value) => {
    if (!value) {
      setDateRange(prev => ({ ...prev, [field]: undefined }));
      return;
    }
    try {
      const parsedDate = parseISO(value);
      setDateRange(prev => ({ ...prev, [field]: parsedDate }));
    } catch (error) {
      console.error("Invalid date value:", value);
    }
  };

  const handleTimeChange = (field, value) => {
    setTime(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/30 backdrop-blur-sm border-primary/20 p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🏠</span> Hospedagem Premium
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-secondary mb-4">Nossos Quartos Temáticos</h3>
          <RoomCarousel />
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-4">Faça sua Reserva</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <Label htmlFor="checkin" className="text-secondary mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> Check-in
                </Label>
              </div>
              <Input
                id="checkin"
                type="date"
                className="bg-black/20 border-primary/30 text-white h-12"
                onChange={(e) => handleDateChange('from', e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
              <Input
                id="checkin-time"
                type="time"
                className="bg-black/20 border-primary/30 text-white h-12"
                value={time.checkin}
                onChange={(e) => handleTimeChange('checkin', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <Label htmlFor="checkout" className="text-secondary mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> Check-out
                </Label>
              </div>
              <Input
                id="checkout"
                type="date"
                className="bg-black/20 border-primary/30 text-white h-12"
                onChange={(e) => handleDateChange('to', e.target.value)}
                min={dateRange.from ? new Date(dateRange.from.getTime() + 86400000).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                disabled={!dateRange.from}
              />
              <Input
                id="checkout-time"
                type="time"
                className="bg-black/20 border-primary/30 text-white h-12"
                value={time.checkout}
                onChange={(e) => handleTimeChange('checkout', e.target.value)}
                disabled={!dateRange.from}
              />
            </div>
          </div>

          {calculatedValue && days > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 mb-6 text-center"
            >
              <p className="text-white font-semibold text-sm mb-1">{days} diária(s)</p>
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
        
        <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4 text-white/90">
          <div className="flex items-center gap-3">
              <Info className="w-8 h-8 text-accent"/>
              <div>
                  <p className="font-bold text-white">Valores da Diária:</p>
                  <p className="text-sm">Até 31/10/2025: <span className="font-semibold">R$120,00</span></p>
                  <p className="text-sm">01/11/2025 a 30/03/2026 (alta temporada): <span className="font-semibold">R$150,00</span></p>
                  <p className="text-sm mt-1">Hora adicional: <span className="font-semibold">R$12,00</span></p>
              </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HospedagemTab;