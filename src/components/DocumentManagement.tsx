import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, FileText, Calendar, MapPin, BarChart3, TrendingUp, Plus, Eye, Edit, Send, CheckCircle, Clock, AlertTriangle, Users, Building } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DocumentManagementProps {
  onNavigate: (view: string, documentType?: string) => void;
}

interface BusinessTrip {
  id: string;
  title: string;
  purpose: string;
  startDate: string;
  endDate: string;
  location: string;
  visitTarget: string;
  companions: string;
  estimatedAmount: number;
  status: 'approved' | 'completed';
  hasReport: boolean;
  hasExpenseReport: boolean;
}

interface ExpenseApplication {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  store: string;
  description: string;
  businessTripId?: string;
  isUsedInExpenseReport: boolean;
}

interface Document {
  id: string;
  type: 'business-report' | 'expense-report';
  title: string;
  businessTripId: string;
  status: 'draft' | 'submitted' | 'approved';
  createdAt: string;
  updatedAt: string;
  data: any;
}

function DocumentManagement({ onNavigate }: DocumentManagementProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<'system' | 'email'>('system');

  // サンプルデータ
  const [businessTrips] = useState<BusinessTrip[]>([
    {
      id: 'BT-2024-001',
      title: '東京出張',
      purpose: 'クライアント訪問および新規開拓営業',
      startDate: '2024-07-25',
      endDate: '2024-07-27',
      location: '東京都港区',
      visitTarget: '株式会社サンプル',
      companions: '田中部長',
      estimatedAmount: 52500,
      status: 'completed',
      hasReport: true,
      hasExpenseReport: false
    },
    {
      id: 'BT-2024-002',
      title: '大阪出張',
      purpose: '支社会議参加',
      startDate: '2024-07-20',
      endDate: '2024-07-21',
      location: '大阪府大阪市',
      visitTarget: '大阪支社',
      companions: '',
      estimatedAmount: 35000,
      status: 'completed',
      hasReport: false,
      hasExpenseReport: false
    },
    {
      id: 'BT-2024-003',
      title: '福岡出張',
      purpose: '新規事業説明会',
      startDate: '2024-08-05',
      endDate: '2024-08-06',
      location: '福岡県福岡市',
      visitTarget: '九州商事株式会社',
      companions: '佐藤課長、鈴木主任',
      estimatedAmount: 45000,
      status: 'approved',
      hasReport: false,
      hasExpenseReport: false
    }
  ]);

  const [expenseApplications] = useState<ExpenseApplication[]>([
    {
      id: 'EX-2024-001',
      title: '東京出張交通費',
      amount: 15000,
      date: '2024-07-25',
      category: '旅費交通費',
      store: 'JR東日本',
      description: '新幹線代（往復）',
      businessTripId: 'BT-2024-001',
      isUsedInExpenseReport: false
    },
    {
      id: 'EX-2024-002',
      title: '東京出張宿泊費',
      amount: 12000,
      date: '2024-07-25',
      category: '旅費交通費',
      store: 'ホテルニューオータニ',
      description: '宿泊費（2泊）',
      businessTripId: 'BT-2024-001',
      isUsedInExpenseReport: false
    },
    {
      id: 'EX-2024-003',
      title: '大阪出張交通費',
      amount: 8500,
      date: '2024-07-20',
      category: '旅費交通費',
      store: 'JR西日本',
      description: '新幹線代（往復）',
      businessTripId: 'BT-2024-002',
      isUsedInExpenseReport: false
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'DOC-001',
      type: 'business-report',
      title: '東京出張報告書',
      businessTripId: 'BT-2024-001',
      status: 'draft',
      createdAt: '2024-07-28T10:00:00Z',
      updatedAt: '2024-07-28T15:30:00Z',
      data: {
        actionAndResults: '新規クライアントとの商談が成功し、次回契約締結の約束を取り付けた。'
      }
    }
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const createBusinessReport = (businessTripId: string) => {
    const trip = businessTrips.find(t => t.id === businessTripId);
    if (!trip) return;

    // 編集画面に遷移（データは編集画面で自動入力）
    localStorage.setItem('editingBusinessTripId', businessTripId);
    localStorage.setItem('editingDocumentType', 'business-report');
    onNavigate('document-editor');
  };

  const createExpenseReport = (businessTripId: string) => {
    const trip = businessTrips.find(t => t.id === businessTripId);
    const report = documents.find(d => d.businessTripId === businessTripId && d.type === 'business-report');
    
    if (!trip || !report) {
      alert('出張報告書を先に作成してください。');
      return;
    }

    const availableExpenses = expenseApplications.filter(
      exp => exp.businessTripId === businessTripId && !exp.isUsedInExpenseReport
    );

    if (availableExpenses.length === 0) {
      alert('この出張に関連する未使用の経費申請がありません。');
      return;
    }

    // 編集画面に遷移（データは編集画面で自動入力）
    localStorage.setItem('editingBusinessTripId', businessTripId);
    localStorage.setItem('editingDocumentType', 'expense-report');
    onNavigate('document-editor');
  };

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleBulkSubmit = () => {
    if (selectedDocuments.length === 0) {
      alert('提出する書類を選択してください。');
      return;
    }
    setShowSubmitModal(true);
  };

  const handleSubmit = () => {
    const method = submitMethod === 'system' ? 'システム内承認' : 'メール送信';
    alert(`${selectedDocuments.length}件の書類を${method}で提出しました。`);
    
    // ステータスを更新
    setDocuments(prev => prev.map(doc => 
      selectedDocuments.includes(doc.id) 
        ? { ...doc, status: 'submitted' as const }
        : doc
    ));
    
    setSelectedDocuments([]);
    setShowSubmitModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit className="w-4 h-4 text-amber-600" />;
      case 'submitted':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'draft': '未提出',
      'submitted': '提出済み',
      'approved': '承認済み'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'text-amber-700 bg-amber-100 border-amber-200',
      'submitted': 'text-blue-700 bg-blue-100 border-blue-200',
      'approved': 'text-emerald-700 bg-emerald-100 border-emerald-200'
    };
    return colors[status as keyof typeof colors] || 'text-slate-700 bg-slate-100 border-slate-200';
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const draftDocuments = filteredDocuments.filter(doc => doc.status === 'draft');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="document-management" />
        </div>

        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNavigate={onNavigate} currentView="document-management" />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">書類管理</h1>
                  <p className="text-slate-600">出張報告書と経費精算書の作成・管理</p>
                </div>
                {draftDocuments.length > 0 && (
                  <button
                    onClick={handleBulkSubmit}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span>まとめて提出 ({draftDocuments.length})</span>
                  </button>
                )}
              </div>

              {/* タブナビゲーション */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-xl mb-8">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 rounded-l-xl ${
                      activeTab === 'create'
                        ? 'bg-gradient-to-r from-navy-600 to-navy-800 text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>書類作成</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('manage')}
                    className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 rounded-r-xl ${
                      activeTab === 'manage'
                        ? 'bg-gradient-to-r from-navy-600 to-navy-800 text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>書類管理</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 書類作成タブ */}
              {activeTab === 'create' && (
                <div className="space-y-8">
                  {/* 出張報告書作成 */}
                  <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800">出張報告書</h2>
                          <p className="text-slate-600 text-sm">完了した出張から報告書を作成</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {businessTrips.filter(trip => trip.status === 'completed').map((trip) => (
                        <div
                          key={trip.id}
                          className={`relative backdrop-blur-xl bg-white/30 rounded-lg p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 ${
                            trip.hasReport ? 'ring-2 ring-emerald-500/50' : 'hover:bg-white/40 cursor-pointer'
                          }`}
                          onClick={() => !trip.hasReport ? createBusinessReport(trip.id) : onNavigate('document-editor')}
                        >
                          {trip.hasReport && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                          
                          <div className="mb-3">
                            <h3 className="font-semibold text-slate-800 mb-1">{trip.title}</h3>
                            <div className="flex items-center space-x-2 text-xs text-slate-600">
                              <Calendar className="w-3 h-3" />
                              <span>{trip.startDate} ～ {trip.endDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-600 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{trip.location}</span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-slate-500 mb-3">
                            <p className="truncate">{trip.purpose}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              trip.hasReport 
                                ? 'text-emerald-700 bg-emerald-100' 
                                : 'text-amber-700 bg-amber-100'
                            }`}>
                              {trip.hasReport ? '作成済' : '未作成'}
                            </span>
                            {trip.hasReport ? (
                              <span className="text-xs text-slate-500">クリックで編集</span>
                            ) : (
                              <Plus className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 出張経費精算書作成 */}
                  <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-lg">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800">出張経費精算書</h2>
                          <p className="text-slate-600 text-sm">出張報告書から経費精算書を作成</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {businessTrips.filter(trip => trip.hasReport).map((trip) => {
                        const availableExpenses = expenseApplications.filter(
                          exp => exp.businessTripId === trip.id && !exp.isUsedInExpenseReport
                        );
                        
                        return (
                          <div
                            key={trip.id}
                            className={`relative backdrop-blur-xl bg-white/30 rounded-lg p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 ${
                              trip.hasExpenseReport ? 'ring-2 ring-emerald-500/50' : 'hover:bg-white/40 cursor-pointer'
                            }`}
                            onClick={() => !trip.hasExpenseReport ? createExpenseReport(trip.id) : onNavigate('document-editor')}
                          >
                            {trip.hasExpenseReport && (
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            )}
                            
                            <div className="mb-3">
                              <h3 className="font-semibold text-slate-800 mb-1">{trip.title}</h3>
                              <div className="flex items-center space-x-2 text-xs text-slate-600">
                                <Calendar className="w-3 h-3" />
                                <span>{trip.startDate} ～ {trip.endDate}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-slate-600 mt-1">
                                <Building className="w-3 h-3" />
                                <span>{trip.visitTarget}</span>
                              </div>
                            </div>
                            
                            <div className="text-xs text-slate-500 mb-3">
                              <p>利用可能経費: {availableExpenses.length}件</p>
                              <p>予定日当: ¥{trip.estimatedAmount.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                trip.hasExpenseReport 
                                  ? 'text-emerald-700 bg-emerald-100' 
                                  : availableExpenses.length > 0
                                  ? 'text-amber-700 bg-amber-100'
                                  : 'text-slate-700 bg-slate-100'
                              }`}>
                                {trip.hasExpenseReport ? '作成済' : availableExpenses.length > 0 ? '未作成' : '経費なし'}
                              </span>
                              {trip.hasExpenseReport ? (
                                <span className="text-xs text-slate-500">クリックで編集</span>
                              ) : availableExpenses.length > 0 && (
                                <Plus className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {businessTrips.filter(trip => trip.hasReport).length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600 text-lg font-medium mb-2">出張報告書がありません</p>
                        <p className="text-slate-500">先に出張報告書を作成してください</p>
                      </div>
                    )}
                  </div>

                  {/* 過去の申請を確認するボタン */}
                  <div className="text-center">
                    <button
                      onClick={() => onNavigate('past-applications-search')}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-lg font-medium hover:from-slate-700 hover:to-slate-900 transition-all duration-200 mx-auto"
                    >
                      <Search className="w-5 h-5" />
                      <span>過去の申請を確認する</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 未提出書類管理タブ */}
              {activeTab === 'manage' && (
                <div className="space-y-6">
                  {/* 未提出書類（優先表示） */}
                  {draftDocuments.length > 0 ? (
                    <div className="backdrop-blur-xl bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-xl p-6 border border-amber-300/30 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-800">未提出書類</h2>
                            <p className="text-slate-600 text-sm">提出が必要な書類があります</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedDocuments(draftDocuments.map(d => d.id))}
                            className="px-4 py-2 bg-white/50 hover:bg-white/70 text-slate-700 rounded-lg font-medium transition-colors"
                          >
                            すべて選択
                          </button>
                          <button
                            onClick={handleBulkSubmit}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200"
                          >
                            <Send className="w-4 h-4" />
                            <span>まとめて提出</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {draftDocuments.map((document) => (
                          <div
                            key={document.id}
                            className={`backdrop-blur-xl bg-white/40 rounded-lg p-4 border-2 transition-all duration-300 cursor-pointer ${
                              selectedDocuments.includes(document.id)
                                ? 'border-navy-500 bg-navy-50/30 shadow-lg'
                                : 'border-white/40 hover:border-white/60 hover:bg-white/50'
                            }`}
                            onClick={() => handleDocumentSelect(document.id)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-800 mb-1">{document.title}</h3>
                                <div className="flex items-center space-x-2 text-xs text-slate-600">
                                  <span className={`px-2 py-1 rounded-full ${
                                    document.type === 'business-report' 
                                      ? 'text-blue-700 bg-blue-100' 
                                      : 'text-emerald-700 bg-emerald-100'
                                  }`}>
                                    {document.type === 'business-report' ? '出張報告書' : '経費精算書'}
                                  </span>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={selectedDocuments.includes(document.id)}
                                onChange={() => handleDocumentSelect(document.id)}
                                className="w-5 h-5 text-navy-600 bg-white/50 border-white/40 rounded focus:ring-navy-400 focus:ring-2"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            
                            <div className="text-xs text-slate-500 mb-3">
                              <p>作成日: {new Date(document.createdAt).toLocaleDateString('ja-JP')}</p>
                              <p>更新日: {new Date(document.updatedAt).toLocaleDateString('ja-JP')}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${getStatusColor(document.status)}`}>
                                {getStatusIcon(document.status)}
                                <span className="text-xs font-medium">{getStatusLabel(document.status)}</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate('document-editor');
                                  }}
                                  className="p-1 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded transition-colors"
                                >
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert('プレビュー画面に移動します');
                                  }}
                                  className="p-1 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded transition-colors"
                                >
                                  <Eye className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="backdrop-blur-xl bg-white/20 rounded-xl p-12 border border-white/30 shadow-xl text-center">
                      <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">すべての書類が提出済みです</h2>
                      <p className="text-slate-600 mb-6">未提出の書類はありません</p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-navy-600 to-navy-800 text-white rounded-lg font-medium hover:from-navy-700 hover:to-navy-900 transition-all duration-200 mx-auto"
                      >
                        <Plus className="w-5 h-5" />
                        <span>新しい書類を作成</span>
                      </button>
                    </div>
                  )}

                  {/* 統計情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">完了出張</h3>
                      <p className="text-3xl font-bold text-slate-800 mb-1">
                        {businessTrips.filter(t => t.status === 'completed').length}件
                      </p>
                      <p className="text-sm text-slate-600">報告書作成可能</p>
                    </div>
                    
                    <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">作成済報告書</h3>
                      <p className="text-3xl font-bold text-slate-800 mb-1">
                        {businessTrips.filter(t => t.hasReport).length}件
                      </p>
                      <p className="text-sm text-slate-600">精算書作成可能</p>
                    </div>
                    
                    <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">未提出書類</h3>
                      <p className="text-3xl font-bold text-slate-800 mb-1">{draftDocuments.length}件</p>
                      <p className="text-sm text-slate-600">提出待ち</p>
                    </div>
                  </div>

                  {/* 過去の申請を確認するボタン */}
                  <div className="text-center">
                    <button
                      onClick={() => onNavigate('past-applications-search')}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-lg font-medium hover:from-slate-700 hover:to-slate-900 transition-all duration-200 mx-auto"
                    >
                      <Search className="w-5 h-5" />
                      <span>過去の申請を確認する</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 提出方法選択モーダル */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">提出方法を選択</h3>
            
            <div className="space-y-4 mb-6">
              <label className="flex items-start space-x-3 cursor-pointer p-4 border-2 border-slate-200 rounded-lg hover:border-navy-400 transition-colors">
                <input
                  type="radio"
                  name="submitMethod"
                  value="system"
                  checked={submitMethod === 'system'}
                  onChange={(e) => setSubmitMethod(e.target.value as 'system' | 'email')}
                  className="w-5 h-5 text-navy-600 mt-0.5"
                />
                <div>
                  <div className="font-medium text-slate-800 mb-1">システム内承認</div>
                  <div className="text-sm text-slate-600">承認者アカウントに直接申請を送信</div>
                  <div className="text-xs text-slate-500 mt-1">• 即座に通知 • 承認履歴が残る • リアルタイム状況確認</div>
                </div>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer p-4 border-2 border-slate-200 rounded-lg hover:border-navy-400 transition-colors">
                <input
                  type="radio"
                  name="submitMethod"
                  value="email"
                  checked={submitMethod === 'email'}
                  onChange={(e) => setSubmitMethod(e.target.value as 'system' | 'email')}
                  className="w-5 h-5 text-navy-600 mt-0.5"
                />
                <div>
                  <div className="font-medium text-slate-800 mb-1">メール送信</div>
                  <div className="text-sm text-slate-600">PDF生成して承認者にメール送信</div>
                  <div className="text-xs text-slate-500 mt-1">• PDF自動生成 • メール添付 • 外部承認対応</div>
                </div>
              </label>
            </div>
            
            <div className="text-center text-sm text-slate-600 mb-6">
              {selectedDocuments.length}件の書類を提出します
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-navy-600 to-navy-800 text-white rounded-lg font-medium hover:from-navy-700 hover:to-navy-900 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>提出する</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagement;