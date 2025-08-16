'use client'

import React, { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const docHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight
            const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(p)
        }

        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden />
}


