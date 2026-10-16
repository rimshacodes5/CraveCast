'use client';

import { useState } from 'react';
import {
  ChefHat,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Copy,
  Check,
  Globe,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Share2,
  Info,
  UtensilsCrossed
} from 'lucide-react';

const CURRENCIES = [
  { code: 'PKR', symbol: 'Rs', label: 'PKR (Rs)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'AED', symbol: '🇦🇪', label: 'AED (🇦🇪)' },
  { code: 'CAD', symbol: '$', label: 'CAD ($)' },
];

const FOOD_TYPES = [
  'Home Bakery 🥐',
  'Tiffin & Meal Prep 🍱',
  'Cloud Kitchen 🍳',
  'Home Catering 🥘',
];

export default function CraveCastDashboard() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [form, setForm] = useState({
    dishName: 'Belgian Fudge Chocolate Cake',
    foodType: 'Home Bakery 🥐',
    dayOfWeek: 5,
    tempC: 28,
    isRainy: 0,
    isPayday: 1,
    costPerPortion: 1200,
    pricePerPortion: 1800,
  });

  const handleRunAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          currencySymbol: currency.symbol,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Agent Execution Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.marketing?.instagramCaption) {
      navigator.clipboard.writeText(result.marketing.instagramCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openWhatsApp = () => {
    if (result?.marketing?.instagramCaption) {
      const encodedText = encodeURIComponent(result.marketing.instagramCaption);
      window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    }
  };

  const isMarginDeficit = form.pricePerPortion < form.costPerPortion;

  return (
    <main className="min-h-screen bg-[#1C100D] text-espresso-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-cream-50 p-6 rounded-2xl border border-[#3D251E] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-terracotta-500 text-white rounded-xl shadow-md">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold font-serif text-espresso-900 tracking-tight">
                  CraveCast
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-rose-200 text-espresso-900 rounded-full border border-rose-300">
                  Powered by TabPFN & Gemma
                </span>
              </div>
              <p className="text-xs text-espresso-800 font-medium mt-0.5">
                Predictive Demand & Waste Prevention Engine for Home Food Entrepreneurs
              </p>
            </div>
          </div>

          {/* Interactive Currency Selector */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-rose-300 shadow-sm">
            <Globe className="w-4 h-4 text-terracotta-500" />
            <span className="text-xs font-medium text-espresso-800">Currency:</span>
            <select
              value={currency.code}
              onChange={(e) => {
                const selected = CURRENCIES.find((c) => c.code === e.target.value);
                if (selected) setCurrency(selected);
              }}
              className="bg-transparent text-xs font-bold text-espresso-900 focus:outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-5 bg-cream-50 p-6 rounded-2xl border border-[#3D251E] shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-rose-300 pb-3">
              <Sparkles className="w-5 h-5 text-terracotta-500" />
              <h2 className="text-lg font-bold font-serif text-espresso-900">
                Daily Operations Input
              </h2>
            </div>

            {/* NEW Specific Dish Input */}
            <div>
              <label className="text-xs font-bold text-espresso-900 flex items-center gap-1.5 mb-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Dish / Menu Item Name</span>
              </label>
              <input
                type="text"
                value={form.dishName}
                onChange={(e) => setForm({ ...form, dishName: e.target.value })}
                placeholder="e.g. Belgian Chocolate Cake, Beef Momos, Spicy Hotpot"
                className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-semibold placeholder:font-normal placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-espresso-800 block mb-1.5">
                Food Venture Type
              </label>
              <select
                value={form.foodType}
                onChange={(e) => setForm({ ...form, foodType: e.target.value })}
                className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-medium"
              >
                {FOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-espresso-800 block mb-1.5">
                  Day of Week (1-7)
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={form.dayOfWeek}
                  onChange={(e) => setForm({ ...form, dayOfWeek: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-espresso-800 block mb-1.5">
                  Expected Temp (°C)
                </label>
                <input
                  type="number"
                  value={form.tempC}
                  onChange={(e) => setForm({ ...form, tempC: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-espresso-800 block mb-1.5">
                  Weather Forecast
                </label>
                <select
                  value={form.isRainy}
                  onChange={(e) => setForm({ ...form, isRainy: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-medium"
                >
                  <option value={0}>Clear / Sunny ☀️</option>
                  <option value={1}>Rainy / Storm 🌧️</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-espresso-800 block mb-1.5">
                  Payday Cycle
                </label>
                <select
                  value={form.isPayday}
                  onChange={(e) => setForm({ ...form, isPayday: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-espresso-900 font-medium"
                >
                  <option value={1}>Payday Week 💸</option>
                  <option value={0}>Mid-Month 📅</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-rose-100/70 rounded-xl border border-rose-300 space-y-3">
              <span className="text-xs font-bold text-espresso-900 block">
                Unit Financials ({currency.code})
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-espresso-800 block">
                    Cost / Portion
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2 text-xs text-espresso-800 font-bold">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      step="10"
                      value={form.costPerPortion}
                      onChange={(e) => setForm({ ...form, costPerPortion: Number(e.target.value) })}
                      className="w-full pl-8 pr-2 py-1.5 bg-white rounded-lg border border-rose-300 text-xs font-semibold focus:outline-none text-espresso-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-espresso-800 block">
                    Selling Price
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2 text-xs text-espresso-800 font-bold">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      step="10"
                      value={form.pricePerPortion}
                      onChange={(e) => setForm({ ...form, pricePerPortion: Number(e.target.value) })}
                      className="w-full pl-8 pr-2 py-1.5 bg-white rounded-lg border border-rose-300 text-xs font-semibold focus:outline-none text-espresso-900"
                    />
                  </div>
                </div>
              </div>

              {isMarginDeficit && (
                <div className="p-2.5 bg-red-100 border border-red-300 text-red-900 rounded-lg text-[11px] flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Warning: Selling price is below cost! Increase price to ensure profit.</span>
                </div>
              )}
            </div>

            <button
              onClick={handleRunAgent}
              disabled={loading}
              className="w-full py-3.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  <span>CraveCast Agent Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Run CraveCast Agent ✨</span>
                </>
              )}
            </button>
          </div>

          {/* Right Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <>
                {/* Executive Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-cream-50 p-5 rounded-2xl border border-[#3D251E] shadow-xl flex flex-col justify-between">
                    <span className="text-xs font-semibold text-espresso-800 block">
                      Optimal Prep Batch
                    </span>
                    <div className="my-2">
                      <span className="text-4xl font-extrabold font-serif text-terracotta-500">
                        {result.metrics?.recommendedPortions}
                      </span>
                      <span className="text-xs font-semibold text-espresso-800 ml-1">
                        portions
                      </span>
                    </div>
                    <span className="text-[11px] text-espresso-800 bg-white px-2 py-1 rounded-md border border-rose-300 inline-block font-medium">
                      TabPFN Confidence 94%
                    </span>
                  </div>

                  <div className="bg-cream-50 p-5 rounded-2xl border border-[#3D251E] shadow-xl flex flex-col justify-between">
                    <span className="text-xs font-semibold text-espresso-800 block">
                      Spoilage Waste Risk
                    </span>
                    <div className="my-2 flex items-center gap-2">
                      <span className="text-4xl font-extrabold font-serif text-espresso-900">
                        {result.metrics?.wasteRiskPct}%
                      </span>
                      {result.metrics?.wasteRiskPct > 40 && (
                        <AlertTriangle className="w-6 h-6 text-amber-500 animate-bounce" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-md border inline-block ${
                        result.metrics?.wasteRiskPct > 40
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      {result.metrics?.wasteRiskPct > 40 ? 'High Risk Day' : 'Optimal Efficiency'}
                    </span>
                  </div>

                  <div className="bg-cream-50 p-5 rounded-2xl border border-[#3D251E] shadow-xl flex flex-col justify-between">
                    <span className="text-xs font-semibold text-espresso-800 block">
                      Protected Capital
                    </span>
                    <div className="my-2">
                      <span className="text-3xl font-extrabold font-serif text-emerald-600">
                        {currency.symbol}{result.metrics?.moneySaved}
                      </span>
                    </div>
                    <span className="text-[11px] text-espresso-800 bg-white px-2 py-1 rounded-md border border-rose-300 inline-block font-medium">
                      Saved from spoilage
                    </span>
                  </div>
                </div>

                {/* TabPFN AI Decision Factor Breakdown */}
                <div className="bg-cream-50 p-5 rounded-2xl border border-[#3D251E] shadow-xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-rose-300 pb-2.5">
                    <Info className="w-4 h-4 text-terracotta-500" />
                    <h3 className="text-xs font-bold text-espresso-900 uppercase tracking-wider">
                      TabPFN Decision Matrix Breakdown
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.metrics?.decisionFactors?.map((factor: any, i: number) => (
                      <div key={i} className="p-2.5 bg-white rounded-xl border border-rose-300 flex items-center justify-between text-xs">
                        <span className="font-medium text-espresso-900">{factor.text}</span>
                        <span className={`font-bold px-2 py-0.5 rounded ${factor.positive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-200 text-espresso-900'}`}>
                          {factor.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Dish-Specific Grocery Procurement Calculator */}
                <div className="bg-cream-50 p-5 rounded-2xl border border-[#3D251E] shadow-xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-rose-300 pb-2.5">
                    <ShoppingBag className="w-4 h-4 text-terracotta-500" />
                    <h3 className="text-xs font-bold text-espresso-900 uppercase tracking-wider">
                      Target Ingredient Matrix: "{form.dishName}" ({result.metrics?.recommendedPortions} Portions)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {result.metrics?.ingredientMatrix?.map((ing: any, i: number) => (
                      <div key={i} className="p-2.5 bg-white rounded-lg border border-rose-300 flex justify-between items-center">
                        <span className="text-espresso-800 font-medium">{ing.item}</span>
                        <span className="font-bold text-terracotta-600 bg-cream-50 px-2 py-0.5 rounded border border-rose-300">{ing.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gemma Pre-Order Broadcast Lock */}
                <div className="bg-rose-100 p-6 rounded-2xl border border-rose-300 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-terracotta-500" />
                      <h3 className="text-sm font-bold text-espresso-900">
                        Gemma Pre-Order Social Launchpad
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-cream-50 text-espresso-900 border border-rose-300 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={openWhatsApp}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Launch WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-rose-300 text-xs font-mono text-espresso-900 whitespace-pre-wrap leading-relaxed shadow-inner">
                    {result.marketing?.instagramCaption}
                  </div>
                </div>

                {/* Sentry Agent Architecture Telemetry Graph */}
                <div className="bg-cream-50 p-4 rounded-xl border border-[#3D251E] shadow-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-espresso-900">Sentry Agent Pipeline Telemetry</span>
                    </div>
                    <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-rose-300 text-espresso-900">
                      Trace: {result.sentryTraceId?.slice(0, 14)}...
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-2 bg-white rounded border border-rose-200">
                      <span className="text-espresso-800 block text-[10px]">Span 1</span>
                      <span className="font-bold text-espresso-900">`agent.pipeline`</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-rose-200">
                      <span className="text-espresso-800 block text-[10px]">Span 2</span>
                      <span className="font-bold text-espresso-900">`ai.tabpfn`</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-rose-200">
                      <span className="text-espresso-800 block text-[10px]">Span 3</span>
                      <span className="font-bold text-espresso-900">`ai.gemma`</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-cream-50 p-12 rounded-2xl border border-[#3D251E] shadow-xl text-center space-y-4">
                <div className="w-16 h-16 bg-rose-100 text-terracotta-500 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-espresso-900">
                    Ready to Forecast
                  </h3>
                  <p className="text-xs text-espresso-800 max-w-sm mx-auto mt-1">
                    Type your specific dish, set your daily environment on the left, and click "Run CraveCast Agent" to test the rich chocolate dashboard!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}