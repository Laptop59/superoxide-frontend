import { createContext, useCallback, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
    className: string,
    show: boolean,
    setShow: (show: boolean) => void,
    origin: React.RefObject<HTMLButtonElement | null>,
    children: React.ReactNode
};

type ToolbarPopupContextType = {
    close: () => void;
};

const ToolbarPopupContext = createContext<ToolbarPopupContextType | null>(null);

function ToolbarPopup({
    className,
    show,
    setShow,
    origin,
    children
}: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const close = useCallback(() => setShow(false), [setShow]);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node | null;

            if (
                !nodeRef.current?.contains(target) &&
                !origin.current?.contains(target)
            ) {
                // Close the pop-up
                close();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [close, origin]);

    return (
        <ToolbarPopupContext.Provider value={{ close }}>
            <CSSTransition
                in={show}
                nodeRef={nodeRef}
                timeout={200}
                classNames={className}
                mountOnEnter
                unmountOnExit
            >
                <div className={className} ref={nodeRef}>
                    {children}
                </div>
            </CSSTransition>
        </ToolbarPopupContext.Provider>
    );
}

export default ToolbarPopup;
export {
    ToolbarPopupContext
};