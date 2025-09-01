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
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>個人情報保護法</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>電子帳簿保存法</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>法人税法</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>所得税法</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>労働基準法</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>GDPR（EU一般データ保護規則）</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataProtection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">データ保護</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          お客様の重要なデータを多層防御システムで保護しています。
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">データ暗号化</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">保存時暗号化</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• AES-256による暗号化</li>
                <li>• 暗号化キーの分離管理</li>
                <li>• 定期的なキーローテーション</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">転送時暗号化</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• TLS 1.3による通信暗号化</li>
                <li>• HSTS（HTTP Strict Transport Security）</li>
                <li>• 証明書の透明性（CT）対応</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">アクセス管理</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Key className="w-5 h-5 text-navy-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-700">多要素認証（MFA）</h4>
                <p className="text-sm text-slate-600">SMS、メール、認証アプリによる二段階認証</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-navy-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-700">役割ベースアクセス制御</h4>
                <p className="text-sm text-slate-600">最小権限の原則に基づく細かな権限設定</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-navy-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-700">IP制限・地理的制限</h4>
                <p className="text-sm text-slate-600">指定されたIPアドレス・地域からのみアクセス可能</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">データバックアップ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">自動バックアップ</h4>
              <p className="text-sm text-slate-600">1時間ごとの自動バックアップ</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">地理的分散</h4>
              <p className="text-sm text-slate-600">複数地域でのデータ複製</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">復旧保証</h4>
              <p className="text-sm text-slate-600">RTO: 4時間、RPO: 1時間</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidentResponse = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">インシデント対応</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          セキュリティインシデントに対する迅速かつ適切な対応体制を整備しています。
        </p>
      </div>

      <div className="bg-white/30 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">対応フロー</h3>
        <div className="space-y-4">
          {[
            { step: 1, title: '検知・報告', description: '自動監視システムまたは手動報告による即座の検知', time: '即時' },
            { step: 2, title: '初期対応', description: '影響範囲の特定と緊急対応措置の実施', time: '15分以内' },
            { step: 3, title: '詳細調査', description: '根本原因の特定と影響評価の実施', time: '1時間以内' },
            { step: 4, title: '復旧作業', description: 'システム復旧と正常性確認', time: '4時間以内' },
            { step: 5, title: '事後対応', description: '再発防止策の策定と実装', time: '24時間以内' }
          ].map((item) => (
            <div key={item.step} className="flex items-start space-x-4 p-4 bg-white/20 rounded-lg">
              <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{item.title}</h4>
                  <span className="text-xs text-navy-600 bg-navy-100 px-2 py-1 rounded-full">{item.time}</span>
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50/50 rounded-lg p-6 border border-amber-200/50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">緊急連絡先</h3>
            <div className="space-y-2 text-sm text-amber-700">
              <p><strong>セキュリティインシデント報告:</strong> security@kenjano-seisan.com</p>
              <p><strong>緊急時電話番号:</strong> 03-1234-5678（24時間対応）</p>
              <p><strong>脆弱性報告:</strong> vulnerability@kenjano-seisan.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">プライバシー保護</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          お客様の個人情報・企業情報の保護を最優先に取り組んでいます。
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">データ収集・利用</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">収集する情報</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• アカウント情報（氏名、メールアドレス、会社情報）</li>
                <li>• 申請データ（出張申請、経費申請の内容）</li>
                <li>• 利用ログ（アクセス時間、操作履歴）</li>
                <li>• 技術情報（IPアドレス、ブラウザ情報）</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">利用目的</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• サービスの提供・運営</li>
                <li>• カスタマーサポート</li>
                <li>• サービス改善・機能開発</li>
                <li>• セキュリティ監視</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">データの保管・削除</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">保管期間</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• 申請データ: 7年間（法定保存期間）</li>
                <li>• アクセスログ: 1年間</li>
                <li>• バックアップデータ: 3年間</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">削除ポリシー</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• 契約終了後30日以内に削除</li>
                <li>• お客様からの削除要求に対応</li>
                <li>• 完全削除の証明書発行</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">第三者提供</h3>
          <div className="bg-emerald-50/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">原則として第三者提供は行いません</span>
            </div>
            <p className="text-sm text-emerald-700">
              法令に基づく場合や、お客様の明示的な同意がある場合を除き、
              個人情報・企業情報を第三者に提供することはありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: 'セキュリティ概要', icon: Shield },
    { id: 'compliance', label: 'コンプライアンス', icon: CheckCircle },
    { id: 'data-protection', label: 'データ保護', icon: Lock },
    { id: 'incident-response', label: 'インシデント対応', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">セキュリティ</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* サイドナビゲーション */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 border border-white/30 shadow-xl sticky top-6">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedSection === section.id
                            ? 'bg-navy-600 text-white shadow-lg'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
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
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-8 border border-white/30 shadow-xl">
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