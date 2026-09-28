import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Brain,
  FileBadge
} from 'lucide-react';

interface CampusCourse {
  id: string;
  title: string;
  category: string;
  level: string;
  progress: number;
  instructor: string;
  lessons: number;
}

const enrolledCourses: CampusCourse[] = [
  {
    id: 'c1',
    title: 'Distributed Systems & Sovereign Cloud Architecture',
    category: 'Cloud Engineering',
    level: 'Advanced',
    progress: 78,
    instructor: 'Dr. Kwame Mensah',
    lessons: 16
  },
  {
    id: 'c2',
    title: 'Pan-African Fintech Ecosystems & Regulatory Sandboxes',
    category: 'Fintech & Law',
    level: 'Intermediate',
    progress: 42,
    instructor: 'Amina Diallo, LL.M',
    lessons: 12
  },
  {
    id: 'c3',
    title: 'Generative Neural Models & Modern Agentic Orchestration',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    progress: 90,
    instructor: 'Emmanuel Nayituriki',
    lessons: 20
  }
];

export const NexusCampusApp: React.FC = () => {
  const { askNexusAI } = useNexus();
  const [selectedCourse, setSelectedCourse] = useState<CampusCourse>(enrolledCourses[0]);
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorResponse, setTutorResponse] = useState<string | null>(null);
  const [isAskingTutor, setIsAskingTutor] = useState(false);

  // Interactive Quiz State
  const [quizState, setQuizState] = useState<{
    active: boolean;
    question: string;
    options: string[];
    correct: number;
    selected: number | null;
  }>({
    active: false,
    question: 'In a sovereign edge architecture, what is the primary role of a local read-replica node located in Kigali (af-south-1)?',
    options: [
      'To eliminate all data encryption requirements',
      'To provide single-digit millisecond query latency and comply with local data sovereignty laws',
      'To bypass global network routing entirely without SSL',
      'To replace relational ACID transactions with plain text files'
    ],
    correct: 1,
    selected: null
  });

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuestion.trim()) return;
    setIsAskingTutor(true);
    setTutorResponse(null);
    try {
      const res = await askNexusAI(
        `Act as an encouraging and brilliant Nexus Campus AI Professor in ${selectedCourse.category}. Explain this concept to a student: "${tutorQuestion}". Provide a concrete real-world analogy and 1 quiz question to test their comprehension.`,
        'education'
      );
      setTutorResponse(res);
    } catch {
      setTutorResponse('Campus AI is ready. Please retry your inquiry.');
    } finally {
      setIsAskingTutor(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-orange-950/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS CAMPUS LEARNING ECOSYSTEM</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Personalized AI Tutors
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Interactive university-grade masterclasses, real-time AI tutoring, and cryptographic skill certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>3 Verified Micro-Degrees</span>
          </div>
        </div>
      </div>

      {/* Grid: Courses & AI Tutor */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left: Enrolled Courses & Degree Track (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-4 flex flex-col overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Active Curriculum
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Learning Velocity: Top 5%</span>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map(course => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCourse.id === course.id
                    ? 'bg-amber-500/15 border-amber-500/40 text-white'
                    : 'bg-slate-900/50 border-white/5 hover:bg-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-white leading-snug">{course.title}</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0 ml-2">
                    {course.level}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 mb-2">
                  <span>Instructor: {course.instructor}</span>
                  <span>·</span>
                  <span>{course.lessons} Modules</span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Progress</span>
                    <span className="text-amber-300 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Knowledge Check / Quiz */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Adaptive Knowledge Check
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">+50 XP</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {quizState.question}
            </p>

            <div className="space-y-1.5">
              {quizState.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizState({ ...quizState, selected: idx })}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors border cursor-pointer ${
                    quizState.selected === idx
                      ? idx === quizState.correct
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                      : 'bg-black/30 border-white/5 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizState.selected !== null && (
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {quizState.selected === quizState.correct
                  ? 'Correct! Local edge replicas ensure sovereign residency compliance.'
                  : 'Review Module 4: Sovereign Cloud Architecture.'}
              </div>
            )}
          </div>
        </div>

        {/* Right: Personal AI Tutor Interaction (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">NEXUS AI TUTOR · {selectedCourse.title}</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">Gemini 3.8 Flash Educational Tuning</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300 leading-relaxed">
                Hello Emmanuel! I am your AI Professor for <strong>{selectedCourse.title}</strong>. Ask me to break down mathematical formulas, review architecture patterns, or test you on edge failovers.
              </div>

              {tutorResponse && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {tutorResponse}
                </div>
              )}

              {isAskingTutor && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-amber-300 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span>AI Professor is constructing personalized lesson response...</span>
                </div>
              )}
            </div>
          </div>

          {/* Ask Tutor Form */}
          <form onSubmit={handleAskTutor} className="pt-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={tutorQuestion}
              onChange={(e) => setTutorQuestion(e.target.value)}
              placeholder="Ask your AI tutor a question or request a concept walkthrough..."
              className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              disabled={isAskingTutor}
            />
            <button
              type="submit"
              disabled={isAskingTutor || !tutorQuestion.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Tutor</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
