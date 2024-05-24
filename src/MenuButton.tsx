import { useState, useRef } from "react";
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
    title: string;
    submenu?: string[];
}

const MenuButton: React.FC<Props> = ({ title, submenu }) => {
    const [hover, setHover] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        if (containerRef.current) {
            setHover(false);
        }
    };

    const hasSubmenu = submenu && submenu.length > 0;

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', margin: "0 10px" }}
        >
            <button className="bubble-button">
                <span>{title}</span>
                {hasSubmenu && (
                    <FontAwesomeIcon
                        icon={hover ? faChevronUp : faChevronDown}
                        style={{ marginLeft: 'auto' }}
                    />
                )}            </button>
            {hover && submenu && (
                <div className={`submenu ${hover ? 'submenu-visible' : ''}`}>
                    {submenu.map((item, idx) => (
                        <button key={idx} className="submenu-item">{item}</button>
                    ))}
                </div>
            )}
        </div >
    );
}

export default MenuButton;