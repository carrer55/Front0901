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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>戻る</span>
              </button>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">会社概要</h1>
            </div>
          </div>

          <div className="space-y-8">
            {/* 会社基本情報 */}
            <div className="backdrop-blur-xl bg-white/20 rounded-xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center">
                  <Building className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{companyData.name}</h2>
                <p className="text-slate-600 text-lg">{companyData.englishName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/30 rounded-lg p-4 text-center">
                  <Calendar className="w-8 h-8 text-navy-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">設立</h3>
                  <p className="text-slate-600">{companyData.established}</p>
                </div>
                <div className="bg-white/30 rounded-lg p-4 text-center">
                  <Building className="w-8 h-8 text-navy-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">資本金</h3>
                  <p className="text-slate-600">{companyData.capital}</p>
                </div>
                <div className="bg-white/30 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-navy-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">従業員数</h3>
                  <p className="text-slate-600">{companyData.employees}</p>
                </div>
              </div>
            </div>

            {/* ミッション・ビジョン */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">ミッション</h3>
                <p className="text-slate-700 leading-relaxed">{companyData.mission}</p>
              </div>
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">ビジョン</h3>
                <p className="text-slate-700 leading-relaxed">{companyData.vision}</p>
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