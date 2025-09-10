'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { products, getRandomProduct, type Product } from '../../data/products';

const Hero: React.FC = () => {
  const router = useRouter();
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const spinDuration = 2500 + Math.random() * 2000;
    const startTime = Date.now();
    const startRotation = rotation;

    const finalProduct = getRandomProduct();
    const finalProductIndex = products.findIndex(p => p.id === finalProduct.id);

    const fullRotations = 4; // fixed to ensure consistent stopping
    const anglePerProduct = 360 / products.length;

    // ensure product always ends at top (270°)
    const finalAngle = 270 - finalProductIndex * anglePerProduct;
    const totalRotation = fullRotations * 360 + finalAngle;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setActiveProduct(finalProduct);

        // snap rotation to exact position to avoid drift/glitch
        const snappedRotation = (360 + (270 - finalProductIndex * anglePerProduct)) % 360;
        setRotation(snappedRotation);
      }
    };

    animate();
  };

  const handleChange = () => {
    router.push(activeProduct.url);
  };

const getProductStyle = (index: number) => {
  const angle = (360 / products.length) * index + rotation;
  const radius = 220;
  const radian = (angle * Math.PI) / 180;

  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius + 60;

  // only show front half arc, fade sides
  const show = y <= 120;

  // horizontal half cut for 0° & 180°
  let clipPath = 'none';
  const normalizedAngle = ((angle % 360) + 360) % 360; 
  if (Math.abs(normalizedAngle - 0) < 5) {
    clipPath = 'inset(0 0 50% 0)'; // cut Top half right
  } else if (Math.abs(normalizedAngle - 180) < 5) {
    clipPath = 'inset(0 0 50% 0)'; // cut top half left
  }

  return {
    transform: `translate(${x}px, ${y}px)`,
    opacity: show ? 1 : 0.4,
    clipPath,
    transition: isSpinning ? 'none' : 'all 0.3s ease',
    zIndex: show ? 10 : 0,
  };
};


  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.svg"
          alt="Sky background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center pt-16 md:pt-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          Change your product for free
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Spine to upgrade your product for the better
        </p>
      </div>

      {/* Buttons + Arrow */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-4">
        <div className="mb-4">
          <Image src="/arrow.svg" alt="Arrow" width={36} height={36} />
        </div>

        <button
          onClick={startSpin}
          disabled={isSpinning}
          className="px-8 py-3 bg-transparent border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm min-w-[120px]"
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>

        <button
          onClick={handleChange}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 font-medium shadow-lg min-w-[120px]"
        >
          Change
        </button>

        <p className="text-white/80 text-sm mt-2 text-center">
          Selected: <span className="font-medium">{activeProduct.name}</span>
        </p>
      </div>

      {/* Ellipse + Products */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-60px] z-10">
        <Image
          src="/ellipse.svg"
          alt="Semi-circle"
          width={1000}
          height={500}
          className="w-[750px] h-[380px] md:w-[1000px] md:h-[500px] translate-y-[60px]"
        />

        {/* Orbiting Products */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] scale-75 sm:scale-90 md:scale-100">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={getProductStyle(index)}
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/bubble.svg"
                    alt="Bubble"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 to-transparent z-20"></div>
    </div>
  );
};

export default Hero;