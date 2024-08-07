import React, { useEffect, useState } from 'react';
import Full from './Full';
import Nav from './Nav';
import Footer from './Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadData = () => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Nav />
        <div className="container">
      <h1 className="my-4 text-center">Product Records</h1>
      {selectedProduct ? (
        <Full product={selectedProduct} onClose={handleClose} />
      ) : (
        <>
          <div className="d-flex justify-content-center mb-4">
            <button className="btn btn-primary mr-2" onClick={loadData}>
              Load Products
            </button>
            <select
              className="form-control"
              style={{ width: '200px' }}
              onChange={(e) => loadData(e.target.value)}
            >
              <option value="">Choose Category</option>
              <option value="skincare">Skincare</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
                <div
                  className="card h-100"
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: 'cover', height: '150px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Price: ₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    <Footer />
    </>
  );
}
