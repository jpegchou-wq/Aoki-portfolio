import { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({ children, delay = 0 }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver( ([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    setIsVisible(true);
                }, delay);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    return (
        <div ref={ref} className={`animated-section ${isVisible ? 'fade-in-up' : 'hidden'}`} style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none' }}>
            {children}
        </div>
    );
}