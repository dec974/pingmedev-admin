import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "../../../styles/ui/components/Datepicker.module.css";

function Datepicker({ label, selected, onChange }) {
    return (
        <div className={styles.datepickerWrapper}>
        {label && <label>{label}</label>}
        <DatePicker
            selected={selected}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className="react-datepicker__input-text"
            placeholderText="JJ/MM/AAAA"
        />
        </div>
    );
}

export default Datepicker;