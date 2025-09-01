import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  FileText, 
  Calculator,
  Sparkles,
  Play,
  ChevronDown,
  Menu,
  X,
  Globe,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'OCR自動読み取り',
      description: '領収書をスマホで撮影するだけで、店舗名・日付・金額を自動で読み取り。手入力の手間を大幅削減。',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Calculator,
      title: '自動計算エンジン',
      description: '出張期間や役職に応じて日当・交通費・宿泊費を自動計算。計算ミスを防ぎ、業務効率を向上。',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      icon: FileText,
      title: '規程自動生成',
      description: '法令に準拠した出張旅費規程をガイドに従って作成。Word・PDF形式での出力も可能。',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: '節税シミュレーション',
      description: '出張日当制度導入による節税効果を詳細にシミュレーション。年間数十万円の節税も可能。',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Shield,
      title: 'セキュア承認フロー',
      description: '多段階承認ワークフローとリマインド機能で、確実で透明性の高い承認プロセスを実現。',
      gradient: 'from-red-400 to-rose-500'
    },
    {
      icon: BarChart3,
      title: 'リアルタイム分析',
      description: '出張費用の傾向分析、部門別レポート、予算管理など、経営判断に役立つ分析機能。',
      gradient: 'from-indigo-400 to-blue-500'
    }
  ];

  const testimonials = [
    {
      name: '田中 太郎',
      position: '代表取締役',
      company: '株式会社テックイノベーション',
      content: '導入後、経理業務の効率が3倍向上しました。特にOCR機能は革命的で、領収書の手入力作業がほぼゼロになりました。',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '佐藤 花子',
      position: '経理部長',
      company: '株式会社グローバルソリューションズ',
      content: '節税シミュレーション機能で年間200万円の節税効果を確認できました。規程作成も簡単で、法令遵守も安心です。',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '鈴木 次郎',
      position: 'CFO',
      company: '株式会社フューチャーテック',
      content: 'ペーパーレス化が完全に実現し、承認プロセスも透明化されました。従業員の満足度も大幅に向上しています。',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '¥0',
      period: '/月',
      description: 'スタートアップや小規模チーム向け',
      features: [
        'ユーザー数：1名まで',
        '出張旅費規程の自動生成',
        '節税シミュレーション',
        '基本的な申請・承認機能',
        'メールサポート'
      ],
      buttonText: '無料で始める',
      buttonStyle: 'bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900',
      popular: false
    },
    {
      name: 'Pro',
      price: '¥9,800',
      period: '/月',
      description: '成長企業向けの完全機能',
      features: [
        'ユーザー数：3名まで',
        '全機能利用可能',
        'OCR自動読み取り',
        'ワンタイム承認',
        'IPFS保存（証憑の改ざん防止）',
        'API連携',
        'チャットサポート'
      ],
      buttonText: '14日間無料トライアル',
      buttonStyle: 'bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '¥15,800',
      period: '/月',
      description: '大企業向けエンタープライズ',
      features: [
        'ユーザー数：無制限',
        'Pro機能すべて',
        '組織細分化（部署・拠点ごとの管理）',
        '第二管理者設定',
        '承認フロー自由設定',
        'カスタム統合',
        '専任サポート'
      ],
      buttonText: 'お問い合わせ',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900',
      popular: false
    }
  ];

  const stats = [
    { number: '10,000+', label: '導入企業数', icon: Users },
    { number: '99.9%', label: 'アップタイム', icon: Shield },
    { number: '3倍', label: '業務効率向上', icon: TrendingUp },
    { number: '200万円', label: '平均年間節税額', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-indigo-600/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
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
            <div className="flex items-center space-x-4">
              <img 
                src="/賢者の精算Logo2_Transparent_NoBuffer copy.png" 
                alt="賢者の精算ロゴ" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">機能</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors font-medium">料金</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors font-medium">導入事例</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors font-medium">お問い合わせ</a>
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-3 bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                ログイン
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-slate-900/95 border-b border-white/20">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white transition-colors font-medium py-2">機能</a>
              <a href="#pricing" className="block text-white/80 hover:text-white transition-colors font-medium py-2">料金</a>
              <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors font-medium py-2">導入事例</a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors font-medium py-2">お問い合わせ</a>
              <button
                onClick={() => onNavigate('login')}
                className="w-full px-6 py-3 bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white rounded-full font-semibold shadow-xl transition-all duration-300"
              >
                ログイン
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-400/30 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">AI搭載の次世代精算システム</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                賢者の精算
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              出張旅費・経費精算を革新する、AI搭載のオールインワンソリューション。
              <br className="hidden md:block" />
              OCR自動読み取り、節税シミュレーション、法令準拠の規程作成で、
              <br className="hidden md:block" />
              <span className="text-emerald-300 font-semibold">年間200万円の節税効果</span>を実現。
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => onNavigate('register')}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <span>14日間無料トライアル</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <span>デモを見る</span>
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>クレジットカード不要</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>即日利用開始</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>専任サポート付き</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                革新的な機能
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              最新のAI技術と直感的なUXで、従来の精算業務を根本から変革します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                実際の画面を体験
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              直感的なインターフェースと強力な機能を、今すぐお試しください
            </p>
            
            <button
              onClick={() => onNavigate('login')}
              className="group px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-4 mx-auto"
            >
              <span>デモアカウントでログイン</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              デモアカウント: <code className="bg-white/10 px-2 py-1 rounded">demo</code> / <code className="bg-white/10 px-2 py-1 rounded">pass9981</code>
            </p>
          </div>

          {/* Screenshot/Demo Area */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">インタラクティブデモ</h3>
                  <p className="text-white/70 mb-6">実際の操作感を体験できます</p>
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full font-semibold shadow-xl transition-all duration-300"
                  >
                    今すぐ体験する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                お客様の声
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              10,000社以上の企業が賢者の精算で業務効率化を実現しています
            </p>
          </div>

          <div className="relative">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover shadow-2xl ring-4 ring-white/20"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  
                  <div>
                    <div className="text-lg font-bold text-white">{testimonials[activeTestimonial].name}</div>
                    <div className="text-emerald-300 font-medium">{testimonials[activeTestimonial].position}</div>
                    <div className="text-white/60">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-emerald-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                シンプルな料金体系
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              企業規模に応じた最適なプランをご用意。すべてのプランで14日間の無料トライアルが可能です
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 transform hover:scale-105 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-navy-500/30 to-purple-500/30 border-navy-400/50 shadow-2xl shadow-navy-500/25' 
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-navy-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
                      最人気
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/70 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('register')}
                  className={`w-full px-6 py-4 ${plan.buttonStyle} text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-white/60 mb-4">すべてのプランに含まれる基本機能</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              <span>• SSL暗号化通信</span>
              <span>• 自動バックアップ</span>
              <span>• 24時間監視</span>
              <span>• 法令準拠サポート</span>
              <span>• モバイル対応</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl p-12 md:p-16 border border-emerald-400/30 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              今すぐ始めて、
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                業務効率を3倍に
              </span>
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              14日間の無料トライアルで、賢者の精算の威力を実感してください。
              クレジットカードの登録は不要です。
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>無料トライアルを開始</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-3">
                <span>資料をダウンロード</span>
                <FileText className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>ISO27001認証取得</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span>99.9%稼働率保証</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>24時間サポート</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <img 
                src="/賢者の精算Logo2_Transparent_NoBuffer copy.png" 
                alt="賢者の精算ロゴ" 
                className="h-16 w-auto object-contain mb-6"
              />
              <p className="text-white/70 mb-6 max-w-md">
                出張旅費・経費精算の革新的なソリューション。
                AI技術で業務効率化と節税効果を同時に実現します。
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">製品</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">料金プラン</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API ドキュメント</a></li>
                <li><a href="#" className="hover:text-white transition-colors">セキュリティ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">サポート</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors">導入支援</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">システム状況</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">会社情報</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition-colors">採用情報</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-16 pt-8 text-center">
            <p className="text-white/60">
              © 2025 賢者の精算. All rights reserved. | 
              <span className="ml-2">Powered by AI & Innovation</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}
    </div>
  );
}

export default LandingPage;