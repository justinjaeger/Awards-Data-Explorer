/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
    useEffect(() => {
        (async () => {
            await effect();
        })();
    }, deps);
};

export const useDeepCompareMemoize = (value: any) => {
    const ref = useRef();
    if (!_.isEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
};

export const useDeepCompareEffect = (effect: VoidFunction, deps: any[]) => {
    useEffect(effect, deps.map(useDeepCompareMemoize));
};
