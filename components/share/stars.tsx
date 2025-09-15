import { Star } from "lucide-react";

export const RenderStars = ({ rating }: { rating: string }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= parseFloat(rating)) {
      stars.push(<Star key={i} className="text-yellow-500 fill-yellow-500" />);
    } else if (i - 0.5 <= parseFloat(rating)) {
      stars.push(
        <div key={i} className="relative w-6 h-6 inline-block">
          {/* CSS trick to get half a star */}
          <Star className="absolute text-yellow-500 fill-white" />
          <Star
            className="absolute text-yellow-500 fill-yellow-500"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      );
    } else {
      stars.push(<Star key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};
