'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function PlaceholderAnimation({ title, placeholders, onChange, onSubmit, className }) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)

  useEffect(() => {
    let interval
    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentPlaceholder(prev => (prev + 1) % placeholders.length)
      }, 1500)
    }
    startAnimation()
    return () => clearInterval(interval)
  }, [placeholders.length])

  const canvasRef = useRef(null)
  const newDataRef = useRef([])
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [animating, setAnimating] = useState(false)

  const draw = useCallback(() => {
    if (!inputRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 800
    ctx.clearRect(0, 0, 800, 800)
    const computedStyles = getComputedStyle(inputRef.current)

    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'))
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
    ctx.fillStyle = '#FFF'
    ctx.fillText(value, 16, 40)

    const imageData = ctx.getImageData(0, 0, 800, 800)
    const pixelData = imageData.data
    const newData = []

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]]
          })
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
    }))
  }, [value])

  useEffect(() => {
    draw()
  }, [value, draw])

  const animate = start => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = []
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i]
          if (current.x < pos) {
            newArr.push(current)
          } else {
            if (current.r <= 0) {
              current.r = 0
              continue
            }
            current.x += Math.random() > 0.5 ? 1 : -1
            current.y += Math.random() > 0.5 ? 1 : -1
            current.r -= 0.05 * Math.random()
            newArr.push(current)
          }
        }
        newDataRef.current = newArr
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800)
          newDataRef.current.forEach(t => {
            const { x: n, y: i, r: s, color: color } = t
            if (n > pos) {
              ctx.beginPath()
              ctx.rect(n, i, s, s)
              ctx.fillStyle = color
              ctx.strokeStyle = color
              ctx.stroke()
            }
          })
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8)
        } else {
          setValue('')
          setAnimating(false)
        }
      })
    }
    animateFrame(start)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !animating) {
      vanishAndSubmit()
    }
  }

  const vanishAndSubmit = () => {
    setAnimating(true)
    draw()

    const value = inputRef.current?.value || ''
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0)
      animate(maxX)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    vanishAndSubmit()
    onSubmit && onSubmit(e)
  }
  return (
    <div className={cn('w-full max-w-xl mx-auto', className)}>
      <section className={cn('p-0.5 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-cyan-500 animate-border')}>
        <form
          className={cn(
            'relative bg-white dark:bg-zinc-800 h-12 rounded-[10px] overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
            value && 'bg-gray-50'
          )}
          onSubmit={handleSubmit}
        >
          <canvas
            className={cn(
              'absolute pointer-events-none  text-base transform scale-50 top-[20%] left-20 sm:left-20 origin-top-left filter invert dark:invert-0 pr-20',
              !animating ? 'opacity-0' : 'opacity-100'
            )}
            ref={canvasRef}
          />
          <div className='h-full hidden sm:flex items-center ml-3 gap-x-2 absolute top-0 left-0'>
            <Search className='size-4' />
            <p className='text-sm'>{title}</p>
          </div>
          <input
            onChange={e => {
              if (!animating) {
                setValue(e.target.value)
                onChange && onChange(e)
              }
            }}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            type='text'
            className={cn(
              'w-full relative text-sm sm:text-base z-50 border-none bg-transparent h-full rounded-lg focus:outline-none focus:ring-0 pl-4 sm:pl-28 pr-20',
              animating && 'text-transparent dark:text-transparent'
            )}
          />

          <button
            disabled={!value}
            type='submit'
            className='absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-md disabled:bg-gray-100 bg-primary dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center'
          >
            <motion.svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M1.57301 16.4347L18 9.39126L1.57301 2.34778L1.56519 7.82604L13.3043 9.39126L1.56519 10.9565L1.57301 16.4347Z'
                fill='white'
                stroke='white'
                stroke-width='0.391304'
              />

              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <motion.path
                d='M5 12l14 0'
                initial={{
                  strokeDasharray: '50%',
                  strokeDashoffset: '50%'
                }}
                animate={{
                  strokeDashoffset: value ? 0 : '50%'
                }}
                transition={{
                  duration: 0.3,
                  ease: 'linear'
                }}
              />
              <path d='M13 18l6 -6' />
              <path d='M13 6l6 6' />
            </motion.svg>
          </button>

          {!value && (
            <div className={'absolute inset-0 left-0 sm:left-20 flex items-center rounded-full pointer-events-none'}>
              <AnimatePresence mode='wait'>
                (
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0
                  }}
                  key={`current-placeholder-${currentPlaceholder}`}
                  animate={{
                    y: 0,
                    opacity: 1
                  }}
                  exit={{
                    y: -15,
                    opacity: 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'linear'
                  }}
                  className='text-xs sm:text-sm font-medium text-text-secondary pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate'
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
                )
              </AnimatePresence>
            </div>
          )}
        </form>
      </section>
    </div>
  )
}