"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@lib/supabase/client";
import Link from "next/link";

// Simple terminal-style auth experience with prompts
// Modes: login, signup, google, verify

type Line = { text: string; color?: string };

type Step =
  | { name: "choice" }
  | { name: "login_email" }
  | { name: "login_password"; email: string }
  | { name: "post_fail" }
  | { name: "signup_name" }
  | { name: "signup_email"; nameVal: string }
  | { name: "signup_verify_otp"; email: string }
  | { name: "signup_set_password" }
  | { name: "verify_otp"; email: string }
  | { name: "forgot_email" }
  | { name: "forgot_otp"; email: string }
  | { name: "forgot_new_password" }
  | { name: "done" };

export default function TerminalAuth({ onClose }: { onClose: () => void }) {
  const supabase = createClient();
  const [lines, setLines] = useState<Line[]>([
    { text: "Welcome to Mini Audit Trail Auth Terminal", color: "#9fb2c8" },
    { text: "----------------------------------------", color: "#22314d" },
    { text: "Type a command or choose an option:", color: "#9fb2c8" },
    { text: "1) login    2) signup    3) google", color: "#e6edf3" },
  ]);
  const [step, setStep] = useState<Step>({ name: "choice" });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight });
    // Refocus after any new line is printed
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [lines]);

  // Keep cursor in input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy, step]);

  // As a fallback, gently keep focus on the input every 300ms while open
  useEffect(() => {
    const id = setInterval(() => {
      if (!busy && inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    return () => clearInterval(id);
  }, [busy]);

  // Global keydown: if input lost focus, refocus and forward the key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inputEl = inputRef.current;
      if (!inputEl) return;
      const isFocused = document.activeElement === inputEl;
      const isCtrlCombo = e.ctrlKey || e.metaKey || e.altKey;
      // Always allow Ctrl+C handling via our input handler by refocusing
      if (!isFocused) {
        inputEl.focus();
      }
      if (isCtrlCombo) return; // let onKeyDown handle when focused
      // If not focused previously, emulate typing
      if (!isFocused) {
        if (e.key === 'Enter') {
          e.preventDefault();
          // Trigger enter on next tick when input has focus
          setTimeout(() => inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 0);
          return;
        }
        if (e.key.length === 1) {
          e.preventDefault();
          const ch = e.key;
          // Append char to our input state and mirror to the element value
          setInput((prev) => {
            const next = prev + ch;
            inputEl.value = next;
            return next;
          });
        }
      }
    };

    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true } as any);
  }, []);

  // Helper: execute a menu choice action
  const chooseAction = async (code: string) => {
    const lc = code.toLowerCase();
    if (lc === "1" || lc === "login" || lc === "l" || lc === "a" || lc === "re-enter" || lc === "reenter") {
      push("Email:");
      setStep({ name: "login_email" });
      return;
    }
    if (lc === "2" || lc === "signup" || lc === "s" || lc === "c") {
      push("Full name:");
      setStep({ name: "signup_name" });
      return;
    }
    if (lc === "3" || lc === "google" || lc === "g") {
      setBusy(true);
      push("Starting Google OAuth...", "#60a5fa");
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
      } catch (e: any) {
        push(`Error: ${e?.message || "OAuth failed"}`, "#f87171");
        setBusy(false);
        resetToChoice();
      }
      return;
    }
    if (lc === "forgot" || lc === "reset" || lc === "forgot-password" || lc === "f" || lc === "b") {
      push("Enter your email for reset link:");
      setStep({ name: "forgot_email" });
      return;
    }
    push("Invalid choice. Enter 1, 2, or 3.", "#fbbf24");
  };

  // If already logged in when terminal opens, show message and redirect to editor
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setLines((prev) => [
          ...prev,
          { text: '', color: '#e6edf3' },
          { text: 'Detected active session. Redirecting to /editor ...', color: '#22c55e' },
        ]);
        setTimeout(() => {
          window.location.href = '/editor';
        }, 800);
      }
    });
  }, []);

  const push = (text: string, color?: string) => setLines((l) => [...l, { text, color }]);

  const resetToChoice = () => {
    setStep({ name: "choice" });
    setInput("");
    push("—", "#2d3b55");
    push("1) Login    2) Signup    3) Google", "#9fb2c8");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const cancelFlow = () => {
    setBusy(false);
    push("^C", "#fbbf24");
    if (step.name === "choice") {
      push("Cancelled.", "#9fb2c8");
      onClose();
    } else {
      push("Operation cancelled. Back to menu.", "#9fb2c8");
      resetToChoice();
    }
  };

  const handleEnter = async () => {
    if (busy) return;
    const val = input.trim();
    setInput("");
    switch (step.name) {
      case "choice": {
        if (!val) break;
        push(`> ${val}`);
        await chooseAction(val.toLowerCase());
        break;
      }
      case "post_fail": {
        if (!val) break;
        push(`> ${val}`);
        const lc = val.toLowerCase();
        if (["re-enter","reenter","login","l","1","a"].includes(lc)) {
          push("Email:");
          setStep({ name: "login_email" });
        } else if (["forgot","reset","forgot-password","f","b"].includes(lc)) {
          push("Enter your email for reset link:");
          setStep({ name: "forgot_email" });
        } else if (["signup","s","2","c"].includes(lc)) {
          push("Full name:");
          setStep({ name: "signup_name" });
        } else {
          push("Invalid. Type: re-enter / forgot / signup", "#fbbf24");
        }
        break;
      }
      case "login_email": {
        push(`Email: ${val}`);
        setStep({ name: "login_password", email: val });
        push("Password:");
        break;
      }
      case "login_password": {
        const email = (step as any).email as string;
        const lc = val.toLowerCase();
        if (["forgot","f","reset","b"].includes(lc)) {
          push("Enter your email for reset link:");
          setStep({ name: "forgot_email" });
          break;
        }
        push("Authenticating...", "#60a5fa");
        setBusy(true);
        try {
          const { error } = await supabase.auth.signInWithPassword({ email, password: val });
          if (error) throw error;
          push("Logged in. Redirecting...", "#34d399");
          window.location.replace("/editor");
        } catch (e: any) {
          push(`Login failed: ${e?.message || "error"}`, "#f87171");
          push("Options: re-enter (A) / forgot (B) / signup (C)", "#9fb2c8");
          setBusy(false);
          setStep({ name: "post_fail" });
        }
        break;
      }
      case "forgot_email": {
        const email = val;
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          push("Please enter a valid email.", "#fbbf24");
          push("Enter your email for reset link:");
          break;
        }
        setBusy(true);
        push("Sending 6-digit OTP to email...", "#60a5fa");
        try {
          const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
          if (error) throw error;
          push("Enter 6-digit code:", "#9fb2c8");
          setStep({ name: "forgot_otp", email });
        } catch (e: any) {
          push(`Reset failed: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      case "forgot_otp": {
        const email = (step as any).email as string;
        setBusy(true);
        push("Verifying 6-digit code...", "#60a5fa");
        try {
          const { error } = await supabase.auth.verifyOtp({ email, token: val, type: "email" });
          if (error) throw error;
          push("Verified. Enter new password:", "#34d399");
          setStep({ name: "forgot_new_password" });
        } catch (e: any) {
          push(`OTP failed: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      case "forgot_new_password": {
        setBusy(true);
        push("Updating password...", "#60a5fa");
        try {
          const { error } = await supabase.auth.updateUser({ password: val });
          if (error) throw error;
          push("Password updated. Redirecting...", "#34d399");
          window.location.replace("/editor");
        } catch (e: any) {
          push(`Update failed: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      case "signup_name": {
        push(`Name: ${val}`);
        setStep({ name: "signup_email", nameVal: val } as any);
        push("Email:");
        break;
      }
      case "signup_email": {
        push(`Email: ${val}`);
        setBusy(true);
        push("Sending 6-digit OTP to email...", "#60a5fa");
        try {
          const { error } = await supabase.auth.signInWithOtp({
            email: val,
            options: { shouldCreateUser: true, data: { full_name: (step as any).nameVal } },
          });
          if (error) throw error;
          push("Enter 6-digit code:", "#9fb2c8");
          setStep({ name: "signup_verify_otp", email: val });
        } catch (e: any) {
          push(`Failed to send OTP: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      case "signup_verify_otp": {
        const email = (step as any).email as string;
        setBusy(true);
        push("Verifying 6-digit code...", "#60a5fa");
        try {
          const { error } = await supabase.auth.verifyOtp({ email, token: val, type: "email" });
          if (error) throw error;
          push("Verified. Set a password:", "#34d399");
          setStep({ name: "signup_set_password" });
        } catch (e: any) {
          push(`OTP failed: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      case "signup_set_password": {
        setBusy(true);
        push("Saving password...", "#60a5fa");
        try {
          const { error } = await supabase.auth.updateUser({ password: val });
          if (error) throw error;
          push("Account ready. Redirecting...", "#34d399");
          window.location.replace("/editor");
        } catch (e: any) {
          push(`Password set failed: ${e?.message || "error"}`, "#f87171");
          resetToChoice();
        } finally {
          setBusy(false);
        }
        break;
      }
      default:
        break;
    }
  };

return (
  <div
    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
    onMouseDown={() => inputRef.current?.focus()}
    onClick={() => inputRef.current?.focus()}
  >
    <div style={{ width: '90%', maxWidth: 720, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.45)' }}>
      <div style={{ background: '#0b1220', border: '1px solid #22314d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid #22314d', background: '#0f172a' }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#10b981' }} />
          <div style={{ marginLeft: 8, color: '#9fb2c8' }}>Terminal</div>
          <Link href="/login" style={{ marginLeft: 'auto', color: '#9fb2c8', textDecoration: 'underline' }}>Normal Login</Link>
          <button onClick={onClose} style={{ marginLeft: 12, background: 'transparent', color: '#9fb2c8', border: 'none', cursor: 'pointer' }}>Close</button>
        </div>
        <div
          ref={viewportRef}
          style={{ maxHeight: 420, overflow: 'auto', padding: 16, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}
          onMouseDown={() => inputRef.current?.focus()}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ whiteSpace: 'pre-wrap', color: l.color || '#e6edf3' }}>{l.text}</div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ color: '#22c55e' }}>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
                  e.preventDefault();
                  cancelFlow();
                  return;
                }
                if (e.key === 'Enter') handleEnter();
              }}
              onBlur={() => setTimeout(() => inputRef.current?.focus(), 0)}
              disabled={false}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e6edf3',
              }}
              placeholder="type here and press Enter"
              ref={inputRef}
              autoFocus
              tabIndex={0}
            />
            {step.name === 'login_password' && (
              <button
                onClick={() => {
                  push("Enter your email for reset link:");
                  setStep({ name: 'forgot_email' });
                }}
                style={{
                  background: '#334155',
                  color: '#e6edf3',
                  border: '1px solid #22314d',
                  borderRadius: 6,
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                Forgot
              </button>
            )}
            <span
              className="blink"
              style={{ width: 8, height: 18, background: '#e6edf3' }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
