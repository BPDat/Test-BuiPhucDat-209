import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  containerRef: RefObject<HTMLDivElement | null>;
  selector: string;
  options?: IntersectionObserverInit;
}

export function useIntersectionObserver({
  containerRef,
  selector,
  options = { threshold: 0.6, root: null },
}: UseIntersectionObserverProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-video-id");
          if (id) {
            setActiveId(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    
    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [containerRef, selector, options.threshold, options.rootMargin, options.root]);

  return activeId;
}
