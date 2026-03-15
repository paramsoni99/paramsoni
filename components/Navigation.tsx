'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#contact', label: 'Contact' },
  ]

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    if (href.startsWith('/#') && pathname === '/') {
      const el = document.querySelector(href.replace('/', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="relative text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              Param.dev
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="navbar-highlight"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-accent"
                      style={{ boxShadow: '0 0 8px var(--glow-color)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/10 transition-all"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={resolvedTheme}
                      initial={{ y: -10, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 10, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {resolvedTheme === 'dark' ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}
            </div>

            {/* Mobile: Theme Toggle + Hamburger */}
            <div className="flex items-center gap-1 md:hidden">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/10 transition-all"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors"
                aria-label="Toggle navigation"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-strong md:hidden"
            >
              <div className="flex flex-col pt-20 px-6 gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive(item.href)
                          ? 'bg-accent/15 text-accent'
                          : 'text-foreground/80 hover:text-foreground hover:bg-accent/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
