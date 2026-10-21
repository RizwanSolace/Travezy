import { NextResponse } from 'next/server'

const interests = ['Culture', 'Beach', 'Adventure', 'Family', 'Food'] as const
const budgets = ['Value-minded', 'Balanced', 'Special occasion'] as const
const durations = ['A long weekend', 'About a week', 'Take your time'] as const
const noteHints: Record<(typeof interests)[number], string[]> = {
  Culture: ['culture', 'history', 'temple', 'museum', 'architecture', 'art'],
  Beach: ['beach', 'sea', 'ocean', 'coast', 'island', 'snorkel'],
  Adventure: ['adventure', 'hike', 'hiking', 'trek', 'outdoors', 'active'],
  Family: ['family', 'kids', 'children', 'parents', 'together'],
  Food: ['food', 'foodie', 'cuisine', 'restaurant', 'cooking', 'market'],
}

const destinations = [
  { destination: 'Jaipur & Udaipur', country: 'India', tags: ['Culture', 'Family', 'Food'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week', 'Take your time'], reason: 'Colourful old-city streets, beautiful stays and unhurried palace visits make this a rich introduction to Rajasthan.', experienceIdeas: ['Old-city walk', 'Craft and textile stops', 'Lake-side evening'], suggestedPace: 'Spend a few nights in each city, with room for a slow morning and a spontaneous stop.' },
  { destination: 'Kerala Backwaters & Hills', country: 'India', tags: ['Beach', 'Adventure', 'Family', 'Food'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'A gentle mix of green hills, local flavours and backwater scenery, with plenty of space to slow down.', experienceIdeas: ['Tea-country wander', 'Local cooking experience', 'Backwater cruise'], suggestedPace: 'Pair a couple of nights in the hills with a restful stay by the water.' },
  { destination: 'Kyoto & Osaka', country: 'Japan', tags: ['Culture', 'Food', 'Family'], budgets: ['Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'Traditional lanes and temple gardens meet lively neighbourhoods and memorable food, all connected by easy rail journeys.', experienceIdeas: ['Temple and garden stroll', 'Market tasting', 'Neighbourhood discovery'], suggestedPace: 'Choose a comfortable base in each city and leave one day open for wandering.' },
  { destination: 'Bali: Ubud & the Coast', country: 'Indonesia', tags: ['Beach', 'Adventure', 'Family', 'Food'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'A flexible island stay can blend green inland scenery, relaxed beach time and flavourful local meals.', experienceIdeas: ['Rice terrace visit', 'Balinese food discovery', 'Beach afternoon'], suggestedPace: 'Start inland, then finish with a few quieter days near the coast.' },
  { destination: 'Rome & Florence', country: 'Italy', tags: ['Culture', 'Food', 'Family'], budgets: ['Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week', 'Take your time'], reason: 'Art, architecture and long lunches bring two distinct Italian cities together on a straightforward rail route.', experienceIdeas: ['Historic-centre walk', 'Market lunch', 'Small museum visit'], suggestedPace: 'Keep the sightseeing selective and give each city time for its everyday pleasures.' },
  { destination: 'Queenstown & Wanaka', country: 'New Zealand', tags: ['Adventure', 'Family'], budgets: ['Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'Big mountain and lake scenery creates a lovely base for choosing your own level of outdoor adventure.', experienceIdeas: ['Lakeside trail', 'Scenic drive', 'Easy-going boat outing'], suggestedPace: 'Stay a few nights in each place and build in a weather-flexible day.' },
  { destination: 'Goa, Beyond the Beach', country: 'India', tags: ['Beach', 'Food', 'Family'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week'], reason: 'A slower Goa break can balance quiet beaches with heritage lanes, markets and excellent regional food.', experienceIdeas: ['Heritage neighbourhood walk', 'Local seafood meal', 'Quiet beach morning'], suggestedPace: 'Pick one part of the coast as your base and avoid packing every day.' },
  { destination: 'Istanbul', country: 'Türkiye', tags: ['Culture', 'Food', 'Adventure'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week'], reason: 'Historic landmarks, ferry crossings and neighbourhood food spots make this an energising city escape.', experienceIdeas: ['Ferry across the Bosphorus', 'Bazaar wander', 'Neighbourhood food trail'], suggestedPace: 'Explore one neighbourhood at a time, with a slower afternoon between busy days.' },
  { destination: 'Marrakech & the Atlas foothills', country: 'Morocco', tags: ['Culture', 'Adventure', 'Food'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week'], reason: 'A sensory city stay pairs colourful souks and garden courtyards with an easy escape into mountain scenery.', experienceIdeas: ['Medina with a local guide', 'Garden and design stops', 'Atlas foothill day trip'], suggestedPace: 'Give the medina time, then trade the city bustle for a night in the foothills.' },
  { destination: 'Sri Lanka: coast & tea country', country: 'Sri Lanka', tags: ['Beach', 'Adventure', 'Family', 'Food'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'Scenic rail, tea-covered hills and warm-water coast make for a varied island journey at an easy pace.', experienceIdeas: ['Hill-country train ride', 'Tea estate visit', 'Southern coast day'], suggestedPace: 'Choose two or three bases and let the beautiful train journey connect them.' },
  { destination: 'Ladakh: high roads & quiet monasteries', country: 'India', tags: ['Culture', 'Adventure'], budgets: ['Value-minded', 'Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'High desert landscapes, welcoming mountain villages and monastery visits reward a slower, thoughtful itinerary.', experienceIdeas: ['Acclimatisation day', 'Monastery visit', 'Indus valley drive'], suggestedPace: 'Keep the first days gentle and build in time for altitude and changing weather.' },
  { destination: 'Singapore, beyond the skyline', country: 'Singapore', tags: ['Culture', 'Family', 'Food'], budgets: ['Balanced', 'Special occasion'], durations: ['A long weekend', 'About a week'], reason: 'A compact city makes it easy to mix gardens and architecture with neighbourhood food discoveries.', experienceIdeas: ['Hawker centre tasting', 'Garden by the Bay', 'Heritage neighbourhood walk'], suggestedPace: 'Pick one area each day and leave evenings open for a leisurely meal.' },
  { destination: 'Maldives: a slower island stay', country: 'Maldives', tags: ['Beach', 'Family'], budgets: ['Special occasion'], durations: ['A long weekend', 'About a week', 'Take your time'], reason: 'A calm island escape leaves space for clear-water swims, unhurried meals and genuinely restful days.', experienceIdeas: ['Lagoon snorkelling', 'Sunset boat ride', 'A day with no plans'], suggestedPace: 'Settle into one island and keep the schedule deliberately light.' },
  { destination: 'Nepal: Kathmandu & the foothills', country: 'Nepal', tags: ['Culture', 'Adventure', 'Family'], budgets: ['Value-minded', 'Balanced'], durations: ['About a week', 'Take your time'], reason: 'Historic squares and Himalayan foothill views create a rewarding mix without needing an ambitious trek.', experienceIdeas: ['Old-town heritage walk', 'Easy foothills hike', 'Local momo tasting'], suggestedPace: 'Balance busy city sights with a few quiet nights in the hills.' },
  { destination: 'Cape Town & the Winelands', country: 'South Africa', tags: ['Adventure', 'Beach', 'Food', 'Family'], budgets: ['Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'Ocean views, mountain trails and a lively food scene make this a flexible base for an active or relaxed break.', experienceIdeas: ['Table Mountain cableway', 'Coastal drive', 'Winelands lunch'], suggestedPace: 'Stay in the city and add one or two easy day trips rather than changing hotels often.' },
  { destination: 'Paris & the Loire Valley', country: 'France', tags: ['Culture', 'Food', 'Family'], budgets: ['Balanced', 'Special occasion'], durations: ['About a week', 'Take your time'], reason: 'Pair a few favourite Paris neighbourhoods with chchateau gardens and smaller-town charm in the Loire.', experienceIdeas: ['Neighbourhood bakery morning', 'Museum of choice', 'Chchateau garden visit'], suggestedPace: 'Keep Paris days focused, then slow down among the Loire towns.' },]

type Input = { interests?: unknown; budget?: unknown; duration?: unknown; brief?: unknown }

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 5000) {
    return NextResponse.json({ error: 'Your trip brief is too long. Please shorten it and try again.' }, { status: 413 })
  }

  let input: Input
  try {
    input = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please send a valid trip brief.' }, { status: 400 })
  }
  if (!input || typeof input !== 'object') {
    return NextResponse.json({ error: 'Please send a valid trip brief.' }, { status: 400 })
  }

  const chosenInterests = input.interests
  if (!Array.isArray(chosenInterests) || chosenInterests.length === 0 || chosenInterests.length > interests.length || chosenInterests.some((item) => typeof item !== 'string' || !interests.includes(item as typeof interests[number]))) {
    return NextResponse.json({ error: 'Choose one or more travel interests from the list.' }, { status: 400 })
  }
  if (typeof input.budget !== 'string' || !budgets.includes(input.budget as typeof budgets[number])) {
    return NextResponse.json({ error: 'Choose a budget style to continue.' }, { status: 400 })
  }
  if (typeof input.duration !== 'string' || !durations.includes(input.duration as typeof durations[number])) {
    return NextResponse.json({ error: 'Choose how long you would like to travel.' }, { status: 400 })
  }
  if (input.brief !== undefined && (typeof input.brief !== 'string' || input.brief.length > 600)) {
    return NextResponse.json({ error: 'Keep your trip note under 600 characters.' }, { status: 400 })
  }

  const selected = chosenInterests as string[]
  const note = typeof input.brief === 'string' ? input.brief.trim() : ''
  const noteText = note.toLowerCase()
  const noteInterests = interests.filter((interest) => noteHints[interest].some((hint) => noteText.includes(hint)))
  const ranked = destinations
    .map((item) => ({ item, score: item.tags.filter((tag) => selected.includes(tag)).length * 3 + item.tags.filter((tag) => noteInterests.includes(tag as typeof interests[number])).length * 2 + (item.budgets.includes(input.budget as string) ? 1 : 0) + (item.durations.includes(input.duration as string) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
  const topScore = ranked[0]?.score ?? 0
  const relevantPool = ranked.filter(({ score }) => score >= topScore - 3)
  for (let index = relevantPool.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[relevantPool[index], relevantPool[swapIndex]] = [relevantPool[swapIndex], relevantPool[index]]
  }
  const recommendations = relevantPool.slice(0, 5).map(({ item }) => ({
      destination: item.destination,
      country: item.country,
      fit: item.tags.filter((tag) => selected.includes(tag)).slice(0, 2).join(' & ') || 'A change of scene',
      reason: item.reason,
      experienceIdeas: item.experienceIdeas,
      suggestedPace: item.suggestedPace,
    }))

  const introduction = note
    ? `Based on your ${selected.join(', ').toLowerCase()} interests, ${input.duration.toString().toLowerCase()} and the note you shared, here are some fresh starting points to explore.`
    : `Based on your ${selected.join(', ').toLowerCase()} interests, ${input.budget.toString().toLowerCase()} budget style and ${input.duration.toString().toLowerCase()}, here are some fresh starting points to explore.`

  return NextResponse.json({ introduction, recommendations }, { headers: { 'Cache-Control': 'no-store' } })
}
