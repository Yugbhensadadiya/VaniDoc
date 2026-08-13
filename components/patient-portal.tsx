"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Activity, ArrowLeft, Check, ChevronRight, CircleHelp, Globe2, LogOut, Menu, ShieldCheck, X } from "lucide-react"
import { useState } from "react"

const steps = [
  { label: "Dashboard", href: "/patient/dashboard" },
  { label: "Describe symptoms", href: "/patient/intake" },
  { label: "Your report", href: "/patient/report" },
]

export function PatientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const active = steps.findIndex((step) => pathname === step.href)

  return (
    <div className="min-h-screen bg-[#f5f8fb] text-[#172b3a]">
      <header className="sticky top-0 z-40 border-b border-[#dfe8ee] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/patient/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#0d8f88] text-white shadow-lg shadow-[#0d8f88]/15"><Activity size={21} strokeWidth={2.5} /></span>
            <span className="font-serif text-xl font-bold tracking-tight">Vaani<span className="text-[#0d8f88]">Doc</span></span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Patient navigation">
            {steps.map((step, index) => (
              <Link key={step.href} href={step.href} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active === index ? "bg-[#e5f5f3] text-[#087b75]" : "text-[#718391] hover:bg-[#f2f6f8] hover:text-[#172b3a]"}`}>
                {step.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex"><span className="text-sm text-[#718391]">Hi, Ananya</span><button className="flex size-9 items-center justify-center rounded-full bg-[#e8eef2] text-[#526675]" aria-label="Account"><span className="text-xs font-bold">AS</span></button></div>
          <button className="flex size-10 items-center justify-center rounded-lg border border-[#dfe8ee] md:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        <div className="h-1 bg-[#eef3f5]"><div className="h-full bg-[#0d8f88] transition-all duration-500" style={{ width: `${active < 0 ? 0 : ((active + 1) / steps.length) * 100}%` }} /></div>
        <AnimatePresence>{open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#dfe8ee] bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-1">{steps.map((step) => <Link key={step.href} href={step.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-[#526675]">{step.label}</Link>)}<button className="mt-2 flex items-center gap-2 border-t border-[#eef3f5] px-3 pt-4 text-sm text-[#718391]"><LogOut size={16} /> Sign out</button></div></motion.nav>}</AnimatePresence>
      </header>
      <main>{children}</main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-[#8a9aa5] sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#0d8f88]" /> Your health information is private and secure</span><span>VaaniDoc Patient Portal <span className="mx-2">·</span> <a href="#help" className="underline-offset-4 hover:underline">Need help?</a></span></footer>
    </div>
  )
}

export function PortalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`rounded-2xl border border-[#dfe8ee] bg-white shadow-[0_10px_40px_rgba(38,76,96,0.05)] ${className}`}>{children}</div> }
export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) { return <div className="mb-8"><div className="flex items-center gap-2">{eyebrow && <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0d8f88]">{eyebrow}</span>}</div><h1 className="mt-2 max-w-2xl text-balance font-serif text-3xl font-bold tracking-tight text-[#172b3a] sm:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-pretty leading-6 text-[#718391]">{description}</p>}</div> }
export function PageContainer({ children }: { children: React.ReactNode }) { return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">{children}</div> }
export function ProgressPill({ label, done = false, active = false }: { label: string; done?: boolean; active?: boolean }) { return <div className={`flex items-center gap-2 text-sm font-semibold ${active ? "text-[#0d8f88]" : done ? "text-[#526675]" : "text-[#a0adb5]"}`}><span className={`flex size-6 items-center justify-center rounded-full text-xs ${done ? "bg-[#dff4f1] text-[#0d8f88]" : active ? "bg-[#0d8f88] text-white" : "bg-[#edf2f4]"}`}>{done ? <Check size={14} /> : label.charAt(0)}</span>{label}</div> }
