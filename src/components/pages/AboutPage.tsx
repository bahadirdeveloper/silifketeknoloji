import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Users, Target, Heart, Lightbulb, Code, Globe, ArrowLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

// Lazy load background components
const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  description: string;
  image: string;
}

interface AboutPageProps {
  onBack?: () => void;
  onJoin?: () => void;
}

const aboutContent = {
  tr: {
    back: 'Ana Sayfaya Dön',
    heroPill: 'Silifke Teknoloji Kulübü',
    heroTitle: 'Hakkımızda',
    heroSubtitle: {
      line1: 'Silifke Teknoloji Kulübü, teknolojinin gücünü toplumsal fayda için kullanan,',
      highlight: 'yenilikçi çözümler üreten',
      line2: 've yerel kalkınmaya katkıda bulunan bir topluluktur.'
    },
    heroHighlights: [
      'Gündüzleri üretim, geceleri ideathon',
      'Yerelden globale uzanan teknoloji hikâyeleri',
      'Topluluk temelli paylaşım ve büyüme kültürü'
    ],
    whyTitle: 'Neden Biz?',
    values: [
      {
        title: 'Misyon',
        description: 'Silifke ve çevresindeki toplumsal sorunlara teknoloji ile çözüm üretmek, yerel girişimcileri desteklemek ve dijital dönüşüme öncülük etmek.'
      },
      {
        title: 'Vizyon',
        description: "Silifke'yi Akdeniz'in teknoloji merkezi haline getirmek, sürdürülebilir ve kapsayıcı bir dijital ekosistem oluşturmak."
      },
      {
        title: 'Değerler',
        description: 'İnovasyon, işbirliği, şeffaflık, sürdürülebilirlik ve toplumsal fayda odaklı çalışma prensiplerimizdir.'
      }
    ],
    achievements: [
      { number: '1', label: 'Tamamlanan Proje' },
      { number: '3', label: 'Aktif Üye' },
      { number: '3', label: 'Teknoloji Ortağı' },
      { number: '2', label: 'Yaklaşan Etkinlik' }
    ],
    storyTitle: 'Hikayemiz',
    storyParagraphs: [
      "2025 yılında Silifke'nin gençlerine ilham vermek, yerel sorunlara teknolojiyle çözümler üretmek ve geleceğin dijital ekosistemini kurmak için yola çıktık.",
      'Bugün sadece birkaç kişi olsak da, arkamızda katılmayı bekleyen ve hayallerini teknolojiyle gerçekleştirmek isteyen koca bir Silifke gençliği var.',
      'Bizim için bu yolculuk sadece kod yazmak değil; birlikte öğrenmek, üretmek, paylaşmak ve zamanla hem topluma fayda sağlayacak hem de gençlere gelir yaratacak bir teknoloji hareketi inşa etmek.'
    ],
    storyImageAlt: 'Silifke Teknoloji Takımı Çalışması',
    storyImageCaption: 'Takım Çalışması',
    teamTitle: 'Ekibimiz',
    teamMembers: [] as TeamMember[],
    placeholder: {
      title: 'Yeni Üye',
      subtitle: 'Sen Olabilirsin!',
      description: 'Kulübümüze katıl ve bu alanı doldur. Birlikte büyüyelim!'
    },
    placeholderAria: 'Yeni ekip üyesi için boş alan',
    ctaTitle: 'Bizimle Yolculuğa Çık',
    ctaDescription: "Silifke'nin teknoloji geleceğini birlikte şekillendirmek için aramıza katıl!",
    ctaButton: 'Hemen Katıl'
  },
  en: {
    back: 'Back to Home',
    heroPill: 'Silifke Technology Club',
    heroTitle: 'About Us',
    heroSubtitle: {
      line1: 'Silifke Technology Club is a community that harnesses the power of technology for social good,',
      highlight: 'creates innovative solutions',
      line2: 'and contributes to local development.'
    },
    heroHighlights: [
      'Building by day, ideathons by night',
      'Technology stories that grow from local to global',
      'A community culture of sharing and collective growth'
    ],
    whyTitle: 'Why Us?',
    values: [
      {
        title: 'Mission',
        description: 'We solve social challenges in Silifke and the surrounding region through technology, support local entrepreneurs, and lead the digital transformation.'
      },
      {
        title: 'Vision',
        description: 'We aim to make Silifke the technology hub of the Mediterranean by building a sustainable and inclusive digital ecosystem.'
      },
      {
        title: 'Values',
        description: 'Innovation, collaboration, transparency, sustainability, and a focus on social impact define how we work.'
      }
    ],
    achievements: [
      { number: '1', label: 'Completed Project' },
      { number: '3', label: 'Active Members' },
      { number: '3', label: 'Technology Partners' },
      { number: '2', label: 'Upcoming Events' }
    ],
    storyTitle: 'Our Story',
    storyParagraphs: [
      'In 2025 we set out to inspire the youth of Silifke, solve local challenges with technology, and build the digital ecosystem of the future.',
      'We may be a small team today, but a large community of young people in Silifke is ready to join us and bring their dreams to life through technology.',
      'For us this journey is more than writing code; it is about learning, creating, and sharing together while building a technology movement that benefits society and creates income opportunities for young people.'
    ],
    storyImageAlt: 'Silifke Technology team collaborating',
    storyImageCaption: 'Teamwork',
    teamTitle: 'Our Team',
    teamMembers: [],
    placeholder: {
      title: 'New Member',
      subtitle: 'It Could Be You!',
      description: "Join the club and fill this space. Let's grow together!"
    },
    placeholderAria: 'Open slot for a new team member',
    ctaTitle: 'Start the Journey with Us',
    ctaDescription: 'Join us to shape the technology future of Silifke together!',
    ctaButton: 'Join Now'
  }
} as const;

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onJoin }) => {
  const { language } = useLanguage();
  const t = aboutContent[language];
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

  const teamMembers = t.teamMembers;

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      ...t.values[0]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      ...t.values[1]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      ...t.values[2]
    }
  ];

  const achievementIcons = [
    <Code className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
    <Heart className="w-6 h-6" />
  ];

  const achievements = t.achievements.map((achievement, index) => ({
    ...achievement,
    icon: achievementIcons[index]
  }));

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
              <span>{t.back}</span>
            </motion.button>
          )}
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="glass-panel glass-border-accent px-6 sm:px-12 py-12 md:py-16 text-center mb-24"
          >
            <div className="flex justify-center mb-6">
              <span className="glass-pill text-[0.65rem] sm:text-xs text-yellow-100">
                {t.heroPill}
              </span>
            </div>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8
                         bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent
                         leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-200/90 max-w-4xl mx-auto leading-relaxed
                         font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.heroSubtitle.line1}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-medium">
                {t.heroSubtitle.highlight}
              </span>{' '}
              {t.heroSubtitle.line2}
            </motion.p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {t.heroHighlights.map((highlight) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm md:text-base text-gray-200/95 backdrop-blur-md"
                >
                  {highlight}
                </motion.div>
              ))}
            </div>
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
              {t.whyTitle}
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
                  className="group glass-panel glass-border-accent p-8 md:p-10 hover:-translate-y-3 hover:shadow-yellow-500/20"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <motion.div
                    className="relative mb-8 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="glass-gradient-ring w-20 h-20 rounded-2xl flex items-center justify-center border border-yellow-400/30 text-yellow-200">
                      <div className="w-10 h-10">
                        {value.icon}
                      </div>
                    </div>
                  </motion.div>

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

                  <motion.p
                    className="text-gray-300 leading-relaxed text-center text-base md:text-lg
                             group-hover:text-gray-200 transition-colors duration-500 font-light"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {value.description}
                  </motion.p>

                  <div className="absolute top-5 right-5 h-16 w-16 rounded-full bg-yellow-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group glass-panel glass-border-accent text-center p-6 md:p-8 hover:-translate-y-2"
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
            <div className="glass-panel glass-border-accent p-8 md:p-12">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-12
                           bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {t.storyTitle}
              </motion.h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {t.storyParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format&q=80"
                    alt={t.storyImageAlt}
                    className="rounded-2xl shadow-2xl border border-yellow-400/20 w-full
                             group-hover:shadow-yellow-500/20 transition-all duration-300
                             group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl
                                group-hover:from-black/40 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium opacity-90">{t.storyImageCaption}</p>
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
              {t.teamTitle}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Mevcut ekip üyeleri */}
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  className="group glass-panel glass-border-accent p-6 text-center hover:-translate-y-3 hover:shadow-yellow-500/20"
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

              {/* Boş alanlar - yeni üyeler için */}
              {Array.from({ length: 9 }).map((_, index) => (
                <motion.div
                  key={`slot-${index}`}
                  variants={fadeInUp}
                  className="group glass-panel border-2 border-dashed border-yellow-400/40 hover:border-yellow-300/60
                           transition-all duration-300 hover:-translate-y-2 text-center
                           min-h-[300px] flex flex-col items-center justify-center"
                  role="article"
                  aria-label={t.placeholderAria}
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full mx-auto border-4 border-dashed border-yellow-400/40 
                                 group-hover:border-yellow-400/60 transition-all duration-300
                                 flex items-center justify-center bg-gradient-to-br from-yellow-400/10 to-yellow-500/5">
                      <div className="text-4xl text-yellow-400/60 group-hover:text-yellow-400/80 transition-colors duration-300">
                        +
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                    {t.placeholder.title}
                  </h3>
                  <p className="text-yellow-400/70 font-semibold mb-2 group-hover:text-yellow-400/90 transition-colors duration-300">
                    {t.placeholder.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {t.placeholder.description}
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
            <div className="glass-panel glass-border-accent p-8 md:p-12">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t.ctaTitle}
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {t.ctaDescription}
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
                  <span className="tracking-wide">{t.ctaButton}</span>
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
