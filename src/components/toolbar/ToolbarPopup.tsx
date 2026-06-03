import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
    className: string,
    show: boolean,
    setShow: (show: boolean) => void,
    origin: React.RefObject<HTMLButtonElement | null>,
    children: React.ReactNode
};

function ToolbarPopup({
    className,
    show,
    setShow,
    origin,
    children
}: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node | null;

            if (
                !nodeRef.current?.contains(target) &&
                !origin.current?.contains(target)
            ) {
                // Close the pop-up
                setShow(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    return (
        <CSSTransition
            in={show}
            nodeRef={nodeRef}
            timeout={300}
            classNames={className}
            mountOnEnter
            unmountOnExit
        >
            <div className={className} ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    );
}

export default ToolbarPopup;