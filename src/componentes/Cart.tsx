import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { getTotals, addToCart, decreaseCart, removeFromCart, clearCart } from "../redux/slices/CartReducer";
import { CarritoInstrumento } from "../models/Instrumento";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { toast } from "react-toastify";
import { createPreferenceMP } from "../services/ApiServicio";

const Cart = () => {
  const [idPreference, setIdPreference] = useState<string>('');

  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);


  const handleAddToCart = (product: CarritoInstrumento) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product: CarritoInstrumento) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product: CarritoInstrumento) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  initMercadoPago('TEST-78b95abe-c256-4f62-97e9-f48de5006725', { locale: 'es-AR' });

  const getPreferenceMP = async () => {
      if(cart.cartItems.length > 0){
        console.log(cart);
        const response = await createPreferenceMP(cart);
        if(response)
            setIdPreference(response.id);
      }else{
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
    
  }

  return (
    <div className="cart-container">
      <h2>Carrito de compras</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Carrito vacio. Agrega un producto para poder realizar la compra!</p>
          <div className="start-shopping">
            <Link to="/productos">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Empezar a comprar</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Producto</h3>
            <h3 className="price">Precio</h3>
            <h3 className="quantity">Cantidad</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.imagen.length <= 10 ? `/src/assets/img/${cartItem.imagen}` : cartItem.imagen} alt={cartItem.instrumento} />
                    <div>
                      <h3>{cartItem.instrumento}</h3>
                      <p>{cartItem.descripcion}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remover
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.precio}</div>
                  <div className="cart-product-quantity">
                    <button className="bg-black" onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button className="bg-black" onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.precio * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Limpiar
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <button onClick={getPreferenceMP}>Generar pedido</button>
            
              <div className="continue-shopping">
                <Link to="/productos">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continuar comprando</span>
                </Link>
                <div className={idPreference ? 'visible' : 'invisible'}>
                  <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
