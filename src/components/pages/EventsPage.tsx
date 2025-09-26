import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search,
  Ticket,
  Star,
  Share2,
  Code,
  GraduationCap,
  Users2,
  Lightbulb,
  Coffee,
  Award,
  ArrowLeft
} from "lucide-react";

// Lazy load background components
const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface Event {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  image: string;
  speaker?: string;
  speakerTitle?: string;
  speakerImage?: string;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  featured: boolean;
}

interface EventsPageProps {
  onBack?: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categories = [
    { id: 'all', name: 'Tümü', icon: <Calendar className="w-4 h-4" /> },
    { id: 'workshop', name: 'Atölye Çalışması', icon: <Code className="w-4 h-4" /> },
    { id: 'seminar', name: 'Seminer', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'meetup', name: 'Buluşma', icon: <Users2 className="w-4 h-4" /> },
    { id: 'hackathon', name: 'Hackathon', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'networking', name: 'Networking', icon: <Coffee className="w-4 h-4" /> },
    { id: 'competition', name: 'Yarışma', icon: <Award className="w-4 h-4" /> }
  ];

  const events: Event[] = [
    {
      id: 1,
      title: "Silifke Teknoloji Kulübü İlk Buluşması",
      description: "Kulübümüzün kuruluş buluşması ve tanışma etkinliği",
      longDescription: "Silifke Teknoloji Kulübü'nün ilk resmi buluşması! Tanışma oturumlarının ardından 2025 yol haritamızı paylaşacak, mentorluk programı ve projelerimizi duyuracağız. Etkinlik sonunda networking alanı ve küçük ikramlar olacak.",
      category: 'meetup',
      date: '15 Şubat 2025',
      time: '18:30 - 21:00',
      location: 'Silifke Belediyesi Kültür Merkezi - Konferans Salonu',
      capacity: 80,
      registered: 42,
      price: 0,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format&q=80",
      speaker: 'Bahadır Gemalmaz',
      speakerTitle: 'Kurucu & Teknik Lider',
      speakerImage: '/bahadirgemalmaz.png',
      tags: ['Networking', 'Roadmap', 'Community'],
      status: 'upcoming',
      featured: true
    },
    {
      id: 4,
      title: "İlk Hackathon: Silifke'nin Geleceği",
      description: "Silifke için teknolojik çözümler geliştirme yarışması",
      longDescription: "Silifke'nin yerel sorunlarına teknolojik çözümler üreten ilk hackathonumuz. 48 saatlik maraton boyunca katılımcılar ekipler halinde çalışacak, mentor desteği alacak ve jüriye uygulanabilir ürünler sunacak.",
      category: 'hackathon',
      date: '12-13 Nisan 2025',
      time: '48 saatlik maraton',
      location: 'Mersin Üniversitesi Silifke Meslek Yüksekokulu - Teknokent',
      capacity: 120,
      registered: 64,
      price: 0,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format&q=80",
      speaker: 'Mentor Ekibi',
      speakerTitle: 'Sektör Profesyonelleri',
      speakerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      tags: ['Hackathon', 'Innovation', 'Local Solutions'],
      status: 'upcoming',
      featured: false
    },
    {
      id: 5,
      title: "Girişimcilik ve Teknoloji Networking Gecesi",
      description: "Girişimciler ve teknoloji meraklıları buluşması",
      longDescription: "Silifke ve çevresindeki girişimcilerin, teknoloji meraklılarının ve mentorların bir araya geldiği networking etkinliği. Startup fikirleri, deneyim paylaşımı ve iş birliği fırsatları için ideal ortam.",
      category: 'networking',
      date: '28 Mart 2025',
      time: '19:00 - 22:00',
      location: 'Silifke Tenis Kulübü - Açık Teras Alanı',
      capacity: 90,
      registered: 47,
      price: 0,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ['Startup', 'Networking', 'Business'],
      status: 'upcoming',
      featured: false
    },
    {
      id: 6,
      title: "Mobil Uygulama Geliştirme Yarışması",
      description: "En yaratıcı mobil uygulama geliştirme yarışması",
      longDescription: "Silifke'nin yerel sorunlarına çözüm üreten mobil uygulamalar geliştirme yarışması. Katılımcılar belirlenen süre içinde projelerini tamamlayarak jüri önünde sunum yapacak. Ödüller ve tanınma fırsatları!",
      category: 'competition',
      date: '25 Mayıs 2025',
      time: '10:00 - 18:00',
      location: 'Silifke Atatürk Kültür Merkezi - Studio Lab',
      capacity: 60,
      registered: 18,
      price: 50,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ['Mobile', 'Competition', 'Innovation'],
      status: 'upcoming',
      featured: false
    },
    {
      id: 7,
      title: "Python ve Veri Bilimi Atölyesi",
      description: "Veri analizi ve görselleştirme teknikleri",
      longDescription: "Python programlama dili kullanarak veri bilimi projelerinde nasıl çalışılacağını öğreneceksiniz. Pandas, NumPy, Matplotlib gibi kütüphanelerle uygulamalı eğitim. Başlangıç seviyesinden ileri seviyeye kadar herkes için uygun.",
      category: 'workshop',
      date: '8 Mart 2025',
      time: '11:00 - 16:00',
      location: 'Silifke Belediyesi Dijital Dönüşüm Ofisi',
      capacity: 55,
      registered: 23,
      price: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80",
      speaker: "Planlanıyor",
      speakerTitle: "Planlanıyor",
      speakerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      tags: ['Python', 'Data Science', 'Analytics'],
      status: 'upcoming',
      featured: false
    },
    {
      id: 8,
      title: "Dijital Pazarlama ve E-ticaret Semineri",
      description: "Online satış stratejileri ve dijital pazarlama",
      longDescription: "E-ticaret dünyasında başarılı olmak için gerekli dijital pazarlama stratejileri, SEO, sosyal medya pazarlama ve müşteri analizi konularında kapsamlı seminer. İşletmenizi dijital dünyaya taşıyın!",
      category: 'seminar',
      date: '19 Nisan 2025',
      time: '13:00 - 17:30',
      location: 'Mersin Tarsus Girişimcilik Merkezi',
      capacity: 80,
      registered: 31,
      price: 0,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ['Marketing', 'E-commerce', 'Business'],
      status: 'upcoming',
      featured: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = events.filter(event => event.featured);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'ongoing': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'completed': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Yaklaşan';
      case 'ongoing': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Planlanıyor') {
      return 'Planlanıyor';
    }
    // Eğer tarih zaten Türkçe formatında ise direkt döndür
    if (dateString.includes('Ekim') || dateString.includes('Ocak') || dateString.includes('Şubat') || 
        dateString.includes('Mart') || dateString.includes('Nisan') || dateString.includes('Mayıs') || 
        dateString.includes('Haziran') || dateString.includes('Temmuz') || dateString.includes('Ağustos') || 
        dateString.includes('Eylül') || dateString.includes('Kasım') || dateString.includes('Aralık')) {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getAvailableSpots = (event: Event) => {
    return event.capacity - event.registered;
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background Effects */}
      <Suspense fallback={<div className="absolute inset-0 bg-black/90" />}>
        <MatrixRain />
        <InteractiveDots />
      </Suspense>

      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-20" />

      {/* Main Content */}
      <main className="relative z-40 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          {onBack && (
            <motion.button
              onClick={onBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </motion.button>
          )}
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="glass-panel glass-border-accent px-6 sm:px-12 py-12 text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <span className="glass-pill text-[0.65rem] sm:text-xs text-yellow-100">Silifke'de Teknoloji Buluşmaları</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Etkinlikler
            </h1>
            <p className="text-xl md:text-2xl text-gray-200/90 max-w-4xl mx-auto leading-relaxed">
              Teknoloji gündemini takip edin, yeni beceriler kazanın ve toplulukla aynı cam masada buluşun. Etkinliklerin çoğu ücretsiz veya sembolik katkı payı ile.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Workshop', 'Networking', 'Hackathon', 'Sosyal Etki'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-gray-200 backdrop-blur-lg">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Featured Events */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent flex items-center justify-center"
            >
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              Öne Çıkan Etkinlikler
            </motion.h2>
            
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                {featuredEvents.slice(0, 2).map((event) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  className="group glass-panel glass-border-accent overflow-hidden cursor-pointer hover:-translate-y-3"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Öne Çıkan
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.price === 0 ? 'Ücretsiz' : `₺${event.price}`}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-3 text-yellow-400" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-3 text-yellow-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-3 text-yellow-400" />
                        <span>{event.registered}/{event.capacity} katılımcı</span>
                        {event.registered === 0 && (
                          <span className="ml-2 text-green-400 text-sm font-semibold">
                            (İlk katılımcı siz olun!)
                          </span>
                        )}
                        {getAvailableSpots(event) <= 5 && getAvailableSpots(event) > 0 && event.registered > 0 && (
                          <span className="ml-2 text-orange-400 text-sm font-semibold">
                            (Sadece {getAvailableSpots(event)} yer kaldı!)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-sm font-medium rounded-full border border-yellow-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filter and Search */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel glass-border-accent p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-200/80" />
                  <input
                    type="text"
                    placeholder="Etkinlik ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/60 focus:bg-white/10 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium
                                transition-all duration-300 border ${
                        selectedCategory === category.id
                          ? 'border-yellow-400/40 bg-yellow-400/15 text-yellow-200'
                          : 'border-white/10 bg-white/5 text-gray-200 hover:border-yellow-300/40 hover:text-yellow-200'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="group glass-panel glass-border-accent overflow-hidden cursor-pointer hover:-translate-y-3"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                                   border ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {event.price === 0 ? 'Ücretsiz' : `₺${event.price}`}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Katılımcı</span>
                        <span>{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${event.registered > 0 ? (event.registered / event.capacity) * 100 : 0}%` }}
                        ></div>
                      </div>
                      {event.registered === 0 && (
                        <div className="text-xs text-gray-400 mt-1">
                          Henüz katılımcı yok - İlk siz olun!
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-medium rounded border border-yellow-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-400/10 text-gray-400 text-xs font-medium rounded border border-gray-400/20">
                          +{event.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Etkinlik bulunamadı</h3>
              <p className="text-gray-400">Arama kriterlerinizi değiştirip tekrar deneyin.</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-black/90 via-black/95 to-black/90 backdrop-blur-md
                       rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       border border-yellow-400/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full
                           flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                >
                  ✕
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold
                                   border ${getStatusColor(selectedEvent.status)}`}>
                      {getStatusText(selectedEvent.status)}
                    </div>
                    <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedEvent.price === 0 ? 'Ücretsiz' : `₺${selectedEvent.price}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedEvent.longDescription}
                </p>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">Etkinlik Detayları</h3>
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{selectedEvent.registered}/{selectedEvent.capacity} katılımcı</span>
                      {selectedEvent.registered === 0 && (
                        <span className="ml-2 text-green-400 text-sm font-semibold">
                          (İlk katılımcı siz olun!)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Speaker Info */}
                  {selectedEvent.speaker && selectedEvent.speaker !== 'Planlanıyor' && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Konuşmacı</h3>
                      <div className="flex items-center space-x-4">
                        <img 
                          src={selectedEvent.speakerImage}
                          alt={selectedEvent.speaker}
                          className="w-16 h-16 rounded-full border-2 border-yellow-400/30"
                        />
                        <div>
                          <div className="text-lg font-semibold text-white">{selectedEvent.speaker}</div>
                          <div className="text-yellow-400">{selectedEvent.speakerTitle}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedEvent.speaker === 'Planlanıyor' && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Konuşmacı</h3>
                      <div className="text-gray-400 italic">
                        Konuşmacı bilgileri yakında açıklanacak
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Etiketler</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-400/10 text-yellow-400 font-medium rounded-lg border border-yellow-400/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {getAvailableSpots(selectedEvent) > 0 ? (
                    <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 
                                     text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300">
                      <Ticket className="w-5 h-5" />
                      <span>Katılım Sağla</span>
                    </button>
                  ) : (
                    <button className="flex items-center justify-center space-x-3 bg-gray-600 
                                     text-gray-300 font-bold px-8 py-4 rounded-xl cursor-not-allowed">
                      <Ticket className="w-5 h-5" />
                      <span>Kontenjan Doldu</span>
                    </button>
                  )}
                  
                  <button className="flex items-center justify-center space-x-3 bg-black/50 border border-gray-600
                                   text-white font-semibold px-8 py-4 rounded-xl hover:border-yellow-400/50 hover:text-yellow-400
                                   transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                    <span>Paylaş</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
