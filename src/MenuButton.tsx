import { useState, useRef, useEffect } from "react";
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
    title: string;
    submenu?: string[];
}

const MenuButton: React.FC<Props> = ({ title, submenu }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasSubmenu = submenu && submenu.length > 0;
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        setSubmenuOpen(!submenuOpen);
    };

    useEffect(() => {
        if (submenuOpen && containerRef.current) {
            const firstSubmenuItem = containerRef.current.querySelector('.submenu-item') as HTMLElement;
            firstSubmenuItem?.focus();
        }
    }, [submenuOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            toggleSubmenu(event);
        }
    };

    return (
        <div
            ref={containerRef}
            className="menu-button"
            style={{ position: 'relative', margin: "0 10px" }}
            onMouseLeave={() => !submenuOpen && setSubmenuOpen(false)}
            role="menu"
        >
            <button
                className="bubble-button"
                onClick={toggleSubmenu}
                onKeyDown={handleKeyDown}
                aria-haspopup="true"
                aria-expanded={submenuOpen}
            >
                <span>{title}</span>
                {hasSubmenu && (
                    <FontAwesomeIcon
                        icon={submenuOpen ? faChevronUp : faChevronDown}
                        className="chevron"
                        style={{ marginLeft: 'auto' }}
                    />
                )}
            </button>
            {hasSubmenu && (
                <menu
                    className={`submenu ${submenuOpen ? "submenu-visible" : ""}`}
                    role="menu"
                >
                    {submenu.map((item, idx) => (
                        <button
                            key={idx}
                            className="submenu-item"
                            role="menuitem"
                            tabIndex={submenuOpen ? 0 : -1}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    setSubmenuOpen(false);
                                    (containerRef.current?.querySelector('.bubble-button') as HTMLElement)?.focus();
                                }
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </menu>
            )}
        </div>
    );
}

export default MenuButton;
