"use client";

import { useState, useEffect } from "react";
import { createClient } from "@lib/supabase/client";
import Link from "next/link";

type Mode = "login" | "signup" | "verify" | "forgot_email" | "forgot_otp" | "forgot_new_password";

export default function LoginPage() {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace("/editor");
    });
  }, [supabase]);

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetFeedback = () => { setMessage(null); setError(null); };

  const signInWithGoogle = async () => {
    resetFeedback();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e.message : "OAuth failed");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password flow: email -> 6-digit OTP -> new password
  const onForgotSendOtp = async () => {
    resetFeedback();
    if (!email) { setError("Enter your email"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
      if (error) throw error;
      setMode("forgot_otp");
      setMessage("Enter the 6-digit code sent to your email.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const onForgotVerifyOtp = async () => {
    resetFeedback();
    if (!email || !otp) { setError("Enter email and OTP"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
      if (error) throw error;
      setMode("forgot_new_password");
      setMessage("Verified. Set a new password.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const onForgotSetNewPassword = async () => {
    resetFeedback();
    if (!password) { setError("Enter a new password"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      window.location.href = "/editor";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async () => {
    resetFeedback();
    if (!email || !password || !confirm) { setError("Fill all fields"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setMode("verify");
      setMessage("We sent a verification email/OTP. Enter code below or use the link in your email.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async () => {
    resetFeedback();
    if (!email || !otp) { setError("Enter email and OTP"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "signup" });
      if (error) throw error;
      window.location.href = "/editor";
    } catch (e) {
      setError(e instanceof Error ? e.message : "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async () => {
    resetFeedback();
    if (!email || !password) { setError("Enter email and password"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = "/editor";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = { padding: 10, borderRadius: 8, border: '1px solid #2d3b55', background: '#0f172a', color: '#e6edf3' } as const;
  const btnPrimary = { background: '#2563eb', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' } as const;
  const btnGhost = { background: '#1f2937', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' } as const;

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
        <div style={{
          width: '100%', maxWidth: 520, padding: 24, borderRadius: 16,
          border: '1px solid #22314d',
          background: 'linear-gradient(180deg, rgba(31,41,55,0.6) 0%, rgba(15,23,42,0.6) 100%)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1 style={{ fontSize: 28, margin: 0 }}>Audit Trail</h1>
            <Link href="/" style={{ color: '#9fb2c8' }}>Home</Link>
          </div>
          <p style={{ marginTop: 0, marginBottom: 20, color: '#9fb2c8' }}>
            Sign up or log in to create and view your personal version history.
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setMode("login")} style={{ ...btnGhost, opacity: mode === 'login' ? 1 : 0.7 }}>Login</button>
              <button onClick={() => setMode("signup")} style={{ ...btnGhost, opacity: mode === 'signup' ? 1 : 0.7 }}>Sign up</button>
              <button onClick={signInWithGoogle} disabled={loading} style={{ background: '#ea4335', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
                Continue with Google
              </button>
            </div>

            {mode === 'signup' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" style={fieldStyle} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={fieldStyle} />
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onSignup} disabled={loading} style={btnPrimary}>Create account</button>
                </div>
              </div>
            )}

            {mode === 'verify' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP code" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onVerifyOtp} disabled={loading} style={btnPrimary}>Verify</button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onLogin} disabled={loading} style={btnPrimary}>Login</button>
                  <button onClick={() => setMode('forgot_email')} disabled={loading} style={btnGhost}>Forgot password?</button>
                </div>
              </div>
            )}

            {mode === 'forgot_email' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onForgotSendOtp} disabled={loading} style={btnPrimary}>Send OTP</button>
                  <button onClick={() => setMode('login')} disabled={loading} style={btnGhost}>Back</button>
                </div>
              </div>
            )}

            {mode === 'forgot_otp' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit code" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onForgotVerifyOtp} disabled={loading} style={btnPrimary}>Verify OTP</button>
                  <button onClick={() => setMode('login')} disabled={loading} style={btnGhost}>Cancel</button>
                </div>
              </div>
            )}

            {mode === 'forgot_new_password' && (
              <div style={{ display: 'grid', gap: 10 }}>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" style={fieldStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onForgotSetNewPassword} disabled={loading} style={btnPrimary}>Update Password</button>
                </div>
              </div>
            )}

            {message && <div style={{ color: '#34d399' }}>{message}</div>}
            {error && <div style={{ color: '#f87171' }}>{error}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
