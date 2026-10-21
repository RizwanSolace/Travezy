'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Compass, LoaderCircle, Sparkles } from 'lucide-react'

const interests = ['Culture', 'Beach', 'Adventure', 'Family', 'Food'] as const
const budgets = ['Value-minded', 'Balanced', 'Special occasion'] as const
const durations = ['A long weekend', 'About a week', 'Take your time'] as const
const destinationImages: Record<string, string> = {
  'Jaipur & Udaipur': 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85',
  'Kerala Backwaters & Hills': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85',
  'Kyoto & Osaka': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',
  'Bali: Ubud & the Coast': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
  'Rome & Florence': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=85',
  'Queenstown & Wanaka': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=85',
  'Goa, Beyond the Beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85',
  Istanbul: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=85',
  'Marrakech & the Atlas foothills': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=85',
  'Sri Lanka: coast & tea country': 'https://images.unsplash.com/photo-1656314938734-28a498f12081?auto=format&fit=crop&w=900&q=85',
  'Ladakh: high roads & quiet monasteries': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
  'Singapore, beyond the skyline': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85',
  'Maldives: a slower island stay': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85',
  'Nepal: Kathmandu & the foothills': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
  'Cape Town & the Winelands': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=85',
  'Paris & the Loire Valley': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85',
}
const fallbackImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'

type Recommendation = { destination: string; country: string; fit: string; reason: string; experienceIdeas: string[]; suggestedPace: string }
type Plan = { introduction: string; recommendations: Recommendation[] }

export function TripPlanner() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Culture', 'Food'])
  const [budget, setBudget] = useState<string>('Balanced')
  const [duration, setDuration] = useState<string>('About a week')
  const [brief, setBrief] = useState('')
  const [plan, setPlan] = useState<Plan | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function toggleInterest(interest: string) {
    setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest])
  }

  async function loadPlan() {
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/trip-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: selectedInterests, budget, duration, brief }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'We could not make your trip suggestions. Please try again.')
      setPlan(data as Plan)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not reach the trip planner. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function createPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPlan(null)
    await loadPlan()
  }

  return <section id="trip-match" className="relative overflow-hidden bg-[#fff0f4] px-5 py-20 sm:py-28 lg:px-8">
    <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-[#ffad32]/35 blur-[90px]" />
    <div className="relative mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div><p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#d93672]"><Sparkles size={15} /> A thoughtful first step</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.04em] sm:text-6xl">Find a trip that feels<br /><span className="italic text-[#d93672]">like your kind of trip.</span></h2></div>
        <p className="max-w-sm text-sm leading-6 text-[#5e6a77]">Share what you’re dreaming about. Our trip matcher uses your interests, budget and travel time to find a few ideas worth exploring.</p>
      </div>

      <div className="grid overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_80px_-48px_rgba(19,44,37,.4)] lg:grid-cols-[.88fr_1.12fr]">
        <form onSubmit={createPlan} className="p-6 sm:p-9 lg:p-10">
          <div className="mb-8 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#263343] text-[#ffad32]"><Compass size={20} /></span><div><p className="font-bold">Tell us about your trip</p><p className="text-xs text-[#84909d]">A few details make a more personal plan</p></div></div>

          <fieldset className="mb-6"><legend className="mb-3 text-xs font-bold text-[#435468]">What do you love doing?</legend><div className="flex flex-wrap gap-2">{interests.map((interest) => <button key={interest} type="button" aria-pressed={selectedInterests.includes(interest)} onClick={() => toggleInterest(interest)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition duration-200 ${selectedInterests.includes(interest) ? 'border-[#263343] bg-[#263343] text-white' : 'border-[#263343]/15 bg-white text-[#5b6877] hover:border-[#d93672]'}`}>{selectedInterests.includes(interest) && <Check size={12} className="mr-1 inline" />}{interest}</button>)}</div></fieldset>

          <fieldset className="mb-6"><legend className="mb-3 text-xs font-bold text-[#435468]">Your budget style</legend><div className="flex flex-wrap gap-2">{budgets.map((item) => <button key={item} type="button" aria-pressed={budget === item} onClick={() => setBudget(item)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${budget === item ? 'border-[#263343] bg-[#263343] text-white' : 'border-[#263343]/15 text-[#5b6877] hover:border-[#d93672]'}`}>{item}</button>)}</div></fieldset>

          <fieldset className="mb-6"><legend className="mb-3 text-xs font-bold text-[#435468]">How long are you going for?</legend><div className="flex flex-wrap gap-2">{durations.map((item) => <button key={item} type="button" aria-pressed={duration === item} onClick={() => setDuration(item)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${duration === item ? 'border-[#263343] bg-[#263343] text-white' : 'border-[#263343]/15 text-[#5b6877] hover:border-[#d93672]'}`}>{item}</button>)}</div></fieldset>

          <label className="block text-xs font-bold text-[#435468]">Anything else we should know? <span className="font-normal text-[#94a097]">Optional</span><textarea value={brief} onChange={(event) => setBrief(event.target.value)} maxLength={600} rows={3} placeholder="A special occasion, who’s coming, a place you’ve always wanted to see…" className="mt-2 w-full resize-y rounded-2xl border border-[#263343]/15 p-4 text-sm font-normal leading-6 outline-none transition placeholder:text-[#9aa89e] focus:border-[#d93672] focus:ring-2 focus:ring-[#d93672]/10" /></label>

          <button disabled={loading || selectedInterests.length === 0} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d93672] px-6 text-sm font-bold text-white transition hover:bg-[#263343] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle size={17} className="animate-spin" /> Finding thoughtful ideas…</> : <><Sparkles size={16} /> Create my trip ideas <ArrowRight size={16} /></>}</button>
          <p className="mt-3 text-center text-[10px] leading-4 text-[#84909d]">A sample trip matcher ranks curated destination ideas from your choices. Nothing is booked; confirm itineraries, prices and availability with a Travezy travel consultant.</p>
        </form>

        <div className="relative min-h-[500px] bg-[#263343] p-6 text-white sm:p-9 lg:p-10">
          <div className="absolute right-8 top-8 size-36 rounded-full bg-[#ffad32]/10 blur-3xl" />
          {!plan && !loading && !error && <div className="relative flex min-h-[450px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-[1.4rem] bg-[#ffad32] text-[#263343]"><Sparkles size={27} /></span><p className="mt-6 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#ffad32]">Your trip, your way</p><h3 className="mt-3 max-w-md font-serif text-3xl sm:text-4xl">Let’s see where your brief takes us.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/65">Your recommendations will show up here, shaped around your interests and travel style.</p></div>}
          {loading && <div role="status" className="relative flex min-h-[450px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full border border-[#ffad32]/40 text-[#ffad32]"><LoaderCircle size={27} className="animate-spin" /></span><h3 className="mt-6 font-serif text-3xl">Finding your somewhere…</h3><p className="mt-2 text-sm text-white/65">Putting your interests, pace and budget together.</p></div>}
          {error && <div role="alert" className="relative flex min-h-[450px] flex-col items-center justify-center text-center"><span className="grid size-14 place-items-center rounded-full bg-white/10 text-[#ffad32]"><Compass size={24} /></span><h3 className="mt-5 font-serif text-3xl">We hit a small bump.</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/75">{error}</p><button type="button" onClick={() => setError('')} className="mt-6 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold hover:border-[#ffad32] hover:text-[#ffad32]">Back to my trip brief</button></div>}
          {plan && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#ffad32]">Ideas shaped around your brief</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">Your trip shortlist.</h3><p className="mt-3 text-sm leading-6 text-white/75">{plan.introduction}</p><div aria-live="polite" className="mt-6 grid gap-4">{plan.recommendations.map((recommendation, index) => <article key={`${recommendation.destination}-${index}`} className="grid overflow-hidden rounded-[1.2rem] bg-white text-[#263343] sm:grid-cols-[170px_1fr]"><div className="relative min-h-36 sm:min-h-full"><img src={destinationImages[recommendation.destination] ?? fallbackImage} alt={`Travel inspiration for ${recommendation.destination}`} className="absolute inset-0 size-full object-cover" /><span className="absolute left-3 top-3 rounded-full bg-[#ffad32] px-3 py-1 text-[10px] font-extrabold uppercase">{index === 0 ? 'First thought' : `Idea 0${index + 1}`}</span></div><div className="p-4 sm:p-5"><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#d93672]">{recommendation.country} · {recommendation.fit}</p><h4 className="mt-1 font-serif text-2xl">{recommendation.destination}</h4><p className="mt-2 text-xs leading-5 text-[#5e6a77]">{recommendation.reason}</p><div className="mt-3 flex flex-wrap gap-1.5">{recommendation.experienceIdeas.map((idea) => <span key={idea} className="rounded-full bg-[#f7f8fa] px-2.5 py-1 text-[10px] text-[#5b6877]">{idea}</span>)}</div><p className="mt-3 border-t border-[#263343]/10 pt-3 text-[11px] leading-5 text-[#5e6a77]"><strong className="text-[#263343]">A pace to try:</strong> {recommendation.suggestedPace}</p><Link href={`/contact?destination=${encodeURIComponent(recommendation.destination)}&interest=${encodeURIComponent(selectedInterests.join(', '))}&budget=${encodeURIComponent(budget)}&duration=${encodeURIComponent(duration)}&brief=${encodeURIComponent(brief)}`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#d93672] hover:text-[#263343]">Plan this with Travezy <ArrowRight size={14} /></Link></div></article>)}</div><div className="mt-5 flex flex-wrap items-center gap-5"><button type="button" disabled={loading} onClick={loadPlan} className="inline-flex items-center gap-2 rounded-full bg-[#ffad32] px-5 py-2.5 text-xs font-bold text-[#263343] transition hover:bg-white disabled:opacity-60">{loading ? <LoaderCircle size={14} className="animate-spin" /> : <Sparkles size={14} />} Show me another mix</button><button type="button" onClick={() => setPlan(null)} className="text-xs font-semibold text-[#ffad32] underline underline-offset-4 hover:text-white">Adjust my trip brief</button></div></motion.div>}
        </div>
      </div>
    </div>
  </section>
}
