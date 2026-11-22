'use client';

import React, { useState } from 'react';
import { Calculator, IndianRupee, Percent, Calendar } from 'lucide-react';

interface EMICalculatorProps {
  initialPrice?: number;
}

export default function EMICalculator({ initialPrice }: EMICalculatorProps) {
  // Default values
  const [propertyPrice, setPropertyPrice] = useState(initialPrice || 50000000); // 5 Cr default
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const loanAmount = propertyPrice * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  // Monthly EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
  const emi =
    loanAmount > 0 && monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-navy-950">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-gray-900">Home Loan EMI Calculator</h3>
          <p className="text-xs text-gray-500">Calculate estimated monthly mortgage installments &amp; interest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Input */}
        <div className="space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-gold-500" /> Property Value
              </label>
              <span className="text-sm font-bold text-navy-900">{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={10000000}
              max={250000000}
              step={1000000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>₹1.00 Cr</span>
              <span>₹25.00 Cr</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-gold-500" /> Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-navy-900">
                {formatCurrency((propertyPrice * downPaymentPercent) / 100)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>10%</span>
              <span>80%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-500" /> Loan Tenure
              </label>
              <span className="text-sm font-bold text-navy-900">{loanTenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={loanTenureYears}
              onChange={(e) => setLoanTenureYears(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-gold-500" /> Expected Interest Rate
              </label>
              <span className="text-sm font-bold text-navy-900">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={14.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>7.0%</span>
              <span>14.0%</span>
            </div>
          </div>
        </div>

        {/* EMI Summary Card */}
        <div className="bg-[#080E1A] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Estimated Monthly Outflow</span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              ₹{emi.toLocaleString('en-IN')}
              <span className="text-xs text-gray-400 font-sans font-normal ml-1">/ month</span>
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-white/10 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Principal Loan Amount:</span>
                <span className="font-semibold text-gray-200">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Interest Payable:</span>
                <span className="font-semibold text-gold-300">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-gray-300 font-medium">Total Amount Payable:</span>
                <span className="font-bold text-white">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <a
              href="https://wa.me/917676290057?text=Hello%20Home%20Circle%20Realty,%20I%20would%20like%20assistance%20with%20home%20loan%20approvals%20from%20top%20banks."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider text-center block hover:brightness-105 transition"
            >
              Get Bank Loan Pre-Approval
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
