import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Heart,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

// Lazy load background components
const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  teamSize: number;
  duration: string;
  impact: string;
  tags?: string[];
}

interface ProjectsPageProps {
  onBack?: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const isTR = language === 'tr';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const projectData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'web',
      status: 'in-progress' as const,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      teamSize: 3,
      translations: {
        tr: {
          title: "Silifke Teknoloji Kulübü Web Sitesi",
          description: "Kulübümüzün resmi web sitesi ve üye yönetim sistemi",
          longDescription: "Silifke Teknoloji Kulübü olarak üyelerimizin bir araya geldiği, etkinliklerimizi duyurduğumuz ve projelerimizi sergilediğimiz modern web platformu. Üye girişi, başvuru yönetimi, blog ve etkinlik takvimi modülleri tamamlandı; şimdi içerik yönetimi ve performans optimizasyonu üzerinde çalışıyoruz.",
          duration: "Aralık 2024 - Şubat 2025",
          impact: "Beta yayını 1 Mart 2025'te planlanıyor."
        },
        en: {
          title: "Silifke Technology Club Website",
          description: "Official club website and member management system",
          longDescription: "A modern web platform where our members connect, events are announced, and projects are showcased. Member login, application management, blog, and events calendar modules are finished; we are currently focusing on content management and performance optimisation.",
          duration: "December 2024 – February 2025",
          impact: "Beta launch planned for 1 March 2025."
        }
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'education',
      status: 'in-progress' as const,
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'WebRTC'],
      teamSize: 4,
      translations: {
        tr: {
          title: "Öğrenci Mentorluk Platformu",
          description: "Deneyimli üyelerimizin yeni başlayanları desteklediği platform",
          longDescription: "Kulübümüzdeki deneyimli yazılımcıların, yeni başlayan öğrencilere mentorluk yapabileceği interaktif platform. Kişisel gelişim planları, proje önerileri ve birebir görüşme sistemi içerecek. Şubat ayı boyunca mentor profilleri toplanıyor, Mart ayında eşleştirme algoritması test edilecek.",
          duration: "Şubat 2025 - Nisan 2025",
          impact: "Nisan 2025 sonunda 25 mentor/mentee eşleşmesiyle pilot yayın hedefleniyor."
        },
        en: {
          title: "Student Mentorship Platform",
          description: "A platform where experienced members support newcomers",
          longDescription: "An interactive platform that pairs our experienced developers with students who are just getting started. It will include personal development plans, project suggestions, and one-on-one session scheduling. Mentor profiles are collected throughout February and the matching algorithm will be tested in March.",
          duration: "February 2025 – April 2025",
          impact: "Pilot launch with 25 mentor/mentee matches planned for the end of April 2025."
        }
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'web',
      status: 'planning' as const,
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
      teamSize: 5,
      translations: {
        tr: {
          title: "Hackathon Organizasyon Sistemi",
          description: "Silifke'nin ilk teknoloji yarışmasını düzenleyeceğimiz platform",
          longDescription: "Yerel ve ulusal katılımcıların bir araya geleceği hackathon etkinliğimiz için geliştirdiğimiz organizasyon sistemi. Takım oluşturma, proje sunumu ve jüri değerlendirme modülleri tamamlandı; ödül yönetimi ve canlı skor tahtası geliştirme aşamasında.",
          duration: "Ocak 2025 - Mayıs 2025",
          impact: "Hackathon 12-13 Nisan 2025 tarihlerinde sistem üzerinden yönetilecek."
        },
        en: {
          title: "Hackathon Organisation System",
          description: "Platform for managing Silifke's first technology competition",
          longDescription: "The management system we are building for our hackathon that will host both local and national participants. Team formation, project submission, and jury evaluation modules are completed; prize management and live scoreboard are now in development.",
          duration: "January 2025 – May 2025",
          impact: "Hackathon will be operated through the system on 12–13 April 2025."
        }
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'mobile',
      status: 'planning' as const,
      technologies: ['React Native', 'Firebase', 'Node.js', 'Express'],
      teamSize: 3,
      translations: {
        tr: {
          title: "Teknoloji Eğitim Mobil Uygulaması",
          description: "Programlama öğrenmek isteyenler için mobil eğitim platformu",
          longDescription: "Silifke'deki gençlerin programlama öğrenmesini destekleyecek mobil uygulama. İnteraktif dersler, kod editörü ve gerçek zamanlı mentör desteği sunacak. İçerik mimarisi tamamlandı, Mart ayında React Native prototipine geçiyoruz.",
          duration: "Mart 2025 - Temmuz 2025",
          impact: "Alfa sürümü Mayıs 2025'te mentorlarla test edilecek."
        },
        en: {
          title: "Technology Education Mobile App",
          description: "Mobile learning platform for aspiring developers",
          longDescription: "A mobile app that helps young people in Silifke learn programming. It will deliver interactive lessons, an in-app code editor, and real-time mentor support. The content architecture is complete and we move to the React Native prototype in March.",
          duration: "March 2025 – July 2025",
          impact: "Alpha release will be tested with mentors in May 2025."
        }
      }
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'ecommerce',
      status: 'planning' as const,
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
      teamSize: 6,
      translations: {
        tr: {
          title: "Yerel İşletme Dijitalleşme Projesi",
          description: "Silifke işletmelerinin dijital dönüşümünü destekleme programı",
          longDescription: "Yerel esnaf ve KOBİ'lerin dijital dünyaya geçişini destekleyeceğimiz kapsamlı program. Web sitesi kurulumu, sosyal medya yönetimi ve e-ticaret çözümleri sunacağız. İlk etapta 10 işletmeyle pilot çalışma başlatıldı.",
          duration: "Şubat 2025 - Ağustos 2025",
          impact: "İlk üç işletmenin e-ticaret sitesi Nisan 2025'te yayına alınacak."
        },
        en: {
          title: "Local Business Digitalisation Program",
          description: "Supporting the digital transformation of Silifke businesses",
          longDescription: "A comprehensive programme helping local artisans and SMEs step into the digital world. We handle website setup, social media management, and e-commerce solutions. The pilot kicked off with 10 businesses in the first cohort.",
          duration: "February 2025 – August 2025",
          impact: "E-commerce sites for the first three businesses go live in April 2025."
        }
      }
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'web',
      status: 'planning' as const,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
      teamSize: 4,
      translations: {
        tr: {
          title: "Silifke Tech Podcast Platformu",
          description: "Teknoloji dünyasından haberler ve röportajlar",
          longDescription: "Kulüp üyelerimizin teknoloji dünyasındaki gelişmeleri tartıştığı, sektör profesyonelleriyle röportajlar yaptığı podcast platformu. Web sitesi tasarım sistemi hazırlandı; kayıt stüdyosu ayarlandı ve ilk üç bölümün senaryosu yazıldı.",
          duration: "Ocak 2025 - Nisan 2025",
          impact: "İlk sezonun yayın planı Mayıs 2025'te başlıyor."
        },
        en: {
          title: "Silifke Tech Podcast Platform",
          description: "News and interviews from the technology scene",
          longDescription: "A podcast platform where club members discuss technology trends and interview industry professionals. The website design system is ready, the recording studio is set up, and scripts for the first three episodes are finished.",
          duration: "January 2025 – April 2025",
          impact: "First season publish schedule kicks off in May 2025."
        }
      }
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'social',
      status: 'in-progress' as const,
      technologies: ['GitHub API', 'Python', 'Django', 'React'],
      teamSize: 3,
      translations: {
        tr: {
          title: "Açık Kaynak Katkı Programı",
          description: "Üyelerimizin açık kaynak projelere katkı yapmasını teşvik programı",
          longDescription: "Kulüp üyelerinin dünya çapındaki açık kaynak projelere katkı yapmasını destekleyecek program. Proje seçimi, mentorluk ve katkı takibi sistemi içerecek. GitHub organizasyonu kuruldu ve ilk proje listesi paylaşıldı.",
          duration: "Sürekli",
          impact: "2025 boyunca en az 15 katkının mentor eşliğinde tamamlanması hedefleniyor."
        },
        en: {
          title: "Open Source Contribution Program",
          description: "A programme encouraging members to contribute to open source",
          longDescription: "A support programme that helps club members contribute to open source projects worldwide. It includes project selection, mentorship, and contribution tracking. Our GitHub organisation is live and the first project list has been published.",
          duration: "Ongoing",
          impact: "Targeting at least 15 mentored contributions throughout 2025."
        }
      }
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format&q=80",
      category: 'web',
      status: 'in-progress' as const,
      technologies: ['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
      teamSize: 5,
      translations: {
        tr: {
          title: "Silifke Tech Meetup Organizasyon Sistemi",
          description: "Aylık teknoloji buluşmalarımızı organize ettiğimiz sistem",
          longDescription: "Her ay düzenlediğimiz teknoloji meetup'larının organizasyonunu kolaylaştıracak sistem. Etkinlik duyuruları, katılımcı yönetimi ve sunum planlaması özellikleri tamamlandı; şimdi geri bildirim modülü ekleniyor.",
          duration: "Ocak 2025 - Mart 2025",
          impact: "Mart 2025 meetup'ı yeni sistem üzerinden kayıt alacak."
        },
        en: {
          title: "Silifke Tech Meetup Management System",
          description: "System for organising our monthly technology meetups",
          longDescription: "The system that streamlines how we run our monthly tech meetups. Event announcements, attendee management, and presentation planning are finished; we are now adding the feedback module.",
          duration: "January 2025 – March 2025",
          impact: "March 2025 meetup registrations will run through the new system."
        }
      }
    }
  ] as const;

  const projects: Project[] = projectData.map((project) => {
    const translation = project.translations[language];
    return {
      id: project.id,
      image: project.image,
      category: project.category,
      status: project.status,
      technologies: Array.from(project.technologies),
      teamSize: project.teamSize,
      title: translation.title,
      description: translation.description,
      longDescription: translation.longDescription,
      duration: translation.duration,
      impact: translation.impact
    } satisfies Project;
  });



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'planning': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusText = (status: string) => {
    if (isTR) {
      switch (status) {
        case 'completed': return 'Tamamlandı';
        case 'in-progress': return 'Devam Ediyor';
        case 'planning': return 'Planlanıyor';
        default: return status;
      }
    }

    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planning': return 'Planning';
      default: return status;
    }
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
              <span>{isTR ? 'Ana Sayfaya Dön' : 'Back to Home'}</span>
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
              <span className="glass-pill text-[0.65rem] sm:text-xs text-yellow-100">{isTR ? 'Üretim Yol Haritası' : 'Build Roadmap'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              {isTR ? 'Projelerimiz' : 'Our Projects'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200/90 max-w-4xl mx-auto leading-relaxed">
              {isTR
                ? "Silifke'nin geleceğini inşa eden teknoloji planlarımızı keşfedin. Her proje, topluluğun ihtiyaçlarına cam gibi şeffaf ve güçlü çözümler sunmak için tasarlandı."
                : 'Explore the technology plans shaping the future of Silifke. Every project is designed to deliver transparent, resilient solutions for our community.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {(isTR
                ? ['Web & Mobil Ürünler', 'Topluluk Programları', 'AI ve Veri Projeleri']
                : ['Web & Mobile Products', 'Community Programmes', 'AI & Data Projects']).map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-gray-200 backdrop-blur-lg">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="group glass-panel glass-border-accent overflow-hidden cursor-pointer hover:-translate-y-3"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
                                   border ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-medium rounded border border-yellow-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-400/10 text-gray-400 text-xs font-medium rounded border border-gray-400/20">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{isTR ? `${project.teamSize} kişi` : `${project.teamSize} people`}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>


        </div>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
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
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full
                           flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                >
                  ✕
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold
                                 border ${getStatusColor(selectedProject.status)}`}>
                    {getStatusText(selectedProject.status)}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">{isTR ? 'Teknolojiler' : 'Technologies'}</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-400/10 text-yellow-400 font-medium rounded-lg border border-yellow-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{selectedProject.teamSize}</div>
                    <div className="text-gray-400">{isTR ? 'Ekip Üyesi' : 'Team Members'}</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{selectedProject.duration}</div>
                    <div className="text-gray-400">{isTR ? 'Süre' : 'Duration'}</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedProject.impact}</div>
                    <div className="text-gray-400">{isTR ? 'Etki' : 'Impact'}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 
                               text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>{isTR ? 'Canlı Demo' : 'Live Demo'}</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 bg-black/50 border border-gray-600
                               text-white font-semibold px-6 py-3 rounded-xl hover:border-yellow-400/50 hover:text-yellow-400
                               transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
