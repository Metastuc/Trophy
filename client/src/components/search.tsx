interface iSearch {
    placeholder?: string;
}

export default function Component({ placeholder }: iSearch) {
    return (
        <section>
            <i>icon</i>
            <input type="text" placeholder={placeholder} />
        </section>
    );
}
