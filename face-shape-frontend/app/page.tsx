"use client";

import { useState } from "react";
import { Upload, Camera, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = "https://face-shape-backend-tpuy.onrender.com/predict"; 

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setResult(null);
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to backend. It might be waking up (wait 30s).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-200" />
          <h1 className="text-3xl font-bold tracking-tight">Face Shape AI</h1>
          <p className="text-blue-100 mt-2 text-sm">Upload a selfie to analyze your face shape</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          
          {/* Image Preview */}
          <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden hover:bg-slate-100 transition-colors">
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-slate-400">
                <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Click to upload photo</p>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                <p className="text-blue-600 font-semibold text-xs uppercase tracking-wide">Processing</p>
              </div>
            )}
          </div>

          {/* Upload Input */}
          <label className="block w-full cursor-pointer group">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <div className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center transition-all transform group-active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              <Upload className="w-5 h-5" />
              {selectedImage ? "Analyze Another Photo" : "Select Photo"}
            </div>
          </label>

          {/* Results Area */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-semibold text-sm uppercase">Analysis Complete</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  {result.class} Shape
                </h2>
                <p className="text-slate-500 text-sm mb-4">
                  Confidence: <span className="font-mono text-emerald-600 font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stylist Recommendation</p>
                  <p className="text-slate-700 leading-relaxed text-sm">{result.recommendations}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}