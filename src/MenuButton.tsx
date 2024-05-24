import { useState, useRef, useEffect } from "react";
import './Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
    title: string;
    submenu?: string[];
}

const MenuButton: React.FC<Props> = ({ title, submenu }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const submenuFirstItemRef = useRef<HTMLButtonElement>(null);
    const hasSubmenu = submenu && submenu.length > 0;
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [stayOpen, setStayOpen] = useState(false);

    const toggleSubmenu = () => {
        const newStayOpen = !stayOpen;
        setStayOpen(newStayOpen);
        if (newStayOpen && submenuFirstItemRef.current) {
            submenuFirstItemRef.current.focus();  // Focus the first submenu item when opened via keyboard
        }
    };

    useEffect(() => {
        const handleMouseEnter = () => {
            if (hasSubmenu && !stayOpen && window.innerWidth > 767) {
                setSubmenuOpen(true);
            }
        };

        const handleMouseLeave = () => {
            if (hasSubmenu && !stayOpen && window.innerWidth > 767) {
                setSubmenuOpen(false);
            }
        };

        const menuButton = containerRef.current;
        if (menuButton) {
            menuButton.addEventListener('mouseenter', handleMouseEnter);
            menuButton.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (menuButton) {
                menuButton.removeEventListener('mouseenter', handleMouseEnter);
                menuButton.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [hasSubmenu, stayOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleSubmenu();
        }
    };

    return (
        <div ref={containerRef} className="menu-button" style={{ position: 'relative', margin: "0 10px" }}>
            <button className="bubble-button" onClick={toggleSubmenu} onKeyDown={handleKeyDown}
                aria-haspopup="true" aria-expanded={submenuOpen}>
                <span>{title}</span>
                {hasSubmenu && (
                    <FontAwesomeIcon icon={(stayOpen || submenuOpen) ? faChevronUp : faChevronDown} className={`chevron ${stayOpen ? 'stay-open' : ''}`} />
                )}
            </button>
            {hasSubmenu && (
                <menu className={`submenu ${stayOpen || submenuOpen ? "submenu-visible" : ""}`}>
                    {submenu.map((item, idx) => (
                        <button key={idx} ref={idx === 0 ? submenuFirstItemRef : undefined}
                            className="submenu-item">{item}</button>
                    ))}
                </menu>
            )}
        </div>
    );
}

export default MenuButton;
