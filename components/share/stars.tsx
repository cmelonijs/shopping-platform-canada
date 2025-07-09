import { Star, StarHalf } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<Star key={i} className="text-yellow-500 fill-yellow-500" />);
        }
        else if (i - 0.5 <= rating) {
            stars.push(<StarHalf key={i} className="text-yellow-500 fill-yellow-500" />);
        }
        else {
            stars.push(<Star key={i} className="text-yellow-500" />);
        }
    }
    
    return (
        <div className="flex space-x-1">
            {stars}
        </div>
    );
};
