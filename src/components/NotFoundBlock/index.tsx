
import styles from './NotFoundBlock.module.scss'
import React from "react";



const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h2>Извините, но такой страницы не существует</h2>
            <p>Пожалуйста, введите адрес страницы корректно</p>
        </div>
    )
}

export default NotFoundBlock;