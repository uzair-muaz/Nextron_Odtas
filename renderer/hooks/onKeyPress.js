import { useEffect } from "react";

export const onKeyPress = (callback, targetKey) => {
    useEffect(() => {
        const keyPressHander = (event) => {
            if (event.key === targetKey) {
                callback();
            }
        };
        window.addEventListener('keydown', keyPressHander);
        return () => {
            window.removeEventListener('keydown', keyPressHander);
        }
    }, [callback, targetKey])
};