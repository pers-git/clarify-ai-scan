import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import sample images
import sample1 from "@/assets/sample1.jpg";
import sample2 from "@/assets/sample2.jpg";
import sample3 from "@/assets/sample3.jpg";
import sample4 from "@/assets/sample4.jpg";
import sample5 from "@/assets/sample5.jpg";
import sample6 from "@/assets/sample6.jpg";

interface DetectedImage {
  id: string;
  src: string;
  aiProbability: number;
  isReal: boolean;
  title: string;
}

const sampleImages: DetectedImage[] = [
  {
    id: "1",
    src: sample1,
    aiProbability: 15,
    isReal: true,
    title: "Professional Headshot"
  },
  {
    id: "2", 
    src: sample2,
    aiProbability: 8,
    isReal: true,
    title: "Nature Photography"
  },
  {
    id: "3",
    src: sample3,
    aiProbability: 94,
    isReal: false,
    title: "Digital Artwork"
  },
  {
    id: "4",
    src: sample4,
    aiProbability: 22,
    isReal: true,
    title: "Food Photography"
  },
  {
    id: "5",
    src: sample5,
    aiProbability: 88,
    isReal: false,
    title: "Fantasy Art"
  },
  {
    id: "6",
    src: sample6,
    aiProbability: 12,
    isReal: true,
    title: "Street Photography"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % sampleImages.length;
      images.push({ ...sampleImages[index], position: i });
    }
    return images;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3">Previously Detected Images</h3>
        <p className="text-muted-foreground">
          See real examples of our AI detection in action
        </p>
      </div>

      <div 
        className="relative overflow-hidden rounded-xl bg-gradient-card p-6"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Image Display */}
        <div className="flex items-center justify-center gap-4 px-16">
          {getVisibleImages().map((image, i) => (
            <Card
              key={`${image.id}-${currentIndex}`}
              className={cn(
                "transition-all duration-500 ease-in-out shadow-medium",
                i === 0 && "scale-75 opacity-60",
                i === 1 && "scale-100 opacity-100 z-10",
                i === 2 && "scale-75 opacity-60",
                image.isReal 
                  ? "ring-4 ring-ai-very-low ring-opacity-60" 
                  : "ring-4 ring-ai-high ring-opacity-60"
              )}
            >
              <CardContent className="p-0 relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-64 h-64 object-cover rounded-lg"
                />
                
                {/* Overlay with result */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={image.isReal ? "secondary" : "destructive"}
                      className="text-xs font-semibold"
                    >
                      {image.isReal ? "REAL" : "FAKE"}
                    </Badge>
                    <span className="text-sm font-bold">
                      {image.aiProbability}%
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate">
                    {image.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {sampleImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-ai-very-low"></div>
          <span className="text-sm text-muted-foreground">Human Generated (Real)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-ai-high"></div>
          <span className="text-sm text-muted-foreground">AI Generated (Fake)</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;