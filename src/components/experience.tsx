import React, { useState } from 'react'
import './component-styles/Experience.css'

type AccordionItem = {
    id: string;
    title: string;
    position: string;
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
        position: "Software Dev",
        content:
            <ul>
                <li><p>Architect, develop, and deploy bespoke web and mobile applications for international clients using React, Node.js, and cloud
                    ecosystems</p></li>
                <li><p>Manage end-to-end product lifecycles independently, leading client scoping, planning, testing, and continuous deployment</p></li>
            </ul>,
    },
    {
        id: "2",
        title: "Didact Digital",
        position: "Tech Lead",
        content:
            <ul>
                <li><p>Architected and launched the company website, resulting in an increase in client inquiries and establishing brand credibility in the
                    Namibian tech market</p></li>
                <li><p>Spearheaded the development of an E-tendering Application that streamlined procurement processes</p></li>
                <li><p>Designed and implemented Jade Garden Digital Menu platform, boosting restaurant ordering efficiency and increasing average
                    order value by 15% through strategic upsell features</p></li>
            </ul>,
    },
    {
        id: "3",
        title: "Tololi",
        position: "Tech Lead",
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
                            <span><b>{item.title}</b> · {item.position}</span>

                            <span
                                className={`accordion-icon ${isOpen ? "is-open" : ""}`}
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>

                        <div
                            id={`accordion-panel-${item.id}`}
                            className={`accordion-content ${isOpen ? "is-open" : ""}`}
                            aria-hidden={!isOpen}
                        >
                            <div className="accordion-content-inner">
                                {item.content}
                            </div>
                        </div>
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
