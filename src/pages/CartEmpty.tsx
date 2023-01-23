
import React from "react";



const CartEmpty: React.FC = () => {
    return (
        <div className='container--empty' >
            <h2>Извините, но ваша корзина пустая</h2>
            <p>Пожалуйста, виберите, что-то вкусненькое!</p>
            <div>
                😅
            </div>
        </div>
    )
}

export default CartEmpty;