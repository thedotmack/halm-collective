import React from 'react';

export const carouselContent = [
  {
    id: "hero",
    title: "HALM COLLECTIVE",
    description: "A unique wellness and community space designed to nourish mind, body, and spirit."
  },
  {
    id: "pillars",
    title: "WELLNESS",
    description: "Holistic wellness services tailored to support your personal journey to balance and vitality."
  },
  {
    id: "experience",
    title: "CAFÉ",
    description: "Nourishing, organic foods and beverages crafted to support your wellness journey."
  },
  {
    id: "schedule",
    title: "COMMUNITY",
    description: "Connect with like-minded individuals in a space designed to foster meaningful relationships."
  },
  {
    id: "membership",
    title: "MEMBERSHIP",
    description: "Join our collective and enjoy exclusive benefits, services, and community events."
  },
  {
    id: "footer",
    title: "CONTACT",
    description: "Reach out to us to learn more about our services, events, and membership options."
  }
];

const MenuCarouselContent = ({ item }) => {
  return (
    <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm max-w-lg mx-auto text-center">
      <h2 className="text-4xl font-light mb-6 text-white nord-font tracking-wider">{item.title}</h2>
      <p className="text-xl text-white/90 leading-relaxed">{item.description}</p>
      
      {/* Optional decorative element */}
      <div className="mt-6 flex justify-center">
        <img src="/h-point-filled.svg" alt="" className="w-4 h-4 mx-1 opacity-70" />
        <img src="/h-point-outline.svg" alt="" className="w-4 h-4 mx-1 opacity-50" />
        <img src="/h-point-filled.svg" alt="" className="w-4 h-4 mx-1 opacity-70" />
      </div>
    </div>
  );
};

export default MenuCarouselContent;