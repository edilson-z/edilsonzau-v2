import React, { useState } from 'react'
import './component-styles/Accordion.css'

type AccordionItem = {
    id: string;
    title: string;
    content: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    allowMultiple?: boolean;
};

const items: AccordionItem[] = [
    {
        id: "1",
        title: "Freelance",
        content: <p>Freelance Software Dev</p>,
    },
    {
        id: "2",
        title: "Didact Digital",
        content: <p>Head of Tech</p>,
    },
    {
        id: "3",
        title: "Tololi",
        content: <p>Tech Lead</p>,
    },
];

export function Accordion({
    items,
    allowMultiple = false,
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                if (!allowMultiple) {
                    next.clear();
                }
                next.add(id);
            }

            return next;
        });
    };

    return (
        <div className="accordion">
            {items.map((item) => {
                const isOpen = openItems.has(item.id);

                return (
                    <div key={item.id} className="accordion-item">
                        <button
                            type="button"
                            className="accordion-trigger"
                            aria-expanded={isOpen}
                            aria-controls={`accordion-panel-${item.id}`}
                            onClick={() => toggleItem(item.id)}
                        >
                            <span>{item.title}</span>
                            <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div
                                id={`accordion-panel-${item.id}`}
                                role="region"
                                className="accordion-panel"
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Experience() {

    return (
        <div>
            <div>
                <h2>Work & Education</h2>
                <Accordion
                    items={items}
                    allowMultiple={false}
                />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    )
}
