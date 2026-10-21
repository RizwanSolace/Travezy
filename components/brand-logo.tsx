import Image from 'next/image'
import Link from 'next/link'

export function BrandLogo() {
  return (
    <Link href="/" aria-label="Travezy Global home" className="group inline-flex shrink-0 items-center">
      <Image
        src="/travezy-logo.png"
        alt="Travezy Global"
        width={112}
        height={96}
        priority
        className="h-[58px] w-[70px] object-contain transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.03]"
      />
    </Link>
  )
}
