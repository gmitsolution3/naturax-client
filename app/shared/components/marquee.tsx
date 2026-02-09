"use client";

interface MarqueeTextProps {
  text?: string;
  speed?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text = "Lingerie spring sale for all bras Discount 30%",
  speed = 25,
}) => {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-pink-600 via-pink-600 to-pink-700 text-white py-2">
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block text-sm font-normal italic px-8">
          {text}
        </span>
        <span className="inline-block text-sm font-normal italic px-8">
          {text}
        </span>
        <span className="inline-block text-sm font-normal italic px-8">
          {text}
        </span>
        <span className="inline-block text-sm font-normal italic px-8">
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
      `}</style>
    </div>
  );
};

export default MarqueeText;