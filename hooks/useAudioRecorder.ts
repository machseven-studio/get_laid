"use client";
import { useCallback, useEffect, useRef, useState } from "react";
type RecorderStatus = "idle" | "recording" | "stopping" | "ready" | "error";

export function useAudioRecorder() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stopTracks = useCallback(() => { streamRef.current?.getTracks().forEach(track => track.stop()); streamRef.current = null; }, []);

  const start = useCallback(async () => {
    setError(null); setAudioBlob(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("error"); setError("Audio recording is not supported in this browser."); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; chunksRef.current = [];
      const recorder = new MediaRecorder(stream); recorderRef.current = recorder;
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onerror = () => { setError("Recording failed. Please try again."); setStatus("error"); stopTracks(); };
      recorder.onstop = () => { setAudioBlob(new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" })); setStatus("ready"); stopTracks(); };
      recorder.start(); setStatus("recording");
    } catch {
      stopTracks(); setStatus("error"); setError("Microphone access was denied or unavailable.");
    }
  }, [stopTracks]);

  const stop = useCallback(() => { const recorder = recorderRef.current; if (recorder && recorder.state !== "inactive") { setStatus("stopping"); recorder.stop(); } }, []);
  const reset = useCallback(() => { if (recorderRef.current && recorderRef.current.state !== "inactive") recorderRef.current.stop(); stopTracks(); chunksRef.current = []; setAudioBlob(null); setError(null); setStatus("idle"); }, [stopTracks]);
  useEffect(() => () => stopTracks(), [stopTracks]);
  return { status, audioBlob, error, start, stop, reset };
}
