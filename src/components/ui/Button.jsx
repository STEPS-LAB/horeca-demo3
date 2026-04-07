import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-primary-900 text-white lg:hover:bg-primary-800 active:bg-primary-950 shadow-glow-sm lg:hover:shadow-glow',
  secondary: 'border border-primary-900 text-primary-900 lg:hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-primary-900 lg:hover:bg-primary-50 active:bg-primary-100',
  danger: 'bg-red-600 text-white lg:hover:bg-red-700 active:bg-red-800',
  light: 'bg-white text-primary-900 lg:hover:bg-neutral-50 shadow-soft lg:hover:shadow-medium',
}

const sizes = {
  sm: 'h-9 px-4 text-sm rounded-sm',
  md: 'h-11 px-6 text-sm rounded-sm',
  lg: 'h-13 px-8 text-base rounded',
  xl: 'h-14 px-10 text-base rounded',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  as: As = 'button',
  type,
  ...props
}) {
  const isNativeButton = As === 'button'
  const isDisabled = Boolean(disabled || loading)

  return (
    <As
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium font-display tracking-wide transition-all duration-200 active:scale-[0.95] lg:hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        !isNativeButton && isDisabled && 'opacity-50 pointer-events-none',
        className
      )}
      {...(isNativeButton
        ? { disabled: isDisabled, type: type ?? 'button' }
        : { 'aria-disabled': isDisabled || undefined })}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </As>
  )
}
