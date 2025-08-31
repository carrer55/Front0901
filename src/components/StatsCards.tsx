import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatsCards() {
  // 今月の精算合計データ（サンプル）
  const currentMonthTotal = 285000;
  const previousMonthTotal = 245000;
  const applicationCount = 8; // 今月の申請件数
  
  // 前月比計算
  const difference = currentMonthTotal - previousMonthTotal;
  const percentageChange = ((difference / previousMonthTotal) * 100).toFixed(1);
  const isIncrease = difference > 0;

  return (
    <div className="mb-6 lg:mb-8">
      <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 lg:p-8 border border-white/30 shadow-xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 group relative overflow-hidden">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/20 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-700 text-lg font-semibold">今月の精算合計</h3>
            <div className="flex items-center space-x-2">
              {isIncrease ? (
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isIncrease ? 'text-emerald-600' : 'text-red-500'}`}>
                {isIncrease ? '+' : ''}{percentageChange}%
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              ¥{currentMonthTotal.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">
              前月: ¥{previousMonthTotal.toLocaleString()} 
              <span className={`ml-2 ${isIncrease ? 'text-emerald-600' : 'text-red-500'}`}>
                ({isIncrease ? '+' : ''}¥{Math.abs(difference).toLocaleString()})
              </span>
            </p>
          </div>

          {/* 申請件数ゲージ */}
          <div className="bg-white/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">今月の申請件数</span>
              <span className="text-xl font-bold text-slate-800">{applicationCount}件</span>
            </div>
            
            {/* 棒グラフゲージ */}
            <div className="flex items-end space-x-1 h-12">
              {Array.from({ length: Math.max(applicationCount, 10) }, (_, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-sm transition-all duration-300 ${
                    index < applicationCount
                      ? 'bg-gradient-to-t from-navy-600 to-navy-800 group-hover:from-navy-700 group-hover:to-navy-900'
                      : 'bg-slate-200/50'
                  }`}
                  style={{ 
                    height: index < applicationCount ? `${Math.min(100, (index + 1) * 10)}%` : '10%',
                    maxHeight: '48px'
                  }}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>0件</span>
              <span>10件+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;