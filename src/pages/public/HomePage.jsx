import { useEffect, useState } from 'react'
import { getApprovedTestimonials } from '../../services/api'
import { lazy, Suspense } from 'react'
const FlickeringGrid = lazy(() => import("../../components/ui/flickering-grid").then(m => ({ default: m.FlickeringGrid })));
const WarpBackground = lazy(() => import("../../components/ui/warp-background").then(m => ({ default: m.WarpBackground })));
import { TextAnimate } from "../../components/ui/text-animate";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
const DirectionAwareHover = lazy(() => import("../../components/ui/direction-aware-hover").then(m => ({ default: m.DirectionAwareHover })));
import { motion } from "motion/react";
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn, IconTools, IconAward, IconHeart, IconQuote } from "@tabler/icons-react";
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
    <div className="relative min-h-screen">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <Suspense>
          <FlickeringGrid color="rgb(59,130,246)" maxOpacity={0.15} squareSize={6} gridGap={8} flickerChance={0.15} />
        </Suspense>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 w-full pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <IconTools className="mx-auto h-16 w-16 text-blue-400 mb-6" />
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Expert Laptop & PC
                <span className="block text-blue-400">Repair in Guwahati</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Same-day diagnostics, transparent quotes, and skilled repairs for laptops, desktops, and peripherals.
                From cracked screens to data recovery — we get you back up fast.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="/contact">
                <ShimmerButton background="rgba(255,255,255,0.1)" className="backdrop-blur border-white/20">
                  Get Started
                </ShimmerButton>
              </a>
              <a href="#services" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/30 hover:bg-white/5">
                <IconAward className="h-4 w-4" />
                Our Services
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="relative z-10 w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <IconTools className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Comprehensive repair solutions for all your technology needs
            </p>
          </motion.div>

          <BentoGrid>
            {servicesItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={
                    <Suspense>
                      <DirectionAwareHover imageUrl={item.imageUrl} />
                    </Suspense>
                  }
                  icon={item.icon}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Highlights (Bento Grid) */}
      <section className="relative z-10 w-full py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <IconAward className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Experience excellence in every repair with our commitment to quality and customer satisfaction
            </p>
          </motion.div>

          <BentoGrid>
            {bentoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <IconHeart className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Trusted by customers for quick, transparent, and expert service
            </p>
          </motion.div>

          <BentoGrid>
            {benefitItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <IconQuote className="mx-auto h-12 w-12 text-green-400 mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Customer Reviews</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              See what our satisfied customers have to say about our repair services
            </p>
          </motion.div>
        </div>

        <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden">
          <Suspense>
            <Marquee pauseOnHover className="[--duration:60s] [--gap:2.5rem] w-screen" respectReducedMotion={false}>
              {firstRow(items).map((t) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ReviewCard name={t.authorName} body={t.content} rating={t.rating} />
                </motion.div>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:60s] [--gap:2.5rem] w-screen" respectReducedMotion={false}>
              {secondRow(items).map((t) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ReviewCard name={t.authorName} body={t.content} rating={t.rating} />
                </motion.div>
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
      <img loading="lazy" decoding="async" width="720" height="320" sizes="(min-width: 768px) 66vw, 100vw"
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
      <img loading="lazy" decoding="async" width="368" height="280" sizes="(min-width: 768px) 33vw, 50vw"
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
      <img loading="lazy" decoding="async" width="419" height="280" sizes="(min-width: 768px) 33vw, 50vw"
        src="/images/bento/clean-assembly.jpg"
        alt="Clean PC assembly"
        className="h-40 w-full rounded-xl object-cover md:h-48"
      />
    ),
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
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
    <figure className="relative h-full w-64 mx-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg shadow-black/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white">{name}</figcaption>
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(rating || 5)}
          </div>
        </div>
      </div>
      <blockquote className="text-sm text-slate-300 leading-relaxed italic">"{body}"</blockquote>
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
      <img loading="lazy" decoding="async" width="620" height="240" sizes="(min-width: 768px) 33vw, 50vw" src="/images/benefits/fast-turnaround.jpg" alt="Fast turnaround" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-1 sm:col-span-1 md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Affordable Pricing",
    description: "Fair, upfront pricing. No hidden fees. Student discounts available with ID.",
    header: (
      <img loading="lazy" decoding="async" width="280" height="280" sizes="(min-width: 768px) 33vw, 50vw" src="/images/benefits/affordable-pricing.jpg" alt="Affordable pricing" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-1 sm:col-span-1 md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Experienced Technicians",
    description: "Years of hands‑on repair experience across laptops, PCs, and peripherals.",
    header: (
      <img loading="lazy" decoding="async" width="620" height="240" sizes="(min-width: 768px) 66vw, 100vw" src="/images/benefits/experienced-techs.jpg" alt="Experienced technicians" className="h-36 w-full rounded-xl object-cover md:h-40" />
    ),
    className: "col-span-2 sm:col-span-2 md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

