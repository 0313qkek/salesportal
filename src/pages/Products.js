import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Book', sold: 450, price: 120, revenue: 51440, rating: 4.8, quantity: 100 },
    { id: 2, name: 'Mirror', sold: 450, price: 120, revenue: 51440, rating: 1.92, quantity: 10, status: 'Low-Stack' },
  ];

  const reviews = [
    { name: 'Thomas', rating: 4, date: 'August 27, 2024', comment: 'I love this product!' },
    { name: 'Thomas', rating: 4, date: 'August 27, 2024', comment: 'I love this product!' }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className='products-container'>

      <div className='products-table'>
        <div className='table-header'>
          <h2>Products</h2>
          <div className='action-buttons'>
            <button className='add-btn'>Add</button>
            <button className='delete-btn'>Delete</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sold Amount</th>
              <th>Unit Price</th>
              <th>revenue</th>
              <th>Rating</th>
              <th>Available Qty</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}
              >
                <td>{product.name}</td>
                <td>{product.sold}</td>
                <td>${product.price}</td>
                <td>${product.revenue.toLocaleString()}</td>
                <td>⭐ {product.rating}</td>
                <td>{product.quantity} {product.status && <span className="low-stack">{product.status}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {/* Product Detail Section */}
            <div className="product-detail">
                {selectedProduct ? (
                    <>
                        <div className="detail-header">
                            <h3>{selectedProduct.name}</h3>
                            <button className="edit-btn">Edit</button>
                        </div>
                        <div className="product-images">
                            {/* Placeholder for product images */}
                            <img src="https://via.placeholder.com/100" alt="Product 1" />
                            <img src="https://via.placeholder.com/100" alt="Product 2" />
                            <img src="https://via.placeholder.com/100" alt="Product 3" />
                        </div>
                        <table className="detail-table">
                            <thead>
                                <tr>
                                    <th>Sold Amount</th>
                                    <th>Unit Price</th>
                                    <th>Revenue</th>
                                    <th>Rating</th>
                                    <th>Available Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedProduct.sold}</td>
                                    <td>${selectedProduct.price}</td>
                                    <td>${selectedProduct.revenue.toLocaleString()}</td>
                                    <td>⭐ {selectedProduct.rating}</td>
                                    <td>{selectedProduct.quantity} {selectedProduct.status && <span className="low-stack">{selectedProduct.status}</span>}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="product-description">
                            {/* Placeholder description */}
                            Different wall materials require different types of fasteners. Use fasteners suitable for the walls in your home. To hang securely in place on the wall, this mirror requires 2 screws. Mounting fittings included.
                        </p>
                        <div className="reviews-section">
                            <h3>Reviews</h3>
                            {reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <p><strong>{review.name}</strong> ⭐⭐⭐⭐ {review.date}</p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Please select a product to view details</p>
                )}
            </div>
        </div>
    );
}

export default Products;