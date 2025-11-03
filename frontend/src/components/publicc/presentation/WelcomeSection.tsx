export function WelcomeSection() {
  return (
    <div 
      id="welcome"
      className="relative bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10 shadow-2xl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] rounded-2xl" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Our Analytics Dashboard
        </h2>
        <p className="text-gray-100 leading-relaxed text-lg">
          Explore our comprehensive business metrics and performance indicators.
          This dashboard provides real-time insights into revenue, profit
          margins, and key business analytics. Use the filters below to
          customize your view and focus on the data that matters most to you.
        </p>
      </div>
    </div>
  );
}
