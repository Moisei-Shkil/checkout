import { useState, useEffect, useMemo } from 'react'
import { checkout$, removeFromCheckout  } from "@mfs-demo/states";

export default function Root(props) {
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  useEffect(() => {
    const sub = checkout$.subscribe((checkoutProducts) => {
      setCheckoutProducts(checkoutProducts);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const removeFromCart = (productId) => {
    removeFromCheckout(productId)
  }
  const totalPrice = useMemo(() => checkoutProducts.reduce((sum, {price, count}) => sum + price * count, 0), [checkoutProducts])

  return checkoutProducts.length > 0 ? <div>
    <h3>Checkout</h3>
    {
      checkoutProducts.map(({ id,
        name,
        image,
        price,
        count }) => <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>X{count}</div>
          <div>{name}</div>
          <div><img width={50} src={image} alt="image" /></div>
          <div>{price}</div>
          <button onClick={() => removeFromCart(id)}>-</button>
        </div>)
    }
    <div>
      Total price: {totalPrice.toFixed(2)}
    </div>
  </div> : null;
}
