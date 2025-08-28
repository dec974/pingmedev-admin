import styles from "../../../styles/ui/components/Breadcrumb.module.css";
import Link from "next/link";

function Breadcrumb({items}) {
    return (
        <nav aria-label="breadcrumb">
        <ol className={styles.breadcrumb}>
            {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
                <li key={index} className={styles.item}>
                {isLast ? (
                    <span aria-current="page">{item.label}</span>
                ) : (
                    <>
                    <Link href={item.href}>
                        <a className={styles.link}>{item.label}</a>
                    </Link>
                    <span className={styles.separator}>/</span>
                    </>
                )}
                </li>
            );
            })}
        </ol>
        </nav>
    );
}

export default Breadcrumb;