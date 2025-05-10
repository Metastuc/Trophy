import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { ARROW_DOWN } from "./icons";
import { Button } from "./ui/button";

type tDROPDOWN_BUTTON = {
    title: string;
    value: string;
};

const DROPDOWN_BUTTONS: Array<tDROPDOWN_BUTTON> = [
    {
        title: "Trending",
        value: "trending",
    },
    {
        title: "Following",
        value: "following",
    },
    {
        title: "All",
        value: "all",
    },
];

export default function Component({ content, setContent }: iHomeDropdown) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const headerRef = React.useRef<HTMLDivElement>(null);

    const listVariants = {
        open: {
            transition: {
                staggerChildren: 0.1,
                staggerDirection: 1,
            },
        },
        closed: {
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
        closed: {
            opacity: 0,
            y: -30,
            transition: { duration: 0.2 },
        },
    };

    function handleSelect(value: string) {
        setContent(value as tContent);
        setIsOpen(false);
    }

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative w-max" ref={headerRef}>
            <Button
                variant={"default"}
                onClick={() => setIsOpen(!isOpen)}
                className="h-7 w-28 rounded-[.125rem] text-white"
            >
                <span className="text-xs capitalize">{content}</span>
                <i>{ARROW_DOWN()}</i>
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
                        {DROPDOWN_BUTTONS.map((item, index) => (
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
                                        {item.title}
                                    </span>
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : null}
            </AnimatePresence>
        </header>
    );
}
