import { useRef, useLayoutEffect, useCallback } from 'react';

export const useDebounce = (callback, delay) => {
	const callbackRef = useRef(callback);
	const timerRef = useRef(null);

	// Keep the callback always up to date
	useLayoutEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const debouncedFunction = useCallback(
		(...args) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		},
		[delay],
	);

	return debouncedFunction;
};
