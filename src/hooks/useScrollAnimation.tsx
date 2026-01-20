"use client";
import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

/**
 * Custom hook for adding scroll-triggered fade-in animations when elements enter the viewport
 * 
 * @param options Configuration options for the animation
 * @returns An object with ref to attach to the element and a boolean indicating if element is visible
 */
export default function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    direction = 'up',
    distance = 40,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element is in viewport, set it to visible
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          
          // Once element has appeared, no need to keep observing
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    // Start observing the element when the ref is set
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Clean up the observer when component unmounts
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, delay]);

  // Get the appropriate transform value based on direction
  const getTransformValue = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        default:
          return `translateY(${distance}px)`;
      }
    }
    return 'translate(0)';
  };

  // Computed style for the element
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransformValue(),
    transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
  };

  return { elementRef, isVisible, style };
} 