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
        position: "Head of Technology",
        content:
            <ul>
                <li><p>Led a cross-functional team of four developers, delivering 5 major systems with a 100% on-time project completion rate</p></li>
                <li><p>Architected and deployed web applications serving 1,000+ monthly users with 99.9% uptime, increasing customer retention</p></li>
                <li><p>Engineered data pipelines that processed customer data monthly, enabling real-time analytics</p></li>
            </ul>,
    },
    {
        id: "4",
        title: "Tololi",
        position: "Junior IT Manager",
        content:
            <ul>
                <li><p>Designed and developed a Multi-Vendor E-commerce Marketplace that onboarded 25+ local vendors in the first quarter</p></li>
                <li><p>Successfully secured copyrights for 3 core innovations, strengthening the company's IP portfolio</p></li>
                <li><p>Implemented SEO strategies that improved organic search rankings by 65% and increased web traffic by 40% within 4 months</p></li>
                <li><p>Provided technical support with a 100% issue resolution rate, maintaining an average response time under an hour for 50+ clients</p></li>
            </ul>,
    },
    {
        id: "5",
        title: "Akilli X",
        position: "Software Developer",
        content:
            <ul>
                <li><p>Delivered a responsive Mariental Municipality website used by 600+ citizens monthly</p></li>
                <li><p>Contributed to 4 key projects with 100% on-time delivery</p></li>
            </ul>,
    },
    {
        id: "6",
        title: "Zion Graphics",
        position: "Front-End Web Developer",
        content:
            <ul>
                <li><p>Designed and developed and maintained the front-end for the company website</p></li>
            </ul>,
    },
];

const schoolItems: AccordionItem[] = [
    {
        id: "1",
        title: "Namibia University of Science and Technology",
        position: "B.Sc. Computer Science Honours (Software Development)",
        content:
            <div>
                <p>Academic Achievements:</p>
                <ul>
                    <li><p>CUM LAUDE</p></li>
                    <li><p>Best Honours Student 2024 Award</p></li>
                    <li><p>Artificial Intelligence 2023 Excellence Award</p></li>
                </ul>
            </div>,
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
                <h2 style={{ marginTop: 80 }}>Work Experience</h2>
                <Accordion
                    items={items}
                    allowMultiple={false}
                />

                <h2>Education</h2>
                <Accordion
                    items={schoolItems}
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
