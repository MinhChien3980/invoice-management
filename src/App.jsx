import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import {Link} from "react-router-dom";

const InvoiceManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setMessage(''); // Clear message when dialog closes
  };


  const handleConfirmDelete = async (invoiceId) => {
    try {
      // Make the DELETE request to the API using Axios
      const response = await axios.delete(`localhost:8080/invoices/${invoiceId}`);

      // Assuming the API returns a success message
      setMessage('Invoice deleted successfully!');
      console.log('API Response:', response.data);

      // Close the dialog after successful deletion
      setIsDialogOpen(false);
    } catch (error) {
      // Handle errors (e.g., network error, API error)
      console.error('Error deleting invoice:', error);
      setMessage('Failed to delete invoice. Please try again.');
    }
  };

  const invoices = [
    { id: 'HD001', customer: 'Nguyễn Văn A', date: '01/01/2023', total: '1,000,000 VND' },
    { id: 'HD002', customer: 'Trần Thị B', date: '02/01/2023', total: '500,000 VND' },
    { id: 'HD003', customer: 'Lê Văn C', date: '03/01/2023', total: '750,000 VND' },
    { id: 'HD004', customer: 'Nguyễn Thị D', date: '04/01/2023', total: '1,200,000 VND' },
    { id: 'HD005', customer: 'Phạm Văn E', date: '05/01/2023', total: '900,000 VND' },
  ];

  return (
    <div className="invoice-manager">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-item">🏠</div>
        <div className="sidebar-item">📊</div>
        <div className="sidebar-item">📋</div>
        <div className="sidebar-item">⚙️</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Quản Lý Hóa Đơn</h1>
        <div className="header-actions">
          <input type="text" placeholder="Tìm kiếm hóa đơn..." className="search-bar" />
          <Link to={'/create'}>
            <button className="add-button">Thêm Hóa Đơn</button>
          </Link>
        </div>

        {/* Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Mã Hóa Đơn</th>
              <th>Khách Hàng</th>
              <th>Ngày</th>
              <th>Tổng Tiền</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.id}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.date}</td>
                <td>{invoice.total}</td>
                <td>
                  <button className="action-button edit">✏️</button>
                  <button className="action-button delete" onClick={handleOpenDialog}>🗑️</button>
                </td>
                <ConfirmDialog
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDelete}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceManager;