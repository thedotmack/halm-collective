import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import MenuCarouselContent from './MenuCarouselContent';
import { carouselContent } from './MenuCarouselContent';

const MenuCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    draggable: false, // Disable dragging since we control it via hover
    speed: 20 // Fast transitions between slides
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize the carousel
  useEffect(() => {
    console.log("MenuCarousel mounted");
    
    // Trigger first item to be selected when menu is opened
    setTimeout(() => {
      if (emblaApi) {
        emblaApi.scrollTo(0);
        setSelectedIndex(0);
      }
    }, 100);
  }, [emblaApi]);

  // Set up Embla events
  useEffect(() => {
    if (!emblaApi) return;
    
    // Update selected index when carousel changes
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // Listen for custom events from Astro
  useEffect(() => {
    const handleUpdateCarousel = (event) => {
      console.log("Update carousel event", event.detail);
      if (event.detail && typeof event.detail.index === 'number') {
        if (emblaApi) {
          emblaApi.scrollTo(event.detail.index);
          setSelectedIndex(event.detail.index);
        }
      }
    };

    window.addEventListener('update-carousel', handleUpdateCarousel);
    
    return () => {
      window.removeEventListener('update-carousel', handleUpdateCarousel);
    };
  }, [emblaApi]);

  return (
    <div className="embla h-full">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {carouselContent.map((item, index) => (
            <div 
              key={index} 
              className={`embla__slide flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center ${
                index === selectedIndex ? 'is-selected' : ''
              }`}
            >
              <div className="embla__slide__content">
                <MenuCarouselContent item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCarousel;