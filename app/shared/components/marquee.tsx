"use client";

interface MarqueeTextProps {
  text?: string;
  speed?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text = "🔥 ফ্রি ডেলিভারি সারা বাংলাদেশে | ক্যাশ অন ডেলিভারি | ৭ দিনের রিটার্ন গ্যারান্টি | ১০০% অরিজিনাল প্রোডাক্ট 🔥",
  speed = 20,
}) => {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary text-white py-2.5 shadow-sm">
      <div 
        className="flex whitespace-nowrap hover:pause-animation"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block text-sm md:text-base font-medium px-8">
          {text}
        </span>
        <span className="inline-block text-sm md:text-base font-medium px-8">
          {text}
        </span>
        <span className="inline-block text-sm md:text-base font-medium px-8">
          {text}
        </span>
        <span className="inline-block text-sm md:text-base font-medium px-8">
          {text}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;