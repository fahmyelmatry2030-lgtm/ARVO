import { createContext, useContext, useState, ReactNode } from 'react'

type ToastContextType = {
  show: (msg: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const show = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 2500)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div aria-live="polite" className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50">
          <div className="px-4 py-2 bg-black text-white rounded-md shadow-md">{message}</div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
