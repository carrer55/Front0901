import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Server, CheckCircle, AlertTriangle, Globe, Key } from 'lucide-react';

interface SecurityPageProps {
  onNavigate: (view: string) => void;
}

function SecurityPage({ onNavigate }: SecurityPageProps) {
  const [selectedSection, setSelectedSection] = useState('overview');

  const securityFeatures = [
    {
      icon: Lock,
      title: 'エンドツーエンド暗号化',
      description: 'すべてのデータ通信はTLS 1.3による強力な暗号化で保護されています。',
      details: [
        'AES-256暗号化によるデータ保護',
        'RSA-4096による鍵交換',
        '完全前方秘匿性（PFS）対応'
      ]
    },
    {
      icon: Shield,
      title: 'アクセス制御',
      description: '多層防御システムにより、不正アクセスを徹底的に防止します。',
      details: [
        '多要素認証（MFA）対応',
        'IP制限・地理的制限',
        '役割ベースアクセス制御（RBAC）'
      ]
    },
    {
      icon: Server,
      title: 'インフラセキュリティ',
      description: 'AWS・Azure等のエンタープライズグレードインフラを使用。',
      details: [
        'SOC 2 Type II準拠データセンター',
        '24時間365日監視体制',
        '自動バックアップ・災害復旧'
      ]
    },
    {
      icon: Eye,
      title: '監査・ログ',
      description: 'すべての操作を記録し、完全な監査証跡を提供します。',
      details: [
        '全操作の詳細ログ記録',
        'リアルタイム異常検知',
        '改ざん防止機能（IPFS）'
      ]
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001',
      description: '情報セキュリティマネジメントシステム',
      status: '認証取得済み',
      icon: Shield
    },
    {
      name: 'SOC 2 Type II',
      description: 'セキュリティ・可用性・機密性の保証',
      status: '認証取得済み',
      icon: CheckCircle
    },
    {
      name: 'プライバシーマーク',
      description: '個人情報保護体制の認定',
      status: '認定取得済み',
      icon: Lock
    },
    {
      name: 'GDPR準拠',
      description: 'EU一般データ保護規則への準拠',
      status: '準拠済み',
      icon: Globe
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">セキュリティ概要</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          賢者の精算は、企業の重要な財務データを扱うシステムとして、
          最高レベルのセキュリティ対策を実装しています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white/30 rounded-lg p-6 border border-white/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{feature.title}</h3>
              </div>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">コンプライアンス・認証</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          国際的なセキュリティ基準に準拠し、第三者機関による認証を取得しています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <div key={index} className="bg-white/30 rounded-lg p-6 border border-white/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{cert.name}</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-emerald-700 bg-emerald-100">
                    {cert.status}
                  </span>
                </div>
              </div>
              <p className="text-slate-600">{cert.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">法令準拠</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
          {/* 全内容を1ページに表示 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="space-y-12">
              {/* セキュリティ概要 */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">セキュリティ概要</h2>
                <div className="space-y-6 text-white/80">
                  <p className="text-lg leading-relaxed">
                    賢者の精算は、企業の重要な財務データを扱うシステムとして、
                    最高レベルのセキュリティ対策を実装しています。
                  </p>
                  
                  <div className="space-y-8">
                    {securityFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                          </div>
                          <p className="text-white/70 ml-9">{feature.description}</p>
                          <ul className="space-y-2 ml-9">
                            {feature.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-center space-x-2 text-sm text-white/70">
                                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-12">
                <h2 className="text-3xl font-bold text-white mb-6">コンプライアンス・認証</h2>
                <div className="space-y-6 text-white/80">
                  <p className="text-lg leading-relaxed">
                    国際的なセキュリティ基準に準拠し、第三者機関による認証を取得しています。
                  </p>
                  
                  <div className="space-y-6">
                    {certifications.map((cert, index) => {
                      const Icon = cert.icon;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-emerald-400" />
                            <h4 className="text-lg font-semibold text-white">{cert.name}</h4>
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-emerald-300 bg-emerald-600/30">
                              {cert.status}
                            </span>
                          </div>
                          <p className="text-white/70 ml-9">{cert.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">法令準拠</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">個人情報保護法</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">電子帳簿保存法</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">法人税法</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">所得税法</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">労働基準法</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/70">GDPR（EU一般データ保護規則）</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-12">
                <h2 className="text-3xl font-bold text-white mb-6">データ保護</h2>
                <div className="space-y-6 text-white/80">
                  <p className="text-lg leading-relaxed">
                    お客様の重要なデータを多層防御システムで保護しています。
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">データ暗号化</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">保存時暗号化</h4>
                          <ul className="space-y-1 text-sm text-white/70">
                            <li>• AES-256による暗号化</li>
                            <li>• 暗号化キーの分離管理</li>
                            <li>• 定期的なキーローテーション</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">転送時暗号化</h4>
                          <ul className="space-y-1 text-sm text-white/70">
                            <li>• TLS 1.3による通信暗号化</li>
                            <li>• HSTS（HTTP Strict Transport Security）</li>
                            <li>• 証明書の透明性（CT）対応</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">アクセス管理</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Key className="w-5 h-5 text-emerald-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-white/90">多要素認証（MFA）</h4>
                            <p className="text-sm text-white/70">SMS、メール、認証アプリによる二段階認証</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-emerald-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-white/90">役割ベースアクセス制御</h4>
                            <p className="text-sm text-white/70">最小権限の原則に基づく細かな権限設定</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Globe className="w-5 h-5 text-emerald-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-white/90">IP制限・地理的制限</h4>
                            <p className="text-sm text-white/70">指定されたIPアドレス・地域からのみアクセス可能</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">データバックアップ</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">自動バックアップ</h4>
                          <p className="text-sm text-white/70">1時間ごとの自動バックアップ</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">地理的分散</h4>
                          <p className="text-sm text-white/70">複数地域でのデータ複製</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">復旧保証</h4>
                          <p className="text-sm text-white/70">RTO: 4時間、RPO: 1時間</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-12">
                <h2 className="text-3xl font-bold text-white mb-6">インシデント対応</h2>
                <div className="space-y-6 text-white/80">
                  <p className="text-lg leading-relaxed">
                    セキュリティインシデントに対する迅速かつ適切な対応体制を整備しています。
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">対応フロー</h3>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: '検知・報告', description: '自動監視システムまたは手動報告による即座の検知', time: '即時' },
                        { step: 2, title: '初期対応', description: '影響範囲の特定と緊急対応措置の実施', time: '15分以内' },
                        { step: 3, title: '詳細調査', description: '根本原因の特定と影響評価の実施', time: '1時間以内' },
                        { step: 4, title: '復旧作業', description: 'システム復旧と正常性確認', time: '4時間以内' },
                        { step: 5, title: '事後対応', description: '再発防止策の策定と実装', time: '24時間以内' }
                      ].map((item) => (
                        <div key={item.step} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-white">{item.title}</h4>
                              <span className="text-xs text-emerald-300 bg-emerald-600/30 px-2 py-1 rounded-full">{item.time}</span>
                            </div>
                            <p className="text-sm text-white/70">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">緊急連絡先</h4>
                    <div className="space-y-2 text-sm text-white/70">
                      <p><strong className="text-white">セキュリティインシデント報告:</strong> security@kenjano-seisan.com</p>
                      <p><strong className="text-white">緊急時電話番号:</strong> 03-1234-5678（24時間対応）</p>
                      <p><strong className="text-white">脆弱性報告:</strong> vulnerability@kenjano-seisan.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 戻るボタン */}
            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mx-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>トップページに戻る</span>
              </button>
            </div>
          </div>

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 pt-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                セキュリティ
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              エンタープライズグレードのセキュリティで、お客様の重要なデータを保護
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* サイドナビゲーション */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl sticky top-6">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedSection === section.id
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                {selectedSection === 'overview' && renderOverview()}
                {selectedSection === 'compliance' && renderCompliance()}
                {selectedSection === 'data-protection' && renderDataProtection()}
                {selectedSection === 'incident-response' && renderIncidentResponse()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;