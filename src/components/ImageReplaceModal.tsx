import React, { useState } from 'react';
import { X, Upload, Link, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface ImageReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetTitle: string;
  currentImage?: string;
  onSaveImage: (targetId: string, newImageUrl: string) => void;
}

export const ImageReplaceModal: React.FC<ImageReplaceModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetTitle,
  currentImage,
  onSaveImage
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Image file is too large (max 8MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlPreview = () => {
    setError(null);
    if (!imageUrl.trim()) {
      setError('Please enter a valid image URL.');
      return;
    }
    setPreviewUrl(imageUrl.trim());
  };

  const handleConfirm = () => {
    if (!previewUrl) {
      setError('Please select or specify a replacement photo.');
      return;
    }
    onSaveImage(targetId, previewUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-neutral-300" />
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Image Replacement System
              </h3>
              <p className="text-[11px] text-neutral-400">
                Replace demo photo for &ldquo;{targetTitle}&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded border border-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-3 bg-neutral-950/60 rounded border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
            <strong className="text-white font-medium">Business Owner Notice: </strong>
            To respect verified business presentation, demo placeholder images can be replaced with real Pro Detailing photos. Upload from your phone/computer or paste a verified public link.
          </div>

          {/* Toggle Tab */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-1 rounded border border-neutral-800">
            <button
              type="button"
              onClick={() => { setMode('upload'); setError(null); }}
              className={`py-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'upload' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('url'); setError(null); }}
              className={`py-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'url' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Paste Image URL</span>
            </button>
          </div>

          {mode === 'upload' ? (
            <div className="border-2 border-dashed border-neutral-700 hover:border-neutral-500 rounded-lg p-6 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                id="file-upload-input"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                  <Upload className="w-5 h-5 text-neutral-300" />
                </div>
                <span className="text-xs font-semibold text-white">
                  Click to select photo from device
                </span>
                <span className="text-[11px] text-neutral-400">
                  PNG, JPG, WebP up to 8MB
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 block">
                Public Image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/actual-car-detail.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleUrlPreview}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Preview Box */}
          {previewUrl && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                New Photo Preview:
              </span>
              <div className="relative aspect-video w-full rounded bg-black overflow-hidden border border-neutral-700">
                <img
                  src={previewUrl}
                  alt="Replacement preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-neutral-800 bg-neutral-950">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!previewUrl}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              previewUrl
                ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
