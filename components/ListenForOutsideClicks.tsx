import React, { useEffect, useRef } from "react";

type IListenForOutsideClicksProps = {
    action: () => void;
    children?: JSX.Element; 
    disabled?: boolean;
}

export default function Card(props: IListenForOutsideClicksProps) {
    const { children, action, disabled } = props;
    // Detect clicks outside the component
    const ref = useRef(null);
    // handles a click outside of the div with ref={ref} passed in
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            action();
        }
    };

    useEffect(() => {
        // listen for clicks anywhere the dom
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return disabled 
        ? <div>{children}</div> 
        : <div ref={ref}>{children}</div>;
}
