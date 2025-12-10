import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getClubStatistics, subscribeToStatisticsUpdates, type ClubStatistics } from '../lib/supabaseClient';
import { useLanguage } from '../i18n/LanguageContext';

type TestStatisticsModule = typeof import('../utils/testStatistics');

declare global {
  interface Window {
    testStatistics?: TestStatisticsModule['testStatistics'];
    testStatisticsWithMockData?: TestStatisticsModule['testStatisticsWithMockData'];
  }
}

// Import test utilities in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  import('../utils/testStatistics').then(({ testStatistics, testStatisticsWithMockData }) => {
    window.testStatistics = testStatistics;
    window.testStatisticsWithMockData = testStatisticsWithMockData;
  });
}

const NostalgicCounter: React.FC = () => {
  const { language } = useLanguage();
  const translations = useMemo(() => ({
    tr: {
      title: 'Topluluk İstatistikleri',
      subtitle: "Silifke Teknoloji Kulübü'nün büyüyen topluluğunun canlı istatistikleri",
      loading: 'İstatistikler yükleniyor...',
      empty: 'Canlı istatistikleriniz burada görünecek. Henüz kayıt bulunmuyorsa bile, başvurular geldikçe bu alan otomatik güncellenecek.',
      counters: [
        {
          label: 'Kulüp Üye Sayısı',
          description: 'Aktif teknoloji meraklısı üye sayısı'
        },
        {
          label: 'Toplam Başvuru Sayısı',
          description: 'Bugüne kadar alınan toplam başvuru sayısı'
        },
        {
          label: 'Onaylanan Başvuru',
          description: 'Değerlendirme sonucu kabul edilen başvuru sayısı'
        }
      ]
    },
    en: {
      title: 'Community Statistics',
      subtitle: 'Live metrics from the ever-growing Silifke Technology Club community',
      loading: 'Loading statistics…',
      empty: 'Your live statistics will appear here. Even if no records exist yet, this area will update automatically as applications arrive.',
      counters: [
        {
          label: 'Club Member Count',
          description: 'Number of active technology enthusiasts'
        },
        {
          label: 'Total Applications',
          description: 'Total number of applications received to date'
        },
        {
          label: 'Approved Applications',
          description: 'Applications accepted after review'
        }
      ]
    }
  }), []);

  const t = translations[language];

  const counterVisuals = useMemo(() => ([
    { color: 'from-yellow-400 to-yellow-600', glowColor: 'rgba(255, 215, 0, 0.4)' },
    { color: 'from-yellow-500 to-yellow-600', glowColor: 'rgba(255, 215, 0, 0.4)' },
    { color: 'from-yellow-300 to-yellow-500', glowColor: 'rgba(255, 215, 0, 0.4)' }
  ] as const), []);

  const [counterValues, setCounterValues] = useState([0, 0, 0]);

  const [statistics, setStatistics] = useState<ClubStatistics>({
    totalMembers: 0,
    totalApplications: 0,
    approvedApplications: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const hasStatistics = statistics.totalMembers > 0 || statistics.totalApplications > 0 || statistics.approvedApplications > 0;

  // İstatistikleri yükle ve real-time güncellemelere abone ol
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setIsLoading(true);
        const stats = await getClubStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStatistics();

    // Real-time güncellemelere abone ol
    const unsubscribe = subscribeToStatisticsUpdates((newStats) => {
      setStatistics(newStats);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // İstatistikler değiştiğinde animasyonu başlat
  useEffect(() => {
    if (isLoading) return;

    const finalValues = [
      statistics.totalMembers,
      statistics.totalApplications,
      statistics.approvedApplications
    ];

    const animateCounters = () => {
      const duration = 2500; // 2.5 saniye
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounterValues(prev => prev.map((_, index) => Math.floor(finalValues[index] * easeOutQuart)));

        if (currentStep >= steps) {
          clearInterval(timer);
          // Son değerleri kesin olarak ayarla
          setCounterValues(finalValues);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    // Animasyonu başlat
    const startTimer = setTimeout(animateCounters, 500);
    return () => clearTimeout(startTimer);
  }, [statistics, isLoading]);

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
        className="glass-panel glass-border-accent text-center mb-12 px-6 py-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h2>
        <p className="text-white text-lg max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex justify-center"
          >
            <div className="flex items-center space-x-2 text-yellow-400">
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">{t.loading}</span>
            </div>
          </motion.div>
        )}
        {!isLoading && !hasStatistics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex justify-center"
          >
            <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/15 px-4 py-3 text-sm text-yellow-200">
              {t.empty}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Sayaç Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.counters.map((counter, index) => (
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
            <div className="glass-panel glass-border-accent p-8 text-center space-y-6 overflow-hidden">
              {/* Glow Efekti */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${counterVisuals[index].glowColor} 0%, transparent 65%)`
                }}
              />

              <div className="relative z-10 space-y-6">
                {/* Sayı Gösterimi - Nostaljik LCD Tarzı */}
                <div className="relative">
                  <div className="bg-black/80 rounded-xl p-6 border border-white/20 shadow-inner">
                    <motion.div
                      className={`text-5xl md:text-6xl font-mono font-black bg-gradient-to-r ${counterVisuals[index].color} bg-clip-text text-transparent`}
                      style={{
                        textShadow: `0 0 20px ${counterVisuals[index].glowColor}, 0 0 40px ${counterVisuals[index].glowColor}`,
                        filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))'
                      }}
                      animate={{
                        textShadow: [
                          `0 0 20px ${counterVisuals[index].glowColor}, 0 0 40px ${counterVisuals[index].glowColor}`,
                          `0 0 30px ${counterVisuals[index].glowColor}, 0 0 60px ${counterVisuals[index].glowColor}`,
                          `0 0 20px ${counterVisuals[index].glowColor}, 0 0 40px ${counterVisuals[index].glowColor}`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {counterValues[index].toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}
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
                  <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${counterVisuals[index].color} 
                                 shadow-lg group-hover:w-32 transition-all duration-500`}
                    style={{ boxShadow: `0 0 20px ${counterVisuals[index].glowColor}` }} />
                </div>
              </div>
            </div>
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
