import React from "react";
import type { DebugConfig } from "../types";
import { CloseIcon } from "./Icons";

interface DebugPanelProps {
  config: DebugConfig;
  setConfig: React.Dispatch<React.SetStateAction<DebugConfig>>;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  config,
  setConfig,
  onClose,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-slate-800/80 border border-slate-700 p-6 rounded-lg shadow-2xl text-white w-full max-w-md animate-modal-fade-in"
        onClick={(e) => e.stopPropagation()}
        aria-label="Background animation controls"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h3 className="text-lg font-bold mb-4 border-b border-slate-600 pb-3">
          Animation Controls
        </h3>
        <div className="space-y-4 text-sm pt-2">
          <div>
            <label
              htmlFor="particleDensity"
              className="block font-medium text-slate-300"
            >
              Particle Density (Lower is more)
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                id="particleDensity"
                name="particleDensity"
                min="3000"
                max="20000"
                step="100"
                value={config.particleDensity}
                onChange={handleChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs w-12 text-right">
                {config.particleDensity}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="mouseRadius"
              className="block font-medium text-slate-300"
            >
              Mouse Repel Radius
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                id="mouseRadius"
                name="mouseRadius"
                min="50"
                max="500"
                step="10"
                value={config.mouseRadius}
                onChange={handleChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs w-12 text-right">
                {config.mouseRadius}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="connectionDistance"
              className="block font-medium text-slate-300"
            >
              Connection Distance
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                id="connectionDistance"
                name="connectionDistance"
                min="20"
                max="300"
                step="5"
                value={config.connectionDistance}
                onChange={handleChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs w-12 text-right">
                {config.connectionDistance}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="idleZapFrequency"
              className="block font-medium text-slate-300"
            >
              Idle Pulse Frequency
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                id="idleZapFrequency"
                name="idleZapFrequency"
                min="0"
                max="100"
                step="1"
                value={config.idleZapFrequency}
                onChange={handleChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs w-12 text-right">
                {config.idleZapFrequency}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="pulseIntensity"
              className="block font-medium text-slate-300"
            >
              Idle Pulse Intensity
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                id="pulseIntensity"
                name="pulseIntensity"
                min="0.1"
                max="2"
                step="0.1"
                value={config.pulseIntensity}
                onChange={handleChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs w-12 text-right">
                {config.pulseIntensity.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-600">
            <label
              htmlFor="useProfilePicture"
              className="block font-medium text-slate-300 mb-2"
            >
              Profile Picture
            </label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="useProfilePicture"
                name="useProfilePicture"
                checked={config.useProfilePicture}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-sm text-slate-400">
                {config.useProfilePicture ? "My Photo" : "Default Image"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
