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



  const projects: Project[] = [
    {
      id: 1,
      title: "Silifke Teknoloji Klübü Web Sitesi",
      description: "Klübümüzün resmi web sitesi ve üye yönetim sistemi",
      longDescription: "Silifke Teknoloji Klübü olarak üyelerimizin bir araya geldiği, etkinliklerimizi duyurduğumuz ve projelerimizi sergilediğimiz modern web platformu. Çok yakında daha da gelişmiş özellikleriyle sizlerle buluşacak!",
      category: 'web',
      status: 'in-progress',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 3,
      duration: "2 ay",
      impact: "Çok yakında..."
    },
    {
      id: 2,
      title: "Öğrenci Mentorluk Platformu",
      description: "Deneyimli üyelerimizin yeni başlayanları desteklediği platform",
      longDescription: "Klübümüzdeki deneyimli yazılımcıların, yeni başlayan öğrencilere mentorluk yapabileceği interaktif platform. Kişisel gelişim planları, proje önerileri ve birebir görüşme sistemi içerecek. Çok yakında kullanıma açılacak!",
      category: 'education',
      status: 'planning',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'WebRTC'],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 4,
      duration: "3 ay",
      impact: "Çok yakında..."
    },
    {
      id: 3,
      title: "Hackathon Organizasyon Sistemi",
      description: "Silifke'nin ilk teknoloji yarışmasını düzenleyeceğimiz platform",
      longDescription: "Yerel ve ulusal katılımcıların bir araya geleceği hackathon etkinliğimiz için geliştirdiğimiz organizasyon sistemi. Takım oluşturma, proje sunumu ve jüri değerlendirme modülleri içerecek. Çok yakında duyurulacak!",
      category: 'web',
      status: 'planning',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 5,
      duration: "4 ay",
      impact: "Çok yakında..."
    },
    {
      id: 4,
      title: "Teknoloji Eğitim Mobil Uygulaması",
      description: "Programlama öğrenmek isteyenler için mobil eğitim platformu",
      longDescription: "Silifke'deki gençlerin programlama öğrenmesini destekleyecek mobil uygulama. İnteraktif dersler, kod editörü ve gerçek zamanlı mentör desteği sunacak. Çok yakında beta sürümü yayınlanacak!",
      category: 'mobile',
      status: 'planning',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Express'],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 3,
      duration: "5 ay",
      impact: "Çok yakında..."
    },
    {
      id: 5,
      title: "Yerel İşletme Dijitalleşme Projesi",
      description: "Silifke işletmelerinin dijital dönüşümünü destekleme programı",
      longDescription: "Yerel esnaf ve KOBİ'lerin dijital dünyaya geçişini destekleyeceğimiz kapsamlı proje. Web sitesi kurulumu, sosyal medya yönetimi ve e-ticaret çözümleri sunacağız. Çok yakında başvurular açılacak!",
      category: 'ecommerce',
      status: 'planning',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 6,
      duration: "6 ay",
      impact: "Çok yakında..."
    },
    {
      id: 6,
      title: "Silifke Tech Podcast Platformu",
      description: "Teknoloji dünyasından haberler ve röportajlar",
      longDescription: "Klüp üyelerimizin teknoloji dünyasındaki gelişmeleri tartıştığı, sektör profesyonelleriyle röportajlar yaptığı podcast platformu. Özel web sitesi ve mobil uygulama ile yayınlanacak. Çok yakında ilk bölüm!",
      category: 'web',
      status: 'planning',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 4,
      duration: "3 ay",
      impact: "Çok yakında..."
    },
    {
      id: 7,
      title: "Açık Kaynak Katkı Programı",
      description: "Üyelerimizin açık kaynak projelere katkı yapmasını teşvik programı",
      longDescription: "Klüp üyelerinin dünya çapındaki açık kaynak projelere katkı yapmasını destekleyecek program. Proje seçimi, mentorluk ve katkı takibi sistemi içerecek. Çok yakında kayıtlar başlayacak!",
      category: 'social',
      status: 'planning',
      technologies: ['GitHub API', 'Python', 'Django', 'React'],
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 3,
      duration: "Sürekli",
      impact: "Çok yakında..."
    },
    {
      id: 8,
      title: "Silifke Tech Meetup Organizasyon Sistemi",
      description: "Aylık teknoloji buluşmalarımızı organize ettiğimiz sistem",
      longDescription: "Her ay düzenleyeceğimiz teknoloji meetup'larının organizasyonunu kolaylaştıracak sistem. Etkinlik duyuruları, katılımcı yönetimi ve sunum planlaması özellikleri içerecek. Çok yakında ilk meetup!",
      category: 'web',
      status: 'planning',
      technologies: ['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format&q=80",
      teamSize: 5,
      duration: "2 ay",
      impact: "Çok yakında..."
    }
  ];



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'planning': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'in-progress': return 'Devam Ediyor';
      case 'planning': return 'Planlanıyor';
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
              <span>Ana Sayfaya Dön</span>
            </motion.button>
          )}
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Projelerimiz
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Yeni kurulan klübümüzün heyecan verici proje planlarını keşfedin. 
              Her biri Silifke ve çevresine değer katacak, teknoloji ile hayatı kolaylaştıracak çözümler sunacak.
            </p>
          </motion.div>

          {/* VIP References Ticker */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {/* VIP Black Stripe */}
            <div className="relative bg-black border-t border-b border-yellow-400/30 py-4 sm:py-6 overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent" />
              </div>

              {/* Scrolling text container */}
              <div className="relative">
                <div className="flex animate-scroll-left whitespace-nowrap">
                  {/* Multiple copies for continuous seamless loop */}
                  <div className="flex items-center animate-scroll-left">
                    {/* First copy */}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      simay.tech
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.silifketeknoloji.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.mahallepanosu.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.simayhareketi.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.bahadirgemalmaz.com
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    
                    {/* Second copy */}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      simay.tech
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.silifketeknoloji.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.mahallepanosu.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.simayhareketi.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.bahadirgemalmaz.com
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    
                    {/* Third copy */}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      simay.tech
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.silifketeknoloji.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.mahallepanosu.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.simayhareketi.org
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide drop-shadow-lg mr-8 sm:mr-12 md:mr-16">
                      www.bahadirgemalmaz.com
                    </span>
                    <span className="text-yellow-400 text-xl sm:text-2xl font-bold mr-8 sm:mr-12 md:mr-16">●</span>
                  </div>
                </div>
              </div>

              {/* Subtle glow effects */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black via-transparent to-transparent opacity-70" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black via-transparent to-transparent opacity-70" />
              </div>
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
                  className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                           rounded-2xl overflow-hidden border border-yellow-400/20 hover:border-yellow-400/40
                           transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer"
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
                        <span>{project.teamSize} kişi</span>
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
                  <h3 className="text-xl font-bold text-white mb-4">Teknolojiler</h3>
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
                    <div className="text-gray-400">Ekip Üyesi</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{selectedProject.duration}</div>
                    <div className="text-gray-400">Süre</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedProject.impact}</div>
                    <div className="text-gray-400">Etki</div>
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
                      <span>Canlı Demo</span>
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
