import React, { useState } from 'react';
import './Customer.css';

function Customer() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const customersData = [
    { id: 1, name: 'Thomas Laub', email: 'tlaub@bunchful.com', phone: '(540)123-4567', dob: '01-01-1900'},
    { id: 2, name: 'John Doe', email: 'jdoe@bunchful.com', phone: '(540)987-6543', dob: '02-02-1985'},
  ];

  const handleSortChange = (e) => setSortCategory(e.target.value);
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setEditData(customer);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setSelectedCustomer(editData);
  };

  const sortedCustomers = [...customersData].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'phone':
        return a.phone.localeCompare(b.phone);
      case 'dob':
        return new Date(a.dob) - new Date(b.dob);
      default:
        return 0;
    }
  });

  const filteredCustomers = sortedCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='customer-container'>
      <div className='customer-table'>
        <div className='table-header'>
          <h2>Customer</h2>
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-bar'
          />
          <select onChange={handleCategoryChange} className='sort-dropdown'>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="subscribers">Email</option>
            <option value="rating">Phone Number</option>
            <option value="rating">Date of Birth</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} onClick={() => handleCustomerClick(customer)}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="customer-details">
        {selectedCustomer ? (
          <>
            <div className="detail-header">
              <h3>{selectedCustomer.name}</h3>
              <button onClick={handleEditClick} className="edit-btn">
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div className='edit-form'>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Date of Birth:
                  <input
                    type="text"
                    name="dob"
                    value={editData.dob}
                    onChange={handleInputChange}
                  />
                </label>
                <button onClick={handleSaveClick} className="save-btn">Save</button>
              </div>
            ) : (
              <>
                <div className="customer-info">
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone Number:</strong> {selectedCustomer.phone}</p>
                <p><strong>Date of Birth:</strong> {selectedCustomer.dob}</p>
              </div>
              </>
            )}
          </>
        ) : (
          <p>Please select customer to view details</p>
        )}
      </div>
    </div>
  );
}

export default Customer;