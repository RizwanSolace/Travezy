'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CarFront, Home, Menu, Package, Plane, Users, X } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const links = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About us', href: '/about', icon: Users },
  { label: 'Services', href: '/services', icon: Plane },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Packages', href: '/journeys', icon: Package },
  { label: 'Contact us', href: '/contact', icon: CarFront },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const slide = reduceMotion ? 0 : 28
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return <header className="sticky top-0 z-40 border-b border-[#263343]/10 bg-white/95 shadow-[0_4px_24px_-20px_rgba(38,51,67,.45)] backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 lg:px-8">
      <BrandLogo />
      <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full bg-[#f6f7f8] p-1 text-[13px] font-semibold text-[#3d4b5c] lg:flex">{links.map(({ label, href }) => { const active = isActive(href); return <Link key={href} aria-current={active ? 'page' : undefined} className={`rounded-full px-3.5 py-2 transition duration-200 ${active ? 'bg-white text-[#d93672] shadow-sm ring-1 ring-[#d93672]/10' : 'hover:bg-white/75 hover:text-[#d93672]'}`} href={href}>{label}</Link> })}</nav>
      <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-[#ffa51c] px-5 py-3 text-sm font-bold text-[#263343] transition hover:bg-[#e83e78] hover:text-white sm:inline-flex">Plan a trip <ArrowUpRight size={16} /></Link>
      <button aria-label="Open navigation" aria-expanded={open} className="grid size-11 place-items-center rounded-full bg-[#fff1f5] text-[#263343] transition hover:bg-[#f8dce7] lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
    </div>

    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
        <button aria-label="Close navigation" className="absolute inset-0 cursor-default bg-[#17212d]/45 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <motion.aside initial={{ x: slide }} animate={{ x: 0 }} exit={{ x: slide }} transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }} className="absolute bottom-0 right-0 top-0 flex w-[min(86vw,360px)] flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#ffa51c] px-5 py-3"><div className="rounded-md bg-white px-1"><BrandLogo /></div><button aria-label="Close navigation" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full bg-white/70"><X size={18} /></button></div>
          <nav aria-label="Mobile navigation" className="flex flex-col py-3">{links.map(({ label, href, icon: Icon }, index) => { const active = isActive(href); return <motion.div key={href} initial={{ opacity: 0, x: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.035 }}><Link href={href} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 border-b border-[#263343]/5 border-l-4 px-6 py-4 text-sm font-semibold transition ${active ? 'border-l-[#d93672] bg-[#fff1f5] text-[#d93672]' : 'border-l-transparent text-[#3d4b5c] hover:bg-[#fff1f5] hover:text-[#d93672]'}`}><Icon size={17} className={active ? 'text-[#d93672]' : 'text-[#ffa51c]'} />{label}{active && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider">Current</span>}</Link></motion.div> })}</nav>
          <div className="mt-auto bg-[#f6f8fa] p-5"><p className="text-xs leading-5 text-[#677485]">Thoughtful journeys, designed around you.</p><Link href="/contact" onClick={() => setOpen(false)} className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-[#d93672] text-sm font-bold text-white">Let’s start planning <ArrowUpRight size={16} /></Link></div>
        </motion.aside>
      </motion.div>}
    </AnimatePresence>
  </header>
}
