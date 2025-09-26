import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  RefreshCw,
  Star,
  UserCheck,
  UserX,
  LogOut,
} from 'lucide-react';
import { supabase, type Application } from '../../lib/supabaseClient';

interface AdminPageProps {
  onBack: () => void;
  onLogout?: () => void;
}

interface ApplicationWithDetails extends Application {
  days_since_created: number;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack, onLogout }) => {
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter, levelFilter]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      
      // Check if Supabase is properly configured
      if (import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co') {
        // Development mode - show mock data
        console.log('Development mode: Showing mock applications');
        const mockApplications = [
          {
            id: 'dev-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            full_name: 'Test Kullanıcı',
            email: 'test@example.com',
            phone: '05551234567',
            school_work: 'Test Üniversitesi',
            interests: ['coding', 'design'],
            portfolio_example: 'Test portfolio örneği',
            motivation: 'Test motivasyon metni',
            weekly_hours: '10-15 saat',
            meeting_preference: 'yes',
            computer_type: 'windows',
            additional_hardware: ['3d-printer'],
            hardware_sharing: 'yes',
            status: 'pending' as const,
            level: 'community' as const,
            consent_kvkk: true,
            consent_date: new Date().toISOString(),
            admin_notes: null,
            reviewed_by: null,
            reviewed_at: null,
            score: 75,
            score_breakdown: { portfolio_quality: 20, motivation_strength: 15, technical_skills: 20, availability: 10, hardware_contribution: 10, total: 75 },
            days_since_created: 0
          }
        ];
        setApplications(mockApplications);
        return;
      }

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      const applicationsWithDays = data.map(app => ({
        ...app,
        days_since_created: Math.floor((Date.now() - new Date(app.created_at).getTime()) / (1000 * 60 * 60 * 24))
      }));

      setApplications(applicationsWithDays);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(app => app.level === levelFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id: string, status: string, level?: string, notes?: string) => {
    try {
      setIsUpdating(true);
      const updateData: any = { 
        status,
        reviewed_at: new Date().toISOString()
      };
      
      if (level) updateData.level = level;
      if (notes) updateData.admin_notes = notes;

      const { error } = await supabase
        .from('applications')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating application:', error);
        return;
      }

      // Refresh applications
      await fetchApplications();
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'under_review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'core':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'contributor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'community':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100" />
      
      <div className="relative z-40 pt-8 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </button>

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-2">
                  Yönetim Paneli
                </h1>
                <p className="text-lg text-gray-300">
                  Üyelik başvurularını yönetin ve değerlendirin
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchApplications}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Yenile</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                    type="button"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{applications.length}</p>
                  <p className="text-gray-400">Toplam Başvuru</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {applications.filter(app => app.status === 'pending' || app.status === 'under_review').length}
                  </p>
                  <p className="text-gray-400">Bekleyen</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {applications.filter(app => app.status === 'approved').length}
                  </p>
                  <p className="text-gray-400">Onaylanan</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {applications.filter(app => app.level === 'core').length}
                  </p>
                  <p className="text-gray-400">Çekirdek Üye</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ad, e-posta ara..."
                    className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
                >
                  <option value="all">Tümü</option>
                  <option value="pending">Bekliyor</option>
                  <option value="under_review">İnceleniyor</option>
                  <option value="approved">Onaylandı</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Seviye</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
                >
                  <option value="all">Tümü</option>
                  <option value="community">Topluluk</option>
                  <option value="contributor">Katkıcı</option>
                  <option value="core">Çekirdek</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setLevelFilter('all');
                  }}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                >
                  Temizle
                </button>
              </div>
            </div>
          </motion.div>

          {/* Applications List */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl overflow-hidden"
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Başvurular yükleniyor...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Başvuru bulunamadı</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Başvuran</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">E-posta</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Durum</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Seviye</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Puan</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Tarih</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{application.full_name}</p>
                            <p className="text-sm text-gray-400">{application.school_work}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{application.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span>
                              {application.status === 'pending' && 'Bekliyor'}
                              {application.status === 'under_review' && 'İnceleniyor'}
                              {application.status === 'approved' && 'Onaylandı'}
                              {application.status === 'rejected' && 'Reddedildi'}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(application.level)}`}>
                            {application.level === 'community' && 'Topluluk'}
                            {application.level === 'contributor' && 'Katkıcı'}
                            {application.level === 'core' && 'Çekirdek'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{application.score}</span>
                            <span className="text-gray-400 text-sm">/100</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          <div>
                            <p className="text-sm">{new Date(application.created_at).toLocaleDateString('tr-TR')}</p>
                            <p className="text-xs text-gray-500">{application.days_since_created} gün önce</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedApplication(application)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
                              title="Detayları Görüntüle"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(application.id, 'approved', application.level)}
                              disabled={isUpdating || application.status === 'approved'}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Onayla"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(application.id, 'rejected')}
                              disabled={isUpdating || application.status === 'rejected'}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reddet"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 backdrop-blur-md border border-gray-600 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Başvuru Detayları</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Kişisel Bilgiler</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Ad Soyad</label>
                    <p className="text-white">{selectedApplication.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">E-posta</label>
                    <p className="text-white">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Telefon</label>
                    <p className="text-white">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Okul/İş</label>
                    <p className="text-white">{selectedApplication.school_work}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Başvuru Bilgileri</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Durum</label>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusIcon(selectedApplication.status)}
                      <span>
                        {selectedApplication.status === 'pending' && 'Bekliyor'}
                        {selectedApplication.status === 'under_review' && 'İnceleniyor'}
                        {selectedApplication.status === 'approved' && 'Onaylandı'}
                        {selectedApplication.status === 'rejected' && 'Reddedildi'}
                      </span>
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Seviye</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(selectedApplication.level)}`}>
                      {selectedApplication.level === 'community' && 'Topluluk'}
                      {selectedApplication.level === 'contributor' && 'Katkıcı'}
                      {selectedApplication.level === 'core' && 'Çekirdek'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Puan</label>
                    <p className="text-white font-medium">{selectedApplication.score}/100</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Başvuru Tarihi</label>
                    <p className="text-white">{new Date(selectedApplication.created_at).toLocaleString('tr-TR')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">İlgi Alanları</h4>
              <div className="flex flex-wrap gap-2">
                {selectedApplication.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Portfolio Örneği</h4>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{selectedApplication.portfolio_example}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Motivasyon</h4>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{selectedApplication.motivation}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Teknik Bilgiler</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Haftalık Saat</label>
                    <p className="text-white">{selectedApplication.weekly_hours}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Toplantı Tercihi</label>
                    <p className="text-white">
                      {selectedApplication.meeting_preference === 'yes' && 'Evet'}
                      {selectedApplication.meeting_preference === 'no' && 'Hayır'}
                      {selectedApplication.meeting_preference === 'online' && 'Online tercih ederim'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Bilgisayar</label>
                    <p className="text-white">
                      {selectedApplication.computer_type === 'windows' && 'Windows'}
                      {selectedApplication.computer_type === 'macos' && 'macOS'}
                      {selectedApplication.computer_type === 'linux' && 'Linux'}
                      {selectedApplication.computer_type === 'none' && 'Yok'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Donanım</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Ek Donanım</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.additional_hardware.map((hardware, index) => (
                        <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          {hardware}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Donanım Paylaşımı</label>
                    <p className="text-white">
                      {selectedApplication.hardware_sharing === 'no' && 'Hayır, sadece kendim için'}
                      {selectedApplication.hardware_sharing === 'sometimes' && 'Bazen, randevuyla paylaşabilirim'}
                      {selectedApplication.hardware_sharing === 'yes' && 'Evet, kulüp etkinliklerinde kullanılabilir'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                disabled={isUpdating}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <UserX className="w-4 h-4" />
                <span>Reddet</span>
              </button>
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'approved', selectedApplication.level)}
                disabled={isUpdating}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Onayla</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
