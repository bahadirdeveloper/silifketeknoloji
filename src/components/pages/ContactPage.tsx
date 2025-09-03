import React, { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  MessageCircle,
  Users,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Lazy load background components
const MatrixRain = lazy(() => import("../MatrixRain"));
const InteractiveDots = lazy(() => import("../InteractiveDots"));

interface ContactPageProps {
  onBack?: () => void;
}

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(50, "İsim en fazla 50 karakter olabilir"),
  email: z.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .min(1, "E-posta adresi gereklidir"),
  subject: z.string()
    .min(5, "Konu en az 5 karakter olmalıdır")
    .max(100, "Konu en fazla 100 karakter olabilir"),
  message: z.string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(1000, "Mesaj en fazla 1000 karakter olabilir")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  // Watch form values for character count
  const messageValue = watch('message') || '';
  const subjectValue = watch('subject') || '';

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

  // Simulate API call for form submission
  const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/error for demo purposes
    const shouldSucceed = Math.random() > 0.1; // 90% success rate

    if (shouldSucceed) {
      // In real implementation, this would be an actual API call
      console.log('Form submitted:', data);
      return {
        success: true,
        message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
      };
    } else {
      throw new Error('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz.');
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitStatus('success');
        reset(); // Clear form
        setTimeout(() => setSubmitStatus('idle'), 5000); // Hide success message after 5 seconds
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000); // Hide error message after 5 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-posta",
      content: "info@silifketeknoloji.com",
      link: "mailto:info@silifketeknoloji.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon",
      content: "+90 324 123 45 67",
      link: "tel:+903241234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adres",
      content: "Atatürk Cad. No:123 Silifke/Mersin",
      link: "https://maps.google.com"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma: 09:00 - 18:00",
      link: null
    }
  ];

  const socialMedia = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      link: "https://instagram.com/silifketeknoloji",
      color: "hover:text-pink-400"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: "Twitter",
      link: "https://twitter.com/silifketeknoloji",
      color: "hover:text-blue-400"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      link: "https://linkedin.com/company/silifketeknoloji",
      color: "hover:text-blue-600"
    },
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      link: "https://github.com/silifketeknoloji",
      color: "hover:text-gray-400"
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Genel Sorular",
      description: "Kulüp hakkında merak ettikleriniz için",
      action: "Mesaj Gönder"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Üyelik",
      description: "Kulübe katılmak ve üye olmak için",
      action: "Başvuru Yap"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Etkinlik Organizasyonu",
      description: "Etkinlik düzenleme ve işbirliği için",
      action: "Teklif Ver"
    }
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
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Bizimle iletişime geçin! Sorularınızı yanıtlamak, projelerinizde işbirliği yapmak 
              ve teknoloji yolculuğunuzda size destek olmak için buradayız.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
          >
            {contactMethods.map((method) => (
              <motion.div
                key={method.title}
                variants={fadeInUp}
                className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                         rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/40
                         transition-all duration-300 hover:transform hover:scale-105 text-center
                         group cursor-pointer"
              >
                <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{method.description}</p>
                <button className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 
                                 font-semibold px-6 py-2 rounded-lg border border-yellow-400/30 
                                 hover:bg-gradient-to-r hover:from-yellow-500/30 hover:to-yellow-600/30
                                 transition-all duration-300">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                            rounded-3xl p-8 border border-yellow-400/20">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Mesaj Gönder
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20
                                 transition-all duration-300 ${
                                   errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                                 }`}
                        placeholder="Adınız ve soyadınız"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20
                                 transition-all duration-300 ${
                                   errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                                 }`}
                        placeholder="E-posta adresiniz"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Konu *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('subject')}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20
                                 transition-all duration-300 ${
                                   errors.subject ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                                 }`}
                        placeholder="Mesaj konusu"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {subjectValue.length}/100
                      </div>
                    </div>
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Mesaj *
                    </label>
                    <div className="relative">
                      <textarea
                        {...register('message')}
                        rows={6}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20
                                 transition-all duration-300 resize-vertical ${
                                   errors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                                 }`}
                        placeholder="Mesajınızı buraya yazın..."
                      />
                      <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {messageValue.length}/1000
                      </div>
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.</span>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
                    whileTap={{ scale: isValid && !isSubmitting ? 0.98 : 1 }}
                    className={`w-full text-lg px-8 py-4 rounded-xl font-bold
                             transition-all duration-300 flex items-center justify-center space-x-3
                             ${isValid && !isSubmitting
                               ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50'
                               : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                             }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Mesajı Gönder</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                            rounded-3xl p-8 border border-yellow-400/20">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className="text-yellow-400 mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                            rounded-3xl p-8 border border-yellow-400/20">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Sosyal Medya
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 bg-black/30 rounded-xl
                               border border-gray-600 hover:border-yellow-400/50
                               transition-all duration-300 hover:transform hover:scale-105
                               text-gray-300 ${social.color}`}
                    >
                      {social.icon}
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-sm
                            rounded-3xl p-8 border border-yellow-400/20">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Konum
                </h2>
                
                <div className="aspect-video bg-black/50 rounded-xl border border-gray-600 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-gray-300">
                      Harita yakında eklenecek
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
