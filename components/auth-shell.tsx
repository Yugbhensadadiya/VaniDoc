'use client'

import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronLeft, Eye, EyeOff, HeartPulse, Languages, LockKeyhole, Mic, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import Link from 'next/link'

type Mode = 'login' | 'register'

const doctorEmail = (email: string) => email.trim().toLowerCase().includes('@doctor.') || email.trim().toLowerCase().endsWith('@doctor.com')

export function AuthShell({ mode }: { mode: Mode }) {
  const isLogin = mode === 'login'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [remember, setRemember] = useState(true)
  const [terms, setTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!isLogin && !terms) return setError('Please accept the terms to continue.')
    if (!email.includes('@')) return setError('Enter a valid email address.')
    setSubmitted(true)
    const destination = doctorEmail(email) ? '/doctor/dashboard' : '/patient/dashboard'
    window.setTimeout(() => { window.location.href = destination }, 900)
  }

  return <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-[#0f172a]">
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
      <BrandPanel mode={mode} />
      <section className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <Link href="/" className="absolute left-5 top-6 inline-flex items-center gap-1 text-sm font-semibold text-[#64748b] transition hover:text-[#0ea5e9] sm:left-8 lg:left-12"><ChevronLeft size={16} /> Back to home</Link>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[460px] rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,.1)] backdrop-blur-xl sm:p-9">
          <div className="mb-8"><div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#e0f2fe] text-[#0284c7] lg:hidden"><HeartPulse size={23} /></div><p className="mb-2 text-sm font-bold text-[#0ea5e9]">VaaniDoc healthcare</p><h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[#0f172a] sm:text-4xl">{isLogin ? 'Sign in' : 'Create account'}</h1><p className="mt-2 text-sm leading-6 text-[#64748b]">{isLogin ? 'Access your VaaniDoc account.' : 'Start using AI-powered healthcare assistance.'}</p></div>
          <AnimatePresence mode="wait">{submitted ? <motion.div key="success" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[300px] flex-col items-center justify-center text-center"><div className="mb-5 grid size-16 place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]"><Check size={30} /></div><h2 className="font-display text-2xl font-bold">You&apos;re all set</h2><p className="mt-2 text-sm text-[#64748b]">Taking you to your {doctorEmail(email) ? 'doctor' : 'patient'} portal...</p></motion.div> : <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="flex flex-col gap-4">
            {!isLogin && <Field label="Full name" name="name" placeholder="Dr. Ananya Sharma" />}
            <Field label="Email address" name="email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            {!isLogin && <Field label="Phone number" name="phone" type="tel" placeholder="+91 98765 43210" />}
            <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#334155]">Password</label><div className="relative"><input id="password" name="password" required minLength={6} type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="h-12 w-full rounded-xl border border-[#dbe5ec] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#a8b6c2] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0ea5e9]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            {!isLogin && <div><label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#334155]">Confirm password</label><div className="relative"><input id="confirmPassword" name="confirmPassword" required minLength={6} type={showConfirm ? 'text' : 'password'} placeholder="••••••••" className="h-12 w-full rounded-xl border border-[#dbe5ec] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#a8b6c2] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10" /><button type="button" aria-label={showConfirm ? 'Hide password' : 'Show password'} onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0ea5e9]">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>}
            {isLogin ? <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-[#64748b]"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="size-4 accent-[#0ea5e9]" /> Remember me</label><button type="button" className="font-semibold text-[#0284c7] hover:underline">Forgot password?</button></div> : <label className="flex items-start gap-2 text-sm leading-5 text-[#64748b]"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="mt-1 size-4 accent-[#0ea5e9]" /> I agree to the <button type="button" className="font-semibold text-[#0284c7]">Terms and Privacy Policy</button></label>}
            {error && <p role="alert" className="rounded-xl bg-[#fef2f2] px-3 py-2 text-sm font-medium text-[#dc2626]">{error}</p>}
            <button type="submit" className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,233,.25)] transition hover:-translate-y-0.5 hover:bg-[#0284c7]">{isLogin ? 'Sign in' : 'Create account'} <ArrowRight size={17} /></button>
          </motion.form>}</AnimatePresence>
          {!submitted && <><div className="my-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]"><span className="h-px flex-1 bg-[#e2e8f0]" /> Role detection is automatic <span className="h-px flex-1 bg-[#e2e8f0]" /></div><div className="rounded-2xl border border-[#bae6fd] bg-[#f0f9ff] p-4"><div className="flex gap-3"><Sparkles className="mt-0.5 shrink-0 text-[#0284c7]" size={17} /><div><p className="text-sm font-bold text-[#0f172a]">Smart account classification</p><p className="mt-1 text-xs leading-5 text-[#64748b]">Regular emails open the Patient Portal. Emails like <span className="font-semibold text-[#334155]">doctor@doctor.com</span> automatically open the Doctor Portal.</p></div></div></div><div className="mt-6 flex items-center justify-between text-xs font-semibold text-[#64748b]"><span className="inline-flex items-center gap-1.5"><LockKeyhole size={14} className="text-[#14b8a6]" /> Secure login</span><span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#14b8a6]" /> Privacy protected</span></div><p className="mt-7 text-center text-sm text-[#64748b]">{isLogin ? 'Don’t have an account?' : 'Already have an account?'} <Link href={isLogin ? '/register' : '/login'} className="font-bold text-[#0284c7] hover:underline">{isLogin ? 'Register' : 'Sign in'}</Link></p></>}
        </motion.div>
      </section>
    </div>
  </main>
}

function Field({ label, name, type = 'text', placeholder, value, onChange }: { label: string; name: string; type?: string; placeholder: string; value?: string; onChange?: (value: string) => void }) { return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#334155]">{label}</label><input id={name} name={name} type={type} required placeholder={placeholder} value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} className="h-12 w-full rounded-xl border border-[#dbe5ec] bg-white px-4 text-sm outline-none transition placeholder:text-[#a8b6c2] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10" /></div> }

function BrandPanel({ mode }: { mode: Mode }) { const isLogin = mode === 'login'; return <section className="relative hidden overflow-hidden bg-[#effaff] px-8 py-10 lg:flex lg:flex-col lg:justify-between lg:px-16 xl:px-24"><div className="absolute -right-28 -top-28 size-80 rounded-full bg-[#bae6fd]/50 blur-3xl" /><div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-[#99f6e4]/30 blur-3xl" /><div className="relative"><Link href="/" className="inline-flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20"><HeartPulse size={23} /></span><span className="font-display text-2xl font-bold tracking-[-.04em] text-[#0f172a]">Vaani<span className="text-[#14b8a6]">Doc</span></span></Link><div className="mt-20 max-w-xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#bae6fd] bg-white/70 px-3 py-1.5 text-xs font-bold text-[#0284c7]"><Sparkles size={14} /> AI-powered care, made inclusive</div><h2 className="font-display text-balance text-5xl font-bold leading-[1.06] tracking-[-.06em] text-[#0f172a] xl:text-6xl">{isLogin ? 'Welcome back to VaaniDoc' : 'Create your VaaniDoc account'}</h2><p className="mt-6 max-w-lg text-lg leading-8 text-[#64748b]">{isLogin ? 'Bridging language barriers in healthcare with AI.' : "Join India’s multilingual healthcare revolution."}</p></div></div><div className="relative mt-12"><div className="grid gap-3 sm:grid-cols-2"><Benefit icon={Languages} text="22+ Indian languages" /><Benefit icon={Mic} text="AI symptom detection" /><Benefit icon={ShieldCheck} text="Privacy first" /><Benefit icon={Stethoscope} text="Rural optimized" /></div><div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm"><div className="grid size-10 place-items-center rounded-xl bg-[#dcfce7] text-[#16a34a]"><Check size={19} /></div><div className="flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Simple workflow</p><div className="mt-1 flex items-center gap-2 text-sm font-bold text-[#334155]"><span>Patient</span><ArrowRight size={14} className="text-[#0ea5e9]" /><span>AI processing</span><ArrowRight size={14} className="text-[#14b8a6]" /><span>Doctor report</span></div></div></div></div></section> }
function Benefit({ icon: Icon, text }: { icon: typeof Languages; text: string }) { return <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/70 p-4 shadow-sm"><span className="grid size-9 place-items-center rounded-xl bg-[#e0f2fe] text-[#0284c7]"><Icon size={17} /></span><span className="text-sm font-bold text-[#334155]">{text}</span></div> }
