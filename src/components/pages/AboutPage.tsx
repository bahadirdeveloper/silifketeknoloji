import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Users, Target, Heart, Lightbulb, Code, Globe, ArrowLeft, ChevronRight } from "lucide-react";

// Lazy load background components
const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface AboutPageProps {
  onBack?: () => void;
  onJoin?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onJoin }) => {
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

  const teamMembers = [
    {
      name: "Ahmet Yılmaz",
      role: "Kurucu & Teknik Lider",
      expertise: "Full-Stack Development, AI/ML",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "10+ yıllık yazılım geliştirme deneyimi ile teknoloji dünyasında öncü projeler geliştiriyor."
    },
    {
      name: "Zeynep Kaya",
      role: "UI/UX Tasarım Uzmanı",
      expertise: "User Experience, Visual Design",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Kullanıcı odaklı tasarım anlayışıyla dijital deneyimleri şekillendiriyor."
    },
    {
      name: "Mehmet Demir",
      role: "Proje Yöneticisi",
      expertise: "Agile, Scrum, Team Leadership",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Ekip koordinasyonu ve proje yönetiminde uzman, başarılı projelerin mimarı."
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Misyon",
      description: "Silifke ve çevresindeki toplumsal sorunlara teknoloji ile çözüm üretmek, yerel girişimcileri desteklemek ve dijital dönüşüme öncülük etmek."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Vizyon",
      description: "Silifke'yi Akdeniz'in teknoloji merkezi haline getirmek, sürdürülebilir ve kapsayıcı bir dijital ekosistem oluşturmak."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Değerler",
      description: "İnovasyon, işbirliği, şeffaflık, sürdürülebilirlik ve toplumsal fayda odaklı çalışma prensiplerimizdir."
    }
  ];

  const achievements = [
    { number: "1", label: "Tamamlanan Proje", icon: <Code className="w-6 h-6" /> },
    { number: "3", label: "Aktif Üye", icon: <Users className="w-6 h-6" /> },
    { number: "3", label: "Teknoloji Ortağı", icon: <Globe className="w-6 h-6" /> },
    { number: "2", label: "Yaklaşan Etkinlik", icon: <Heart className="w-6 h-6" /> }
  ];

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
            className="text-center mb-24"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8
                         bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent
                         leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hakkımızda
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed
                         font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Silifke Teknoloji Klübü, teknolojinin gücünü toplumsal fayda için kullanan,
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-medium">
                yenilikçi çözümler üreten
              </span> ve yerel kalkınmaya katkıda bulunan bir topluluktur.
            </motion.p>
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-16
                         bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent
                         leading-tight tracking-tight"
            >
              Neden Biz?
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Connection Lines for Desktop */}
              <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>

              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="group relative bg-gradient-to-br from-black/30 via-black/50 to-black/70 backdrop-blur-xl
                           rounded-3xl p-8 md:p-10 border border-yellow-400/10 hover:border-yellow-400/40
                           transition-all duration-500 hover:transform hover:scale-[1.02]
                           hover:shadow-2xl hover:shadow-yellow-500/20 overflow-hidden
                           before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-500/5 before:to-transparent
                           before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl" />
                  </div>

                  {/* Icon with enhanced animation */}
                  <motion.div
                    className="relative mb-8 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10
                                  rounded-2xl flex items-center justify-center border border-yellow-400/20
                                  group-hover:border-yellow-400/40 group-hover:from-yellow-400/30 group-hover:to-yellow-500/20
                                  transition-all duration-500 shadow-lg shadow-yellow-400/10">
                      <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-500">
                        <div className="w-10 h-10">
                          {value.icon}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent
                                  rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Title with enhanced typography */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white mb-6 text-center
                             group-hover:text-yellow-100 transition-colors duration-500 relative"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {value.title}
                    <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-yellow-400
                                  group-hover:w-16 transition-all duration-500 transform -translate-x-1/2" />
                  </motion.h3>

                  {/* Description with better typography */}
                  <motion.p
                    className="text-gray-300 leading-relaxed text-center text-base md:text-lg
                             group-hover:text-gray-200 transition-colors duration-500 font-light"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {value.description}
                  </motion.p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/40 rounded-full
                                group-hover:bg-yellow-400/60 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400/30 rounded-full
                                group-hover:bg-yellow-400/50 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.label}
                variants={fadeInUp}
                className="group text-center bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent
                         backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/10
                         hover:border-yellow-400/30 hover:bg-yellow-500/15
                         transition-all duration-300 hover:transform hover:scale-105
                         hover:shadow-2xl hover:shadow-yellow-500/20"
                role="region"
                aria-labelledby={`achievement-${achievement.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div
                  id={`achievement-${achievement.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-yellow-100 transition-colors duration-300"
                >
                  {achievement.number}
                </div>
                <div className="text-gray-400 font-semibold text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Story Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-24"
          >
            <div className="bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm
                          rounded-3xl p-8 md:p-12 border border-yellow-400/20
                          hover:border-yellow-400/30 transition-all duration-300">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-12
                           bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Hikayemiz
              </motion.h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                    2025 yılında Silifke'nin gençlerine ilham vermek, yerel sorunlara teknolojiyle çözümler üretmek ve geleceğin dijital ekosistemini kurmak için yola çıktık.
                  </p>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                    Bugün sadece birkaç kişi olsak da, arkamızda katılmayı bekleyen ve hayallerini teknolojiyle gerçekleştirmek isteyen koca bir Silifke gençliği var.
                  </p>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                    Bizim için bu yolculuk sadece kod yazmak değil; birlikte öğrenmek, üretmek, paylaşmak ve zamanla hem topluma fayda sağlayacak hem de gençlere gelir yaratacak bir teknoloji hareketi inşa etmek.
                  </p>
                </motion.div>
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format&q=80"
                    alt="Silifke Teknoloji Takımı Çalışması"
                    className="rounded-2xl shadow-2xl border border-yellow-400/20 w-full
                             group-hover:shadow-yellow-500/20 transition-all duration-300
                             group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl
                                group-hover:from-black/40 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium opacity-90">Takım Çalışması</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent"
            >
              Ekibimiz
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  className="group bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                           rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40
                           transition-all duration-300 hover:transform hover:scale-105 text-center
                           hover:shadow-2xl hover:shadow-yellow-500/20"
                  role="article"
                  aria-labelledby={`team-member-${member.name.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400/30 object-cover
                               group-hover:border-yellow-400/60 group-hover:scale-110
                               transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-yellow-400/20 to-transparent
                                  group-hover:from-yellow-400/30 transition-all duration-300"></div>
                  </div>
                  <h3
                    id={`team-member-${member.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-xl font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors duration-300"
                  >
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 font-semibold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300">
                    {member.expertise}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-yellow-500/10 backdrop-blur-sm
                          rounded-3xl p-8 md:p-12 border border-yellow-400/20
                          hover:border-yellow-400/30 transition-all duration-300">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Bizimle Yolculuğa Çık
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Silifke'nin teknoloji geleceğini birlikte şekillendirmek için aramıza katıl!
              </motion.p>
              <motion.button
                onClick={onJoin}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700
                         text-black font-bold text-xl px-10 py-5 rounded-3xl
                         shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60
                         transition-all duration-300 overflow-hidden
                         border-2 border-yellow-400/30 hover:border-yellow-300/50"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex items-center space-x-3">
                  <span className="tracking-wide">Hemen Katıl</span>
                  <ChevronRight className="w-6 h-6 transition-transform duration-300
                                         group-hover:translate-x-1" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -top-4 -left-4 w-8 h-full bg-gradient-to-r
                              from-transparent via-white/30 to-transparent skew-x-12
                              -translate-x-full group-hover:translate-x-[250%]
                              transition-transform duration-1000 ease-out" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
