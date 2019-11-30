import { useEffect, useRef } from 'react';

const useChangeEffect = (fn, dependencies, changingValues) => {
    const oldValues = changingValues.map(e => useRef(e));
    const hasValuesChanged = oldValues.some((e, i) => e.current !== changingValues[i]);
    useEffect(() => {
        oldValues.forEach((e, i) => (e.current = changingValues[i]));
    }, [changingValues]);
    useEffect(() => {
        if (hasValuesChanged) {
            fn();
        }
    }, [dependencies]);
};
export { useChangeEffect };
