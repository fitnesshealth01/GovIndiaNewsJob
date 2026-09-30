import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Clock, ThumbsUp, AlertCircle, ShieldCheck } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: 'candidate' | 'verified_editor' | 'moderator';
  avatar?: string;
  timeAgo: string;
  content: string;
  likes: number;
  isVerified?: boolean;
}

interface CandidateDiscussionProps {
  alertId: string;
  alertTitle: string;
}

export const CandidateDiscussion: React.FC<CandidateDiscussionProps> = ({ alertId, alertTitle }) => {
  const storageKey = `govindianews_discussion_${alertId}`;

  const defaultComments: Comment[] = [
    {
      id: 'comm-1',
      author: 'Akash Singh Solanki',
      role: 'verified_editor',
      timeAgo: 'Updated 2 hours ago',
      content: `Official notice advisory for ${alertTitle}: Candidates are strongly advised to cross-verify that the photograph uploaded has a clean plain background and was taken within the last 10 days. Ensure name and date of photo capture match official parameters.`,
      likes: 42,
      isVerified: true,
    },
    {
      id: 'comm-2',
      author: 'Priya Sharma (Aspirant)',
      role: 'candidate',
      timeAgo: '4 hours ago',
      content: 'Can candidates currently in their final semester of graduation apply if results are expected before the document verification date?',
      likes: 18,
    },
    {
      id: 'comm-3',
      author: 'Editorial Helpdesk',
      role: 'verified_editor',
      timeAgo: '3 hours ago',
      content: 'Yes, as per the official gazette clause, candidates appearing in the final examination can apply provided they produce documentary proof of passing the qualifying examination on or before the crucial cut-off date specified in the notification.',
      likes: 29,
      isVerified: true,
    }
  ];

  const [comments, setComments] = useState<Comment[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : defaultComments;
      } catch {
        return defaultComments;
      }
    }
    return defaultComments;
  });

  const [newQuestion, setNewQuestion] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch {
      // storage unavailable
    }
  }, [comments, storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newComment: Comment = {
      id: `comm-user-${Date.now()}`,
      author: authorName.trim() || 'Aspirant (Anonymous)',
      role: 'candidate',
      timeAgo: 'Just now',
      content: newQuestion.trim(),
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewQuestion('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;
    setLikedIds((prev) => [...prev, id]);
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 my-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Candidate Query Cell & Community Discussion
            </h3>
            <p className="text-xs text-slate-500">
              Ask doubts regarding eligibility, OBC/EWS certificates, or exam shifts. Monitored by verified analysts.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Gazette Moderated
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Name (or Roll/State)
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Verma (Delhi)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ask a question about this notification
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. Is state domicile certificate required for general candidates?"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Query</span>
              </button>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Your query has been posted. Our educational analysts or peer aspirants will reply shortly.</span>
          </div>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${
              comment.isVerified
                ? 'bg-blue-50/50 border-blue-200'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  comment.isVerified
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 mr-2">{comment.author}</span>
                  {comment.isVerified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified Analyst
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {comment.timeAgo}
              </span>
            </div>

            <p className="text-slate-700 mb-3 whitespace-pre-line pl-9">
              {comment.content}
            </p>

            <div className="flex items-center justify-between pl-9 pt-2 border-t border-slate-100/80">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                  likedIds.includes(comment.id)
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({comment.likes})</span>
              </button>

              <span className="text-[10px] text-slate-400">
                Rule-Compliant Q&A
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
