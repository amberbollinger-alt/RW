export const SAGE_VOICE_EVENT = 'rootwise:sage-voice';

export function queueSageVoice(text, label = 'Sage has something to share') {
  window.dispatchEvent(new CustomEvent(SAGE_VOICE_EVENT, { detail: { text, label } }));
}
