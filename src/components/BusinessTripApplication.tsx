import React, { useState } from 'react';
import { Calendar, MapPin, Upload, Calculator, Save, ArrowLeft, User, Building, FileText, Clock } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface BusinessTripApplicationProps {
  onNavigate: (view: 'dashboard' | 'business-trip' | 'expense') => void;
}

interface TripFormData {
  // 基本情報
  applicantName: string;
  department: string;
  position: string;
  employeeId: string;
  
  // 出張詳細
  purpose: string;
  destination: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  
  // 交通手段
  transportationMethod: string;
  departureLocation: string;
  arrivalLocation: string;
  
  // 宿泊情報
  accommodationRequired: boolean;
  accommodationType: string;
  accommodationLocation: string;
  
  // 同行者情報
  companions: Array<{
    name: string;
    department: string;
    position: string;
  }>;
  
  // 経費予定
  estimatedExpenses: {
    dailyAllowance: number;
    transportation: number;
    accommodation: number;
    meals: number;
    miscellaneous: number;
    total: number;
  };
  
  // 承認者
  approver: string;
  
  // 備考・特記事項
  remarks: string;
  
  // 添付ファイル
  attachments: File[];
}

function BusinessTripApplication({ onNavigate }: BusinessTripApplicationProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<TripFormData>({
    applicantName: '',
    department: '',
    position: '',
    employeeId: '',
    purpose: '',
    destination: '',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00',
    transportationMethod: '電車',
    departureLocation: '',
    arrivalLocation: '',
    accommodationRequired: false,
    accommodationType: 'ビジネスホテル',
    accommodationLocation: '',
    companions: [],
    estimatedExpenses: {
      dailyAllowance: 0,
      transportation: 0,
      accommodation: 0,
      meals: 0,
      miscellaneous: 0,
      total: 0
    },
    approver: '',
    remarks: '',
    attachments: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // ユーザー情報を取得（実際の実装では認証情報から取得）
  React.useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setFormData(prev => ({
      ...prev,
      applicantName: userProfile.name || 'デモユーザー',
      department: userProfile.department || '営業部',
      position: userProfile.position || '代表取締役',
      employeeId: 'EMP001'
    }));
  }, []);

  // 出張日数と経費の自動計算
  const calculateExpenses = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // ユーザーの日当設定を取得
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const allowances = userProfile.allowances?.domestic || {
        dailyAllowance: 5000,
        transportation: 2000,
        accommodation: 10000
      };

      const dailyAllowance = days * allowances.dailyAllowance;
      const transportation = days * allowances.transportation;
      const accommodation = formData.accommodationRequired ? (days - 1) * allowances.accommodation : 0;
      const meals = days * 2000; // 食事代（1日2,000円と仮定）
      const miscellaneous = days * 500; // 雑費（1日500円と仮定）
      const total = dailyAllowance + transportation + accommodation + meals + miscellaneous;

      setFormData(prev => ({
        ...prev,
        estimatedExpenses: {
          dailyAllowance,
          transportation,
          accommodation,
          meals,
          miscellaneous,
          total
        }
      }));
    }
  };

  React.useEffect(() => {
    calculateExpenses();
  }, [formData.startDate, formData.endDate, formData.accommodationRequired]);

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

  const addCompanion = () => {
    setFormData(prev => ({
      ...prev,
      companions: [...prev.companions, { name: '', department: '', position: '' }]
    }));
  };

  const updateCompanion = (index: number, field: keyof typeof formData.companions[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      companions: prev.companions.map((companion, i) => 
        i === index ? { ...companion, [field]: value } : companion
      )
    }));
  };

  const removeCompanion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('出張申請データ:', formData);
    alert('出張申請が送信されました！');
    onNavigate('dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">申請者情報</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            申請者氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.applicantName}
            onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            required
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            社員番号
          </label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            placeholder="EMP001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Building className="w-4 h-4 inline mr-1" />
            所属部署 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            placeholder="営業部"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            役職 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            required
          >
            <option value="">役職を選択</option>
            <option value="代表取締役">代表取締役</option>
            <option value="取締役">取締役</option>
            <option value="部長">部長</option>
            <option value="課長">課長</option>
            <option value="主任">主任</option>
            <option value="一般職">一般職</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          承認者 <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.approver}
          onChange={(e) => setFormData(prev => ({ ...prev, approver: e.target.value }))}
          className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          required
        >
          <option value="">承認者を選択</option>
          <option value="佐藤部長">佐藤部長</option>
          <option value="田中取締役">田中取締役</option>
          <option value="山田社長">山田社長</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">出張詳細</h2>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          出張目的 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.purpose}
          onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
          className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          placeholder="出張の目的を詳しく入力してください（例：新規クライアント訪問、契約締結、会議参加など）"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            出発日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            帰着日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            出発時刻
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            帰着時刻
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          訪問先・出張先 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
          className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          placeholder="例：東京都港区虎ノ門1-1-1 ○○ビル"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">交通・宿泊情報</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            交通手段 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.transportationMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, transportationMethod: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            required
          >
            <option value="電車">電車</option>
            <option value="新幹線">新幹線</option>
            <option value="飛行機">飛行機</option>
            <option value="バス">バス</option>
            <option value="自家用車">自家用車</option>
            <option value="社用車">社用車</option>
            <option value="タクシー">タクシー</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            出発地
          </label>
          <input
            type="text"
            value={formData.departureLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, departureLocation: e.target.value }))}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
            placeholder="例：東京駅"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          到着地
        </label>
        <input
          type="text"
          value={formData.arrivalLocation}
          onChange={(e) => setFormData(prev => ({ ...prev, arrivalLocation: e.target.value }))}
          className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          placeholder="例：大阪駅"
        />
      </div>

      {/* 宿泊情報 */}
      <div className="bg-white/30 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="accommodation"
            checked={formData.accommodationRequired}
            onChange={(e) => setFormData(prev => ({ ...prev, accommodationRequired: e.target.checked }))}
            className="w-5 h-5 text-navy-600 bg-white/50 border-white/40 rounded focus:ring-navy-400 focus:ring-2"
          />
          <label htmlFor="accommodation" className="text-sm font-medium text-slate-700">
            宿泊を伴う出張
          </label>
        </div>

        {formData.accommodationRequired && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                宿泊施設の種類
              </label>
              <select
                value={formData.accommodationType}
                onChange={(e) => setFormData(prev => ({ ...prev, accommodationType: e.target.value }))}
                className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
              >
                <option value="ビジネスホテル">ビジネスホテル</option>
                <option value="シティホテル">シティホテル</option>
                <option value="旅館">旅館</option>
                <option value="民宿">民宿</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                宿泊予定地
              </label>
              <input
                type="text"
                value={formData.accommodationLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, accommodationLocation: e.target.value }))}
                className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                placeholder="例：大阪市中央区"
              />
            </div>
          </div>
        )}
      </div>

      {/* 同行者情報 */}
      <div className="bg-white/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-800">同行者情報</h3>
          <button
            type="button"
            onClick={addCompanion}
            className="px-3 py-2 bg-gradient-to-r from-navy-600 to-navy-800 text-white rounded-lg font-medium hover:from-navy-700 hover:to-navy-900 transition-all duration-200 text-sm"
          >
            同行者を追加
          </button>
        </div>

        {formData.companions.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">同行者はいません</p>
        ) : (
          <div className="space-y-3">
            {formData.companions.map((companion, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white/20 rounded-lg p-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">氏名</label>
                  <input
                    type="text"
                    value={companion.name}
                    onChange={(e) => updateCompanion(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 border border-white/40 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                    placeholder="田中太郎"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">部署</label>
                  <input
                    type="text"
                    value={companion.department}
                    onChange={(e) => updateCompanion(index, 'department', e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 border border-white/40 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                    placeholder="営業部"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">役職</label>
                  <input
                    type="text"
                    value={companion.position}
                    onChange={(e) => updateCompanion(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 border border-white/40 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                    placeholder="課長"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        <Calculator className="w-5 h-5 inline mr-2" />
        予定経費（自動計算）
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-600 mb-1">出張日当</p>
          <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.dailyAllowance.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">
            {formData.startDate && formData.endDate ? 
              `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1}日分` : 
              '日数未設定'
            }
          </p>
        </div>
        <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-600 mb-1">交通費</p>
          <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.transportation.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">{formData.transportationMethod}</p>
        </div>
        <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-600 mb-1">宿泊費</p>
          <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.accommodation.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">
            {formData.accommodationRequired ? `${formData.accommodationType}` : '宿泊なし'}
          </p>
        </div>
        <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-600 mb-1">食事代</p>
          <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.meals.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">1日2,000円</p>
        </div>
        <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-600 mb-1">雑費</p>
          <p className="text-2xl font-bold text-slate-800">¥{formData.estimatedExpenses.miscellaneous.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">1日500円</p>
        </div>
        <div className="bg-gradient-to-r from-navy-600 to-navy-800 rounded-lg p-4 text-white">
          <p className="text-sm text-navy-100 mb-1">合計予定額</p>
          <p className="text-2xl font-bold">¥{formData.estimatedExpenses.total.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          備考・特記事項
        </label>
        <textarea
          value={formData.remarks}
          onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
          className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent backdrop-blur-xl"
          placeholder="特別な事情や注意事項があれば記載してください"
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        <Upload className="w-5 h-5 inline mr-2" />
        添付ファイル
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
        <p className="text-slate-600 mb-2">関連資料をドラッグ&ドロップするか、クリックして選択</p>
        <p className="text-slate-500 text-sm mb-4">
          見積書、地図、会議資料など（PDF, Word, Excel, 画像ファイル対応）
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
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
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">添付ファイル:</p>
          {formData.attachments.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">{file.name}</span>
                <span className="text-xs text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50/30 transition-colors"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 申請内容確認 */}
      <div className="bg-white/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">申請内容確認</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">申請者</p>
            <p className="font-medium text-slate-800">{formData.applicantName} ({formData.position})</p>
          </div>
          <div>
            <p className="text-slate-600">所属部署</p>
            <p className="font-medium text-slate-800">{formData.department}</p>
          </div>
          <div>
            <p className="text-slate-600">出張期間</p>
            <p className="font-medium text-slate-800">
              {formData.startDate} ～ {formData.endDate}
            </p>
          </div>
          <div>
            <p className="text-slate-600">出張先</p>
            <p className="font-medium text-slate-800">{formData.destination}</p>
          </div>
          <div>
            <p className="text-slate-600">交通手段</p>
            <p className="font-medium text-slate-800">{formData.transportationMethod}</p>
          </div>
          <div>
            <p className="text-slate-600">宿泊</p>
            <p className="font-medium text-slate-800">
              {formData.accommodationRequired ? `あり (${formData.accommodationType})` : 'なし'}
            </p>
          </div>
          <div>
            <p className="text-slate-600">承認者</p>
            <p className="font-medium text-slate-800">{formData.approver}</p>
          </div>
          <div>
            <p className="text-slate-600">予定経費合計</p>
            <p className="font-bold text-slate-800 text-lg">¥{formData.estimatedExpenses.total.toLocaleString()}</p>
          </div>
        </div>
        
        {formData.purpose && (
          <div className="mt-4">
            <p className="text-slate-600 text-sm">出張目的</p>
            <p className="text-slate-800 bg-white/20 rounded-lg p-3 mt-1">{formData.purpose}</p>
          </div>
        )}
      </div>
    </div>
  );

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.applicantName && formData.department && formData.position && formData.approver;
      case 2:
        return formData.purpose && formData.destination && formData.startDate && formData.endDate;
      case 3:
        return true; // 交通・宿泊情報は任意項目が多いため
      case 4:
        return true; // 添付ファイルは任意
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="business-trip" />
        </div>

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

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>戻る</span>
                  </button>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">出張申請</h1>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>ステップ {currentStep}/4</span>
                </div>
              </div>

              {/* 進捗ゲージ */}
              <div className="w-full bg-white/30 rounded-full h-2 backdrop-blur-sm mb-8">
                <div 
                  className="bg-gradient-to-r from-navy-600 to-navy-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ステップコンテンツ */}
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                </div>

                {/* ナビゲーションボタン */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      currentStep === 1
                        ? 'bg-white/30 text-slate-400 cursor-not-allowed'
                        : 'bg-white/50 hover:bg-white/70 text-slate-700 backdrop-blur-sm'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>前へ</span>
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isStepValid()
                          ? 'bg-gradient-to-r from-navy-700 to-navy-900 hover:from-navy-800 hover:to-navy-950 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                          : 'bg-white/30 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>次へ</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isStepValid()
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                          : 'bg-white/30 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Save className="w-5 h-5" />
                      <span>申請を送信</span>
                    </button>
                  )}
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