"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, FileCheck2, Languages } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageContainer, PatientShell } from "@/components/patient-portal"
const stages = [
  { Icon: Languages, label: "Translating", done: true },
  { Icon: BrainCircuit, label: "Understanding", done: false },
  { Icon: FileCheck2, label: "Building report", done: false },
]

export default function ProcessingPage() { const router = useRouter(); useEffect(() => { const timer = setTimeout(() => router.push("/patient/report"), 2600); return () => clearTimeout(timer) }, [router]); return <PatientShell><PageContainer><div className="flex min-h-[60vh] flex-col items-center justify-center text-center"><div className="relative flex size-28 items-center justify-center rounded-full bg-[#e5f5f3]"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0d8f88]" /><BrainCircuit size={40} className="text-[#0d8f88]" /></div><h1 className="mt-9 font-serif text-3xl font-bold tracking-tight">Preparing your health summary</h1><p className="mt-3 max-w-md leading-6 text-[#718391]">We&apos;re organizing your words into a clear summary for you and your clinician.</p><div className="mt-10 flex flex-col gap-4 text-left sm:flex-row">{stages.map(({ Icon, label, done }) => <div key={label} className="flex items-center gap-3 text-sm font-semibold text-[#718391]"><span className={`flex size-9 items-center justify-center rounded-full ${done ? "bg-[#dff4f1] text-[#0d8f88]" : "bg-[#edf2f4]"}`}><Icon size={17} /></span>{label}</div>)}</div></div></PageContainer></PatientShell> }
