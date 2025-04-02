import React from "react";
import styles from "./Popup.module.scss";
import { X } from "lucide-react";

const Popup = ({ children, handleClosePopupByClickOutside, handleClosePopup, ref }) => {

    
    return (
        <>
            <div className={styles.popup_background} onClick={handleClosePopupByClickOutside}>
                <div className={styles.popup_content} ref={ref} onClick={(e) => e.stopPropagation()}>
                    <X className={styles.x} onClick={handleClosePopup} />
                    {children}
                </div>
            </div>
        </>
    );
};

export default Popup;
