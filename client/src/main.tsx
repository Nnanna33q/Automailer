'use client'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export default function Hero() {

  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className='text-2xl font-bold'>Automailer</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-start">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
              Deposit & Withdrawal Email Sender
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Send realistic deposit and withdrawal emails from leading crypto wallets with Automailer
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <a
                href="bybit.html"
                className="rounded-md bg-foreground px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hero />
  </StrictMode>,
)