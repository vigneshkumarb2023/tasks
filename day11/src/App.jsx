import { useState, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 800, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9DHAbX1RMK-jOq00ffQkM7fA3-0ZQGEeZw&s" },
    { id: 2, name: "Smartphone", price: 500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBWojpFb-lzcdasdfrPFlYlEKspQkYTLtUA&s" },
    { id: 3, name: "Tablet", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgc38vOUsSv8FxgoVdMFtcdMLFAChk3oMhg&s" },
    { id: 4, name: "Smartwatch", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgjh8eBir1oEJ-O7cK_gF5J3GJn7kLTLXOQ&s" },
    { id: 5, name: "TV", price: 500, image: "https://i5.walmartimages.com/asr/2fcf11f2-a71b-4b76-a760-44133dd845ff.3259a637b1c4c206d1379cc245580ef4.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff" },
    { id: 6, name: "Cycle", price: 1000, image: "https://ahoybikes.com/wp-content/uploads/2022/10/A-360-Red-27.5-Inch-Mountain-Bike-By-Ahoy-Bikes.jpg" },
    { id: 7, name: "Tube Light", price: 50, image: "https://image.made-in-china.com/2f0j00bBGaYqTlqKgh/T10-LED-Tube-Light-BL-RGD-600-008WA-.jpg" },
    
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="container">
      <h1>Filterable Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={clearSearch}>Clear</button>

      <p>Showing {filteredProducts.length} products</p>
      <ul className="products">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <span>{formatPrice(product.price)}</span>

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              id={`quantity-${product.id}`}
            />
            <button
              onClick={() => {
                const quantity = parseInt(
                  document.getElementById(`quantity-${product.id}`).value,
                  10
                );
                handleAddToCart(product, quantity);
              }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart">
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name} (x{item.quantity})</p>
              <span>{formatPrice(item.price * item.quantity)}</span>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
