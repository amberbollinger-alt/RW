import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RefreshCw, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { SAGE_VOICE_EVENT } from './sage-voice-events';
import './sage-voice.css';

function pageNarrationText() {
  const main = document.querySelector('main');
  if (!main) return '';
  const parts = [...main.querySelectorAll('h1, h2, h3, p, blockquote')]
    .filter((node) => !node.closest('nav, form, [aria-hidden="true"], .sage-voice-dock'))
    .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
    .filter((text, index, all) => text && all.indexOf(text) === index);
  return parts.join('\n\n');
}

function sageFirstPerson(text) {
  return String(text)
    .replace(/\bSage[’']s\b/g, 'my')
    .replace(/\bSage\s+(asks|asked)\b/g, (_, verb) => verb === 'asked' ? 'I asked' : 'I ask')
    .replace(/\bSage\s+(says|said)\b/g, (_, verb) => verb === 'said' ? 'I said' : 'I say')
    .replace(/\bSage\s+(explains|explained)\b/g, (_, verb) => verb === 'explained' ? 'I explained' : 'I explain')
    .replace(/\bSage\s+(tells|told)\b/g, (_, verb) => verb === 'told' ? 'I told' : 'I tell')
    .replace(/\bSage\s+(leads|led)\b/g, (_, verb) => verb === 'led' ? 'I led' : 'I lead')
    .replace(/\bSage\s+(stops|stopped)\b/g, (_, verb) => verb === 'stopped' ? 'I stopped' : 'I stop')
    .replace(/\bSage\s+(is|was)\b/g, (_, verb) => verb === 'was' ? 'I was' : 'I am')
    .replace(/\bwith Sage\b/g, 'with me')
    .replace(/\bto Sage\b/g, 'to me')
    .replace(/\bSage\b/g, 'I');
}

function narrationChunks(text, limit = 2700) {
  const sentences = sageFirstPerson(text).match(/[^.!?\n]+[.!?]+(?:\n\n)?|[^.!?\n]+(?:\n\n|$)/g) || [];
  const chunks = [];
  let current = '';
  let previousEndedParagraph = false;
  sentences.forEach((sentence) => {
    const clean = sentence.trim();
    if (!clean) return;
    if (current && `${current} ${clean}`.length > limit) {
      chunks.push(current.trim());
      current = clean;
    } else {
      const reflectiveBreak = previousEndedParagraph ? '\n\n' : ' ';
      current = current ? `${current}${reflectiveBreak}${clean}` : clean;
    }
    previousEndedParagraph = sentence.includes('\n\n');
  });
  if (current) chunks.push(current);
  return chunks.flatMap((chunk) => chunk.length <= limit ? [chunk] : chunk.match(new RegExp(`.{1,${limit}}`, 'g')) || []);
}

export default function SageVoice({ pageText = '' }) {
  const audioRef = useRef(null);
  const urlRef = useRef('');
  const chunksRef = useRef([]);
  const chunkIndexRef = useRef(0);
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

  const loadAndPlay = async (text, chunkIndex = 0) => {
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
      audio.onplay = () => { setStatus('playing'); setMessage(`Sage is speaking · part ${chunkIndex + 1} of ${chunksRef.current.length}.`); };
      audio.onpause = () => { if (!audio.ended) setStatus('paused'); };
      audio.onended = () => {
        const nextIndex = chunkIndex + 1;
        if (nextIndex < chunksRef.current.length) {
          chunkIndexRef.current = nextIndex;
          loadAndPlay(chunksRef.current[nextIndex], nextIndex);
        } else {
          setStatus('ended');
          setMessage('Narration complete.');
        }
      };
      audio.onerror = () => { setStatus('error'); setMessage('Sage voice is temporarily unavailable. The lesson text remains visible.'); };
      await audio.play();
    } catch {
      setStatus('error');
      setMessage('Sage voice is temporarily unavailable. The lesson text remains visible.');
    }
  };

  const startNarration = () => {
    const chunks = narrationChunks(queuedText || pageText || pageNarrationText());
    if (!chunks.length) {
      setStatus('error');
      setMessage('There is no lesson text ready to read on this page.');
      return;
    }
    chunksRef.current = chunks;
    chunkIndexRef.current = 0;
    return loadAndPlay(chunks[0], 0);
  };

  const play = () => {
    if (status === 'paused' && audioRef.current) return audioRef.current.play();
    if (status === 'playing') return audioRef.current?.pause();
    return startNarration();
  };
  const replay = () => {
    if (chunksRef.current.length) {
      chunkIndexRef.current = 0;
      return loadAndPlay(chunksRef.current[0], 0);
    }
    return startNarration();
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
