"use client";
import React, { ReactNode, ElementType } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  distance?: number;
  as?: ElementType;
  id?: string;
}

/**
 * A wrapper component that adds scroll-triggered animation to its children
 * when they enter the viewport.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  distance = 40,
  as: Component = 'div',
  id,
  ...props
}: AnimatedSectionProps) {
  const { elementRef, style } = useScrollAnimation({
    delay,
    direction,
    threshold,
    distance,
  });

  return (
    <Component
      ref={elementRef as any}
      className={className}
      style={style}
      id={id}
      {...props}
    >
      {children}
    </Component>
  );
} 