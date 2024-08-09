import React, { useState, useRef } from 'react';
import Full from './Full';
import Nav from './Nav';
import Footer from './Footer';

export default function App() {
  const limitBox = useRef();
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Load data from the API
  const loadData = () => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setTotalProducts(data.total);
        setTotalPages(Math.ceil(data.total / limit)); // Calculate total pages
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle product click to open Full component
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Handle close button click in Full component
  const handleClose = () => {
    setSelectedProduct(null);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const selectedLimit = parseInt(e.target.value, 10);
    setLimit(selectedLimit);
    setCurrentPage(1); // Reset to first page whenever the limit changes
  };

  // Handle page change
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(); // Load data when a page is clicked
  };

  // Render the UI
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
                onChange={handleCategoryChange}
                disabled={products.length === 0} // Disable until products are loaded
              >
                <option selected value="">Choose Category</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <select ref={limitBox} style={{ width: '60px' }} onChange={handleLimitChange} value={limit} disabled={products.length === 0}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <span className="ml-1">Products per page</span>
            </div>

            {products.length > 0 && (
              <>
                <div className='d-flex justify-content-center mb-4'>
                  <span className="text-center">Total Products: {totalProducts}</span>
                </div>

                {/** Pagination */}
                <div className="btn-toolbar justify-content-center mb-4" role="toolbar" aria-label="Toolbar with button groups">
                  <div className="btn-group me-2" role="group" aria-label="First group">
                    {
                      Array.from({ length: totalPages }, (_, i) => (
                        <button
                          type="button"
                          className={`btn btn-primary`}
                          key={i}
                          onClick={() => handlePageClick(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </>
            )}

            <div className="row">
              {filteredProducts.map((product, index) => (
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
