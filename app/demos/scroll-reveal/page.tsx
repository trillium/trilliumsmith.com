import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import ScrollReveal from '@/components/demos/ScrollReveal'

export const metadata = genPageMetadata({ title: 'Demo: scroll-triggered text reveals' })

export default function ScrollRevealDemo() {
  return (
    <DemoShell
      title="Scroll-triggered text reveals"
      description="Scroll down: headings and paragraphs rise into place and divider lines grow from 0 to full width as they enter the window."
      notes={[
        'Chromium and Safari 26+. Elsewhere, and with reduced motion, all text is simply visible.',
      ]}
    >
      <ScrollReveal />
    </DemoShell>
  )
}
