import { useEffect, useState } from 'react'
import { getApprovedTestimonials } from '../../services/api'
// import { AuroraBackground } from "../../components/ui/aurora-background";
import { lazy, Suspense } from 'react'
const FlickeringGrid = lazy(() => import("../../components/ui/flickering-grid").then(m => ({ default: m.FlickeringGrid })));
const WarpBackground = lazy(() => import("../../components/ui/warp-background").then(m => ({ default: m.WarpBackground })));
import { TextAnimate } from "../../components/ui/text-animate";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
const DirectionAwareHover = lazy(() => import("../../components/ui/direction-aware-hover").then(m => ({ default: m.DirectionAwareHover })));
import { motion } from "motion/react";
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
const Marquee = lazy(() => import("../../components/ui/marquee").then(m => ({ default: m.Marquee })));
import { ShimmerButton } from "../../components/ui/shimmer-button";

export default function HomePage() {
  const [items, setItems] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const data = await getApprovedTestimonials()
        setItems(Array.isArray(data) ? data : [])
      } catch (_) {}
    })()
  }, [])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <Suspense>
          <FlickeringGrid color="rgb(59,130,246)" maxOpacity={0.15} squareSize={6} gridGap={8} flickerChance={0.15} />
        </Suspense>
      </div>
      {/* Hero Section */}
      <section id="home" className="relative z-10 w-full pt-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center text-white">
          <Suspense>
          <WarpBackground className="rounded-2xl border-0 p-6 sm:p-10" beamsPerSide={1} beamDuration={4} beamDelayMax={2}>
          <div className="mx-auto max-w-3xl">
            <TextAnimate
              as="h1"
              animation="blurInUp"
              by="word"
              once
              duration={0.6}
              className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight"
            >
              Expert Laptop & PC Repair in Guwahati
            </TextAnimate>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-blue-100 mx-auto inline-block bg-black/35 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4">
              Same‑day diagnostics, transparent quotes, and skilled repairs for laptops, desktops, and peripherals.
              From cracked screens and weak batteries to data recovery and performance tune‑ups — we get you back up fast.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="/contact">
                <ShimmerButton background="rgba(255,255,255,0.1)" shimmerColor="#ffffff" className="backdrop-blur border-white/20">
                  Contact Us
                </ShimmerButton>
              </a>
            </div>
          </div>
          </WarpBackground>
          </Suspense>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="relative z-10 w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>
          <BentoGrid className="grid-cols-2 md:grid-cols-3">
            {servicesItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={
                  <Suspense>
                    <DirectionAwareHover imageUrl={item.imageUrl}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs opacity-90">{item.description}</p>
                    </DirectionAwareHover>
                  </Suspense>
                }
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Highlights (Bento Grid) */}
      <section className="relative z-10 w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Highlights</h2>
          <BentoGrid className="grid-cols-2 md:grid-cols-3">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Why Choose AKLaptop</h2>
            <p className="mt-2 text-blue-100">Trusted by customers for quick, transparent, and expert service.</p>
          </div>
          <BentoGrid className="grid-cols-2 md:grid-cols-3">
            {benefitItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Customers Say</h2>
        </div>
        <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden">
          <Suspense>
          <Marquee pauseOnHover className="[--duration:60s] [--gap:2.5rem]" respectReducedMotion={false}>
            {firstRow(items).map((t) => (
              <ReviewCard key={t._id} name={t.authorName} body={t.content} rating={t.rating} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:60s] [--gap:2.5rem]" respectReducedMotion={false}>
            {secondRow(items).map((t) => (
              <ReviewCard key={t._id} name={t.authorName} body={t.content} rating={t.rating} />
            ))}
          </Marquee>
          </Suspense>
        </div>
      </section>
    </div>
  );
}

// Simple animated headers for bento grid
const Skeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"
  />
);

const bentoItems = [
  {
    title: "Same‑day Repairs",
    description: "Fast fixes for common issues — screens, batteries, charging ports, and thermal problems — often same‑day.",
    header: (
      <img loading="lazy" decoding="async"
        src="/images/bento/same-day-repairs.jpg"
        alt="Same‑day repairs showcase"
        className="h-40 w-full rounded-xl object-cover md:h-48"
      />
    ),
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Pro Diagnostics",
    description: "Structured thermal, power, and storage checks with clear, human‑readable reports and next‑step advice.",
    header: (
      <img loading="lazy" decoding="async"
        src="/images/bento/pro-diagnostics.jpg"
        alt="Professional diagnostics"
        className="h-40 w-full rounded-xl object-cover md:h-48"
      />
    ),
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Clean Assembly",
    description: "Neat cable management, airflow‑first layouts, and noise‑aware builds for cool, stable performance.",
    header: (
      <img loading="lazy" decoding="async"
        src="/images/bento/clean-assembly.jpg"
        alt="Clean PC assembly"
        className="h-40 w-full rounded-xl object-cover md:h-48"
      />
    ),
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Transparent Quotes",
    description: "Clear pricing with no surprise fees. You’ll get updates at every step before work proceeds.",
    header: (
      <img loading="lazy" decoding="async"
        src="/images/bento/transparent-quotes.jpg"
        alt="Transparent quotes"
        className="h-40 w-full rounded-xl object-cover md:h-48"
      />
    ),
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

function firstRow(arr){
  const half = Math.ceil((arr?.length || 0)/2)
  return (arr || []).slice(0, half)
}
function secondRow(arr){
  const half = Math.ceil((arr?.length || 0)/2)
  return (arr || []).slice(half)
}

function ReviewCard({ name, body, rating }){
  return (
    <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="flex flex-row items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{'★'.repeat(rating || 5)}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">{body}</blockquote>
    </figure>
  )
}

const servicesItems = [
  {
    title: "Laptop Repair",
    description: "Accurate fault‑finding and expert fixes for all brands — batteries, keyboards, charging, thermal and board‑level repairs.",
    imageUrl: "/images/services/laptop-repair.jpg",
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "PC Builds & Upgrades",
    description: "Clean, airflow‑first builds and smart component upgrades (RAM, SSD, GPU) with cable management and BIOS tuning.",
    imageUrl: "/images/services/pc-build.jpg",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Screen Replacement",
    description: "Premium panel replacements for cracked, dim, or flickering displays with color‑accurate options where available.",
    imageUrl: "/images/services/screen-replace.jpg",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Data Recovery",
    description: "Logical recoveries, OS‑level rescue, and sector‑by‑sector cloning from HDDs/SSDs — best effort with integrity checks.",
    imageUrl: "/images/services/data-recovery.jpg",
    className: "md:col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Malware & Tune‑ups",
    description: "Deep cleans, startup optimization, and security hardening — remove bloat, fix slow boots, and improve reliability.",
    imageUrl: "/images/services/malware-tuneup.jpg",
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Software Setup",
    description: "Fresh OS installs, driver configuration, and essential productivity suites — set up right from day one.",
    imageUrl: "/images/services/software-setup.jpg",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

const benefitItems = [
  {
    title: "Fast Turnaround",
    description: "Most issues resolved in 24–48 hours (subject to parts) with proactive status updates.",
    header: (
      <img loading="lazy" decoding="async" src="/images/benefits/fast-turnaround.jpg" alt="Fast turnaround" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-1 sm:col-span-1 md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Affordable Pricing",
    description: "Fair, upfront pricing. No hidden fees. Student discounts available with ID.",
    header: (
      <img loading="lazy" decoding="async" src="/images/benefits/affordable-pricing.jpg" alt="Affordable pricing" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-1 sm:col-span-1 md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Experienced Technicians",
    description: "Years of hands‑on repair experience across laptops, PCs, and peripherals.",
    header: (
      <img loading="lazy" decoding="async" src="/images/benefits/experienced-techs.jpg" alt="Experienced technicians" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-2 sm:col-span-2 md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

