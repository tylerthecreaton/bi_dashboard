const FOOTER_TEXT = "© 2024 Business Intelligence Dashboard";
const FOOTER_SUBTEXT = "For more detailed analytics, please contact our team.";

export function Footer() {
  return (
    <div 
      id="footer"
      className="relative bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] rounded-2xl" />

      <div className="relative z-10 text-center">
        <p className="text-white/80 text-lg font-medium">{FOOTER_TEXT}</p>
        <p className="text-white/60 mt-3 text-base">{FOOTER_SUBTEXT}</p>
      </div>
    </div>
  );
}
