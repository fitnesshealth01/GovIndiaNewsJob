import React, { useState, useEffect } from 'react';
import { OFFICIAL_PYQ_QUESTIONS, PYQQuestion } from '../data/gazetteData';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Award,
  AlertTriangle,
  FileText,
  User,
  Check,
  X,
  Eye,
  HelpCircle,
} from 'lucide-react';

interface MockTestEngineProps {
  onClose?: () => void;
}

type QuestionStatus = 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked';

export const MockTestEngine: React.FC<MockTestEngineProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({ 0: true });

  // 15-minute test countdown (900 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('All');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');
  const [isPaletteVisibleMobile, setIsPaletteVisibleMobile] = useState<boolean>(false);

  const questions: PYQQuestion[] = OFFICIAL_PYQ_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isSubmitted]);

  // Mark question as visited when index changes
  useEffect(() => {
    setVisitedQuestions((prev) => ({ ...prev, [currentQuestionIndex]: true }));
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine individual question status
  const getQuestionStatus = (index: number): QuestionStatus => {
    const hasAnswer = selectedAnswers[index] !== undefined;
    const isMarked = !!markedQuestions[index];
    const isVisited = !!visitedQuestions[index];

    if (hasAnswer && isMarked) return 'answered-marked';
    if (isMarked) return 'marked';
    if (hasAnswer) return 'answered';
    if (isVisited) return 'not-answered';
    return 'not-visited';
  };

  // Counts for palette
  const statusCounts = questions.reduce(
    (acc, _, idx) => {
      const st = getQuestionStatus(idx);
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    },
    {
      answered: 0,
      'not-answered': 0,
      marked: 0,
      'answered-marked': 0,
      'not-visited': 0,
    } as Record<QuestionStatus, number>
  );

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleClearResponse = () => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionIndex];
      return copy;
    });
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    setMarkedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitTest = () => {
    setShowSubmitModal(false);
    setIsTimerRunning(false);
    setIsSubmitted(true);
  };

  const handleRestartTest = () => {
    setSelectedAnswers({});
    setMarkedQuestions({});
    setVisitedQuestions({ 0: true });
    setCurrentQuestionIndex(0);
    setTimeLeft(15 * 60);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setShowSubmitModal(false);
  };

  // Section list
  const sections = ['All', 'Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English Comprehension'];

  // Calculate results on submission
  const testResults = React.useMemo(() => {
    let totalMarksObtained = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q, idx) => {
      const answer = selectedAnswers[idx];
      if (answer === undefined) {
        unattemptedCount += 1;
      } else if (answer === q.correctAnswer) {
        correctCount += 1;
        totalMarksObtained += q.marks;
      } else {
        wrongCount += 1;
        totalMarksObtained -= q.negativeMarks;
      }
    });

    const maxMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const attemptedCount = correctCount + wrongCount;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const percentage = (totalMarksObtained / maxMarks) * 100;
    const timeSpentSeconds = 15 * 60 - timeLeft;

    return {
      totalMarksObtained: Math.max(0, Math.round(totalMarksObtained * 100) / 100),
      maxMarks,
      correctCount,
      wrongCount,
      unattemptedCount,
      attemptedCount,
      accuracy: Math.round(accuracy * 10) / 10,
      percentage: Math.max(0, Math.round(percentage * 10) / 10),
      timeSpentFormatted: formatTime(timeSpentSeconds),
    };
  }, [questions, selectedAnswers, timeLeft]);

  // If submitted, show comprehensive scorecard & analysis
  if (isSubmitted) {
    const filteredReviewQuestions = questions.filter((q, idx) => {
      const ans = selectedAnswers[idx];
      if (reviewFilter === 'correct') return ans === q.correctAnswer;
      if (reviewFilter === 'wrong') return ans !== undefined && ans !== q.correctAnswer;
      if (reviewFilter === 'unattempted') return ans === undefined;
      return true;
    });

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Scorecard Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                Official Examination Scorecard
              </span>
              <h2 className="text-2xl font-bold mt-1 text-white">
                Official Previous Year Questions (PYQ) CBT Test Series
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Completed on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · Time Spent: {testResults.timeSpentFormatted} · Authentic SSC/Railway Papers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRestartTest}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-Attempt Mock</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  Exit Simulator
                </button>
              )}
            </div>
          </div>

          {/* Metric Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Total Marks Scored</span>
              <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
                {testResults.totalMarksObtained}
                <span className="text-sm font-normal text-slate-400 ml-1">/ {testResults.maxMarks}</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Accuracy Rate</span>
              <div className="text-3xl font-extrabold text-blue-400 mt-1 tabular-nums">
                {testResults.accuracy}%
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Correct Answers</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                {testResults.correctCount}
                <span className="text-xs font-normal text-slate-400 ml-1">({testResults.correctCount * 2} marks)</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Negative Penalty</span>
              <div className="text-3xl font-extrabold text-rose-400 mt-1 tabular-nums">
                -{testResults.wrongCount * 0.5}
                <span className="text-xs font-normal text-slate-400 ml-1">({testResults.wrongCount} wrong)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Question Paper & Solution Key Review
              </h3>
              <p className="text-xs text-slate-500">
                Detailed step-by-step explanations verified from official SSC gazettes.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-md cursor-pointer ${
                  reviewFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-md cursor-pointer ${
                  reviewFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                Correct ({testResults.correctCount})
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1.5 rounded-md cursor-pointer ${
                  reviewFilter === 'wrong' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                Wrong ({testResults.wrongCount})
              </button>
              <button
                onClick={() => setReviewFilter('unattempted')}
                className={`px-3 py-1.5 rounded-md cursor-pointer ${
                  reviewFilter === 'unattempted' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                Skipped ({testResults.unattemptedCount})
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredReviewQuestions.map((q) => {
              const originalIndex = questions.findIndex((x) => x.id === q.id);
              const userAnswer = selectedAnswers[originalIndex];
              const isCorrect = userAnswer === q.correctAnswer;
              const isSkipped = userAnswer === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : isSkipped
                      ? 'border-slate-200 bg-slate-50/40'
                      : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>Question {q.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.section}</span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSkipped
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '+2.0 Marks (Correct)' : isSkipped ? '0.0 (Unattempted)' : '-0.50 Marks (Wrong)'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 whitespace-pre-line mb-4">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      const isOptionSelected = optIdx === userAnswer;

                      let optClass = 'border-slate-200 bg-white text-slate-700';
                      if (isOptionCorrect) {
                        optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optClass = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isOptionCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isOptionSelected && !isOptionCorrect && <X className="w-4 h-4 text-rose-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation */}
                  <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-800 leading-relaxed">
                    <span className="font-bold text-blue-900 block mb-1">Explanation:</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Test Exam Screen (TCS iON Pattern)
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
      {/* Test Exam Top Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Roll: 2026-SSC-0914 · Candidate: Aspirant
            </div>
            <div className="text-[11px] text-slate-400">
              Computer-Based Practice Test (Standard Exam Environment)
            </div>
          </div>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm tabular-nums ${
              timeLeft < 180
                ? 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-blue-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
          >
            Submit Paper
          </button>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="bg-slate-100 px-4 sm:px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap">
          Sections:
        </span>
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => {
              setActiveSectionFilter(sec);
              if (sec !== 'All') {
                const firstInSection = questions.findIndex((q) => q.section === sec);
                if (firstInSection !== -1) {
                  setCurrentQuestionIndex(firstInSection);
                }
              }
            }}
            className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeSectionFilter === sec
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Column: Active Question Workspace (8 cols) */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          <div>
            {/* Question Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="text-blue-700">Question {currentQuestion.id} of {questions.length}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500 font-normal">{currentQuestion.section}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Marks: <strong className="text-emerald-600">+{currentQuestion.marks}</strong> | Negative: <strong className="text-rose-600">-{currentQuestion.negativeMarks}</strong>
              </div>
            </div>

            {/* Official Source Paper Badge */}
            {currentQuestion.sourcePaper && (
              <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-800">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Source: {currentQuestion.sourcePaper}</span>
              </div>
            )}

            {/* Question Text */}
            <div className="text-sm font-semibold text-slate-900 leading-relaxed whitespace-pre-line mb-6">
              {currentQuestion.question}
            </div>

            {/* Radio Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIndex;
                return (
                  <label
                    key={optIndex}
                    onClick={() => handleSelectOption(optIndex)}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-semibold ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      checked={isSelected}
                      onChange={() => handleSelectOption(optIndex)}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500 h-4 w-4 border-slate-300"
                    />
                    <div className="text-xs leading-normal">
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIndex)}.</span>
                      {opt}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question Bottom Action Bar */}
          <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearResponse}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                Clear Response
              </button>
              <button
                type="button"
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Mark for Review & Next</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={handleSaveAndNext}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Question Palette Toggle Button */}
          <div className="lg:hidden pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsPaletteVisibleMobile(!isPaletteVisibleMobile)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer py-1"
            >
              <span>{isPaletteVisibleMobile ? '▲ Hide Question Palette' : '▼ Show Question Palette (20 Questions)'}</span>
            </button>
            <span className="text-[11px] text-slate-500">
              Answered: {statusCounts.answered + statusCounts['answered-marked']}/20
            </span>
          </div>
        </div>

        {/* Right Column: Question Palette (4 cols) */}
        <div
          className={`lg:col-span-4 p-5 bg-slate-50 flex-col justify-between border-t lg:border-t-0 border-slate-200 ${
            isPaletteVisibleMobile ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Question Palette
              </h4>
              <button
                type="button"
                onClick={() => setIsPaletteVisibleMobile(false)}
                className="lg:hidden text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Official Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-5 p-3 rounded-lg bg-white border border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {statusCounts.answered}
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {statusCounts['not-answered']}
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {statusCounts.marked}
                </span>
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-slate-300 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  {statusCounts['not-visited']}
                </span>
                <span>Not Visited</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 pt-1 border-t border-slate-100">
                <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center relative shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute bottom-0.5 right-0.5" />
                  {statusCounts['answered-marked']}
                </span>
                <span>Answered & Marked for Review</span>
              </div>
            </div>

            {/* Question Numbers Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const status = getQuestionStatus(idx);
                const isCurrent = idx === currentQuestionIndex;

                let btnClass = 'bg-slate-200 text-slate-700 border-slate-300';
                if (status === 'answered') {
                  btnClass = 'bg-emerald-600 text-white border-emerald-700';
                } else if (status === 'not-answered') {
                  btnClass = 'bg-rose-600 text-white border-rose-700';
                } else if (status === 'marked') {
                  btnClass = 'bg-purple-600 text-white border-purple-700';
                } else if (status === 'answered-marked') {
                  btnClass = 'bg-purple-600 text-white border-purple-700 relative';
                } else if (status === 'not-visited') {
                  btnClass = 'bg-slate-200 text-slate-700 border-slate-300';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-md font-bold text-xs border flex items-center justify-center transition-all cursor-pointer ${btnClass} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                  >
                    {q.id}
                    {status === 'answered-marked' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 absolute bottom-0.5 right-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Submit in sidebar */}
          <div className="pt-4 border-t border-slate-200 mt-4">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Submit All 20 Questions
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Confirm Final Paper Submission
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Are you sure you want to finish this mock test? Below is your response summary:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500">Total Questions:</span>{' '}
                <strong className="text-slate-900">{questions.length}</strong>
              </div>
              <div>
                <span className="text-slate-500">Answered:</span>{' '}
                <strong className="text-emerald-600">{statusCounts.answered + statusCounts['answered-marked']}</strong>
              </div>
              <div>
                <span className="text-slate-500">Not Answered:</span>{' '}
                <strong className="text-rose-600">{statusCounts['not-answered']}</strong>
              </div>
              <div>
                <span className="text-slate-500">Marked for Review:</span>{' '}
                <strong className="text-purple-600">{statusCounts.marked}</strong>
              </div>
              <div>
                <span className="text-slate-500">Not Visited:</span>{' '}
                <strong className="text-slate-600">{statusCounts['not-visited']}</strong>
              </div>
              <div>
                <span className="text-slate-500">Time Remaining:</span>{' '}
                <strong className="font-mono text-blue-600">{formatTime(timeLeft)}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Resume Test
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
