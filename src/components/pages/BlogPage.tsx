import React, { lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Languages } from "lucide-react";
import { useLanguage, type SupportedLanguage } from "../../i18n/LanguageContext";

const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface BlogPageProps {
  onBack?: () => void;
}

type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type BlogPost = {
  title: string;
  description: string;
  metadata: {
    author: string;
    date: string;
    readingTime: string;
  };
  tags: string[];
  sections: BlogSection[];
  callToAction: {
    label: string;
    href: string;
  };
};

type BlogContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  backLabel: string;
  languageLabel: string;
  posts: BlogPost[];
  latestLabel: string;
};

const blogDictionary: Record<SupportedLanguage, BlogContent> = {
  tr: {
    heroTitle: "Blog",
    heroSubtitle: "Yerelden yükselen teknoloji hikâyeleri, öğrenimler ve ilham verici proje günlükleri.",
    heroBadge: "Silifke Teknoloji Kulübü Güncesi",
    backLabel: "Ana Sayfaya Dön",
    languageLabel: "Dil",
    latestLabel: "Güncel Yazı",
    posts: [
      {
        title: "🌿 Silifke Teknoloji: Kodla, Üret, Ama İz Bırakma",
        description:
          "Projelerimizde karbon ayak izini azaltmak için teknolojiyle denge kuruyoruz.",
        metadata: {
          author: "Silifke Teknoloji Ekibi",
          date: "14 Şubat 2025",
          readingTime: "8 dk okuma"
        },
        tags: ["Sürdürülebilirlik", "Enerji Verimliliği", "Silifke Modeli"],
        sections: [
          {
            heading: "Doğa ile Teknolojiyi Buluşturmak",
            paragraphs: [
              "Dijital çağın hızla genişleyen enerjisi beraberinde görünmez bir yük de getiriyor: karbon salınımı.",
              "Her yazdığımız kod, her çalıştırdığımız sunucu ve her prototipin arkasında belirli bir enerji tüketimi var. Silifke Teknoloji olarak daha temiz ve sürdürülebilir bir gelecek kurmayı seçiyoruz."
            ]
          },
          {
            heading: "⚙️ Sıfırdan Başlayan Bilinç: \"Her Satır Kodun Bir Bedeli Var\"",
            paragraphs: [
              "Yapay zekâ, otomasyon ve yazılım sistemleri üretirken enerjinin sadece fiziksel dünyada değil dijital süreçlerde de tükendiğinin farkındayız.",
              "Sunucu altyapılarımızdan veri depolamaya, render süreçlerinden sensör sistemlerine kadar her aşamada karbon ayak izimizi ölçüp minimize edebilmek için sistematik bir yaklaşım benimsedik."
            ]
          },
          {
            heading: "🔋 Akıllı Proje Geliştirme Döngüsü",
            paragraphs: [
              "Silifke Teknoloji'de geliştirdiğimiz her proje enerji verimliliği kriterlerine göre tasarlanıyor ve biz bu yaklaşımı \"Akıllı Döngü Modeli\" olarak adlandırıyoruz."
            ],
            bullets: [
              "Analiz: Altyapıların enerji tüketim profillerini baştan hesaplıyoruz.",
              "Optimize: Gereksiz işlem yükünü, veri transferini ve kaynak kullanımını azaltıyoruz.",
              "Otomatize: Sensör verileriyle anlık enerji tüketimini izleyip optimize ediyoruz.",
              "Raporla: Karbon etkisini şeffaf biçimde belgelerken öğrenimlerimizi paylaşıyoruz."
            ]
          },
          {
            heading: "🌍 Yerelden Küresele: Silifke Modeli’nin Yeşil Vizyonu",
            paragraphs: [
              "Yerelin üretim kültürünü korurken küresel standartlarda sürdürülebilir teknoloji üretmek için Silifke Modeli'nin yeşil vizyonunu takip ediyoruz."
            ],
            bullets: [
              "Donanım seçimlerimizde düşük güç tüketimli cihazlara öncelik veriyoruz.",
              "Sunucu altyapımız için yenilenebilir enerjiyle çalışan servisleri tercih ediyoruz.",
              "Tekrar kullanılabilir kod ve bileşen mantığını tasarım döngülerinin merkezine yerleştiriyoruz.",
              "Yoğun hesaplama gerektiren işlemlerde optimize GPU ve kaynak tahsisi uyguluyoruz."
            ]
          },
          {
            heading: "🌱 Karbon Ayak İzine Karşı Dijital Denge",
            paragraphs: [
              "Sürdürülebilirlik bizim için bir pazarlama başlığı değil, tasarım ilkesi.",
              "\"Bu sistem çalışırken doğaya ne kadar yük bindiriyor ve bunu nasıl azaltabiliriz?\" sorusunu her projede soruyoruz.",
              "Yapay zekâ destekli izleme altyapılarımız, karbon salınımını gerçek zamanlı ölçüp raporlayarak küçük işletmeler ve bireysel üreticiler için de erişilebilir çözümler sunacak."
            ]
          },
          {
            heading: "🔭 Geleceğe Bakış: Sıfır Emisyonlu Teknoloji",
            paragraphs: [
              "2025 vizyonumuz Silifke Teknoloji'yi kendi karbon salınımını dengeleyen ilk yerel teknoloji girişimi yapmak."
            ],
            bullets: [
              "Proje altyapılarımızda yenilenebilir enerji kaynaklarına geçiş planlıyoruz.",
              "Karbon dengeleme algoritmaları ve ölçüm araçları geliştiriyoruz.",
              "Veri merkezleri için yeşil enerji anlaşmaları üzerinde çalışıyoruz."
            ]
          },
          {
            heading: "💬 Son Söz",
            paragraphs: [
              "Teknoloji üretmek güç ister; o gücü doğayı tüketmeden kullanmak ise gerçek mühendislik gerektirir.",
              "Silifke Teknoloji olarak vizyonumuz net: daha akıllı sistemler ve daha temiz bir dünya. Her proje, her satır kod ve her sensör bu vizyonun bir parçası."
            ]
          }
        ],
        callToAction: {
          label: "Sürdürülebilirlik Yolculuğuna Katıl",
          href: "/projeler"
        }
      },
      {
        title: "🦀 Silifke Modeli: Garajdan Kurumlaşmaya Giden Yol",
        description:
          "Silifke Modeli manifestosuyla garajdan başlayıp kurumsallaşmaya uzanan kapsayıcı üretim kültürünü keşfedin.",
        metadata: {
          author: "Silifke Teknoloji Manifesto Ekibi",
          date: "22 Ocak 2025",
          readingTime: "7 dk okuma"
        },
        tags: ["Silifke Modeli", "Topluluk", "Kurumsallaşma"],
        sections: [
          {
            heading: "Manifesto",
            paragraphs: [
              "“Kapsayıcı kurumlar sadece devlet düzeyinde değil, Silifke’de bir garajda da kurulabilir.” — Silifke Modeli Manifestosu",
              "Garaj, cesaret ve kolektif bilinçle birleştiğinde bir kentin geleceğini şekillendirebilir. Silifke Modeli tam olarak bu potansiyeli manifestoya dönüştürüyor."
            ]
          },
          {
            heading: "1. Başlangıç Fikri",
            paragraphs: [
              "Her büyük dönüşüm bir küçük laboratuvarda başlar. Silifke Teknoloji Kulübü sadece bir topluluk değil; yerelden evrensele uzanan kapsayıcı bir yönetim deneyidir.",
              "Kulübün amacı, üretmek kadar paylaşmak, liderlik kadar katılımı yaygınlaştırmak, teknoloji kadar insanı güçlendirmektir."
            ]
          },
          {
            heading: "2. Temel İlkeler",
            paragraphs: [
              "Silifke Modeli sürdürülebilir bir topluluk inşası için dört temel ilkeye dayanır."
            ],
            bullets: [
              "Katılımcılık: Her birey fikir sunabilir, karar alabilir, katkı sağlayabilir.",
              "Şeffaflık: Gelir, gider, proje ve sponsorluk süreçleri açık biçimde paylaşılır.",
              "Eşitlik: Deneyim veya yaş farkı gözetilmeksizin herkes üretim sürecine dahil edilir.",
              "Yerel Güçlenme: Teknoloji, Silifke halkının refahını artıran somut araçlara dönüştürülür."
            ]
          },
          {
            heading: "3. Mikro Düzeyde Kapsayıcı Kurum",
            paragraphs: [
              "Silifke Modeli, devletlerin devasa yapılarında aranan “katılımcı kurum” ruhunu, bir garajda çalışan üç kişilik bir ekipte yaşatır.",
              "Topluluk temelli karar alma mekanizması kurumsal bilinci tabana yayar, proje üretimini yerel ihtiyaçlara göre şekillendirir ve teknolojiyi toplumun ortak aklına dönüştürür."
            ]
          },
          {
            heading: "4. Teknolojiyle Kurumsallaşma",
            paragraphs: [
              "Modelin dijital temeli, şeffaf veri paylaşımından adil gelir dağılımına kadar teknolojinin tüm imkanlarını Silifke için seferber eder."
            ],
            bullets: [
              "Supabase ve açık kaynak teknolojilerle şeffaf veri yönetimi.",
              "Prompt Engineer GPT, Web Designer GPT gibi ajanlarla eşit üretkenlik.",
              "Topluluk puanlama sistemiyle adil gelir paylaşımı.",
              "Silifke Cloud sayesinde kolektif bilginin ortak depolanması."
            ]
          },
          {
            heading: "5. Garajdan Kamuya",
            paragraphs: [
              "Garaj, fikirlerin doğduğu yerdir. Silifke Teknoloji, bu fikirleri yapıya, disipline ve ekosisteme dönüştürür."
            ],
            bullets: [
              "Topluluk Evresi: Fikir ve enerji üretimi.",
              "Kurum Evresi: Şeffaf yönetim, görev dağılımı, sürdürülebilir finansman.",
              "Kalkınma Evresi: Projelerin Silifke’nin eğitimine, ekonomisine ve kültürüne etkisi."
            ]
          },
          {
            heading: "6. Geleceğe Yönelik Çağrı",
            paragraphs: [
              "Silifke Modeli, bir kulübün ötesinde yeni bir yönetim felsefesinin prototipidir.",
              "Hedef, bir kasabadan çıkan teknoloji fikri değil; kasabanın geleceğini birlikte inşa eden bilinçli bir toplumdur. Teknoloji araçtır, kurumlar ruhtur; Silifke bu ruhu teknolojiyle birleştiren ilk yerel örnek olmayı hedefliyor."
            ]
          }
        ],
        callToAction: {
          label: "Silifke Modeline Katıl",
          href: "/katil"
        }
      },
      {
        title: "Değer Üretiyoruz! Yapay Zeka ve İnsan",
        description:
          "Silifke Teknoloji Kulübü'nde yapay zekâyı insan odaklı projelerle nasıl birleştirdiğimizi, yerelde değer üretirken küresel bakış açımızı nasıl koruduğumuzu paylaşıyoruz.",
        metadata: {
          author: "Silifke Teknoloji Ekibi",
          date: "6 Ocak 2025",
          readingTime: "6 dk okuma"
        },
        tags: ["Yapay Zeka", "Topluluk", "Strateji"],
        sections: [
          {
            heading: "Neden Bu Konu?",
            paragraphs: [
              "Silifke'de teknoloji üretmek bir hayal değil; planlı, kolektif ve sürdürülebilir bir yolculuk. Yapay zekâ araçları artık sadece büyük şirketlerin elinde değil. Doğru ekip ve topluluk desteğiyle, küçük şehirlerde bile büyük etki yaratabiliyoruz.",
              "Bu yazıda, yapay zekâyı insan merkezli bakış açısıyla nasıl harmanladığımızı ve bu yaklaşımın kulübümüzün projelerine nasıl yön verdiğini anlatıyoruz."
            ]
          },
          {
            heading: "Topluluk Olarak Ne Yapıyoruz?",
            paragraphs: [
              "Her projeye 'neden' sorusuyla başlıyoruz. Yerel üreticinin satış kanalını büyütmek, gençlerin teknolojiye erişimini artırmak ya da sosyal etki odaklı girişimlere destek olmak. Problemi netleştirdikten sonra teknolojiyi devreye alıyoruz."
            ],
            bullets: [
              "Önce insan: Hikâyeyi dinliyor, ihtiyacı anlıyor, sorunu birlikte tanımlıyoruz.",
              "Veri ile sezgiyi dengeliyoruz: Topladığımız içgörüler, geliştirilecek özellikleri belirliyor.",
              "Üretim kültürü: Atölyeler, vibe coding seansları ve haftalık değerlendirmelerle ilerlemeyi somutlaştırıyoruz."
            ]
          },
          {
            heading: "Yapay Zekâ ve İnsan İşbirliği",
            paragraphs: [
              "Kulübümüzdeki her üretim süreci, AI destekli araçlarla hızlanırken, nihai yönü insanlar belirliyor. Prompt mühendisliği atölyeleriyle üyelerimizin üretkenliklerini artırıyor, etik çerçevede AI kullanımını öğretiyoruz.",
              "Chatbot prototipleri, içerik üretimi, veri analizi ve tasarım taslakları gibi alanlarda yapay zekâdan besleniyoruz; fakat son dokunuşu topluluk zekâsı yapıyor."
            ]
          },
          {
            heading: "Birlikte Geleceği İnşa Edelim",
            paragraphs: [
              "Silifke Teknoloji Kulübü, yerelden başlayan fakat sınır tanımayan bir üretim kültürü inşa ediyor. Eğer sen de bu hikâyede yer almak, yapay zekâ ile insan yaratıcılığını bir araya getirmek istersen bize katıl.",
              "Yakında blogda; proje günlükleri, üyelerden deneyim paylaşımları ve adım adım üretim rehberleri yayınlayacağız. Takipte kal!"
            ]
          }
        ],
        callToAction: {
          label: "Kulübe Katıl",
          href: "/katil"
        }
      }
    ]
  },
  en: {
    heroTitle: "Blog",
    heroSubtitle: "Stories, practices, and project journals from a community building technology with purpose.",
    heroBadge: "Silifke Technology Club Journal",
    backLabel: "Back to Home",
    languageLabel: "Language",
    latestLabel: "Latest Post",
    posts: [
      {
        title: "🌿 Silifke Technology: Code, Create, Leave No Trace",
        description:
          "We balance technology with sustainability to shrink the carbon footprint behind every project.",
        metadata: {
          author: "Silifke Technology Team",
          date: "14 February 2025",
          readingTime: "8 min read"
        },
        tags: ["Sustainability", "Energy Efficiency", "Silifke Model"],
        sections: [
          {
            heading: "Bridging Nature and Technology",
            paragraphs: [
              "The expanding energy of the digital era comes with an invisible burden: carbon emissions.",
              "Every line of code we ship, every server we run, and every prototype we iterate consumes energy. At Silifke Technology we choose to build a cleaner, more sustainable future."
            ]
          },
          {
            heading: "⚙️ Conscious from the Start: \"Every Line of Code Has a Cost\"",
            paragraphs: [
              "While we develop AI, automation, and software systems, we remain aware that energy diminishes in digital processes just as it does in the physical world.",
              "From server infrastructure and storage to rendering pipelines and sensor networks, we follow a systematic approach to measure and minimise our carbon footprint."
            ]
          },
          {
            heading: "🔋 Smart Project Development Cycle",
            paragraphs: [
              "Every project at Silifke Technology is designed around energy efficiency criteria—a method we call the \"Smart Cycle Model.\""
            ],
            bullets: [
              "Analyse: we map the energy profile of each infrastructure component up front.",
              "Optimise: we trim unnecessary processing, data transfer, and resource usage.",
              "Automate: we monitor live energy consumption with sensors and tune it automatically.",
              "Report: we document the carbon impact transparently and share what we learn."
            ]
          },
          {
            heading: "🌍 From Local to Global: The Green Vision of the Silifke Model",
            paragraphs: [
              "We protect the local production culture while meeting global standards for sustainable technology through the green vision of the Silifke Model."
            ],
            bullets: [
              "We prioritise low-power hardware components in devices we build.",
              "We prefer infrastructure partners that operate on renewable energy.",
              "We place reusable code and component design at the heart of our build cycles.",
              "We apply optimised GPU and resource allocation to reduce heavy compute loads."
            ]
          },
          {
            heading: "🌱 Digital Balance Against the Carbon Footprint",
            paragraphs: [
              "Sustainability is not a marketing slogan for us; it is a design principle.",
              "We ask in every project: \"How much pressure does this system place on nature, and how do we reduce it?\"",
              "Our AI-assisted monitoring stack will soon measure and report carbon emissions in real time, making actionable insights accessible to small businesses and individual makers alike."
            ]
          },
          {
            heading: "🔭 Looking Ahead: Toward Zero-Emission Tech",
            paragraphs: [
              "Our 2025 vision is to make Silifke Technology the first local tech initiative that balances its own carbon emissions."
            ],
            bullets: [
              "We are planning transitions to renewable energy across project infrastructure.",
              "We are developing carbon balancing algorithms and measurement tools.",
              "We are negotiating green energy agreements for our data infrastructure."
            ]
          },
          {
            heading: "💬 Final Word",
            paragraphs: [
              "Technology requires power; using that power without exhausting nature is where real engineering begins.",
              "Our vision is clear: smarter systems and a cleaner planet. Every project, every line of code, and every sensor feeds that vision."
            ]
          }
        ],
        callToAction: {
          label: "Join the Sustainability Journey",
          href: "/projects"
        }
      },
      {
        title: "🦀 The Silifke Model: From Garage to Institution",
        description:
          "Discover the Silifke Model manifesto, a journey that turns a community garage into a fully fledged inclusive organisation.",
        metadata: {
          author: "Silifke Technology Manifesto Team",
          date: "22 January 2025",
          readingTime: "7 min read"
        },
        tags: ["Silifke Model", "Community", "Institution Building"],
        sections: [
          {
            heading: "Manifesto",
            paragraphs: [
              "“Inclusive institutions are not just built by states; they can bloom in a garage in Silifke.” — Silifke Model Manifesto",
              "When courage meets collective consciousness, a garage can reshape the future of a town. The Silifke Model turns that potential into a manifesto everyone can act on."
            ]
          },
          {
            heading: "1. The Spark",
            paragraphs: [
              "Every major transformation starts in a small lab. Silifke Technology Club is more than a community; it is an inclusive governance experiment stretching from local to global.",
              "Our aim is as much about sharing as it is about building, spreading participation as much as leadership, and empowering people as much as technology."
            ]
          },
          {
            heading: "2. Core Principles",
            paragraphs: [
              "The Silifke Model rests on four principles that sustain a resilient, long-term community."
            ],
            bullets: [
              "Participation: anyone can pitch ideas, take decisions, and contribute.",
              "Transparency: income, spending, projects, and sponsorships stay open to the community.",
              "Equity: age or seniority never blocks people from joining production cycles.",
              "Local Empowerment: technology becomes a tangible tool that improves daily life in Silifke."
            ]
          },
          {
            heading: "3. Inclusive Institutions at Micro Scale",
            paragraphs: [
              "The Silifke Model keeps the “participatory institution” spirit alive inside a three-person garage team, a spirit usually sought in large state structures.",
              "Community-driven decision making spreads institutional awareness, aligns production with local needs, and turns technology into shared intelligence."
            ]
          },
          {
            heading: "4. Institutionalising with Technology",
            paragraphs: [
              "The digital backbone of the model mobilises technology to deliver transparent data, fair income sharing, and community-owned infrastructure."
            ],
            bullets: [
              "Transparent data management through Supabase and open-source tooling.",
              "Equal productivity via agents like Prompt Engineer GPT and Web Designer GPT.",
              "Fair revenue distribution thanks to a community-driven scoring system.",
              "Collective memory hosted on Silifke Cloud to preserve shared knowledge."
            ]
          },
          {
            heading: "5. From Garage to Public Impact",
            paragraphs: [
              "Garages incubate ideas. Silifke Technology turns those ideas into structure, discipline, and ecosystems."
            ],
            bullets: [
              "Community Phase: generating ideas and momentum.",
              "Institution Phase: transparent management, clear roles, sustainable funding.",
              "Development Phase: measurable impact on Silifke’s education, economy, and culture."
            ]
          },
          {
            heading: "6. A Call for the Future",
            paragraphs: [
              "The Silifke Model is not just a club initiative; it prototypes a new governance mindset.",
              "The goal is not a technology story emerging from a small town, but a conscious society co-building its future. Technology is the tool, institutions are the spirit—and Silifke is ready to be the first local example that fuses the two."
            ]
          }
        ],
        callToAction: {
          label: "Join the Silifke Model",
          href: "/katil"
        }
      },
      {
        title: "Creating Value! Artificial Intelligence and People",
        description:
          "How we blend artificial intelligence with human-centered projects, keeping a global mindset while producing value for Silifke.",
        metadata: {
          author: "Silifke Technology Team",
          date: "January 6, 2025",
          readingTime: "6 min read"
        },
        tags: ["Artificial Intelligence", "Community", "Strategy"],
        sections: [
          {
            heading: "Why This Topic?",
            paragraphs: [
              "Building technology in Silifke is not a dream; it is a planned, collective, and sustainable journey. AI tools are no longer exclusive to big corporations. With the right team and community support, even smaller cities can create substantial impact.",
              "In this post we share how we combine artificial intelligence with a human-first perspective and how it guides our club projects."
            ]
          },
          {
            heading: "What Do We Do as a Community?",
            paragraphs: [
              "We start every project by asking why. Expanding the reach of local producers, increasing young people's access to technology, or supporting social-impact startups. Once the problem is clear we bring technology into the mix."
            ],
            bullets: [
              "People first: we listen, understand the need, and define the challenge together.",
              "Balancing data and intuition: insights we gather define the features we ship.",
              "Making with rhythm: workshops, vibe-coding sessions, and weekly reflections keep progress tangible."
            ]
          },
          {
            heading: "AI and Humans, Side by Side",
            paragraphs: [
              "Every build cycle accelerates with AI-powered tools while people shape the final direction. Prompt-engineering sessions help members be more productive and learn how to use AI responsibly.",
              "We rely on AI for chatbot prototypes, content creation, data analysis, and design drafts; yet community intelligence delivers the final touch."
            ]
          },
          {
            heading: "Let's Build the Future Together",
            paragraphs: [
              "Silifke Technology Club is cultivating a production culture that starts locally yet refuses to stay local. If you want to be part of this story and merge AI with human creativity, join us.",
              "Soon on the blog: project diaries, member experience notes, and step-by-step production guides. Stay tuned!"
            ]
          }
        ],
        callToAction: {
          label: "Join the Club",
          href: "/katil"
        }
      }
    ]
  }
};

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const { language, setLanguage } = useLanguage();
  const content = blogDictionary[language];

  const fadeInUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 }
    }),
    []
  );

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-black/90" />}>
        <MatrixRain />
        <InteractiveDots />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-20" />

      <main className="relative z-40 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          {onBack && (
            <motion.button
              onClick={onBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{content.backLabel}</span>
            </motion.button>
          )}

          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="glass-panel glass-border-accent px-6 sm:px-12 py-12 md:py-16 text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <span className="glass-pill text-[0.65rem] sm:text-xs text-yellow-100 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                {content.heroBadge}
              </span>
            </div>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6
                         bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent
                         leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {content.heroTitle}
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl text-gray-200/90 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {content.heroSubtitle}
            </motion.p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-sm uppercase tracking-widest text-gray-400/90">{content.languageLabel}</span>
              <div className="inline-flex rounded-full bg-white/5 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setLanguage("tr")}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === "tr"
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Türkçe
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === "en"
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.section>

          {content.posts.map((post, index) => (
            <motion.article
              key={`${post.title}-${index}`}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.1 * index }}
              className="glass-panel glass-border-accent px-6 sm:px-10 py-10 md:py-14 mb-12"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-yellow-300/80 mb-6">
                <span>{content.latestLabel}</span>
                <span className="h-px w-12 bg-yellow-400/40" />
                {post.tags.map((tag) => (
                  <span key={tag} className="text-yellow-200/70">
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
                {post.title}
              </h2>
              <p className="text-gray-200/90 text-lg md:text-xl leading-relaxed mb-8">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-10">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-300/80" />
                  {post.metadata.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-300/80" />
                  {post.metadata.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-300/80" />
                  {post.metadata.readingTime}
                </span>
              </div>

              <div className="space-y-10">
                {post.sections.map((section) => (
                  <section key={`${post.title}-${section.heading}`} className="space-y-5">
                    <h3 className="text-2xl font-semibold text-white">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.heading}-${paragraphIndex}`} className="text-gray-200/90 leading-relaxed text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc list-inside space-y-3 text-gray-200/90 leading-relaxed">
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={`${section.heading}-bullet-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
                <div className="text-sm text-gray-400 uppercase tracking-[0.35em]">
                  Silifke Teknoloji Kulübü
                </div>
                <a
                  href={post.callToAction.href}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-yellow-400/40
                           px-6 py-3 text-sm font-semibold text-yellow-200 transition-all duration-300
                           hover:bg-yellow-500/10 hover:border-yellow-300/60"
                >
                  {post.callToAction.label}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
