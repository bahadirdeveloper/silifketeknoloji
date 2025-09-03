import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-20" />

      {/* Main Content */}
      <div className="relative z-40 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* 404 Number */}
            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              variants={fadeInUp}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sayfa Bulunamadı
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                Lütfen doğru URL'yi kontrol edin veya ana sayfaya dönün.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-black/50 border border-gray-600
                         text-white font-semibold px-6 py-4 rounded-xl hover:border-yellow-400/50
                         hover:text-yellow-400 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </motion.button>

              <motion.button
                onClick={() => window.location.href = '/'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700
                         text-black font-bold px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/30
                         hover:shadow-yellow-500/50 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </motion.button>
            </motion.div>

            {/* Search Section */}
            <motion.div
              variants={fadeInUp}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm
                            rounded-2xl p-8 border border-yellow-400/20 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5 text-yellow-400" />
                  <span>Arama Yapın</span>
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Sayfa ara..."
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400
                             transition-colors duration-300"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Implement search functionality
                        window.location.href = '/';
                      }
                    }}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </motion.div>

            {/* Popular Pages */}
            <motion.div
              variants={fadeInUp}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Popüler Sayfalar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { title: 'Hakkımızda', path: '/about', description: 'Kulübümüz hakkında detaylı bilgi' },
                  { title: 'Projeler', path: '/projects', description: 'Tamamlanan ve devam eden projeler' },
                  { title: 'Etkinlikler', path: '/events', description: 'Yaklaşan ve geçmiş etkinlikler' }
                ].map((page, index) => (
                  <motion.a
                    key={index}
                    href={page.path}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                             rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40
                             transition-all duration-300 group"
                  >
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {page.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {page.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-yellow-500/10 backdrop-blur-sm
                            rounded-3xl p-8 border border-yellow-400/20 max-w-lg mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  Yardım mı Lazım?
                </h3>
                <p className="text-gray-300 mb-6">
                  Herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700
                           text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <span>İletişim</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
