import { useEffect, useRef, useState } from 'react'
import { TestimonialCard } from './TestimonialCard'
import type { siteConfig } from '../../config/site'

export function TestimonialsSection() {
  const testimonials = siteConfig.testimonials
  const viewportRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const userInteractingRef = useRef(false)
  const activeInViewRef = useRef(false)
  const autoSlideTimerRef = useRef<number | null>(null)
  const [testimonialActiveIndex, setTestimonialActiveIndex] = useState(0)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || testimonials.length < 2) return

    const getCards = () => Array.from(viewport.querySelectorAll<HTMLElement>('.testimonial'))

    const getTargetLeft = (card: HTMLElement) => {
      const viewportRect = viewport.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      const target = viewport.scrollLeft + cardRect.left - viewportRect.left - paddingLeft
      return Math.min(Math.max(target, 0), maxScroll)
    }

    const getNearestIndex = () => {
      const cards = getCards()
      if (!cards.length) return 0

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      cards.forEach((card, index) => {
        const distance = Math.abs(viewport.scrollLeft - getTargetLeft(card))
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })
      return nearestIndex
    }

    const clearAutoSlide = () => {
      if (autoSlideTimerRef.current) {
        window.clearTimeout(autoSlideTimerRef.current)
        autoSlideTimerRef.current = null
      }
    }

    const scheduleAutoSlide = () => {
      clearAutoSlide()
      if (!activeInViewRef.current || userInteractingRef.current || document.hidden) return

      autoSlideTimerRef.current = window.setTimeout(() => {
        autoSlideTimerRef.current = null
        if (!activeInViewRef.current || userInteractingRef.current || document.hidden) return

        const cards = getCards()
        const currentIndex = getNearestIndex()
        const nextIndex = currentIndex >= cards.length - 1 ? 0 : currentIndex + 1
        const targetCard = cards[nextIndex]
        if (targetCard) {
          viewport.scrollTo({ left: getTargetLeft(targetCard), behavior: 'smooth' })
        }
        scheduleAutoSlide()
      }, 3500)
    }

    const pauseForUser = () => {
      userInteractingRef.current = true
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = window.setTimeout(() => {
        userInteractingRef.current = false
        scheduleAutoSlide()
      }, 1800)
    }

    const updateActiveIndex = () => {
      setTestimonialActiveIndex(getNearestIndex())
    }

    const handlePointerDown = () => pauseForUser()
    const handleWheel = () => pauseForUser()
    const handleTouchStart = () => pauseForUser()
    const handleMouseEnter = () => pauseForUser()
    const handleFocusIn = () => pauseForUser()
    const handleVisibilityChange = () => {
      if (document.hidden) clearAutoSlide()
      else scheduleAutoSlide()
    }

    const observer = new IntersectionObserver(([entry]) => {
      activeInViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) scheduleAutoSlide()
      else clearAutoSlide()
    }, { threshold: 0.25 })

    observer.observe(viewport)
    viewport.addEventListener('pointerdown', handlePointerDown, { passive: true })
    viewport.addEventListener('wheel', handleWheel, { passive: true })
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true })
    viewport.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    viewport.addEventListener('focusin', handleFocusIn)
    viewport.addEventListener('scroll', updateActiveIndex, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    updateActiveIndex()

    return () => {
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      observer.disconnect()
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('touchstart', handleTouchStart)
      viewport.removeEventListener('mouseenter', handleMouseEnter)
      viewport.removeEventListener('focusin', handleFocusIn)
      viewport.removeEventListener('scroll', updateActiveIndex)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [testimonials.length])

  const moveTestimonial = (direction: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('.testimonial'))
    if (!cards.length) return

    const viewportRect = viewport.getBoundingClientRect()
    const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)

    const getTargetLeft = (card: HTMLElement) => {
      const cardRect = card.getBoundingClientRect()
      const target = viewport.scrollLeft + cardRect.left - viewportRect.left - paddingLeft
      return Math.min(Math.max(target, 0), maxScroll)
    }

    let currentIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const distance = Math.abs(viewport.scrollLeft - getTargetLeft(card))
      if (distance < nearestDistance) {
        nearestDistance = distance
        currentIndex = index
      }
    })

    const nextIndex = (currentIndex + direction + cards.length) % cards.length
    viewport.scrollTo({ left: getTargetLeft(cards[nextIndex]), behavior: 'smooth' })
  }
  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-head">
        <h2 id="testimonials-title">Quotes</h2>
      </div>
      <p className="testimonials-subtitle">
        16 gagasan dari tokoh lintas bidang tentang karya, pembelajaran, teknologi, ekonomi, dan kehidupan.
      </p>
      <div className="testimonials-toolbar">
        <span className="testimonial-counter">{String(testimonialActiveIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} PERSPEKTIF</span>
        <div className="testimonial-controls" aria-label="Kontrol quotes">
          <button type="button" aria-label="Quote sebelumnya" onClick={() => moveTestimonial(-1)}>←</button>
          <button type="button" aria-label="Quote berikutnya" onClick={() => moveTestimonial(1)}>→</button>
        </div>
        <span className="testimonial-swipe-hint" aria-hidden="true">GESER ↔</span>
      </div>
      <div ref={viewportRef} className="testimonials-viewport" role="region" aria-roledescription="carousel" aria-label="Koleksi quotes yang dapat digeser">
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name + testimonial.role}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


