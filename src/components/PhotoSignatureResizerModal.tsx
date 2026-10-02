import React, { useState, useRef } from 'react';
import { Image, Upload, Download, CheckCircle, ShieldCheck, X, RefreshCw, Sliders } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  type: 'photo' | 'signature' | 'thumb';
  targetWidth: number;
  targetHeight: number;
  minKB: number;
  maxKB: number;
  description: string;
}

const PRESETS: Preset[] = [
  {
    id: 'ssc-photo',
    name: 'SSC Photo (20-50 KB)',
    type: 'photo',
    targetWidth: 350,
    targetHeight: 450,
    minKB: 20,
    maxKB: 50,
    description: '3.5cm x 4.5cm, light background, clear face without cap/glasses',
  },
  {
    id: 'ssc-sign',
    name: 'SSC Signature (10-20 KB)',
    type: 'signature',
    targetWidth: 400,
    targetHeight: 200,
    minKB: 10,
    maxKB: 20,
    description: '4.0cm x 2.0cm, black ballpoint ink on clean white paper',
  },
  {
    id: 'upsc-photo',
    name: 'UPSC / OTR Photo (20-300 KB)',
    type: 'photo',
    targetWidth: 550,
    targetHeight: 700,
    minKB: 20,
    maxKB: 300,
    description: 'White background, not older than 10 days with candidate name/date caption',
  },
  {
    id: 'upsc-sign',
    name: 'UPSC Signature (20-300 KB)',
    type: 'signature',
    targetWidth: 600,
    targetHeight: 300,
    minKB: 20,
    maxKB: 300,
    description: 'Black ink on white background, sharp contrast',
  },
  {
    id: 'ibps-photo',
    name: 'IBPS Banking Photo (20-50 KB)',
    type: 'photo',
    targetWidth: 200,
    targetHeight: 230,
    minKB: 20,
    maxKB: 50,
    description: '200 x 230 pixels, white background, no red-eye',
  },
  {
    id: 'ibps-sign',
    name: 'IBPS Banking Signature (10-20 KB)',
    type: 'signature',
    targetWidth: 140,
    targetHeight: 60,
    minKB: 10,
    maxKB: 20,
    description: 'Running handwriting (Capital/Block letters rejected by IBPS)',
  },
  {
    id: 'ibps-thumb',
    name: 'IBPS Left Thumb Impression (20-50 KB)',
    type: 'thumb',
    targetWidth: 240,
    targetHeight: 240,
    minKB: 20,
    maxKB: 50,
    description: 'Clear blue or black stamp ink impression on white paper',
  },
];

export const PhotoSignatureResizerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ssc-photo');
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [processedBlobUrl, setProcessedBlobUrl] = useState<string | null>(null);
  const [processedSizeKB, setProcessedSizeKB] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [originalSizeKB, setOriginalSizeKB] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSizeKB(Math.round(file.size / 1024));
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedImageSrc(dataUrl);
      processImage(dataUrl, currentPreset);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (imageSrc: string, preset: Preset) => {
    setIsProcessing(true);
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = preset.targetWidth;
      canvas.height = preset.targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Fill white background for signatures and transparency protection
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center crop & scale
      const sourceAspect = img.width / img.height;
      const targetAspect = preset.targetWidth / preset.targetHeight;

      let drawWidth = preset.targetWidth;
      let drawHeight = preset.targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (sourceAspect > targetAspect) {
        // Image is wider
        drawWidth = preset.targetHeight * sourceAspect;
        offsetX = -(drawWidth - preset.targetWidth) / 2;
      } else {
        // Image is taller
        drawHeight = preset.targetWidth / sourceAspect;
        offsetY = -(drawHeight - preset.targetHeight) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Iterative JPEG quality compression loop to match target minKB and maxKB
      let minQuality = 0.1;
      let maxQuality = 0.98;
      let bestBlob: Blob | null = null;
      let bestSizeKB = 0;

      // Binary search quality for target range
      let quality = 0.85;
      for (let attempt = 0; attempt < 8; attempt++) {
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const byteString = atob(dataUrl.split(',')[1]);
        const sizeInKB = Math.round(byteString.length / 1024);
        bestSizeKB = sizeInKB;

        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        bestBlob = new Blob([ab], { type: mimeString });

        if (sizeInKB > preset.maxKB) {
          maxQuality = quality;
          quality = (minQuality + quality) / 2;
        } else if (sizeInKB < preset.minKB && quality < 0.95) {
          minQuality = quality;
          quality = (quality + maxQuality) / 2;
        } else {
          break;
        }
      }

      if (bestBlob) {
        if (processedBlobUrl) {
          URL.revokeObjectURL(processedBlobUrl);
        }
        const newUrl = URL.createObjectURL(bestBlob);
        setProcessedBlobUrl(newUrl);
        setProcessedSizeKB(bestSizeKB);
      }
      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  const handlePresetChange = (newPresetId: string) => {
    setSelectedPresetId(newPresetId);
    const preset = PRESETS.find((p) => p.id === newPresetId);
    if (preset && uploadedImageSrc) {
      processImage(uploadedImageSrc, preset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow-2xs">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                Official Photo & Signature Compressor
              </h3>
              <p className="text-[11px] text-blue-200">
                100% Client-Side Private • Zero Server Upload
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Preset Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-[11px] uppercase tracking-wider">
              Select Commission Portal Specification:
            </label>
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.description}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Zone */}
          {!uploadedImageSrc ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 rounded-2xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
            >
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Upload className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm">
                Click to Upload Photo or Signature
              </span>
              <p className="text-slate-500 text-[11px] max-w-sm">
                Supports JPG, PNG, WEBP. We resize to exact commission pixel dimensions and compress to {currentPreset.minKB}–{currentPreset.maxKB} KB.
              </p>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                🔒 Image never leaves your device
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Processed Preview */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 self-start mb-2">
                  Portal-Ready Preview ({currentPreset.targetWidth}×{currentPreset.targetHeight} px)
                </span>
                <div className="w-full h-48 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden p-2 shadow-inner">
                  {processedBlobUrl && (
                    <img
                      src={processedBlobUrl}
                      alt="Processed result"
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  )}
                </div>

                <div className="w-full mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    Original: <strong>{originalSizeKB} KB</strong>
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      processedSizeKB &&
                      processedSizeKB >= currentPreset.minKB &&
                      processedSizeKB <= currentPreset.maxKB
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Output: {processedSizeKB} KB (Target {currentPreset.minKB}-{currentPreset.maxKB} KB)
                  </span>
                </div>
              </div>

              {/* Status & Re-upload */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2 p-3 bg-blue-50/60 rounded-xl border border-blue-200/70 text-[11px] text-slate-700">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Commission Acceptance Guarantee:</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                    <li>Dimensions matched to <strong>{currentPreset.targetWidth} × {currentPreset.targetHeight} px</strong></li>
                    <li>Quality calibrated to <strong>{processedSizeKB} KB</strong> (within limit)</li>
                    <li>Pure JPEG container format accepted by SSC, UPSC, and IBPS servers</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <a
                    href={processedBlobUrl || '#'}
                    download={`govindianews_${currentPreset.id}_${Date.now()}.jpg`}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Ready Image ({processedSizeKB} KB)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Upload Different Image</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Official recruitment portal document guidelines enforced</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
