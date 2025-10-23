import { useRef, useEffect, useState, Suspense, lazy } from 'react';
import './SplineHero.css';

// Lazy load Spline to reduce initial bundle size
const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineHero = () => {
    const splineRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const scrollTimeout = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    // Pause Spline when scrolling for better performance
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolling(true);

                    // Clear existing timeout
                    if (scrollTimeout.current) {
                        clearTimeout(scrollTimeout.current);
                    }

                    // Resume after scrolling stops
                    scrollTimeout.current = setTimeout(() => {
                        setIsScrolling(false);
                    }, 150);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    // Pause Spline when out of viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Handle Spline load and apply performance settings
    const onSplineLoad = (spline) => {
        splineRef.current = spline;

        // Reduce quality for better performance
        if (spline && spline.setQuality) {
            spline.setQuality(0.7); // 70% quality for performance
        }
    };

    // Pause/resume based on scroll and visibility
    useEffect(() => {
        if (splineRef.current) {
            const shouldPause = isScrolling || !isVisible;

            if (shouldPause && splineRef.current.pause) {
                splineRef.current.pause();
            } else if (!shouldPause && splineRef.current.play) {
                splineRef.current.play();
            }
        }
    }, [isScrolling, isVisible]);

    return (
        <div className='spline-hero-container' ref={containerRef}>
            <Suspense fallback={
                <div className='spline-loading'>
                    <div className='loading-spinner'></div>
                </div>
            }>
                <div style={{
                    opacity: isScrolling ? 0.7 : 1,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: isScrolling ? 'none' : 'auto'
                }}>
                    <Spline
                        scene="https://prod.spline.design/SNBUHn5JMNW4DsBY/scene.splinecode"
                        onLoad={onSplineLoad}
                    />
                </div>
            </Suspense>
            <div className='welcome-overlay'>
                <div className='welcome-content'>
                    <h1 className='welcome-title'>
                        <span className='neon-purple'>Likith Vishal</span>
                    </h1>
                    <p className='welcome-message'>
                        Thanks for visiting my website, please feel free to explore my portfolio
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SplineHero;
