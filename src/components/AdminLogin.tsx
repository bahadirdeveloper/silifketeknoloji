import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockKeyhole, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ADMIN_STORAGE_KEY,
  ADMIN_DEFAULT_CREDENTIALS_IN_USE,
  getAdminAuthorizationToken,
} from '../lib/adminConfig';

type AdminLoginProps = {
  onSuccess: () => void;
  onBack: () => void;
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const isValid =
      trimmedUsername === ADMIN_USERNAME && trimmedPassword === ADMIN_PASSWORD;

    if (!isValid) {
      setTimeout(() => {
        setError('Bilgiler eşleşmedi. Kullanıcı adı veya şifre hatalı.');
        setIsSubmitting(false);
      }, 400);
      return;
    }

    localStorage.setItem(ADMIN_STORAGE_KEY, getAdminAuthorizationToken());

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 300);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/92 to-black/98" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />

      <div className="relative z-40 flex flex-col min-h-screen">
        <div className="container mx-auto max-w-4xl px-6 pt-12 pb-16 flex-1 flex flex-col">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </motion.button>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-black/30 via-black/40 to-black/60 border border-yellow-400/10 rounded-3xl px-8 py-12 md:px-12 md:py-16 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 rounded-3xl bg-yellow-500/10 border border-yellow-400/30 flex items-center justify-center backdrop-blur-lg"
              >
                <LockKeyhole className="w-10 h-10 text-yellow-300" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                Yönetim Paneli Girişi
              </h1>
              <p className="text-gray-300 max-w-xl">
                Yönetim paneline erişmek için yetkili kullanıcı adı ve şifreyi girin.
                Bu bilgiler kulüp yönetimi tarafından paylaşılır.
              </p>
            </div>

            {ADMIN_DEFAULT_CREDENTIALS_IN_USE && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 flex items-center space-x-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-left text-sm text-yellow-100"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                <span>
                  Varsayılan yönetici bilgileri kullanılıyor. Güvenlik için `.env`
                  dosyanıza `VITE_ADMIN_USERNAME` ve `VITE_ADMIN_PASSWORD`
                  değişkenlerini tanımlayın.
                </span>
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-gray-300">Kullanıcı Adı</label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Yönetici kullanıcı adını girin"
                  className="w-full rounded-xl border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition"
                  autoComplete="username"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-gray-300">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Yönetici şifresini girin"
                  className="w-full rounded-xl border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center space-x-3 rounded-2xl border border-yellow-400/40 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 px-6 py-3 text-lg font-bold text-black shadow-2xl transition focus:outline-none focus:ring-2 focus:ring-yellow-400/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center space-x-3">
                  <ShieldCheck className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Doğrulanıyor...' : 'Giriş Yap'}</span>
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
