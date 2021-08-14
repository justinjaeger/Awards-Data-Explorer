import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
    useEffect(() => {
        (async () => {
            await effect();
        })();
    }, deps);
};
