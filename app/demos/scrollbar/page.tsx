import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import ThemedScrollbars from '@/components/demos/ThemedScrollbars'

export const metadata = genPageMetadata({ title: 'Demo: themed scrollbar' })

export default function ScrollbarDemo() {
  return (
    <DemoShell
      title="Themed scrollbar"
      description="Scrollbar colors that follow the site theme. Two scroll regions below, and this page's own scrollbar is themed too while you are here."
      notes={[
        'Toggle light and dark mode to see the thumb and track change.',
        'Uses scrollbar-color, so there is no layout shift. Safari applies it from 18.2; older browsers keep the default scrollbar.',
      ]}
    >
      <ThemedScrollbars />
      <div className="h-[60vh]" aria-hidden="true" />
    </DemoShell>
  )
}
