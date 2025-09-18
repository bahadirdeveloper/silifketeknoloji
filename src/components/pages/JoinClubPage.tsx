import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send, User, Code, Palette, Brain, Users, FileText, Clock, Monitor, Printer, Camera, Mic, Cpu, MonitorSpeaker, AlertCircle } from 'lucide-react';
import { submitApplication, type ApplicationFormData } from '../../lib/supabaseClient';

interface JoinClubPageProps {
  onBack: () => void;
}

// Form validation schema
const joinClubSchema = z.object({
  // Kişisel Bilgiler
  fullName: z.string()
    .min(2, "Ad soyad en az 2 karakter olmalıdır")
    .max(50, "Ad soyad en fazla 50 karakter olabilir"),
  email: z.string()
    .email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]{10,15}$/, "Geçerli bir telefon numarası giriniz"),
  schoolWork: z.string()
    .min(5, "Okul/iş bilgisi en az 5 karakter olmalıdır")
    .max(100, "Okul/iş bilgisi en fazla 100 karakter olabilir"),

  // İlgi Alanı
  interests: z.array(z.string())
    .min(1, "En az bir ilgi alanı seçmelisiniz")
    .max(5, "En fazla 5 ilgi alanı seçebilirsiniz"),

  // Küçük Görev/Örnek
  portfolioExample: z.string()
    .min(20, "Örnek çalışma en az 20 karakter olmalıdır")
    .max(500, "Örnek çalışma en fazla 500 karakter olabilir"),

  // Motivasyon
  motivation: z.string()
    .min(50, "Motivasyon açıklaması en az 50 karakter olmalıdır")
    .max(1000, "Motivasyon açıklaması en fazla 1000 karakter olabilir"),
  weeklyHours: z.string()
    .min(1, "Haftalık saat belirtmelisiniz"),
  meetingPreference: z.string()
    .min(1, "Toplantı tercihini belirtmelisiniz"),

  // Donanım
  computerType: z.string()
    .min(1, "Bilgisayar durumunu belirtmelisiniz"),
  additionalHardware: z.array(z.string()),
  hardwareSharing: z.string()
    .min(1, "Donanım paylaşım tercihini belirtmelisiniz"),

  // KVKK Consent
  consentKvkk: z.boolean()
    .refine(val => val === true, "KVKK onayı zorunludur")
});

type JoinClubFormData = z.infer<typeof joinClubSchema>;

const JoinClubPage: React.FC<JoinClubPageProps> = ({ onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue
  } = useForm<JoinClubFormData>({
    resolver: zodResolver(joinClubSchema),
    mode: 'onChange'
  });

  // Watch interests to handle checkbox array
  const watchedInterests = watch('interests') || [];
  const watchedHardware = watch('additionalHardware') || [];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      title: "Kişisel Bilgiler",
      icon: <User className="w-6 h-6" />,
      description: "Seni tanıyalım"
    },
    {
      title: "İlgi Alanı",
      icon: <Brain className="w-6 h-6" />,
      description: "Hangi alanda katkı sağlamak istersin?"
    },
    {
      title: "Küçük Görev",
      icon: <FileText className="w-6 h-6" />,
      description: "Yetkinliğini göster"
    },
    {
      title: "Motivasyon",
      icon: <Clock className="w-6 h-6" />,
      description: "Neden katılmak istiyorsun?"
    },
    {
      title: "Donanım",
      icon: <Monitor className="w-6 h-6" />,
      description: "Teknik altyapın"
    }
  ];

  const interestOptions = [
    { id: 'coding', label: 'Yazılım / Kodlama', icon: <Code className="w-5 h-5" /> },
    { id: 'design', label: 'Tasarım / Görsel içerik', icon: <Palette className="w-5 h-5" /> },
    { id: 'ai', label: 'Yapay zekâ / Chatbot / Sesli Asistan', icon: <Brain className="w-5 h-5" /> },
    { id: 'management', label: 'Proje yönetimi / Organizasyon', icon: <Users className="w-5 h-5" /> },
    { id: 'content', label: 'İçerik yazarlığı / Sosyal medya', icon: <FileText className="w-5 h-5" /> }
  ];

  const computerOptions = [
    { id: 'windows', label: 'Evet – Windows' },
    { id: 'macos', label: 'Evet – macOS' },
    { id: 'linux', label: 'Evet – Linux' },
    { id: 'none', label: 'Hayır' }
  ];

  const hardwareOptions = [
    { id: '3d-printer', label: '3D Yazıcı', icon: <Printer className="w-5 h-5" /> },
    { id: 'camera', label: 'Profesyonel kamera / drone', icon: <Camera className="w-5 h-5" /> },
    { id: 'audio', label: 'Stüdyo mikrofonu / ses ekipmanı', icon: <Mic className="w-5 h-5" /> },
    { id: 'maker', label: 'Raspberry Pi / Arduino / maker donanımları', icon: <Cpu className="w-5 h-5" /> },
    { id: 'monitor', label: 'Harici monitör / projeksiyon', icon: <MonitorSpeaker className="w-5 h-5" /> },
    { id: 'none', label: 'Yok', icon: null }
  ];

  const meetingOptions = [
    { id: 'yes', label: 'Evet' },
    { id: 'no', label: 'Hayır' },
    { id: 'online', label: 'Online tercih ederim' }
  ];

  const sharingOptions = [
    { id: 'no', label: 'Hayır, sadece kendim için' },
    { id: 'sometimes', label: 'Bazen, randevuyla paylaşabilirim' },
    { id: 'yes', label: 'Evet, kulüp etkinliklerinde kullanılabilir' }
  ];

  // Validate current section before proceeding
  const validateCurrentSection = async () => {
    let fieldsToValidate: (keyof JoinClubFormData)[] = [];

    switch (currentSection) {
      case 0: // Kişisel Bilgiler
        fieldsToValidate = ['fullName', 'email', 'phone', 'schoolWork'];
        break;
      case 1: // İlgi Alanı
        fieldsToValidate = ['interests'];
        break;
      case 2: // Küçük Görev
        fieldsToValidate = ['portfolioExample'];
        break;
      case 3: // Motivasyon
        fieldsToValidate = ['motivation', 'weeklyHours', 'meetingPreference'];
        break;
      case 4: // Donanım
        fieldsToValidate = ['computerType', 'hardwareSharing'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const nextSection = async () => {
    const isValid = await validateCurrentSection();
    if (isValid && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Handle form submission
  const onSubmit = async (data: JoinClubFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Transform data to match ApplicationFormData interface
      const applicationData: ApplicationFormData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        schoolWork: data.schoolWork,
        interests: data.interests,
        portfolioExample: data.portfolioExample,
        motivation: data.motivation,
        weeklyHours: data.weeklyHours,
        meetingPreference: data.meetingPreference,
        computerType: data.computerType,
        additionalHardware: data.additionalHardware,
        hardwareSharing: data.hardwareSharing,
        consentKvkk: data.consentKvkk
      };

      const result = await submitApplication(applicationData);

      if (result.success) {
        // Redirect to thank you page with application ID
        window.location.href = `/tesekkurler?applicationId=${result.applicationId}`;
      } else {
        setSubmitError(result.error || 'Başvuru gönderilirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: // Kişisel Bilgiler
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                {...register('fullName')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 ${
                  errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="Adınız ve soyadınız"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                E-posta *
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 ${
                  errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 ${
                  errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="0555 123 45 67"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Okul / Bölüm / Meslek *
              </label>
              <input
                type="text"
                {...register('schoolWork')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 ${
                  errors.schoolWork ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="Üniversite/Lise/Meslek bilginiz"
              />
              {errors.schoolWork && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.schoolWork.message}
                </p>
              )}
            </div>
          </div>
        );

      case 1: // İlgi Alanı
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Hangi alanda katkı sağlamak istersin? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      checked={watchedInterests.includes(option.id)}
                      onChange={(e) => {
                        const currentInterests = watchedInterests || [];
                        if (e.target.checked) {
                          setValue('interests', [...currentInterests, option.id]);
                        } else {
                          setValue('interests', currentInterests.filter(id => id !== option.id));
                        }
                      }}
                      className="w-5 h-5 text-yellow-400 bg-transparent border-gray-400 rounded focus:ring-yellow-400 focus:ring-2"
                    />
                    <div className="ml-3 flex items-center space-x-3">
                      <span className="text-yellow-400">{option.icon}</span>
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.interests.message}
                </p>
              )}
            </div>
          </div>
        );

      case 2: // Küçük Görev
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                İlgi alanına göre küçük bir örnek paylaş *
              </label>
              <div className="text-sm text-gray-400 mb-4 p-4 bg-black/30 rounded-xl border border-gray-600">
                <p className="mb-2"><strong>Örnekler:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Kodlama:</strong> GitHub linki / ekran görüntüsü</li>
                  <li><strong>Tasarım:</strong> Canva/Figma görsel linki</li>
                  <li><strong>Yazarlık:</strong> 2–3 repliklik kısa bir diyalog</li>
                  <li><strong>Yönetim:</strong> Daha önce görev aldığın bir proje/organizasyon</li>
                </ul>
              </div>
              <textarea
                {...register('portfolioExample')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 min-h-[120px] resize-none ${
                  errors.portfolioExample ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="Yetkinliğini gösteren bir örnek paylaş..."
              />
              {errors.portfolioExample && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.portfolioExample.message}
                </p>
              )}
            </div>
          </div>
        );

      case 3: // Motivasyon
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Silifke Teknoloji Kulübü'ne katılmak isteme sebebin nedir? *
              </label>
              <textarea
                {...register('motivation')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 min-h-[100px] resize-none ${
                  errors.motivation ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="Motivasyonunu ve hedeflerini paylaş..."
              />
              {errors.motivation && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.motivation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Haftada kaç saat ayırabilirsin? *
              </label>
              <input
                type="text"
                {...register('weeklyHours')}
                className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 ${
                  errors.weeklyHours ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                }`}
                placeholder="Örn: 10-15 saat"
              />
              {errors.weeklyHours && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.weeklyHours.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Haftalık toplantılara katılabilir misin? *
              </label>
              <div className="space-y-3">
                {meetingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="radio"
                      {...register('meetingPreference')}
                      value={option.id}
                      className="w-4 h-4 text-yellow-400 bg-transparent border-gray-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="ml-3 text-white font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.meetingPreference && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.meetingPreference.message}
                </p>
              )}
            </div>
          </div>
        );

      case 4: // Donanım
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Bilgisayarın var mı? *
              </label>
              <div className="space-y-3">
                {computerOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="radio"
                      {...register('computerType')}
                      value={option.id}
                      className="w-4 h-4 text-yellow-400 bg-transparent border-gray-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="ml-3 text-white font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.computerType && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.computerType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Kulübe katkı sağlayacak ek donanımın var mı? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hardwareOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      checked={watchedHardware.includes(option.id)}
                      onChange={(e) => {
                        const currentHardware = watchedHardware || [];
                        if (e.target.checked) {
                          setValue('additionalHardware', [...currentHardware, option.id]);
                        } else {
                          setValue('additionalHardware', currentHardware.filter(id => id !== option.id));
                        }
                      }}
                      className="w-5 h-5 text-yellow-400 bg-transparent border-gray-400 rounded focus:ring-yellow-400 focus:ring-2"
                    />
                    <div className="ml-3 flex items-center space-x-3">
                      {option.icon && <span className="text-yellow-400">{option.icon}</span>}
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Donanımını kulüpte kullanıma açabilir misin? *
              </label>
              <div className="space-y-3">
                {sharingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="radio"
                      {...register('hardwareSharing')}
                      value={option.id}
                      className="w-4 h-4 text-yellow-400 bg-transparent border-gray-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="ml-3 text-white font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.hardwareSharing && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.hardwareSharing.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start p-4 bg-black/30 border border-gray-600 rounded-xl hover:bg-black/50 hover:border-yellow-400/50 cursor-pointer transition-all duration-300">
                <input
                  type="checkbox"
                  {...register('consentKvkk')}
                  className="w-5 h-5 text-yellow-400 bg-transparent border-gray-400 rounded focus:ring-yellow-400 focus:ring-2 mt-0.5"
                />
                <div className="ml-3">
                  <span className="text-white font-medium">
                    KVKK Aydınlatma Metni'ni okudum ve kişisel verilerimin işlenmesine onay veriyorum *
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    Ad, soyad, e-posta, telefon numarası ve diğer form verileriniz üyelik süreci için işlenecektir.
                  </p>
                </div>
              </label>
              {errors.consentKvkk && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.consentKvkk.message}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100" />
      
      <div className="relative z-40 pt-8 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={onBack}
              className="absolute top-0 left-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </button>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-4">
              Klübe Katıl
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Silifke Teknoloji Kulübü'ne katılmak için aşağıdaki formu doldur. Her adım seni daha yakından tanımamızı sağlayacak.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center space-y-2 ${
                    index <= currentSection ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      index <= currentSection
                        ? 'border-yellow-400 bg-yellow-400/20'
                        : 'border-gray-600 bg-gray-600/20'
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">{section.title}</p>
                    <p className="text-xs text-gray-400 hidden md:block">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div
            key={currentSection}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-3">
                <span className="text-yellow-400">{sections[currentSection].icon}</span>
                <span>{sections[currentSection].title}</span>
              </h2>
              <p className="text-gray-400">{sections[currentSection].description}</p>
            </div>

            {renderCurrentSection()}
          </motion.div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 font-medium">{submitError}</p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
            >
              Önceki
            </button>

            <span className="text-gray-400 text-sm">
              {currentSection + 1} / {sections.length}
            </span>

            {currentSection === sections.length - 1 ? (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-yellow-500/30 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Başvuruyu Gönder</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold rounded-xl transition-all duration-300"
              >
                Sonraki
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoinClubPage;
