import { AnimatePresence, easeIn, easeOut, motion } from "motion/react";
import React from "react";

import { ARROW_DOWN_FILLED, ARROW_DOWN_OUTLINE } from "@/assets/icons";
import { cn } from "@/lib/utils";

import { Button } from "./button";

type tDropdownButton<T extends string> = {
    render?: React.ReactNode;
    title: React.ReactNode;
    value: T;
};

interface iDropdown<T extends string> {
    icon?: "filled" | "outlined";
    onChange: (value: T) => void;
    options: tDropdownButton<T>[];
    styles?: Record<string, string>;
    value?: T;
}

export function Dropdown<T extends string>({
    icon,
    onChange,
    options,
    styles,
    value,
}: iDropdown<T>) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const parentWrapperRef = React.useRef<HTMLElement | null>(null);

    const listVariants = {
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: 1,
            },
        },
        closed: {
            opacity: 0,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: 0,
            },
        },
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.25,
                ease: easeOut,
            },
        },
        closed: {
            y: -15,
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: easeIn,
            },
        },
    };

    function handleSelect(value: T) {
        onChange(value);
        setIsOpen(false);
    }

    React.useEffect(function () {
        function handleClickOutside(event: MouseEvent) {
            if (
                parentWrapperRef.current &&
                !parentWrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <section ref={parentWrapperRef} className={cn(styles?.parentWrapper, "relative w-max")}>
            <Button
                className={cn(
                    styles?.parentButton,
                    "h-7 w-28 rounded-xs text-white",
                    isOpen && "bg-primary/90",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-xs capitalize">
                    {options.find((item) => item.value === value)?.title}
                </span>
                <i className={cn("transition-transform duration-150", isOpen && "rotate-180")}>
                    {icon === "filled" ? ARROW_DOWN_FILLED() : ARROW_DOWN_OUTLINE()}
                </i>
            </Button>

            <AnimatePresence>
                {isOpen ? (
                    <motion.ul
                        className="absolute top-[105%] z-5 w-full"
                        key={"home-dropdown"}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={listVariants}
                    >
                        {options.map((item, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                className="bg-black100 flex h-7 items-center justify-start"
                            >
                                <button
                                    onClick={() => handleSelect(item.value)}
                                    className="size-full"
                                >
                                    <span className="ml-5 flex items-center justify-start text-xs text-white capitalize">
                                        {item.render ?? item.title}
                                    </span>
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : null}
            </AnimatePresence>
        </section>
    );
}
