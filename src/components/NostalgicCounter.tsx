import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CounterData {
  value: number;
  label: string;
  description: string;
  color: string;
  glowColor: string;
}

const NostalgicCounter: React.FC = () => {
  const [counters, setCounters] = useState<CounterData[]>([
    {
      value: 0,
      label: "Klüp Üye Sayısı",
      description: "Aktif teknoloji meraklısı üye sayısı",
      color: "from-yellow-400 to-yellow-600",
      glowColor: "rgba(255, 215, 0, 0.4)"
    },
    {
      value: 0,
      label: "Toplam Başvuru Sayısı",
      description: "Bugüne kadar alınan toplam başvuru sayısı",
      color: "from-yellow-500 to-yellow-600",
      glowColor: "rgba(255, 215, 0, 0.4)"
    },
    {
      value: 0,
      label: "Bekleyen Başvuru Sayısı",
      description: "Değerlendirme aşamasındaki başvuru sayısı",
      color: "from-yellow-300 to-yellow-500",
      glowColor: "rgba(255, 215, 0, 0.4)"
    }
  ]);

  const finalValues = [3, 3, 0]; // Güncel değerler - sonra gerçek verilere bağlanacak

  // Animasyonlu sayaç efekti
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2500; // 2.5 saniye
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounters(prev => prev.map((counter, index) => ({
          ...counter,
          value: Math.floor(finalValues[index] * easeOutQuart)
        })));

        if (currentStep >= steps) {
          clearInterval(timer);
          // Son değerleri kesin olarak ayarla
          setCounters(prev => prev.map((counter, index) => ({
            ...counter,
            value: finalValues[index]
          })));
        }
      }, interval);

      return () => clearInterval(timer);
    };

    // Bileşen yüklendiğinde 1 saniye bekleyip animasyonu başlat
    const startTimer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-6xl mx-auto my-16 px-6"
    >
      {/* Ana Başlık */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Topluluk İstatistikleri
          </span>
        </h2>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Silifke Teknoloji Klübü'nün büyüyen topluluğunun canlı istatistikleri
        </p>
      </motion.div>

      {/* Sayaç Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {counters.map((counter, index) => (
          <motion.div
            key={counter.label}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1 + (index * 0.2),
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative group"
          >
            {/* Nostaljik Çerçeve */}
            <div className="relative bg-gradient-to-br from-black/95 via-black/98 to-black/95 
                          rounded-2xl border-2 border-white/20 backdrop-blur-sm 
                          shadow-2xl hover:shadow-3xl transition-all duration-500
                          overflow-hidden">
              
              {/* Glow Efekti */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${counter.glowColor} 0%, transparent 70%)`,
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Animasyonlu Sınır */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]"
                   style={{
                     background: `linear-gradient(45deg, ${counter.glowColor}, transparent, ${counter.glowColor})`
                   }}>
                <div className="w-full h-full rounded-2xl bg-black/98" />
              </div>

              {/* Retro Izgara Deseni */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className="w-full h-full" 
                     style={{
                       backgroundImage: `
                         linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
                       `,
                       backgroundSize: '20px 20px'
                     }} />
              </div>

              {/* İçerik */}
              <div className="relative z-10 p-8 text-center space-y-6">
                {/* Sayı Gösterimi - Nostaljik LCD Tarzı */}
                <div className="relative">
                  <div className="bg-black/80 rounded-xl p-6 border border-white/20 shadow-inner">
                    <motion.div
                      className={`text-5xl md:text-6xl font-mono font-black bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}
                      style={{
                        textShadow: `0 0 20px ${counter.glowColor}, 0 0 40px ${counter.glowColor}`,
                        filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))'
                      }}
                      animate={{
                        textShadow: [
                          `0 0 20px ${counter.glowColor}, 0 0 40px ${counter.glowColor}`,
                          `0 0 30px ${counter.glowColor}, 0 0 60px ${counter.glowColor}`,
                          `0 0 20px ${counter.glowColor}, 0 0 40px ${counter.glowColor}`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {counter.value.toLocaleString()}
                    </motion.div>
                    
                    {/* Nostaljik Işık Efektleri */}
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse" />
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50" />
                  </div>
                </div>

                {/* Etiket */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-300 
                               transition-colors duration-300 font-display tracking-wide">
                    {counter.label}
                  </h3>
                  <p className="text-white/80 group-hover:text-white transition-colors duration-300 
                               text-sm md:text-base leading-relaxed">
                    {counter.description}
                  </p>
                </div>

                {/* Alt Dekoratif Çizgi */}
                <div className="flex justify-center">
                  <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${counter.color} 
                                 shadow-lg group-hover:w-32 transition-all duration-500`}
                       style={{ boxShadow: `0 0 20px ${counter.glowColor}` }} />
                </div>

                {/* Nostaljik Köşe Detayları */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-yellow-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-yellow-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-yellow-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-yellow-400/50 rounded-br-lg" />
              </div>

              {/* Hover Parıltı Efekti */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={false}
                animate={{
                  background: [
                    `radial-gradient(circle at 0% 0%, ${counter.glowColor} 0%, transparent 50%)`,
                    `radial-gradient(circle at 100% 100%, ${counter.glowColor} 0%, transparent 50%)`,
                    `radial-gradient(circle at 0% 100%, ${counter.glowColor} 0%, transparent 50%)`,
                    `radial-gradient(circle at 100% 0%, ${counter.glowColor} 0%, transparent 50%)`,
                    `radial-gradient(circle at 0% 0%, ${counter.glowColor} 0%, transparent 50%)`
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Yansıma Efekti */}
            <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-slate-800/20 to-transparent 
                          rounded-b-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Alt Dekoratif Öğeler */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="flex justify-center mt-12 space-x-4"
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <motion.div
            key={dot}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: dot * 0.2
            }}
            className="w-2 h-2 bg-yellow-400/60 rounded-full shadow-lg shadow-yellow-400/30"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NostalgicCounter;
