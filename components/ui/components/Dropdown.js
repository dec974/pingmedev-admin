import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/ui/components/Dropdown.module.css';

const Dropdown = ({ label, items = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleItemSelect = (item) => {
    if (onSelect) onSelect(item);
    setOpen(false);
  };

  const renderSubMenu = (subItems) => {
    return (
      <div className={styles.subMenu} role="menu">
        {subItems.map((subItem, idx) => (
          <div
            key={idx}
            tabIndex={0}
            className={styles.subMenuItem}
            role="menuitem"
            onClick={() => handleItemSelect(subItem)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemSelect(subItem);
              }
            }}
          >
            {subItem.label || subItem}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="dropdown-menu"
        type="button"
      >
        {label}
        <span className={`${styles.caret} ${open ? styles.caretOpen : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      <div
        id="dropdown-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        role="menu"
      >
        {items.map((item, idx) => {
          const hasSubMenu = item.subItems && item.subItems.length > 0;
          if (hasSubMenu) {
            return (
              <div
                key={idx}
                tabIndex={0}
                className={`${styles.menuItem} ${styles.menuItemWithSubMenu}`}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.label || item}
                {renderSubMenu(item.subItems)}
              </div>
            );
          }
          return (
            <div
              key={idx}
              tabIndex={0}
              className={styles.menuItem}
              role="menuitem"
              onClick={() => handleItemSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemSelect(item);
                }
              }}
            >
              {item.label || item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
