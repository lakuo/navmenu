import MenuButton from "./MenuButton";

interface MenuItem {
    name: string;
    submenu?: string[] | null;
}

const menuItems: MenuItem[] = [
    { name: "Home", submenu: null },
    { name: "About Us", submenu: ["Our Story", "Team", "Careers"] },
    { name: "Services", submenu: ["Consulting", "Design", "Marketing"] },
    { name: "Resources", submenu: ["Blogs", "Case Studies", "eBooks", "Webinars"] },
    { name: "Contact", submenu: ["Contact Form", "Location Map", "Customer Support"] },
];


const NavMenu: React.FC = () => {
    return (
        <div className="menu-container">
            {menuItems.map((menuItem) => (
                <MenuButton title={menuItem.name} submenu={menuItem.submenu || undefined} />
            ))}
        </div>

    );
}

export default NavMenu;
