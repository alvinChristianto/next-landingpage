/ app/components / Button.tsx - Reusable Button Components
import { ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    variant?: 'primary' | 'secondary' | 'success' | 'whatsapp'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export default function Button({
    children,
    onClick,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button'
}: ButtonProps) {

    const baseClasses = `
    font-semibold text-center inline-flex items-center justify-center
    transition-all duration-300 transform
    focus:outline-none focus:ring-4
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 disabled:hover:shadow-none
  `

    const variants = {
        primary: `
      bg-teal-700 text-white rounded-full
      hover:bg-teal-800 hover:shadow-lg hover:scale-105
      focus:ring-teal-300
    `,
        secondary: `
      bg-white text-teal-700 border-2 border-teal-700 rounded-full
      hover:bg-teal-700 hover:text-white hover:shadow-lg hover:scale-105
      focus:ring-teal-300
    `,
        success: `
      bg-green-600 text-white rounded-lg
      hover:bg-green-700 hover:shadow-lg hover:scale-105
      focus:ring-green-300
    `,
        whatsapp: `
      bg-green-600 text-white rounded-lg
      hover:bg-green-700 hover:shadow-lg hover:scale-105
      focus:ring-green-300
      relative overflow-hidden
      before:absolute before:top-0 before:left-0 before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
      before:opacity-0 hover:before:opacity-20 before:transform before:skew-x-12
      before:transition-all before:duration-700 before:translate-x-[-200%]
      hover:before:translate-x-[200%]
    `
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    const classes = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `.replace(/\s+/g, ' ').trim()

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

// app/components/AnimatedButton.tsx - Buttons with special animations
interface AnimatedButtonProps extends ButtonProps {
    animation?: 'pulse' | 'bounce' | 'glow' | 'shimmer'
}

export function AnimatedButton({
    animation = 'glow',
    className = '',
    ...props
}: AnimatedButtonProps) {

    const animations = {
        pulse: 'animate-pulse',
        bounce: 'animate-bounce-slow',
        glow: 'shadow-glow hover:shadow-glow-lg',
        shimmer: `
      relative overflow-hidden
      before:absolute before:top-0 before:left-0 before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
      before:opacity-0 hover:before:opacity-30 before:transform before:skew-x-12
      before:transition-all before:duration-1000 before:translate-x-[-200%]
      hover:before:translate-x-[200%]
    `
    }

    return (
        <Button
            {...props}
            className={`${animations[animation]} ${className}`}
        />
    )
}

// app/components/IconButton.tsx - Buttons with icons
import { ReactElement } from 'react'

interface IconButtonProps extends ButtonProps {
    icon?: ReactElement
    iconPosition?: 'left' | 'right'
}

export function IconButton({
    icon,
    iconPosition = 'left',
    children,
    className = '',
    ...props
}: IconButtonProps) {

    return (
        <Button {...props} className={`flex items-center gap-2 ${className}`}>
            {icon && iconPosition === 'left' && (
                <span className="text-lg">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className="text-lg">{icon}</span>
            )}
        </Button>
    )
}

// Usage examples:

// Basic usage:
// <Button variant="primary" size="lg">Pesan Sekarang</Button>

// With href (link):
// <Button href="/#search" variant="primary">Lihat Kamar</Button>

// Animated button:
// <AnimatedButton variant="primary" animation="glow">Special Offer</AnimatedButton>

// Button with icon:
// <IconButton 
//   variant="whatsapp" 
//   icon={<span>📱</span>}
//   onClick={handleWhatsApp}
// >
//   Hubungi via WhatsApp
// </IconButton>

// Loading button:
// <Button disabled={isLoading} variant="primary">
//   {isLoading ? 'Processing...' : 'Submit'}
// </Button>

// Example implementation in contact form:
/*
import { IconButton, AnimatedButton } from '@/components/Button'

const handleWhatsApp = () => {
  // WhatsApp logic
}

return (
  <div className="space-y-4">
    <IconButton
      variant="whatsapp"
      icon={<span>💬</span>}
      onClick={handleWhatsApp}
      size="lg"
      className="w-full"
    >
      Kirim Pesan via WhatsApp
    </IconButton>
    
    <AnimatedButton
      variant="primary"
      animation="shimmer"
      href="/#rooms"
      size="md"
    >
      Lihat Penawaran Spesial
    </AnimatedButton>
  </div>
)
*/