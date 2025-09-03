import React, { useState, lazy, Suspense } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

import { ChevronRight } from "lucide-react";
import ModernFlipCard from "./ModernFlipCard";
import DetailModal from "./DetailModal";
import NostalgicCounter from "./NostalgicCounter";
import useImagePreload from "../hooks/useImagePreload";
import JoinClubPage from "./pages/JoinClubPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import EventsPage from "./pages/EventsPage";

// Lazy load heavy components
const MatrixRain = lazy(() => import("./MatrixRain"));
const AnimatedTextCycle = lazy(() => import("./AnimatedTextCycle"));
const InteractiveDots = lazy(() => import("./InteractiveDots"));

type CurrentPage = 'home' | 'about' | 'contact' | 'projects' | 'events' | 'join-club';

const SilifkeTeknoloji: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const contentDelay = 0.3;
  const itemDelayIncrement = 0.15;

  const headerVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0.90)",
      borderBottomColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: 'none',
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.98)",
      borderBottomColor: "rgba(255, 215, 0, 0.40)",
      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.8)',
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      title: "Uygulama Geliştirme",
      desc: "Web ve mobil için uygulamalar geliştiriyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "📱 Web ve mobil için uygulamalar geliştiriyoruz. Önce fikri birlikte planlıyor, sonra vibe coding ile adım adım kodlayarak hayata geçiriyoruz.",
      details: {
        vision: "Silifke'nin teknoloji alanında öncü olmasını hedefleyerek, yerel işletmeler ve girişimciler için modern, ölçeklenebilir ve kullanıcı dostu uygulamalar geliştiriyoruz. Amacımız, teknolojinin gücünü kullanarak bölgemizin dijital dönüşümüne katkıda bulunmak.",
        services: [
          "Responsive Web Uygulamaları",
          "Mobil Uygulama Geliştirme (iOS & Android)",
          "E-ticaret Platformları",
          "Kurumsal Web Siteleri",
          "Progressive Web Apps (PWA)",
          "API Geliştirme ve Entegrasyon"
        ],
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "Flutter", "React Native", "PostgreSQL", "MongoDB", "Firebase", "AWS"],
        examples: [
          "Yerel restoran için online sipariş sistemi geliştirmek",
          "Turizm acentesi için rezervasyon ve tur yönetim uygulaması",
          "Tarım kooperatifi için ürün takip ve satış platformu",
          "Belediye için vatandaş hizmet portalı"
        ]
      }
    },
    {
      title: "UI/UX & Tasarım",
      desc: "Kullanıcı dostu ve estetik arayüzler tasarlıyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "🎨 Kullanıcı dostu ve estetik arayüzler tasarlıyoruz. Önce ihtiyacı anlamaya çalışıyor, sonra basit ve şık çözümlerle ekranları hayata geçiriyoruz.",
      details: {
        vision: "Her dijital deneyimin arkasında güçlü bir tasarım felsefesi olduğuna inanıyoruz. Kullanıcıların ihtiyaçlarını anlayarak, hem estetik hem fonksiyonel tasarımlar yaratıyoruz. Hedefimiz, teknoloji ile insan arasındaki köprüyü güçlendirmek.",
        services: [
          "Kullanıcı Araştırması ve Analizi",
          "Wireframe ve Prototipleme",
          "Visual Identity Tasarımı",
          "Responsive Tasarım",
          "Usability Testing",
          "Design System Oluşturma"
        ],
        technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Miro", "Photoshop", "Illustrator"],
        examples: [
          "Yerel e-ticaret sitesi için kullanıcı deneyimi optimizasyonu",
          "Mobil bankacılık uygulaması arayüz tasarımı",
          "Eğitim platformu için interaktif öğrenme deneyimi",
          "Sağlık uygulaması için erişilebilir tasarım çözümleri"
        ]
      }
    },
    {
      title: "Yapay Zeka Entegrasyonu",
      desc: "Projelerinize yapay zeka ekliyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "🤖 Projelerinize yapay zeka ekliyoruz. Tekrar eden işleri otomatikleştiriyor, verilerinizi daha akıllı kullanmanızı sağlıyoruz.",
      details: {
        vision: "Yapay zeka teknolojilerini günlük hayatın her alanına entegre ederek, verimliliği artıran ve hayatı kolaylaştıran çözümler üretiyoruz. Amacımız, AI'ın gücünü herkesin erişebileceği şekilde demokratikleştirmek.",
        services: [
          "Chatbot ve Sanal Asistan Geliştirme",
          "Veri Analizi ve Tahmin Modelleri",
          "Görüntü İşleme ve Tanıma Sistemleri",
          "Doğal Dil İşleme Uygulamaları",
          "Otomasyon Sistemleri",
          "Makine Öğrenmesi Danışmanlığı"
        ],
        technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "Hugging Face", "Scikit-learn", "OpenCV", "NLTK", "spaCy"],
        examples: [
          "Tarım arazileri için drone ile hasat analizi sistemi",
          "Turizm rehberi için akıllı öneri motoru",
          "Müşteri hizmetleri için Türkçe chatbot geliştirme",
          "Sosyal medya içerik analizi ve sentiment analizi"
        ]
      }
    },
    {
      title: "Takım Çalışması & Proje Yönetimi",
      desc: "Fikirleri birlikte şekillendiriyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "👥 Fikirleri birlikte şekillendiriyoruz. Görevleri paylaşıyor, birbirimize destek oluyor ve projeleri adım adım tamamlıyoruz.",
      details: {
        vision: "Başarılı projelerin arkasında güçlü takım çalışması ve etkili proje yönetimi olduğuna inanıyoruz. Modern metodolojileri kullanarak, hem bireysel hem de takım performansını en üst seviyeye çıkarıyoruz.",
        services: [
          "Agile/Scrum Koçluğu",
          "Proje Planlama ve Yönetimi",
          "Takım Oluşturma ve Geliştirme",
          "Sprint Planning ve Review",
          "Risk Yönetimi",
          "Kalite Güvence Süreçleri"
        ],
        technologies: ["Jira", "Trello", "Asana", "Slack", "Microsoft Teams", "GitHub", "GitLab", "Confluence", "Notion"],
        examples: [
          "Yazılım geliştirme takımı için Scrum süreç implementasyonu",
          "Uzaktan çalışan ekipler için iş birliği platformu kurulumu",
          "Startup için MVP geliştirme süreç yönetimi",
          "Büyük ölçekli proje için risk analizi ve mitigation planı"
        ]
      }
    },
    {
      title: "Startup & Ürünleştirme",
      desc: "Fikirleri sadece konuşmuyoruz, hayata geçiriyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "🚀 Fikirleri sadece konuşmuyoruz, hayata geçiriyoruz. Ortaya çıkan projeleri gerçek iş modellerine dönüştürüp sürdürülebilir hale getiriyoruz.",
      details: {
        vision: "Silifke'yi bir girişimcilik merkezi haline getirmeyi hedefliyoruz. Yerel girişimcilere mentorluk sağlayarak, teknoloji tabanlı iş fikirlerinin hayata geçirilmesinde köprü görevi üstleniyoruz.",
        services: [
          "İş Modeli Geliştirme",
          "MVP (Minimum Viable Product) Oluşturma",
          "Pazar Araştırması ve Analizi",
          "Yatırımcı Sunumu Hazırlama",
          "Girişimcilik Mentorluğu",
          "Ürün Pazarlama Stratejileri"
        ],
        technologies: ["Lean Canvas", "Design Thinking", "A/B Testing", "Google Analytics", "Mixpanel", "Hotjar", "Mailchimp", "HubSpot"],
        examples: [
          "Yerel üretici pazarı için dijital platform geliştirme",
          "Turizm startup'ı için rezervasyon sistemi MVP'si",
          "EdTech girişimi için öğrenme platformu prototipi",
          "AgriTech çözümü için çiftçi-tüketici bağlantı uygulaması"
        ]
      }
    },
    {
      title: "Sosyal Etki & Topluluk",
      desc: "Yerelde gördüğümüz sorunlara teknolojiyle çözümler üretiyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      detailedContent: "🌍 Yerelde gördüğümüz sorunlara teknolojiyle çözümler üretiyoruz. Bunu yaparken hem topluma fayda sağlıyor, birlikte değer üretiyoruz ve zamanla ciddi gelirler elde ediyoruz.",
      details: {
        vision: "Teknolojinin toplumsal fayda için kullanılması gerektiğine inanıyoruz. Silifke ve çevresindeki toplumsal sorunları tespit ederek, sürdürülebilir ve etkili teknolojik çözümler geliştiriyoruz.",
        services: [
          "Sosyal Etki Analizi",
          "Toplum Temelli Çözüm Geliştirme",
          "Gönüllü Yönetim Sistemleri",
          "Eğitim ve Farkındalık Platformları",
          "Çevre Koruma Uygulamaları",
          "Dijital Kapsayıcılık Projeleri"
        ],
        technologies: ["Open Source", "Progressive Web Apps", "Offline-First", "Accessibility Standards", "Multi-language Support"],
        examples: [
          "Yaşlılar için dijital okuryazarlık eğitim platformu",
          "Çevre gönüllüleri için koordinasyon uygulaması",
          "Yerel kültür ve tarih arşivleme projesi",
          "Engelli bireylerin erişilebilirliği için akıllı şehir çözümleri"
        ]
      }
    }
  ];

  // Preload all images for better performance
  const imageUrls = features.map(feature => feature.imageUrl);
  useImagePreload(imageUrls, { priority: true });

  // Handle page navigation
  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Render current page
  switch (currentPage) {
    case 'about':
      return <AboutPage onBack={handleBackToHome} onJoin={() => handlePageChange('join-club')} />;
    case 'contact':
      return <ContactPage onBack={handleBackToHome} />;
    case 'projects':
      return <ProjectsPage onBack={handleBackToHome} />;
    case 'events':
      return <EventsPage onBack={handleBackToHome} />;
    case 'join-club':
      return <JoinClubPage onBack={handleBackToHome} />;
    case 'home':
    default:
      break;
  }

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background Effects */}
      <Suspense fallback={<div className="absolute inset-0 bg-black/90" />}>
        <MatrixRain />
        <InteractiveDots />
      </Suspense>

      {/* Clean Black Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-20" />

      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
        style={{ borderBottomColor: 'rgba(255, 215, 0, 0.2)' }}
      >
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center relative">
          {/* Sol Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-10 flex-1 justify-start"
          >
            <button 
              onClick={() => handlePageChange('about')}
              className="text-white hover:text-yellow-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg tracking-wide hover:scale-110 relative group"
            >
              Hakkımızda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handlePageChange('contact')}
              className="text-white hover:text-yellow-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg tracking-wide hover:scale-110 relative group"
            >
              İletişim
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </motion.div>

          {/* Logo - Merkeze yerleştirildi */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center flex-1 mt-4"
          >
            <button onClick={handleBackToHome} className="focus:outline-none">
              <img 
                src="/logo1.png" 
                alt="Silifke Teknoloji Logo" 
                className="h-20 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] scale-[2.0] hover:scale-[2.1] transition-transform duration-300 cursor-pointer"
              />
            </button>
          </motion.div>

          {/* Sağ Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-10 flex-1 justify-end"
          >
            <button 
              onClick={() => handlePageChange('projects')}
              className="text-white hover:text-yellow-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg tracking-wide hover:scale-110 relative group"
            >
              Projeler
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handlePageChange('events')}
              className="text-white hover:text-yellow-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg tracking-wide hover:scale-110 relative group"
            >
              Etkinlikler
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-50"
          >
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center
                       border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              aria-label="Mobil menü"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute block w-5 h-0.5 bg-white transition-all duration-300
                  ${isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white top-2 transition-all duration-300
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white transition-all duration-300
                  ${isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'}`}></span>
              </div>
            </button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-gradient-to-br
                       from-black/95 via-black/90 to-black/95 backdrop-blur-md z-50 md:hidden
                       border-l border-yellow-400/20 shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
                <h2 className="text-xl font-bold text-white">Menü</h2>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white
                           transition-colors duration-300 rounded-lg hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-6">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <button onClick={handleBackToHome} className="focus:outline-none">
                    <img
                      src="/logo1.png"
                      alt="Silifke Teknoloji Logo"
                      className="h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                    />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4">
                  <button
                    onClick={() => handlePageChange('home')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-yellow-400/10 text-yellow-400
                             font-semibold hover:bg-yellow-400/20 transition-all duration-300
                             flex items-center space-x-3"
                  >
                    <span className="text-lg">🏠</span>
                    <span>Ana Sayfa</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('about')}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-lg">ℹ️</span>
                    <span>Hakkımızda</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('contact')}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-lg">📞</span>
                    <span>İletişim</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('projects')}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-lg">🚀</span>
                    <span>Projeler</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('events')}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-lg">📅</span>
                    <span>Etkinlikler</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('join-club')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700
                             text-black font-bold hover:scale-105 transition-all duration-300
                             flex items-center space-x-3 shadow-lg shadow-yellow-500/30"
                  >
                    <span className="text-lg">🤝</span>
                    <span>Kulübe Katıl</span>
                  </button>
                </nav>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <span>📧</span>
                      <span>info@silifketeknoloji.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <span>📱</span>
                      <span>+90 324 123 45 67</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <span>📍</span>
                      <span>Silifke/Mersin</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Bizi Takip Edin</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'Instagram', icon: '📸', color: 'hover:text-pink-400' },
                      { name: 'Twitter', icon: '🐦', color: 'hover:text-blue-400' },
                      { name: 'LinkedIn', icon: '💼', color: 'hover:text-blue-600' },
                      { name: 'GitHub', icon: '💻', color: 'hover:text-gray-400' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                                 text-gray-400 ${social.color} transition-all duration-300
                                 hover:bg-white/20 hover:scale-110`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-40 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative text-center space-y-8">
            {/* Hero Title */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: contentDelay }}
              className="space-y-6"
            >
              <h1 className="text-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-extrabold">
                  Silifke Teknoloji Klübü
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent 
                               font-light text-2xl md:text-3xl lg:text-4xl opacity-90">ile</span>{" "}
                <Suspense fallback={<span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-display font-black">Yenilik</span>}>
                  <AnimatedTextCycle
                    words={["Yenilik", "İşbirliği", "Gelecek", "Değişim"]}
                    className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-display font-black"
                  />
                </Suspense>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: contentDelay + itemDelayIncrement }}
              className="text-body-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium tracking-wide
                         bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent"
            >
              Yerelden başlayarak insanların sorunlarına{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent 
                             font-bold">
                teknolojiyle çözümler
              </span>{" "}
              üreten, faydayı motivasyona ve motivasyonu{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent 
                             font-bold">
                kazanca dönüştüren
              </span>{" "}
              bir kulüp.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: contentDelay + itemDelayIncrement * 2 }}
              className="flex justify-center items-center"
            >
              {/* Kulübe Katıl Button - Büyütülmüş */}
              <motion.button
                onClick={() => handlePageChange('join-club')}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 
                         rounded-3xl font-black text-black text-2xl shadow-2xl shadow-yellow-500/40 
                         hover:shadow-yellow-500/60 transition-all duration-300 overflow-hidden
                         border-2 border-yellow-400/40 hover:border-yellow-300/60"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-yellow-400/30 blur-2xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Content */}
                <div className="relative flex items-center space-x-4">
                  <span className="transition-transform duration-300 group-hover:translate-x-1 tracking-wide">
                    KLÜBE KATIL
                  </span>
                  <ChevronRight className="w-7 h-7 transition-transform duration-300 
                                         group-hover:translate-x-2 group-hover:scale-125" />
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -top-3 -left-3 w-6 h-full bg-gradient-to-r 
                              from-transparent via-white/30 to-transparent skew-x-12 
                              -translate-x-full group-hover:translate-x-[200%] 
                              transition-transform duration-700 ease-out" />
              </motion.button>
            </motion.div>

            {/* Nostalgic Counter */}
            <NostalgicCounter />

            {/* Features Grid with Connections */}
            <div className="relative mt-16">
              {/* Connection Lines - Desktop */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-10"
                style={{ top: '50px', left: 0 }}
                viewBox="0 0 1200 400"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 215, 0, 0)" />
                    <stop offset="50%" stopColor="rgba(255, 215, 0, 0.4)" />
                    <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
                  </linearGradient>
                </defs>

                {/* Horizontal connections */}
                <motion.path
                  d="M 200 120 L 600 120"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                  className="drop-shadow-lg"
                />
                <motion.path
                  d="M 600 120 L 1000 120"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.7 }}
                  className="drop-shadow-lg"
                />

                {/* Vertical connections */}
                <motion.path
                  d="M 200 120 L 200 280"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.9 }}
                  className="drop-shadow-lg"
                />
                <motion.path
                  d="M 600 120 L 600 280"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.1 }}
                  className="drop-shadow-lg"
                />
                <motion.path
                  d="M 1000 120 L 1000 280"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.3 }}
                  className="drop-shadow-lg"
                />

                {/* Diagonal connections for bottom row */}
                <motion.path
                  d="M 200 280 L 400 280"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.5 }}
                  className="drop-shadow-lg"
                />
                <motion.path
                  d="M 600 280 L 800 280"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.7 }}
                  className="drop-shadow-lg"
                />

                {/* Connection dots */}
                <circle cx="200" cy="120" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="600" cy="120" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="1000" cy="120" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="280" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="600" cy="280" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="1000" cy="280" r="4" fill="rgba(255, 215, 0, 0.6)" className="drop-shadow-lg">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Connection Lines - Mobile/Tablet */}
              <div className="lg:hidden absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-20 left-1/2 w-0.5 h-96 bg-gradient-to-b from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 transform -translate-x-1/2" />
                {/* Mobile connection dots */}
                <div className="absolute top-20 left-1/2 w-3 h-3 bg-yellow-400/60 rounded-full transform -translate-x-1/2 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400/60 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-20 left-1/2 w-3 h-3 bg-yellow-400/60 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
                {features.map((feature, index) => (
                  <ModernFlipCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.desc}
                    imageUrl={feature.imageUrl}
                    detailedContent={feature.detailedContent}
                    index={index}
                    onCardClick={() => setSelectedCard(index)}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute top-20 left-10 w-32 h-32 border border-white/25 rounded-full shadow-lg shadow-white/15 [box-shadow:_0_0_50px_rgba(255,215,0,0.15)]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
                className="absolute bottom-20 right-10 w-24 h-24 border border-yellow-400/30 rounded-full shadow-lg shadow-yellow-400/20 [box-shadow:_0_0_40px_rgba(255,215,0,0.18)]"
              />
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute top-1/3 left-0 w-40 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent [box-shadow:_0_0_20px_rgba(255,215,0,0.4)]"
              />
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.7 }}
                className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent [box-shadow:_0_0_20px_rgba(255,215,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <DetailModal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        title={selectedCard !== null ? features[selectedCard].title : ''}
        content={selectedCard !== null ? features[selectedCard].details : { vision: '', services: [], technologies: [], examples: [] }}
      />
    </div>
  );
};

export default SilifkeTeknoloji;