import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, Globe, Calendar } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (view: string) => void;
}

function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const [selectedSection, setSelectedSection] = useState('overview');

  const sections = [
    { id: 'overview', label: '概要', icon: Shield },
    { id: 'collection', label: '情報収集', icon: Eye },
    { id: 'usage', label: '利用目的', icon: Users },
    { id: 'sharing', label: '第三者提供', icon: Globe },
    { id: 'security', label: 'セキュリティ', icon: Lock },
    { id: 'rights', label: 'お客様の権利', icon: Users },
    { id: 'contact', label: 'お問い合わせ', icon: Users }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">プライバシーポリシー概要</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          株式会社賢者の精算（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、
          個人情報保護法その他の関連法令を遵守し、適切な取り扱いを行います。
        </p>
      </div>

      <div className="bg-blue-50/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">基本方針</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>お客様の個人情報は、明確な目的のもとでのみ収集・利用いたします</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>収集した個人情報は適切に管理し、不正アクセス・漏洩を防止します</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>法令に基づく場合を除き、同意なく第三者に提供することはありません</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>お客様からの開示・訂正・削除等の要求に適切に対応いたします</span>
          </li>
        </ul>
      </div>

      <div className="bg-white/30 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">最終更新日</h3>
        </div>
        <p className="text-slate-600">2024年7月1日</p>
      </div>
    </div>
  );

  const renderCollection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">個人情報の収集</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          当社では、サービス提供に必要な範囲で以下の個人情報を収集いたします。
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">収集する情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">アカウント情報</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• 氏名</li>
                <li>• メールアドレス</li>
                <li>• 電話番号</li>
                <li>• 会社名・部署名</li>
                <li>• 役職</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">利用情報</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• 申請データ（出張・経費申請の内容）</li>
                <li>• 領収書・証憑書類</li>
                <li>• システム利用ログ</li>
                <li>• IPアドレス・ブラウザ情報</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">収集方法</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">直接収集</h4>
              <p className="text-sm text-slate-600">
                アカウント登録時、申請作成時、設定変更時など、
                お客様が直接入力された情報を収集します。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">自動収集</h4>
              <p className="text-sm text-slate-600">
                サービス利用時のアクセスログ、操作履歴、
                技術的情報を自動的に収集します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">個人情報の利用目的</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          収集した個人情報は、以下の目的でのみ利用いたします。
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            title: 'サービスの提供・運営',
            items: [
              'アカウント管理・認証',
              '申請処理・承認ワークフロー',
              '精算処理・支払い管理',
              'レポート・統計の生成'
            ]
          },
          {
            title: 'カスタマーサポート',
            items: [
              'お問い合わせ対応',
              '技術サポート',
              '利用方法のご案内',
              'トラブルシューティング'
            ]
          },
          {
            title: 'サービス改善',
            items: [
              '機能改善・新機能開発',
              'ユーザビリティ向上',
              'システム最適化',
              '品質向上'
            ]
          },
          {
            title: 'セキュリティ・コンプライアンス',
            items: [
              '不正利用の防止・検知',
              'セキュリティ監視',
              '法令遵守の確認',
              '監査対応'
            ]
          }
        ].map((category, index) => (
          <div key={index} className="bg-white/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">{category.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-navy-600 rounded-full"></span>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRights = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">お客様の権利</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          お客様は、ご自身の個人情報について以下の権利を有しています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: '開示請求権',
            description: 'ご自身の個人情報の利用状況について開示を求める権利',
            icon: Eye
          },
          {
            title: '訂正・削除権',
            description: '個人情報の訂正・削除を求める権利',
            icon: Lock
          },
          {
            title: '利用停止権',
            description: '個人情報の利用停止を求める権利',
            icon: Shield
          },
          {
            title: 'データポータビリティ権',
            description: '個人情報の移転を求める権利',
            icon: Globe
          }
        ].map((right, index) => {
          const Icon = right.icon;
          return (
            <div key={index} className="bg-white/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Icon className="w-6 h-6 text-navy-600" />
                <h3 className="text-lg font-semibold text-slate-800">{right.title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{right.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">権利行使の方法</h3>
        <div className="space-y-3 text-slate-700">
          <p>上記の権利を行使される場合は、以下の連絡先までお問い合わせください：</p>
          <div className="bg-white/50 rounded-lg p-4">
            <p><strong>メール:</strong> privacy@kenjano-seisan.com</p>
            <p><strong>電話:</strong> 03-1234-5678（平日 9:00-18:00）</p>
            <p><strong>郵送:</strong> 〒100-0005 東京都千代田区丸の内1-1-1 丸の内ビル10F</p>
          </div>
          <p className="text-sm text-slate-600">
            ※ご本人確認のため、身分証明書の提示をお願いする場合があります。
          </p>
        </div>
      </div>
    </div>
  );

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
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">プライバシーポリシー</h1>
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
                {selectedSection === 'collection' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">個人情報の収集</h2>
                    <p className="text-slate-600 mb-6">
                      当社では、サービス提供に必要な範囲で以下の個人情報を収集いたします。
                    </p>
                    {/* 収集情報の詳細内容 */}
                  </div>
                )}
                {selectedSection === 'usage' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">利用目的</h2>
                    <p className="text-slate-600 mb-6">
                      収集した個人情報は、以下の目的でのみ利用いたします。
                    </p>
                    {/* 利用目的の詳細内容 */}
                  </div>
                )}
                {selectedSection === 'rights' && renderRights()}
                {/* 他のセクションも同様に実装 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;