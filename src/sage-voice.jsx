import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RefreshCw, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { SAGE_VOICE_EVENT } from './sage-voice-events';
import './sage-voice.css';

function visiblePageText() {
  const main = document.querySelector('main');
  if (!main) return '';
  const parts = [...main.querySelectorAll('h1, h2, h3, p, blockquote')]
    .filter((node) => !node.closest('nav, form, [aria-hidden="true"], .sage-voice-dock'))
    .filter((node) => node.getClientRects().length > 0)
    .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
    .filter((text, index, all) => text && all.indexOf(text) === index);
  return parts.join(' ').slice(0, 3000);
}

export default function SageVoice() {
  const audioRef = useRef(null);
  const urlRef = useRef('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [muted, setMuted] = useState(false);
  const [message, setMessage] = useState('Sage can read the current lesson aloud.');
  const [queuedText, setQueuedText] = useState('');

  const releaseAudio = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = '';
    setStatus('idle');
  };

  useEffect(() => {
    const onVoice = (event) => {
      releaseAudio();
      setQueuedText(String(event.detail?.text || '').slice(0, 3000));
      setMessage(event.detail?.label || 'Sage is ready to speak.');
      setOpen(true);
    };
    window.addEventListener(SAGE_VOICE_EVENT, onVoice);
    return () => window.removeEventListener(SAGE_VOICE_EVENT, onVoice);
  }, []);

  useEffect(() => () => releaseAudio(), []);

  const loadAndPlay = async (text) => {
    if (!text || muted) return;
    releaseAudio();
    setStatus('loading');
    setMessage('Sage is preparing the narration…');
    try {
      const response = await fetch('/api/speech', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('unavailable');
      const url = URL.createObjectURL(await response.blob());
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.muted = muted;
      audio.onplay = () => { setStatus('playing'); setMessage('Sage is speaking.'); };
      audio.onpause = () => { if (!audio.ended) setStatus('paused'); };
      audio.onended = () => { setStatus('ended'); setMessage('Narration complete.'); };
      audio.onerror = () => { setStatus('error'); setMessage('Sage voice is temporarily unavailable. The lesson text remains visible.'); };
      await audio.play();
    } catch {
      setStatus('error');
      setMessage('Sage voice is temporarily unavailable. The lesson text remains visible.');
    }
  };

  const play = () => {
    if (status === 'paused' && audioRef.current) return audioRef.current.play();
    if (status === 'playing') return audioRef.current?.pause();
    return loadAndPlay(queuedText || visiblePageText());
  };
  const replay = () => {
    if (audioRef.current) { audioRef.current.currentTime = 0; return audioRef.current.play(); }
    return loadAndPlay(queuedText || visiblePageText());
  };
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
    setMessage(next ? 'Sage is muted.' : 'Sage voice is ready.');
  };

  if (!open) return <button type="button" className="sage-voice-launch" onClick={() => setOpen(true)} aria-label="Open Sage voice controls"><img src="/rootwise-sage-cutout.png" alt="" /><span><Sparkles /> Hear Sage</span></button>;

  return <aside className="sage-voice-dock" aria-label="Sage voice controls">
    <button type="button" className="sage-voice-close" onClick={() => { releaseAudio(); setOpen(false); }} aria-label="Close Sage voice controls"><X /></button>
    <img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" />
    <div className="sage-voice-copy"><strong>Sage</strong><small>AI-generated female voice</small><p aria-live="polite">{message}</p></div>
    <div className="sage-voice-actions">
      <button type="button" onClick={play} disabled={status === 'loading'}>{status === 'playing' ? <Pause /> : <Play />} {status === 'playing' ? 'Pause' : status === 'paused' ? 'Resume' : 'Hear Sage'}</button>
      <button type="button" onClick={replay} disabled={status === 'loading'} aria-label="Replay Sage"><RefreshCw /></button>
      <button type="button" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? 'Unmute Sage' : 'Mute Sage'}>{muted ? <VolumeX /> : <Volume2 />}</button>
    </div>
  </aside>;
}
