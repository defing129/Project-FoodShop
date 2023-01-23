import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number,
        description: string
    }>();

    const {id} = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://6320b58682f8687273a61b57.mockapi.io/items/' + id);
                setPizza(data);
            } catch (e) {
                alert('Помилка знаходження піци!')
            }

        }

        fetchPizza();
    }, [])

    if (!pizza) {
        return <>Завантаження...</>
    }
    return (
        <div className='container'>
            <div className='container__block-pizza'>
                <div>
                    <img className='pizza-block__image' src={pizza.imageUrl} alt=""/>
                </div>
                <div className='container__block-pizza__name'>
                    <h1 className='container__name'>{pizza.title}</h1>
                    <h3>Цена</h3>
                    <p>{pizza.price} ₴</p>
                    <h4>{pizza.description}</h4>
                </div>

            </div>
        </div>
    )
}

export default FullPizza;
