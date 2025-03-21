import React, { useState } from 'react';
// import './UpdateInvoice.css';

const UpdateInvoice = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    invoiceDate: '',
    invoice:'',
    quantity: '',
    unitPrice: '',
    totalAmount: '',
    notes: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add logic to handle form submission (e.g., send data to an API)
  };

  return (
    <div className="invoice-form-container">
      <h2>Tạo Hóa Đơn</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên Khách Hàng</label>
          <input
            type="text"
            name="customerName"
            placeholder="Nhập tên khách hàng"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Khách Hàng</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email khách hàng"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngày Hóa Đơn</label>
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mặt Hàng</label>
          <select name="quantity" value={formData.invoice} onChange={handleChange} required>
            <option value="">Nhập mặt hàng và số lượng</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            placeholder="Số lượng"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Giá Đơn Vị</label>
          <input
            type="number"
            name="unitPrice"
            placeholder="Nhập giá đơn vị"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tổng Số Tiền</label>
          <input
            type="number"
            name="totalAmount"
            placeholder="Nhập tổng số tiền"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ghi Chú</label>
          <textarea
            name="notes"
            placeholder="Nhập ghi chú nếu có"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Tạo Hóa Đơn
        </button>
      </form>
    </div>
  );
};

export default UpdateInvoice;