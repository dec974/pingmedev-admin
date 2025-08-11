import styles from '../../styles/ui/icon.module.css';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as DiIcons from 'react-icons/di';
import * as TB from "react-icons/tb";
import { FaCode } from 'react-icons/fa';

function Icon({...props}) {
    const getIcons = (iconName, color, size) => {
        if (SiIcons[iconName]) {
            const Icon = SiIcons[iconName];
            return <Icon className={styles.icon} color={color} size={size}/>;
        } else if (FaIcons[iconName]) {
            const Icon = FaIcons[iconName];
            return <Icon className={styles.icon} color={color} size={size} />;
        } else if( Fa6Icons[iconName]) {
            const Icon = Fa6Icons[iconName];
            return <Icon className={styles.icon} color={color} size={size} />;
        } else if (DiIcons[iconName]) {
            const Icon = DiIcons[iconName];
            return <Icon className={styles.icon} color={color} size={size}/>;
        } else if (TB[iconName]) {
            const Icon = TB[iconName];
            return <Icon className={styles.icon} color={color} size={size}/>;
        } else {
            return <FaCode />;
        }
    }

    return (
        getIcons(props.name, props.color, props.size|| '24px')
    );
}

export default Icon;