import React, { useState } from 'react';
import { ArrowLeft, Code, Copy, CheckCircle, ExternalLink, Key, Shield, Globe } from 'lucide-react';

interface ApiDocumentationProps {
  onNavigate: (view: string) => void;
}

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  response: string;
  example: string;
}

function ApiDocumentation({ onNavigate }: ApiDocumentationProps) {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string>('');

  const apiEndpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/applications',
      description: '申請一覧を取得',
      parameters: [
        { name: 'status', type: 'string', required: false, description: '申請ステータス (pending, approved, rejected)' },
        { name: 'type', type: 'string', required: false, description: '申請種別 (business-trip, expense)' },
        { name: 'limit', type: 'number', required: false, description: '取得件数 (デフォルト: 20)' }
      ],
      response: 'Array<Application>',
      example: `{
  "data": [
    {
      "id": "BT-2024-001",
      "type": "business-trip",
      "title": "東京出張申請",
      "status": "pending",
      "amount": 52500,
      "submittedAt": "2024-07-20T09:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}`
    },
    {
      method: 'POST',
      path: '/api/v1/applications',
      description: '新規申請を作成',
      parameters: [
        { name: 'type', type: 'string', required: true, description: '申請種別 (business-trip, expense)' },
        { name: 'title', type: 'string', required: true, description: '申請タイトル' },
        { name: 'amount', type: 'number', required: true, description: '申請金額' },
        { name: 'purpose', type: 'string', required: false, description: '申請目的' }
      ],
      response: 'Application',
      example: `{
  "type": "business-trip",
  "title": "東京出張申請",
  "amount": 52500,
  "purpose": "クライアント訪問",
  "startDate": "2024-07-25",
  "endDate": "2024-07-27"
}`
    },
    {
      method: 'PUT',
      path: '/api/v1/applications/{id}/approve',
      description: '申請を承認',
      parameters: [
        { name: 'id', type: 'string', required: true, description: '申請ID' },
        { name: 'comment', type: 'string', required: false, description: '承認コメント' }
      ],
      response: 'Application',
      example: `{
  "comment": "承認いたします"
}`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const getMethodColor = (method: string) => {
    const colors = {
      'GET': 'text-emerald-700 bg-emerald-100',
      'POST': 'text-blue-700 bg-blue-100',
      'PUT': 'text-amber-700 bg-amber-100',
      'DELETE': 'text-red-700 bg-red-100'
    };
    return colors[method as keyof typeof colors] || 'text-slate-700 bg-slate-100';
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">API概要</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          賢者の精算APIは、出張申請・経費精算システムとの連携を可能にするRESTful APIです。
          申請の作成、承認、データ取得など、システムの主要機能をプログラムから利用できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-slate-800">ベースURL</h3>
          </div>
          <code className="bg-slate-100 px-3 py-2 rounded text-sm">
            https://api.kenjano-seisan.com/v1
          </code>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Key className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-slate-800">認証方式</h3>
          </div>
          <p className="text-sm text-slate-600">Bearer Token (JWT)</p>
        </div>
      </div>

      <div className="bg-blue-50/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">主な機能</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span>出張申請・経費申請の作成・更新・削除</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span>承認ワークフローの制御</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span>レポート・統計データの取得</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span>ユーザー管理・権限制御</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderAuthentication = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">認証</h2>
        <p className="text-slate-600 mb-6">
          APIへのアクセスには、JWTトークンによる認証が必要です。
        </p>
      </div>

      <div className="bg-white/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">1. トークン取得</h3>
        <div className="bg-slate-900 rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(`curl -X POST https://api.kenjano-seisan.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your@email.com",
    "password": "your_password"
  }'`, 'auth-example')}
            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
          >
            {copiedCode === 'auth-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <pre className="text-emerald-400 text-sm overflow-x-auto">
{`curl -X POST https://api.kenjano-seisan.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your@email.com",
    "password": "your_password"
  }'`}
          </pre>
        </div>
      </div>

      <div className="bg-white/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">2. APIリクエスト</h3>
        <div className="bg-slate-900 rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(`curl -X GET https://api.kenjano-seisan.com/v1/applications \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`, 'request-example')}
            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
          >
            {copiedCode === 'request-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <pre className="text-emerald-400 text-sm overflow-x-auto">
{`curl -X GET https://api.kenjano-seisan.com/v1/applications \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </div>
    </div>
  );

  const renderEndpoints = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">エンドポイント</h2>
        <p className="text-slate-600 mb-6">
          利用可能なAPIエンドポイントの一覧です。
        </p>
      </div>

      <div className="space-y-6">
        {apiEndpoints.map((endpoint, index) => (
          <div key={index} className="bg-white/30 rounded-lg p-6 border border-white/30">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <code className="text-lg font-mono text-slate-800">{endpoint.path}</code>
            </div>
            
            <p className="text-slate-600 mb-4">{endpoint.description}</p>

            {endpoint.parameters && (
              <div className="mb-4">
                <h4 className="font-semibold text-slate-800 mb-2">パラメータ</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="text-left py-2 px-3">名前</th>
                        <th className="text-left py-2 px-3">型</th>
                        <th className="text-left py-2 px-3">必須</th>
                        <th className="text-left py-2 px-3">説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.parameters.map((param, paramIndex) => (
                        <tr key={paramIndex} className="border-b border-slate-200">
                          <td className="py-2 px-3 font-mono">{param.name}</td>
                          <td className="py-2 px-3 text-slate-600">{param.type}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              param.required ? 'text-red-700 bg-red-100' : 'text-slate-600 bg-slate-100'
                            }`}>
                              {param.required ? '必須' : '任意'}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-600">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-slate-800 mb-2">レスポンス例</h4>
              <div className="bg-slate-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                  className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedCode === `example-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-emerald-400 text-sm overflow-x-auto">
                  {endpoint.example}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSDKs = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">SDK・ライブラリ</h2>
        <p className="text-slate-600 mb-6">
          各プログラミング言語向けのSDKとサンプルコードをご提供しています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">JavaScript/Node.js</h3>
          <div className="bg-slate-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(`npm install @kenjano-seisan/api-client

import { KenjaClient } from '@kenjano-seisan/api-client';

const client = new KenjaClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.kenjano-seisan.com/v1'
});

// 申請一覧取得
const applications = await client.applications.list();`, 'js-sdk')}
              className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
            >
              {copiedCode === 'js-sdk' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-emerald-400 text-sm overflow-x-auto">
{`npm install @kenjano-seisan/api-client

import { KenjaClient } from '@kenjano-seisan/api-client';

const client = new KenjaClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.kenjano-seisan.com/v1'
});

// 申請一覧取得
const applications = await client.applications.list();`}
            </pre>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Python</h3>
          <div className="bg-slate-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(`pip install kenjano-seisan

from kenjano_seisan import KenjaClient

client = KenjaClient(
    api_key='your-api-key',
    base_url='https://api.kenjano-seisan.com/v1'
)

# 申請一覧取得
applications = client.applications.list()`, 'python-sdk')}
              className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
            >
              {copiedCode === 'python-sdk' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-emerald-400 text-sm overflow-x-auto">
{`pip install kenjano-seisan

from kenjano_seisan import KenjaClient

client = KenjaClient(
    api_key='your-api-key',
    base_url='https://api.kenjano-seisan.com/v1'
)

# 申請一覧取得
applications = client.applications.list()`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: '概要', icon: Globe },
    { id: 'authentication', label: '認証', icon: Key },
    { id: 'endpoints', label: 'エンドポイント', icon: Code },
    { id: 'sdks', label: 'SDK', icon: ExternalLink }
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
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">API ドキュメント</h1>
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
                        <span className="font-medium">{section.label}</span>
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
                {selectedSection === 'authentication' && renderAuthentication()}
                {selectedSection === 'endpoints' && renderEndpoints()}
                {selectedSection === 'sdks' && renderSDKs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiDocumentation;