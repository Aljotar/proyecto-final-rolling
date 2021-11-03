//snippet rfc

import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { CardCarrito } from '../components/cardCart/CardCarrito';

function Cart({ cart, setCart }) {

    const changeCantidad = (id, cantidad) => {
        const updateCart = cart.map((producto) => {
            if (producto.producto.id === id) {
                return { ...producto, cantidad };
            }
            return producto
        });

        setCart(updateCart);
    };

    let total = cart.reduce((total, { producto, cantidad }) => total + producto.price * cantidad, 0);


    // mapeo de los productos que estan en el carrito 
    const mapCarrito = cart?.map((producto, i) => (<CardCarrito key={i} producto={producto} cart={cart} setCart={setCart} changeCantidad={changeCantidad} />

    ));
    return (
        <Container>
            <h2 className="title-style my-2">Tu carrito</h2>
            <div className="row justify-content-center">
                {cart.length === 0 ?
                    <Card className="no-results-card text-center text-dark-50 p-5 m-5">
                        <Card.Title>Tu carrito esta vacio</Card.Title>
                    </Card>
                    :
                    <div>
                        <div className="col-12 col-lg-9 m-2">
                            {mapCarrito}
                        </div>
                    </div>
                }
                <div className="m-2 text-center col-12 col-lg-3" style={{ width: '18rem' }}>
                    <div>
                        <h2>TOTAL: {total.toFixed(2)} </h2>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button className="responsive-navbar-button">Ir a pagar</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Cart