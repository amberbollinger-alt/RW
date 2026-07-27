import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RefreshCw, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { SAGE_VOICE_EVENT } from './sage-voice-events';
import './sage-voice.css';

function pageNarrationText() {
  const main = document.querySelector('main');
  if (!main) return '';
  const parts = [...main.querySelectorAll('h1, h2, h3, p, blockquote')]
    .filter((node) => !node.closest('nav, form, [aria-hidden="true"], .sage-voice-dock'))
    .filter((node) => !node.matches('.city-eyebrow, .r2-eyebrow, .rt-eyebrow, .r4-eyebrow'))
    .filter((node) => !(node.matches('p') && node.closest('blockquote')))
    .map((node) => {
      const text = node.matches('blockquote') ? node.querySelector('p')?.textContent : node.textContent;
      return String(text || '').replace(/\s+/g, ' ').trim();
    })
    .filter((text, index, all) => text && all.indexOf(text) === index);
  return parts.join('\n\n');
}

function sageFirstPerson(text) {
  return String(text)
    .replace(/[^.!?\n]*\bSage\s+(?:asks|asked|says|said|explains|explained|tells|told|leads|led|stops|stopped)\b[^.!?\n]*[.!?]/gi, '')
    .replace(/\bSage[’']s\b/g, 'my')
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

function preferredDeviceVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferredNames = /\b(Ava|Jenny|Aria|Samantha|Zira|Susan|Karen|Moira|Tessa|Fiona|Hazel)\b/i;
  return voices.find((voice) => /^en[-_]/i.test(voice.lang) && preferredNames.test(voice.name))
    || voices.find((voice) => /^en[-_]/i.test(voice.lang))
    || voices[0]
    || null;
}

export default function SageVoice({ pageText = '' }) {
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  const playbackModeRef = useRef('');
  const playbackTokenRef = useRef(0);
  const urlRef = useRef('');
  const chunksRef = useRef([]);
  const chunkIndexRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [muted, setMuted] = useState(false);
  const [message, setMessage] = useState('Sage can read the current lesson aloud.');
  const [queuedText, setQueuedText] = useState('');

  const releaseAudio = () => {
    playbackTokenRef.current += 1;
    audioRef.current?.pause();
    audioRef.current = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    utteranceRef.current = null;
    playbackModeRef.current = '';
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

  const speakWithDeviceVoice = (text, chunkIndex, token) => {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setStatus('error');
      setMessage('Sage could not start audio on this device.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = preferredDeviceVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.78;
    utterance.pitch = 0.84;
    utterance.volume = muted ? 0 : 1;
    utteranceRef.current = utterance;
    playbackModeRef.current = 'device';
    utterance.onstart = () => {
      if (token !== playbackTokenRef.current) return;
      setStatus('playing');
      setMessage(`Sage is speaking · part ${chunkIndex + 1} of ${chunksRef.current.length}.`);
    };
    utterance.onend = () => {
      if (token !== playbackTokenRef.current) return;
      const nextIndex = chunkIndex + 1;
      if (nextIndex < chunksRef.current.length) {
        chunkIndexRef.current = nextIndex;
        speakWithDeviceVoice(chunksRef.current[nextIndex], nextIndex, token);
      } else {
        playbackModeRef.current = '';
        setStatus('ended');
        setMessage('Narration complete.');
      }
    };
    utterance.onerror = (event) => {
      if (token !== playbackTokenRef.current || ['canceled', 'interrupted'].includes(event.error)) return;
      setStatus('error');
      setMessage('Sage could not start audio on this device.');
    };
    window.speechSynthesis.speak(utterance);
  };

  const loadAndPlay = async (text, chunkIndex = 0) => {
    if (!text || muted) return;
    releaseAudio();
    const token = playbackTokenRef.current;
    setStatus('loading');
    setMessage('Sage is preparing the narration…');
    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({ text }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.toLowerCase().startsWith('audio/')) throw new Error('unavailable');

      const url = URL.createObjectURL(await response.blob());
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      playbackModeRef.current = 'api';
      audio.muted = muted;
      audio.onplay = () => {
        if (token !== playbackTokenRef.current) return;
        setStatus('playing');
        setMessage(`Sage is speaking · part ${chunkIndex + 1} of ${chunksRef.current.length}.`);
      };
      audio.onpause = () => {
        if (token === playbackTokenRef.current && !audio.ended) setStatus('paused');
      };
      audio.onended = () => {
        if (token !== playbackTokenRef.current) return;
        const nextIndex = chunkIndex + 1;
        if (nextIndex < chunksRef.current.length) {
          chunkIndexRef.current = nextIndex;
          loadAndPlay(chunksRef.current[nextIndex], nextIndex);
        } else {
          playbackModeRef.current = '';
          setStatus('ended');
          setMessage('Narration complete.');
        }
      };
      audio.onerror = () => {
        if (token !== playbackTokenRef.current) return;
        audioRef.current = null;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = '';
        speakWithDeviceVoice(text, chunkIndex, token);
      };
      await audio.play();
    } catch {
      if (token === playbackTokenRef.current) speakWithDeviceVoice(text, chunkIndex, token);
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
    if (status === 'paused' && playbackModeRef.current === 'api' && audioRef.current) return audioRef.current.play();
    if (status === 'paused' && playbackModeRef.current === 'device') {
      window.speechSynthesis.resume();
      setStatus('playing');
      setMessage(`Sage is speaking · part ${chunkIndexRef.current + 1} of ${chunksRef.current.length}.`);
      return;
    }
    if (status === 'playing' && playbackModeRef.current === 'api') return audioRef.current?.pause();
    if (status === 'playing' && playbackModeRef.current === 'device') {
      window.speechSynthesis.pause();
      setStatus('paused');
      setMessage('Sage is paused.');
      return;
    }
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
    if (next && status === 'playing') {
      if (playbackModeRef.current === 'api') audioRef.current?.pause();
      if (playbackModeRef.current === 'device') window.speechSynthesis.pause();
      setStatus('paused');
    }
    setMessage(next ? 'Sage is muted.' : status === 'paused' ? 'Sage is ready to resume.' : 'Sage voice is ready.');
  };

  if (!open) {
    return <button type="button" className="sage-voice-launch" onClick={() => setOpen(true)} aria-label="Open Sage voice controls"><img src="/rootwise-sage-cutout.png" alt="" /><span><Sparkles /> Hear Sage</span></button>;
  }

  return <aside className="sage-voice-dock" aria-label="Sage voice controls">
    <button type="button" className="sage-voice-close" onClick={() => { releaseAudio(); setOpen(false); }} aria-label="Close Sage voice controls"><X /></button>
    <img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" />
    <div className="sage-voice-copy"><strong>Sage</strong><small>AI voice · device voice backup</small><p aria-live="polite">{message}</p></div>
    <div className="sage-voice-actions">
      <button type="button" onClick={play} disabled={status === 'loading' || muted}>{status === 'playing' ? <Pause /> : <Play />} {status === 'playing' ? 'Pause' : status === 'paused' ? 'Resume' : 'Hear Sage'}</button>
      <button type="button" onClick={replay} disabled={status === 'loading' || muted} aria-label="Replay Sage"><RefreshCw /></button>
      <button type="button" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? 'Unmute Sage' : 'Mute Sage'}>{muted ? <VolumeX /> : <Volume2 />}</button>
    </div>
  </aside>;
}
