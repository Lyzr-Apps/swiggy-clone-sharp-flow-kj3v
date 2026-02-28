import dynamic from 'next/dynamic'

export const revalidate = 0

const SwiggyApp = dynamic(() => import('./SwiggyApp'), { ssr: false })

export default function Page() {
  return <SwiggyApp />
}
