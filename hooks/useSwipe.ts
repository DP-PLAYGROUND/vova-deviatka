
import { useState, useEffect, useCallback } from 'react';

const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX - touchEndX;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            onSwipeLeft();
        } else if (distance < -minSwipeDistance) {
            onSwipeRight();
        }
        
        setTouchStartX(null);
    }, [touchStartX, onSwipeLeft, onSwipeRight]);

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);
};

export default useSwipe;
