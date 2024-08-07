import React, { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [tag, setTag] = useState('');

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

  const filterData = (selectedTag) => {
    setTag(selectedTag);
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        if (selectedTag) {
          const filteredData = data.products.filter((product) => product.category === selectedTag);
          setProducts(filteredData);
        } else {
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
    <Nav />
    <div className="container">
      <h1 className="my-4 text-center">Product Records</h1>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary mr-2" onClick={loadData}>
          Load Products
        </button>
        <select
          className="form-control"
          value={tag}
          onChange={(e) => filterData(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">Choose Category</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 custom-grab" style={{cursor: 'grab'}} >
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{ objectFit: 'cover', height: '150px'}}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
