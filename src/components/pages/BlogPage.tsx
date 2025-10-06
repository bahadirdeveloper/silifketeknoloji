import React, { lazy, Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Languages } from "lucide-react";

const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface BlogPageProps {
  onBack?: () => void;
}

type Language = "tr" | "en";

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

const blogDictionary: Record<Language, BlogContent> = {
  tr: {
    heroTitle: "Blog",
    heroSubtitle: "Yerelden yükselen teknoloji hikâyeleri, öğrenimler ve ilham verici proje günlükleri.",
    heroBadge: "Silifke Teknoloji Kulübü Güncesi",
    backLabel: "Ana Sayfaya Dön",
    languageLabel: "Dil",
    latestLabel: "Güncel Yazı",
    posts: [
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
  const [language, setLanguage] = useState<Language>("tr");
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
