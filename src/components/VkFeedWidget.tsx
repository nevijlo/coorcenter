'use client'

import { useEffect } from 'react'

export function VkFeedWidget() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="elfsight"]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="elfsight-app-07b6674e-a136-406a-afcb-7e8462037629" data-elfsight-app-lazy />
    </div>
  )
}
