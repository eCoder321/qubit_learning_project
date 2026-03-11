import React from 'react';
import { TOPICS } from '../constants';
import { Topic } from '../types';
import { Binary, Activity, Layers, Link, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onSelectTopic: (topicId: string) => void;
}

const IconMap: Record<string, any> = {
  Binary,
  Activity,
  Layers,
  Link
};

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTopic }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-24 pb-16 px-6 border-b border-slate-800/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} />
              Learning Journey
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            Quantum <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Learning Journey
            </span>
          </h1>
          
          <p className="max-w-xl text-slate-400 text-lg leading-relaxed mb-10">
            An interactive exploration of quantum mechanics. From the basic qubit to the complexities of entanglement, documented one step at a time.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Join <span className="text-slate-200">1,240+</span> students <br />on the same path
            </div>
          </div>
        </div>
      </header>

      {/* Topics Grid */}
      <main className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-sky-400" />
            Curriculum
          </h2>
          <div className="flex gap-2">
            {['All', 'Basics', 'Gates', 'Advanced'].map((filter) => (
              <button key={filter} className="px-4 py-1.5 rounded-full text-xs font-medium border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all text-slate-400 hover:text-slate-200">
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic) => {
            const Icon = IconMap[topic.icon] || Binary;
            const isAvailable = topic.status === 'available';

            return (
              <div 
                key={topic.id}
                onClick={() => isAvailable && onSelectTopic(topic.id)}
                className={`group relative p-8 rounded-3xl border transition-all duration-500 ${
                  isAvailable 
                    ? 'bg-slate-900/40 border-slate-800 hover:border-sky-500/50 cursor-pointer hover:shadow-[0_0_40px_-15px_rgba(14,165,233,0.15)]' 
                    : 'bg-slate-950/20 border-slate-900 opacity-60 grayscale'
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                    isAvailable 
                      ? 'bg-sky-500/10 border-sky-500/20 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/20' 
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                    topic.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                    topic.difficulty === 'Intermediate' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                    'text-rose-400 border-rose-400/20 bg-rose-400/5'
                  }`}>
                    {topic.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {topic.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                    {topic.category}
                  </span>
                  {isAvailable ? (
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      Explore Module <ArrowRight size={14} />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-600 font-bold italic">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center border border-sky-500/30">
              <Binary className="text-sky-400" size={16} />
            </div>
            <span className="font-bold text-white tracking-tight">Quantum Journey</span>
          </div>
          <p className="text-slate-500 text-xs">
            © 2026 Quantum Learning Journey. Built for the curious.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
