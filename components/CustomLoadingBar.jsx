"use client"
import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { usePathname, useSearchParams } from 'next/navigation'


const CustomLoadingBar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progress, setProgress] = useState(75)

  useEffect(() => {
    setTimeout(() => {
      setProgress(1000)
    }, 500);
  }, [pathname, searchParams])

  return (<LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />)
}

export default CustomLoadingBar