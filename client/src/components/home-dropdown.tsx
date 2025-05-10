import { motion } from "motion/react";
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

    const itemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: i * 0.5 },
        }),
        exit: { x: -50, opacity: 0 },
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

            {isOpen ? (
                <motion.ul
                    className="bg-accent absolute top-[105%] z-5 w-full"
                    key={"home-dropdown"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {DROPDOWN_BUTTONS.map((item, index) => (
                        <motion.li
                            key={index}
                            // initial={{ x: 300, opacity: 0 }}
                            // animate={{ x: 0, opacity: 1 }}
                            // exit={{ x: -300, opacity: 0 }}
                            variants={itemVariants}
                            // initial="hidden"
                            animate="animate"
                            exit="exit"
                            className="bg-black100 flex h-7 items-center justify-start"
                        >
                            <button onClick={() => handleSelect(item.value)} className="size-full">
                                <span className="ml-5 flex items-center justify-start text-xs text-white capitalize">
                                    {item.title}
                                </span>
                            </button>
                        </motion.li>
                    ))}
                </motion.ul>
            ) : null}
        </header>
    );
}
