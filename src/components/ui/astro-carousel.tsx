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

  // Track scroll progress for smooth radial menu animation
  React.useEffect(() => {
    if (!api) return;
    
    const onScroll = () => {
      // Get the current progress position
      const progress = api.scrollProgress();
      const scrollSnaps = api.scrollSnapList();
      const slidesCount = scrollSnaps.length;
      
      // Calculate the sliding position between slides (from 0 to slides.length-1)
      // This gives us a floating point that represents position between slides
      const slidePosition = progress * (slidesCount - 1);
      
      // Emit custom event with current scroll position
      window.dispatchEvent(new CustomEvent('carousel-scroll-progress', {
        detail: { 
          slidePosition,
          progress,
          snapPoints: scrollSnaps 
        }
      }));
    };
    
    // Register scroll event
    api.on("scroll", onScroll);
    
    return () => {
      api.off("scroll", onScroll);
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
      className={`w-full h-[88%] flex items-center ${className}`} 
      id={id}
      setApi={setApi}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, index) => (
          <CarouselItem 
            key={index} 
            className="flex items-center justify-center h-full"
          >
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div 
              className="text-white w-full max-w-2xl mx-auto px-4"
              dangerouslySetInnerHTML={{ __html: slide.content }}
            />
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
