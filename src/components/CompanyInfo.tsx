import React from 'react';
import { ArrowLeft, Building, MapPin, Phone, Mail, Users, Calendar, Award } from 'lucide-react';

interface CompanyInfoProps {
  onNavigate: (view: string) => void;
}

function CompanyInfo({ onNavigate }: CompanyInfoProps) {
  const companyData = {
    name: '株式会社賢者の精算',
    englishName: 'Kenja no Seisan Co., Ltd.',
    established: '2023年4月1日',
    capital: '1,000万円',
    employees: '25名',
    ceo: '代表取締役 山田太郎',
    address: '東京都千代田区丸の内1-1-1 丸の内ビル10F',
    phone: '03-1234-5678',
    email: 'info@kenjano-seisan.com',
    business: [
      '出張旅費精算システムの開発・運営',
      'AI技術を活用した業務効率化ソリューション',
      '税務・会計システムの企画・開発',
      'クラウドサービスの提供'
    ],
    mission: 'AI技術で企業の精算業務を革新し、効率化と節税効果を同時に実現する',
    vision: '全ての企業が簡単で正確な精算業務を行える世界を創造する',
    values: [
      '革新性 - 最新技術で業務を革新',
      '信頼性 - 確実で安全なシステム提供',
      '効率性 - 無駄を省いた最適化',
      '透明性 - 明確で分かりやすい運営'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-indigo-600/20"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-3"
            >
              <img 
                src="/IconOnly_Transparent_NoBuffer.LPver.png" 
                alt="賢者の精算アイコン" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-white">賢者の精算</span>
            </button>
            
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full font-semibold transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>戻る</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 pt-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                会社概要
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              AI技術で企業の精算業務を革新する、賢者の精算について
            </p>
          </div>

          <div className="space-y-8">
            {/* 会社基本情報 */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                  <Building className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{companyData.name}</h2>
                <p className="text-white/70 text-lg">{companyData.englishName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/20 rounded-2xl p-6 text-center border border-white/30">
                  <Calendar className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">設立</h3>
                  <p className="text-white/70">{companyData.established}</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center border border-white/30">
                  <Building className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">資本金</h3>
                  <p className="text-white/70">{companyData.capital}</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center border border-white/30">
                  <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">従業員数</h3>
                  <p className="text-white/70">{companyData.employees}</p>
                </div>
              </div>
            </div>

            {/* ミッション・ビジョン */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">ミッション</h3>
                <p className="text-white/80 leading-relaxed">{companyData.mission}</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">ビジョン</h3>
                <p className="text-white/80 leading-relaxed">{companyData.vision}</p>
              </div>
            </div>

            {/* 企業価値観 */}
            <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">企業価値観</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyData.values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white/30 rounded-lg">
                    <Award className="w-5 h-5 text-navy-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 事業内容 */}
            <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">事業内容</h3>
              <div className="space-y-3">
                {companyData.business.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-navy-600 rounded-full"></span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 連絡先情報 */}
            <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">連絡先</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-slate-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800">所在地</h4>
                      <p className="text-slate-600">{companyData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-slate-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800">代表者</h4>
                      <p className="text-slate-600">{companyData.ceo}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-slate-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800">電話番号</h4>
                      <p className="text-slate-600">{companyData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-slate-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800">メールアドレス</h4>
                      <p className="text-slate-600">{companyData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;