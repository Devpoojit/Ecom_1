import React from 'react';

export default function Full({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.images} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success strike-through "><del>₹{product.price}</del><span className="text-danger">    {product.discountPercentage}% Off!</span></h4>
          <h4 className="text-success">₹{product.discountPercentage != 0 ? (product.price - product.price*product.discountPercentage/100).toPrecision(3) : product.price}</h4>
          <p>{product.description}</p>
          <button className="btn btn-warning me-2">Add to Cart</button>
          <button className="btn btn-danger ml-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
