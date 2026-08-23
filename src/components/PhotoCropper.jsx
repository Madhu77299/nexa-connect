import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Crop, ZoomIn, ZoomOut, RotateCw, Check, X, Move, Square, Smartphone, Monitor, Maximize2 } from 'lucide-react';

export default function PhotoCropper({ imageSrc, onCropComplete, onCancel }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  // Natural image dimensions
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [displayedSize, setDisplayedSize] = useState({ width: 0, height: 0, offsetLeft: 0, offsetTop: 0 });

  // Crop Box normalized percentages (0 to 100)
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [aspectRatio, setAspectRatio] = useState('free'); // 'free', '1:1', '4:5', '16:9'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragAction, setDragAction] = useState(null); // 'move', 'nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, cropX: 0, cropY: 0, cropW: 0, cropH: 0 });

  // Measure image when loaded
  const onImageLoad = (e) => {
    const img = e.target;
    const nW = img.naturalWidth;
    const nH = img.naturalHeight;
    setNaturalSize({ width: nW, height: nH });
    updateDisplayedDimensions();
  };

  const updateDisplayedDimensions = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return;
    const imgRect = imageRef.current.getBoundingClientRect();
    const contRect = containerRef.current.getBoundingClientRect();

    setDisplayedSize({
      width: imgRect.width,
      height: imgRect.height,
      offsetLeft: imgRect.left - contRect.left,
      offsetTop: imgRect.top - contRect.top
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateDisplayedDimensions);
    return () => window.removeEventListener('resize', updateDisplayedDimensions);
  }, [updateDisplayedDimensions]);

  // Handle aspect ratio preset changes
  const applyAspectRatio = (ratio) => {
    setAspectRatio(ratio);
    if (ratio === 'free') return;

    let targetRatio = 1;
    if (ratio === '1:1') targetRatio = 1;
    if (ratio === '4:5') targetRatio = 4 / 5;
    if (ratio === '16:9') targetRatio = 16 / 9;

    setCrop(prev => {
      let newW = prev.width;
      let newH = newW / targetRatio;

      if (newH > 90) {
        newH = 80;
        newW = newH * targetRatio;
      }
      if (newW > 90) {
        newW = 80;
        newH = newW / targetRatio;
      }

      const newX = Math.max(0, Math.min(100 - newW, (100 - newW) / 2));
      const newY = Math.max(0, Math.min(100 - newH, (100 - newH) / 2));

      return { x: newX, y: newY, width: newW, height: newH };
    });
  };

  // Mouse & Touch Down
  const handlePointerDown = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragAction(action);

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    setDragStart({
      mouseX: clientX,
      mouseY: clientY,
      cropX: crop.x,
      cropY: crop.y,
      cropW: crop.width,
      cropH: crop.height
    });
  };

  // Pointer Move (Mouse / Touch)
  const handlePointerMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    const deltaX = clientX - dragStart.mouseX;
    const deltaY = clientY - dragStart.mouseY;

    // Convert pixel delta to percentage of displayed image
    const containerW = displayedSize.width || containerRef.current.clientWidth;
    const containerH = displayedSize.height || containerRef.current.clientHeight;

    const deltaPercentX = (deltaX / containerW) * 100;
    const deltaPercentY = (deltaY / containerH) * 100;

    setCrop(() => {
      let { cropX, cropY, cropW, cropH } = dragStart;

      if (dragAction === 'move') {
        let newX = cropX + deltaPercentX;
        let newY = cropY + deltaPercentY;
        newX = Math.max(0, Math.min(100 - cropW, newX));
        newY = Math.max(0, Math.min(100 - cropH, newY));
        return { x: newX, y: newY, width: cropW, height: cropH };
      }

      let newX = cropX;
      let newY = cropY;
      let newW = cropW;
      let newH = cropH;

      // Handle corner and edge resizing
      if (dragAction.includes('e')) {
        newW = Math.max(10, Math.min(100 - cropX, cropW + deltaPercentX));
      }
      if (dragAction.includes('s')) {
        newH = Math.max(10, Math.min(100 - cropY, cropH + deltaPercentY));
      }
      if (dragAction.includes('w')) {
        const potentialW = cropW - deltaPercentX;
        if (potentialW >= 10 && cropX + deltaPercentX >= 0) {
          newX = cropX + deltaPercentX;
          newW = potentialW;
        }
      }
      if (dragAction.includes('n')) {
        const potentialH = cropH - deltaPercentY;
        if (potentialH >= 10 && cropY + deltaPercentY >= 0) {
          newY = cropY + deltaPercentY;
          newH = potentialH;
        }
      }

      // Enforce aspect ratio if locked
      if (aspectRatio !== 'free') {
        let targetRatio = 1;
        if (aspectRatio === '1:1') targetRatio = 1;
        if (aspectRatio === '4:5') targetRatio = 4 / 5;
        if (aspectRatio === '16:9') targetRatio = 16 / 9;

        if (dragAction === 'e' || dragAction === 'w') {
          newH = newW / targetRatio;
        } else {
          newW = newH * targetRatio;
        }

        if (newX + newW > 100) newW = 100 - newX;
        if (newY + newH > 100) newH = 100 - newY;
      }

      return {
        x: Math.max(0, Math.min(90, newX)),
        y: Math.max(0, Math.min(90, newY)),
        width: Math.max(10, Math.min(100 - newX, newW)),
        height: Math.max(10, Math.min(100 - newY, newH))
      };
    });
  }, [isDragging, dragAction, dragStart, displayedSize, aspectRatio]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setDragAction(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Execute Canvas Crop & Export Data URL
  const handleExecuteCrop = () => {
    if (!imageRef.current) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;

      // Calculate slice bounding box in pixels on source image
      const sourceX = (crop.x / 100) * naturalW;
      const sourceY = (crop.y / 100) * naturalH;
      const sourceW = (crop.width / 100) * naturalW;
      const sourceH = (crop.height / 100) * naturalH;

      // Output resolution
      const targetWidth = Math.min(1200, Math.max(400, Math.round(sourceW)));
      const targetHeight = Math.min(1200, Math.max(400, Math.round(sourceH)));

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Apply rotation if needed
      if (rotation !== 0) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          -targetWidth / 2,
          -targetHeight / 2,
          targetWidth,
          targetHeight
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          0,
          0,
          targetWidth,
          targetHeight
        );
      }

      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      onCropComplete(croppedDataUrl);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#0066FF]/20 text-[#00F2FE] flex items-center justify-center shadow-inner">
              <Crop className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-display">
                Interactive Photo Cropper
              </h3>
              <p className="text-[11px] text-slate-400">
                Drag corners or box to select the exact crop area
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Interactive Workspace Area */}
        <div className="flex-1 p-4 sm:p-6 flex items-center justify-center bg-[#070D18] overflow-hidden min-h-[280px] sm:min-h-[380px]">
          <div 
            ref={containerRef}
            className="relative max-h-[50vh] max-w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 shadow-2xl"
          >
            {/* The Image */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Source for cropping"
              onLoad={onImageLoad}
              style={{
                transform: `rotate(${rotation}deg)`,
                maxHeight: '48vh',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
              className="pointer-events-none block"
            />

            {/* Dark Mask Overlay (dimming unselected area) */}
            <div className="absolute inset-0 bg-black/65 pointer-events-none" />

            {/* Clear Selected Crop Box Viewport */}
            <div
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`
              }}
              onMouseDown={(e) => handlePointerDown(e, 'move')}
              onTouchStart={(e) => handlePointerDown(e, 'move')}
              className="absolute border-2 border-[#00F2FE] shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] cursor-move transition-shadow"
            >
              {/* 3x3 Rule-of-Thirds Grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-white/20" />
                <div className="border-r border-white/20" />
                <div />
              </div>

              {/* Center Drag Icon Prompt */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 hover:opacity-100">
                <Move className="h-6 w-6 text-white drop-shadow-md" />
              </div>

              {/* 4 Corner Handles (NW, NE, SW, SE) */}
              <div
                onMouseDown={(e) => handlePointerDown(e, 'nw')}
                onTouchStart={(e) => handlePointerDown(e, 'nw')}
                className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-white border-2 border-[#0066FF] cursor-nwse-resize shadow-lg z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 'ne')}
                onTouchStart={(e) => handlePointerDown(e, 'ne')}
                className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-white border-2 border-[#0066FF] cursor-nesw-resize shadow-lg z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 'sw')}
                onTouchStart={(e) => handlePointerDown(e, 'sw')}
                className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-white border-2 border-[#0066FF] cursor-nesw-resize shadow-lg z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 'se')}
                onTouchStart={(e) => handlePointerDown(e, 'se')}
                className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-white border-2 border-[#0066FF] cursor-nwse-resize shadow-lg z-20"
              />

              {/* 4 Edge Handles (N, S, W, E) */}
              <div
                onMouseDown={(e) => handlePointerDown(e, 'n')}
                onTouchStart={(e) => handlePointerDown(e, 'n')}
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-8 rounded-full bg-white/90 border border-slate-600 cursor-ns-resize z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 's')}
                onTouchStart={(e) => handlePointerDown(e, 's')}
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-8 rounded-full bg-white/90 border border-slate-600 cursor-ns-resize z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 'w')}
                onTouchStart={(e) => handlePointerDown(e, 'w')}
                className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-8 w-3 rounded-full bg-white/90 border border-slate-600 cursor-ew-resize z-20"
              />
              <div
                onMouseDown={(e) => handlePointerDown(e, 'e')}
                onTouchStart={(e) => handlePointerDown(e, 'e')}
                className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-8 w-3 rounded-full bg-white/90 border border-slate-600 cursor-ew-resize z-20"
              />
            </div>
          </div>
        </div>

        {/* Bottom Toolbar & Aspect Presets */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 space-y-3">
          
          {/* Preset Buttons & Rotation */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mr-1">
                Ratio:
              </span>
              
              <button
                type="button"
                onClick={() => applyAspectRatio('free')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  aspectRatio === 'free' ? 'bg-[#0066FF] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Maximize2 className="h-3 w-3" />
                <span>Freeform</span>
              </button>

              <button
                type="button"
                onClick={() => applyAspectRatio('1:1')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  aspectRatio === '1:1' ? 'bg-[#0066FF] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Square className="h-3 w-3" />
                <span>1:1 Square</span>
              </button>

              <button
                type="button"
                onClick={() => applyAspectRatio('4:5')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  aspectRatio === '4:5' ? 'bg-[#0066FF] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Smartphone className="h-3 w-3" />
                <span>4:5 Portrait</span>
              </button>

              <button
                type="button"
                onClick={() => applyAspectRatio('16:9')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  aspectRatio === '16:9' ? 'bg-[#0066FF] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Monitor className="h-3 w-3" />
                <span>16:9</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5 text-[#00F2FE]" />
              <span>Rotate 90°</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={handleExecuteCrop}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00F2FE] hover:from-[#0052CC] hover:to-[#00d0dc] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#0066FF]/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              <span>Apply Crop &amp; Save Live</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
