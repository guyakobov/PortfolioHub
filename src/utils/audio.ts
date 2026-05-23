let audioCtx: AudioContext | null = null;
let muted = false;

export const toggleMute = () => {
  muted = !muted;
  return muted;
};

export const isMuted = () => muted;

export const playHoverSound = () => {
  if (muted) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    
    // Quick holographic bloop frequencies
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);

    // Envelope for a short, crisp ping
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Ignore audio initialization errors gracefully (e.g. before user interaction)
    console.warn("Audio playback failed", e);
  }
};
