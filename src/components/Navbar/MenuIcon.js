import { motion } from "framer-motion";
import { MobileIcon } from "./NavbarStyledComponent";


export const MenuIcon = ({ isOpen, onClick }) => (
    <MobileIcon
        onClick={onClick}
    >
        <motion.div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                width: '20px',
                height: '16px',
            }}
        >
            <motion.div
                style={{
                    width: '100%',
                    height: '2px',
                    background: 'currentColor',
                    borderRadius: '2px',
                }}
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                style={{
                    width: '100%',
                    height: '2px',
                    background: 'currentColor',
                    borderRadius: '2px',
                }}
                animate={{
                    opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                style={{
                    width: '100%',
                    height: '2px',
                    background: 'currentColor',
                    borderRadius: '2px',
                }}
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    </MobileIcon>
);