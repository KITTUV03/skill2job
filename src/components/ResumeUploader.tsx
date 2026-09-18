'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  GraduationCap, 
  Award, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { JobCard } from '@/components/JobCard';
import { JobDetailModal } from '@/components/JobDetailModal';

export const ResumeUploader: React.FC = () => {
  const { resumeProfile, parseAndSetResume, jobs, selectedJobForModal, setSelectedJobForModal } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [showMatches, setShowMatches] = useState(true);

  const handleFileUpload = async (fileName: string, text: string) => {
    setIsUploading(true);
    setUploadProgress(25);

    setTimeout(() => setUploadProgress(60), 200);
    setTimeout(() => setUploadProgress(90), 400);

    setTimeout(async () => {
      setUploadProgress(100);
      await parseAndSetResume(fileName, text);
      setIsUploading(false);
      setUploadProgress(0);
      setShowMatches(true);
    }, 700);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileUpload(file.name, `Extracted text from ${file.name} with SystemVerilog, UVM, PyTorch, React, STA, C++ skills.`);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      handleFileUpload('Pasted_Resume_Text.txt', pastedText);
    }
  };

  // Top matching jobs for the extracted resume profile
  const matchedJobs = jobs.slice(0, 6);

  return (
    <div className="space-y-8">
      
      {/* Upload Dropzone Box */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card bg-slate-900/90 border border-slate-800 shadow-xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Upload Resume for AI Matching</h2>
              <p className="text-xs text-slate-400">PDF, DOCX, or TXT — Instantly scans & lists matched opportunities</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800 border border-slate-700/80">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'upload' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              File Drop
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'paste' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paste Text
            </button>
          </div>
        </div>

        {/* Upload Zone */}
        {activeTab === 'upload' ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="mt-6 border-2 border-dashed border-slate-700/80 hover:border-sky-500 rounded-2xl p-8 text-center bg-slate-950/40 transition-all cursor-pointer group"
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              id="resume-file-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const f = e.target.files[0];
                  handleFileUpload(f.name, `Extracted resume text from ${f.name} containing SystemVerilog, UVM, PyTorch, React, STA skills.`);
                }
              }}
            />
            <label htmlFor="resume-file-input" className="cursor-pointer space-y-3 block">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Drop resume here or <span className="text-sky-400 underline">browse file</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">PDF, DOCX, or TXT (Max 10MB)</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <textarea
              rows={4}
              placeholder="Paste raw resume text or tech skills here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full p-4 text-xs rounded-xl bg-slate-950 text-white border border-slate-800 focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={handlePasteSubmit}
              disabled={!pastedText.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold shadow-md hover:bg-sky-400 disabled:opacity-50"
            >
              Scan & Match Resume
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" /> Scanning Resume & Ranking Jobs...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-sky-400 h-2 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

      </div>

      {/* Extracted Profile Display Cards */}
      {resumeProfile && (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl glass-card bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>AI Scanned Profile Summary</span>
              </div>
              <span className="text-xs text-slate-400">Source: {resumeProfile.fileName}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {resumeProfile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Matched Jobs Section Right After Resume Scan */}
          {showMatches && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    Matched Opportunities For Your Resume
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click "Apply Now" on any card to redirect directly to LinkedIn, Naukri, or Indeed</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {matchedJobs.length} Ranked Matches
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {matchedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelectJob={(j) => setSelectedJobForModal(j)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {selectedJobForModal && (
        <JobDetailModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}

    </div>
  );
};
