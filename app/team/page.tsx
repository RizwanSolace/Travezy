import type { Metadata } from 'next'
import { TeamPage } from '@/components/content-page'

export const metadata: Metadata = {
  title: 'Our team | Travezy Global',
  description: 'Meet the thoughtful, women-led travel team behind Travezy Global.',
}

export default function Page(){return <TeamPage/>}
