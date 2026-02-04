import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldAlert, Sparkles } from "lucide-react";
import { ScannerInput } from "@/components/ScannerInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-sm sticky top-0 z-50 bg-white/70 border-b border-slate-200/50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-900">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <span>CleanCheck</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <Link href="#features" className="hover:text-emerald-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link>
          <Link href="#about" className="hover:text-emerald-600 transition-colors">About</Link>
        </div>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-100 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <CheckCircle className="w-3 h-3" />
          <span>Science-Backed Analysis</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto">
          Analyze Shampoo Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Instantly</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Don't guess with your health. Paste your product's ingredient list and uncover the hidden truths about what you put on your body.
        </p>

        <div className="w-full flex justify-center pb-12">
          <ScannerInput />
        </div>

      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
        <p>© 2026 CleanCheck. Promoting Transparency in Personal Care.</p>
      </footer>
    </main>
  );
}
