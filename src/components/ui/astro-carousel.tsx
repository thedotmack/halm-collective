import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";

type CarouselSlide = {
  content: string;
};

interface AstroCarouselProps {
  slides: CarouselSlide[];
  id?: string;
  className?: string;
}

// This is a wrapper component that puts all carousel-related components in a single
// React tree to ensure context works correctly with Astro islands
export function AstroCarousel({ slides, id, className = "" }: AstroCarouselProps) {
  // Store the carousel API to control it programmatically
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Handle changes to the current slide
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Listen for custom events from vanilla JS
  React.useEffect(() => {
    const handleCarouselNavigate = (e: CustomEvent<{ slideIndex: number }>) => {
      if (api && typeof e.detail.slideIndex === 'number') {
        api.scrollTo(e.detail.slideIndex);
      }
    };

    window.addEventListener('carousel-navigate', handleCarouselNavigate as EventListener);
    
    return () => {
      window.removeEventListener('carousel-navigate', handleCarouselNavigate as EventListener);
    };
  }, [api]);

  // Make the carousel API available to the window for external scripts
  React.useEffect(() => {
    if (api) {
      // Expose the API to the window for easier access from Astro scripts
      window.__carouselApi = api;
    }
    return () => {
      if (window.__carouselApi === api) {
        delete window.__carouselApi;
      }
    };
  }, [api]);

  return (
    <Carousel 
      className={`w-full h-full ${className}`} 
      id={id}
      setApi={setApi}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, index) => (
          <CarouselItem 
            key={index} 
            className="bg-white/10 backdrop-blur-md flex items-center justify-center rounded-lg"
          >
            <div className="text-white text-2xl">{slide.content}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

// Add type declaration for window
declare global {
  interface Window {
    __carouselApi?: CarouselApi;
  }
}
