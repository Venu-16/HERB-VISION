export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-[32px] bg-white/95 border border-white/80 shadow-xl shadow-slate-200/70 p-8 ${className}`}>
      {children}
    </div>
  )
}
