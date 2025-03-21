import React from 'react';
import './App.css';

const InvoiceManager = () => {
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
          <button className="add-button">Thêm Hóa Đơn</button>
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
                  <button className="action-button delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceManager;