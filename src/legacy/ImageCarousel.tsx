import { useAnimationFrame } from "framer-motion";
import { useRef, useLayoutEffect } from "react";

interface CarouselRowProps {
  images: string[];
  speed?: number;
  reverse?: boolean;
  height?: string;
}

const CarouselRow = ({
  images,
  speed = 0.1,
  reverse = false,
  height = "h-60",
}: CarouselRowProps) => {
  const x = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial position for reverse scroll
  useLayoutEffect(() => {
    if (containerRef.current && reverse) {
      const scrollWidth = containerRef.current.scrollWidth;
      x.current = -scrollWidth / 2;
      containerRef.current.style.transform = `translateX(${x.current}px)`;
    }
  }, [reverse]);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    const scrollWidth = containerRef.current.scrollWidth / 2;
    const direction = reverse ? 1 : -1;

    x.current += direction * speed * delta;

    // Reset position when past loop point
    if (!reverse && x.current <= -scrollWidth) {
      x.current = 0;
    } else if (reverse && x.current >= 0) {
      x.current = -scrollWidth;
    }

    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div id="ImageCarousel" className="w-screen overflow-hidden bg-neutral-800">
      <div
        ref={containerRef}
        className={`flex gap-8 w-max ${height}`}
        style={{ willChange: "transform" }}
      >
        {[...images, ...images].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`carousel-img-${idx}`}
            className={`w-auto rounded-lg flex-shrink-0 ${height}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselRow;
