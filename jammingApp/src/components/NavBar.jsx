import React from "react";
import styles from '../style/NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.navText}>Jamming</h1>
        </nav>
    );
};

export default NavBar;