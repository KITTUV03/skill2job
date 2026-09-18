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
  Clock, 
  Plus, 
  Trash2,
  Zap
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const ResumeUploader: React.FC = () => {
  const { resumeProfile, parseAndSetResume } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  const handleFileUpload = async (fileName: string, text: string) => {
    setIsUploading(true);
    setUploadProgress(20);

    const timer1 = setTimeout(() => setUploadProgress(50), 300);
    const timer2 = setTimeout(() => setUploadProgress(85), 600);

    setTimeout(async () => {
      setUploadProgress(100);
      await parseAndSetResume(fileName, text);
      setIsUploading(false);
      setUploadProgress(0);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileUpload(file.name, `Sample extracted text from uploaded ${file.name} with SystemVerilog, UVM, PyTorch, React, STA, C++ expertise.`);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      handleFileUpload('Pasted_Resume_Text.txt', pastedText);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Box */}
      <div className="p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <UploadCloud className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">AI Resume Parser Module</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Supports PDF, DOCX, TXT format up to 10MB</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'upload' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Drag & Drop
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'paste' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
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
            className="mt-6 border-2 border-dashed border-slate-300 dark:border-slate-700/80 hover:border-blue-500 rounded-3xl p-10 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-all cursor-pointer group"
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              id="resume-file-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const f = e.target.files[0];
                  handleFileUpload(f.name, `Extracted resume text from ${f.name} containing SystemVerilog, UVM, PyTorch, React, Python, STA skills.`);
                }
              }}
            />
            <label htmlFor="resume-file-input" className="cursor-pointer space-y-3 block">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Drop your resume here or <span className="text-blue-600 dark:text-blue-400 hover:underline">browse file</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF, DOCX, or TXT (Max 10MB)</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <textarea
              rows={5}
              placeholder="Paste your resume raw text, work history, or tech stack here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full p-4 text-xs rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button
              onClick={handlePasteSubmit}
              disabled={!pastedText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md hover:from-blue-500 hover:to-purple-500 disabled:opacity-50"
            >
              Parse Text with AI
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin" /> Neural Vector Extraction in Progress...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

      </div>

      {/* Extracted Profile Display Cards */}
      {resumeProfile && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              AI Extracted Resume Profile
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">File: {resumeProfile.fileName}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skills Badges Cloud */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>Extracted Skills Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeProfile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Job Roles & Domains */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span>Preferred Roles & Target Domains</span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {resumeProfile.targetDomains.map((domain, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      {domain}
                    </span>
                  ))}
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
                  {resumeProfile.preferredRoles.map((role, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Experience & Certifications */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Certifications & Industry Badges</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {resumeProfile.certifications.map((cert, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-medium">
                    🏆 {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education History */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <GraduationCap className="w-4 h-4 text-cyan-500" />
                <span>Education Background</span>
              </div>
              {resumeProfile.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
