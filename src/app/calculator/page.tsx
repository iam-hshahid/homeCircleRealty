import React from 'react';
import EMICalculator from '@/components/EMICalculator';
import { Calculator, ShieldCheck, IndianRupee, HelpCircle } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            <span>Financial Planning</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900">
            Real Estate Mortgage &amp; Loan Calculator
          </h1>
          <p className="text-sm text-gray-600">
            Plan your luxury property investment with precision. Compute estimated monthly EMIs, total interest payments, and down payment requirements for Bangalore residences.
          </p>
        </div>

        <EMICalculator initialPrice={65000000} />

        {/* Advisory Notes */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg font-bold font-serif text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            <span>Home Circle Realty Bank Tie-ups &amp; Loan Assistance</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Our dedicated in-house banking desk works directly with India&apos;s leading financial institutions including HDFC Bank, ICICI Bank, State Bank of India (SBI), Axis Bank, and Kotak Mahindra Bank to negotiate preferential interest rates, fast-track approvals, and waive processing fees for our luxury clients.
          </p>
        </div>
      </div>
    </div>
  );
}
