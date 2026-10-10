import { genPageMetadata } from 'app/seo'
import { ArtBackdrop, GlassCard } from '@/components/demos/ArtBackdrop'
import DemoShell from '@/components/demos/DemoShell'

export const metadata = genPageMetadata({ title: 'Demo: watercolor backdrop + glass cards' })

export default function BackdropDemo() {
  return (
    <>
      <ArtBackdrop />
      <DemoShell
        title="Watercolor backdrop + glass cards"
        description="A fixed backdrop of slowly drifting pastel blobs, with content on frosted-glass cards. This is CSS only; Partiful uses a looping video for the same look."
        notes={[
          'Switch the theme toggle to compare the pastel (light) and jewel-tone (dark) palettes.',
          'With reduced motion on, the blobs stop and only the static gradient remains.',
          'The header goes transparent on this page so the backdrop reaches the top edge.',
        ]}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-xl font-bold">Glass card</h2>
            <p className="mt-2 leading-7">
              Text sits on a translucent, blurred surface. The colors behind the card shift as the
              blobs drift, but the copy stays readable.
            </p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-xl font-bold">Another card</h2>
            <p className="mt-2 leading-7">
              Blur is limited to a handful of large surfaces because <code>backdrop-filter</code> is
              GPU-costly.
            </p>
          </GlassCard>
          <GlassCard className="md:col-span-2">
            <h2 className="text-xl font-bold">Fallbacks</h2>
            <p className="mt-2 leading-7">
              Browsers without <code>backdrop-filter</code>, and people who ask for more contrast or
              less transparency, get a nearly opaque panel instead.
            </p>
          </GlassCard>
        </div>
      </DemoShell>
    </>
  )
}
