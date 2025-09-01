import React, { useState } from 'react';
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, CreditCard, Scale } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate: (view: string) => void;
}

function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  const [selectedSection, setSelectedSection] = useState('overview');

  const sections = [
    { id: 'overview', label: '概要', icon: FileText },
    { id: 'definitions', label: '定義', icon: Users },
    { id: 'usage', label: '利用規約', icon: Shield },
    { id: 'payment', label: '料金・支払い', icon: CreditCard },
    { id: 'prohibited', label: '禁止事項', icon: AlertTriangle },
    { id: 'liability', label: '責任・免責', icon: Scale }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">利用規約</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          この利用規約（以下「本規約」）は、株式会社賢者の精算（以下「当社」）が提供する
          「賢者の精算」サービス（以下「本サービス」）の利用条件を定めるものです。
        </p>
      </div>

      <div className="bg-blue-50/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">重要事項</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>本サービスをご利用いただく前に、必ず本規約をお読みください</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>本サービスの利用により、本規約に同意したものとみなされます</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>本規約は予告なく変更される場合があります</span>
          </li>
        </ul>
      </div>

      <div className="bg-white/30 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">最終更新日</h3>
        </div>
        <p className="text-slate-600">2024年7月1日</p>
      </div>
    </div>
  );

  const renderDefinitions = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">定義</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          本規約において使用する用語の定義は以下のとおりです。
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            term: '本サービス',
            definition: '当社が提供する「賢者の精算」およびその関連サービス'
          },
          {
            term: 'ユーザー',
            definition: '本サービスを利用する個人または法人'
          },
          {
            term: 'アカウント',
            definition: '本サービス利用のために作成される利用者識別情報'
          },
          {
            term: 'コンテンツ',
            definition: 'ユーザーが本サービスに投稿・アップロードする一切の情報'
          },
          {
            term: '知的財産権',
            definition: '著作権、特許権、商標権その他の知的財産に関する権利'
          }
        ].map((item, index) => (
          <div key={index} className="bg-white/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.term}</h3>
                <p className="text-slate-600">{item.definition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProhibited = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">禁止事項</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
        </p>
      </div>

      <div className="space-y-4">
        {[
          '法令または公序良俗に違反する行為',
          '犯罪行為に関連する行為',
          '当社、他のユーザー、または第三者の知的財産権を侵害する行為',
          '当社、他のユーザー、または第三者の名誉、信用を毀損または不当に差別もしくは誹謗中傷する行為',
          '当社、他のユーザー、または第三者の財産を侵害する行為、または侵害のおそれのある行為',
          '当社、他のユーザー、または第三者に不利益、損害、不快感を与える行為',
          '反社会的勢力等への利益供与その他の協力行為',
          '宗教活動または政治活動',
          '本サービスのネットワークまたはシステム等に過度な負荷をかける行為',
          'BOT、チート、その他の技術的手段を利用してサービスを不正に操作する行為',
          '当社が許諾しない方法による本サービスの商業的利用',
          '面識のない異性との出会いや交際を目的とした行為',
          '他のユーザーの個人情報の収集、蓄積行為',
          '当社が定める一定のデータ容量を超えてサーバーに負担をかける行為',
          'その他、当社が不適切と判断する行為'
        ].map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-white/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-red-50/50 rounded-lg p-6 border border-red-200/50">
        <h3 className="text-lg font-semibold text-red-800 mb-4">違反時の措置</h3>
        <p className="text-red-700 mb-4">
          上記禁止事項に違反した場合、当社は以下の措置を講じる場合があります：
        </p>
        <ul className="space-y-1 text-sm text-red-700">
          <li>• 警告の実施</li>
          <li>• アカウントの一時停止</li>
          <li>• アカウントの永久停止</li>
          <li>• 損害賠償請求</li>
          <li>• 法的措置の実施</li>
        </ul>
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
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">利用規約</h1>
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
                {selectedSection === 'definitions' && renderDefinitions()}
                {selectedSection === 'prohibited' && renderProhibited()}
                {/* 他のセクションも同様に実装 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;