import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Only search by name
  const [sortCategory, setSortCategory] = useState(''); // Sorting based on various attributes

  // Example product data
  const products = [
    { id: 1, name: 'Book', sold: 450, price: 120, revenue: 51440, rating: 4.8, quantity: 100 },
    { id: 2, name: 'Mirror', sold: 450, price: 120, revenue: 51440, rating: 1.92, quantity: 10, status: 'Low-Stack' },
    { id: 3, name: 'Desk', sold: 300, price: 220, revenue: 66000, rating: 4.7, quantity: 50 },
    { id: 4, name: 'Chair', sold: 500, price: 75, revenue: 37500, rating: 4.6, quantity: 80 }
  ];

  // Example reviews
  const reviews = [
    { name: 'Thomas', rating: 4, date: 'August 27, 2024', comment: 'I love this product!' },
    { name: 'Thomas', rating: 4, date: 'August 27, 2024', comment: 'I love this product!' }
  ];

  // Handle product selection
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  // Sort products based on the selected sort category
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name); // Sort alphabetically by name
      case 'sold':
        return b.sold - a.sold; // Sort by sold amount (highest to lowest)
      case 'price':
        return b.price - a.price; // Sort by unit price (highest to lowest)
      case 'revenue':
        return b.revenue - a.revenue; // Sort by revenue (highest to lowest)
      case 'rating':
        return b.rating - a.rating; // Sort by rating (highest to lowest)
      default:
        return 0; // No sorting
    }
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='products-container'>

      <div className='products-table'>
        <div className='table-header'>
          <div className="header-flex">
            <h2>Products</h2>

            <div className='action-buttons'>
              <button className='add-btn'>Add</button>
              <button className='delete-btn'>Delete</button>
            </div>
          </div>

          <div className='search-section'>
            <input
              type="text"
              className="search-bar"
              placeholder="Search by Product Name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="sort-section">
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" onChange={handleCategoryChange} className="sort-dropdown">
              <option value="">Default</option>
              <option value="name">Product Name</option>
              <option value="sold">Sold Amount</option>
              <option value="price">Unit Price</option>
              <option value="revenue">Revenue</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sold Amount</th>
              <th>Unit Price</th>
              <th>Revenue</th>
              <th>Rating</th>
              <th>Available Qty</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
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