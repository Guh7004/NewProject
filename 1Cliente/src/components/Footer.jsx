import React from 'react';
import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Rua+Engenheiro+Pegado,1497+Vila+Carrão";

    return (
        <footer className="bg-black/20 border-t border-primary/20 mt-12 py-8">
            <div className="container mx-auto px-4 text-center text-secondary">
                <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
                    <div className="flex justify-center md:justify-start items-center gap-4">
                        <a href="https://www.instagram.com/clubpetestetica?igsh=N2ZuZngyczRmdW15" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </a>
                        <a href="https://wa.me/5511971879461?text=Ol%C3%A1+%F0%9F%91%8B+" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-white">
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                    
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group">
                        <MapPin className="h-5 w-5 text-accent mb-1 group-hover:scale-110 transition-transform" />
                        <p className="font-semibold text-white group-hover:text-accent transition-colors">Ver no Google Maps</p>
                        <p className="text-sm">Rua Engenheiro Pegado, 1497 - Vila Carrão</p>
                    </a>

                    <div className="flex justify-center md:justify-end">
                       <p className="font-bold text-lg text-white">Club do Pet</p>
                    </div>
                </div>

                <div className="border-t border-primary/20 pt-6">
                    <p className="text-xs text-white/50">
                        Consulte nossas políticas de reserva e cancelamento para mais detalhes.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;