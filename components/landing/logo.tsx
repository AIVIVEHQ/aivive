export function Logo({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const dimensions = {
    sm: 'h-9 w-36',
    default: 'h-12 w-48',
    lg: 'h-[60px] w-60',
  }[size]

  return (
    <img
      src="/logo.png"
      alt="AIVIVE"
      className={`${dimensions} object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]`}
    />
  )
}
