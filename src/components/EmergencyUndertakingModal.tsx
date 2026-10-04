import React from 'react';
import { Printer, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface EmergencyUndertakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  examName?: string;
  organization?: string;
}

export const EmergencyUndertakingModal: React.FC<EmergencyUndertakingModalProps> = ({
  isOpen,
  onClose,
  examName = 'Central Recruitment Examination',
  organization = 'Staff Selection Commission / Examination Authority',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                Emergency Candidate Undertaking & Misprint Declaration Form
              </h3>
              <p className="text-[11px] text-slate-300">
                Printable 1-page form for blurred photo, missing signature, or spelling error at exam gate
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Form</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 bg-white font-serif">
          {/* Official Format Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 block">
              Government of India / Statutory Examination Authority
            </span>
            <h2 className="text-lg font-bold tracking-tight text-slate-950">
              ANNEXURE – PROVISIONAL ADMISSION UNDERTAKING FORM
            </h2>
            <p className="text-xs text-slate-700 italic">
              (To be executed by candidates with photograph/signature discrepancy or minor demographic mismatch)
            </p>
            <p className="text-xs font-sans font-semibold text-blue-900 mt-1">
              Examination: {examName} ({organization})
            </p>
          </div>

          {/* Form Context Explanation */}
          <p className="text-xs leading-relaxed text-justify font-sans text-slate-700">
            I hereby declare that I am the genuine applicant registered for the above-referenced examination. Due to a technical upload error / printing discrepancy, my admission certificate reflects a blurred photograph, blank signature, or typographical spelling mismatch. I submit this attested undertaking along with my original government identity proof.
          </p>

          {/* Candidate Bio-Data Grid */}
          <div className="grid grid-cols-2 gap-4 font-sans text-xs border border-slate-300 rounded-lg p-4 bg-slate-50/50">
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Candidate Full Name:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Father’s / Mother’s Name:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Roll Number:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Registration ID:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Date of Birth (DD/MM/YYYY):</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Exam Center Code & Name:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Date & Shift of Examination:</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Photo ID Proof Presented (Aadhaar/PAN):</span>
                <div className="border-b border-dotted border-slate-400 h-5 mt-1 font-semibold"></div>
              </div>
            </div>
          </div>

          {/* Affix Photograph Box & Declarations */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="border-2 border-dashed border-slate-400 rounded-lg p-2 h-44 flex flex-col items-center justify-center text-center font-sans text-[11px] text-slate-500">
              <span className="font-bold text-slate-700">Affix Recent Passport Photograph</span>
              <span className="text-[10px] mt-1">(Attested across by Gazetted Officer or Self)</span>
            </div>

            <div className="col-span-2 space-y-3 font-sans text-xs">
              <strong className="block text-slate-900 font-bold uppercase text-[11px]">
                Solemn Declaration of Candidate:
              </strong>
              <p className="text-[11px] leading-relaxed text-slate-700">
                "I affirm that the information stated above is true and that I am not impersonating any candidate. I understand that if any statement made herein is found false, my candidature will be cancelled immediately and I will be debarred from all future recruitments under Section 416 & 419 of the IPC / BNS."
              </p>
              <div className="pt-6 flex justify-between items-end border-t border-slate-200 mt-4">
                <div className="text-center font-sans">
                  <div className="border-t border-slate-500 w-36 pt-1 text-[10px] font-bold uppercase">
                    Left Thumb Impression
                  </div>
                </div>
                <div className="text-center font-sans">
                  <div className="border-t border-slate-500 w-44 pt-1 text-[10px] font-bold uppercase">
                    Signature of Candidate
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Superintendent Verification Seal Area */}
          <div className="border-t-2 border-slate-900 pt-4 mt-6 font-sans text-xs flex justify-between items-end">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-900 block">
                Verification by Exam Center Functionary:
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Physical identity verified against original government ID card. Permitted provisional entry.
              </p>
            </div>
            <div className="text-center">
              <div className="border-t border-slate-500 w-52 pt-1 text-[10px] font-bold uppercase">
                Center Superintendent Seal & Sign
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="p-3 sm:px-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 print:hidden">
          <span>Standard Government Format for Examination Centers</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Form
          </button>
        </div>
      </div>
    </div>
  );
};
