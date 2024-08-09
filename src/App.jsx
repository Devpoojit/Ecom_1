import React, { useState, useRef, useEffect } from 'react';
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

  // Initialize Owl Carousel
  useEffect(() => {
    if (window.jQuery) {
      window.jQuery('.owl-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          992: {
            items: 2,
          },
        },
      });
    }
  }, []);

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

  // Render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <i key={`full-${i}`} className="fa fa-star text-warning"></i>
        ))}
        {halfStar === 1 && (
          <i key="half" className="fa fa-star-half-alt text-warning"></i>
        )}
        {Array(emptyStars).fill().map((_, i) => (
          <i key={`empty-${i}`} className="fa fa-star-o text-warning"></i>
        ))}
      </>
    );
  };

  // Render the UI
  return (
    <>
      <Nav />
      
      {/* Carousel Section */}
      <div className="container-xxl py-5">
            <div className="container">
                <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                    <div className="testimonial-item bg-light rounded p-5">
                        <div className="d-flex align-items-center bg-white me-n5">
                            <img className="img-fluid flex-shrink-0 rounded-circle" src="https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/1.png" style={{height:'90px' , width:'90px'}} alt="Ice Cream"/>
                        </div>
                    </div>
                    <div className="testimonial-item bg-light rounded p-5">
                        <div className="d-flex align-items-center bg-white me-n5" >
                            <img className="img-fluid flex-shrink-0 rounded-circle" src="https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/1.png" style={{height:'90px' , width:'90px'}} alt="Honey Jar"/>
                        </div>
                    </div>
                    <div className="testimonial-item bg-light rounded p-5">
                        <div className="d-flex align-items-center bg-white me-n5">
                            <img className="img-fluid flex-shrink-0 rounded-circle" src= "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/1.png" style={{height:'90px' , width:'90px'}} alt="Green Chili Pepper"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
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
                <option value={25}>25}</option>
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
                      <div className="d-flex align-items-center">
                        {renderStars(product.rating)} 
                        <span className="ml-2">({product.rating})</span>
                      </div>
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
