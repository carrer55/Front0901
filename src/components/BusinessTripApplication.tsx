import React, { useState } from 'react';
import { Calendar, MapPin, Upload, Calculator, Save, User, Building } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface BusinessTripApplicationProps {
  onNavigate: (view: 'dashboard' | 'business-trip' | 'expense') => void;
}

function BusinessTripApplication({ onNavigate }: BusinessTripApplicationProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicationNumber: '',
    applicantName: '',
    department: '',
    position: '',
    destination: '',
    purpose: '',
    period: {
      startYear: '',
      startMonth: '',
      startDay: '',
      endYear: '',
      endMonth: '',
      endDay: ''
    },
    objective: '',
    travelExpenses: '',
    schedule: '',
    estimatedExpenses: {
      dailyAllowance: 0,
      transportation: 0,
      accommodation: 0,
      total: 0
    },
    attachments: [] as File[]
  });

  const [dragActive, setDragActive] = useState(false);

  // 出張日当の自動計算
  const calculateExpenses = () => {
    if (formData.period.startYear && formData.period.startMonth && formData.period.startDay &&
        formData.period.endYear && formData.period.endMonth && formData.period.endDay) {
      
      const startDate = new Date(
        parseInt(formData.period.startYear),
        parseInt(formData.period.startMonth) - 1,
        parseInt(formData.period.startDay)
      );
      const endDate = new Date(
        parseInt(formData.period.endYear),
        parseInt(formData.period.endMonth) - 1,
        parseInt(formData.period.endDay)
      );
      
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const dailyRate = 5000; // 1日あたりの日当
      const transportationRate = 2000; // 1日あたりの交通費
      const accommodationRate = 8000; // 1日あたりの宿泊費

      const dailyAllowance = days * dailyRate;
      const transportation = days * transportationRate;
      const accommodation = days > 1 ? (days - 1) * accommodationRate : 0;
      const total = dailyAllowance + transportation + accommodation;

      setFormData(prev => ({
        ...prev,
        estimatedExpenses: {
          dailyAllowance,
          transportation,
          accommodation,
          total
        }
      }));
    }
  };

  React.useEffect(() => {
    calculateExpenses();
  }, [
    formData.period.startYear, formData.period.startMonth, formData.period.startDay,
    formData.period.endYear, formData.period.endMonth, formData.period.endDay
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('出張申請データ:', formData);
    alert('出張申請が送信されました！');
    onNavigate('dashboard');
  };

  const onBack = () => {
    onNavigate('dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 現在の日付を取得
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="business-trip" />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNavigate={onNavigate} currentView="business-trip" />
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* ヘッダー */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">出張申請書</h1>
                <div className="flex justify-end mb-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-slate-600">申請No.</span>
                      <div className="border-b border-slate-400 w-32">
                        <input
                          type="text"
                          value={formData.applicationNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, applicationNumber: e.target.value }))}
                          className="w-full bg-transparent text-center text-sm text-slate-800 focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-slate-600">
                      <span>平成</span>
                      <div className="border-b border-slate-400 w-12 text-center">
                        <input
                          type="number"
                          value={currentYear - 1988}
                          className="w-full bg-transparent text-center text-slate-800 focus:outline-none"
                          readOnly
                        />
                      </div>
                      <span>年</span>
                      <div className="border-b border-slate-400 w-8 text-center">
                        <input
                          type="number"
                          value={currentMonth}
                          className="w-full bg-transparent text-center text-slate-800 focus:outline-none"
                          readOnly
                        />
                      </div>
                      <span>月</span>
                      <div className="border-b border-slate-400 w-8 text-center">
                        <input
                          type="number"
                          value={currentDay}
                          className="w-full bg-transparent text-center text-slate-800 focus:outline-none"
                          readOnly
                        />
                      </div>
                      <span>日</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-left mb-6">出張について、下記のとおり申請いたします。</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* メイン申請フォーム */}
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                  <div className="space-y-6">
                    {/* 申請者情報 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        出張者
                      </div>
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        所属
                      </div>
                      <div className="col-span-8 border border-slate-300 p-3">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full bg-transparent text-slate-800 focus:outline-none border-b border-slate-300 pb-1"
                            placeholder="部署名"
                            required
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-600 text-sm">氏名</span>
                            <input
                              type="text"
                              value={formData.applicantName}
                              onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                              className="flex-1 bg-transparent text-slate-800 focus:outline-none border-b border-slate-300 pb-1"
                              placeholder="氏名"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 同行者 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        同行者
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3">
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                          className="w-full bg-transparent text-slate-800 focus:outline-none"
                          placeholder="同行者がいる場合は記入してください"
                        />
                      </div>
                    </div>

                    {/* 出張先 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        出張先
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3">
                        <input
                          type="text"
                          value={formData.destination}
                          onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                          className="w-full bg-transparent text-slate-800 focus:outline-none"
                          placeholder="※都道府県市区町村名まで記載してください"
                          required
                        />
                      </div>
                    </div>

                    {/* 訪問先 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        訪問先
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3">
                        <input
                          type="text"
                          value={formData.purpose}
                          onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                          className="w-full bg-transparent text-slate-800 focus:outline-none"
                          placeholder="※訪問する会社名等を記載してください"
                          required
                        />
                      </div>
                    </div>

                    {/* 期間 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        期間
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-slate-600">平成</span>
                          <input
                            type="number"
                            value={formData.period.startYear}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, startYear: e.target.value }
                            }))}
                            className="w-12 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="年"
                            required
                          />
                          <span className="text-slate-600">年</span>
                          <input
                            type="number"
                            value={formData.period.startMonth}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, startMonth: e.target.value }
                            }))}
                            className="w-8 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="月"
                            min="1"
                            max="12"
                            required
                          />
                          <span className="text-slate-600">月</span>
                          <input
                            type="number"
                            value={formData.period.startDay}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, startDay: e.target.value }
                            }))}
                            className="w-8 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="日"
                            min="1"
                            max="31"
                            required
                          />
                          <span className="text-slate-600">日</span>
                          
                          <span className="mx-4 text-slate-600">〜</span>
                          
                          <span className="text-slate-600">平成</span>
                          <input
                            type="number"
                            value={formData.period.endYear}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, endYear: e.target.value }
                            }))}
                            className="w-12 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="年"
                            required
                          />
                          <span className="text-slate-600">年</span>
                          <input
                            type="number"
                            value={formData.period.endMonth}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, endMonth: e.target.value }
                            }))}
                            className="w-8 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="月"
                            min="1"
                            max="12"
                            required
                          />
                          <span className="text-slate-600">月</span>
                          <input
                            type="number"
                            value={formData.period.endDay}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              period: { ...prev.period, endDay: e.target.value }
                            }))}
                            className="w-8 bg-transparent text-center text-slate-800 focus:outline-none border-b border-slate-300"
                            placeholder="日"
                            min="1"
                            max="31"
                            required
                          />
                          <span className="text-slate-600">日</span>
                        </div>
                      </div>
                    </div>

                    {/* 目的 */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        目的
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3 h-24">
                        <textarea
                          value={formData.objective}
                          onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                          className="w-full h-full bg-transparent text-slate-800 focus:outline-none resize-none"
                          placeholder=""
                          required
                        />
                      </div>
                    </div>

                    {/* 出張費用見積り */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        出張費用見積り
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3 h-32">
                        <div className="text-xs text-slate-600 mb-2">※交通費・宿泊費等を自由記載で記載してください</div>
                        <textarea
                          value={formData.travelExpenses}
                          onChange={(e) => setFormData(prev => ({ ...prev, travelExpenses: e.target.value }))}
                          className="w-full h-20 bg-transparent text-slate-800 focus:outline-none resize-none"
                          placeholder=""
                        />
                      </div>
                    </div>

                    {/* 日程 */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-2 bg-slate-100 p-3 text-center font-medium text-slate-700 border border-slate-300">
                        日程
                      </div>
                      <div className="col-span-10 border border-slate-300 p-3 h-40">
                        <textarea
                          value={formData.schedule}
                          onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                          className="w-full h-full bg-transparent text-slate-800 focus:outline-none resize-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 承認欄 */}
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">承認欄</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-0 border border-slate-300">
                    <div className="bg-slate-100 p-4 text-center font-medium text-slate-700 border-r border-slate-300 h-20 flex items-center justify-center">
                      部長
                    </div>
                    <div className="bg-slate-100 p-4 text-center font-medium text-slate-700 border-r border-slate-300 h-20 flex items-center justify-center">
                      取締役
                    </div>
                    <div className="bg-slate-100 p-4 text-center font-medium text-slate-700 border-r border-slate-300 h-20 flex items-center justify-center">
                      経理
                    </div>
                    <div className="bg-slate-100 p-4 text-center font-medium text-slate-700 h-20 flex items-center justify-center">
                      代表取締役
                    </div>
                    <div className="p-4 border-r border-slate-300 h-20"></div>
                    <div className="p-4 border-r border-slate-300 h-20"></div>
                    <div className="p-4 border-r border-slate-300 h-20"></div>
                    <div className="p-4 h-20"></div>
                  </div>
                </div>

                {/* 予定経費（自動計算） */}
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    <Calculator className="w-5 h-5 inline mr-2" />
                    予定経費（自動計算）
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-sm text-slate-600 mb-1">出張日当</p>
                      <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.dailyAllowance.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-sm text-slate-600 mb-1">交通費</p>
                      <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.transportation.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-sm text-slate-600 mb-1">宿泊費</p>
                      <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.accommodation.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-r from-navy-600 to-navy-800 rounded-lg p-4 text-white">
                      <p className="text-sm text-navy-100 mb-1">合計</p>
                      <p className="text-2xl font-bold">¥{formData.estimatedExpenses.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* 写真添付 */}
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    <Upload className="w-5 h-5 inline mr-2" />
                    写真添付
                  </h2>
                  
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-navy-400 bg-navy-50/50' 
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">ファイルをドラッグ&ドロップするか、クリックして選択</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-4 py-2 bg-white/50 hover:bg-white/70 rounded-lg cursor-pointer transition-colors backdrop-blur-sm"
                    >
                      ファイルを選択
                    </label>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-slate-700">添付ファイル:</p>
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/30 rounded-lg p-3 backdrop-blur-sm">
                          <span className="text-sm text-slate-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            削除
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 送信ボタン */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 bg-white/50 hover:bg-white/70 text-slate-700 rounded-lg font-medium transition-colors backdrop-blur-sm"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-navy-700 to-navy-900 hover:from-navy-800 hover:to-navy-950 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    <span>申請を送信</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessTripApplication;