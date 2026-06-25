'use client'

import { useEffect, useRef } from 'react'

export function VkFeedWidget() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Create widget div
    const widget = document.createElement('div')
    widget.className = 'elfsight-app-07b6674e-a136-406a-afcb-7e8462037629'
    widget.setAttribute('data-elfsight-app-lazy', '')
    ref.current.appendChild(widget)

    // Load script once
    const id = 'elfsight-platform'
    if (!document.getElementById(id)) {
      const script = document.createElement('script')
      script.id = id
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return <div ref={ref} className="w-full" />
}
