'use client';

import React, { useState, useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Image from 'next/image';

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface AppleCardsCarouselProps {
  cards: Card[];
}

const AppleCardsCarousel: React.FC<AppleCardsCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = cards.length - 1;
      if (nextIndex >= cards.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full p-8 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl transform transition-transform hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 relative h-64 md:h-full">
                    <Image
                      src={cards[currentIndex].imageUrl}
                      alt={cards[currentIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">{cards[currentIndex].title}</h2>
                    <p className="text-gray-600 text-lg">{cards[currentIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors z-10"
          onClick={() => paginate(-1)}
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors z-10"
          onClick={() => paginate(1)}
        >
          <IoChevronForward className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppleCardsCarousel; 