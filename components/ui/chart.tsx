"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>

type ChartContextProps = { config: ChartConfig }
const ChartContext = React.createContext<ChartContextProps | null>(null)

export function ChartContainer({ config, className, children, ...props }: React.ComponentProps<"div"> & { config: ChartConfig }) {
  return <ChartContext.Provider value={{ config }}><div data-chart="chart" className={cn("flex aspect-video justify-center text-xs", className)} {...props}>{children}</div></ChartContext.Provider>
}

export function ChartTooltip(props: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) { return <RechartsPrimitive.Tooltip {...props} /> }
export function ChartTooltipContent({ active, payload, label, className }: any) { if (!active || !payload?.length) return null; return <div className={cn("rounded-lg border bg-background px-3 py-2 text-xs shadow-xl", className)}><p className="mb-1 font-medium">{label}</p>{payload.map((item: any) => <div key={item.dataKey} className="flex items-center justify-between gap-5 text-muted-foreground"><span>{item.name}</span><span className="font-semibold text-foreground">{item.value}</span></div>)}</div> }

export { RechartsPrimitive }
