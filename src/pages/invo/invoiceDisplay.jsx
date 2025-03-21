import React from 'react';
import './InvoiceDisplay.css';

const InvoiceDisplay = () => {
  const invoiceData = {
    company: {
      name: 'Công ty của bạn',
      address: 'Địa chỉ công ty, Thành phố, Tỉnh, Bang ZIP, Việt Nam',
    },
    invoice: {
      number: 'vfu-2025-03-21',
      date: '2025-03-21',
    },
    customer: {
      name: 'Thành phố, Tỉnh, Bang ZIP, Việt Nam',
    },
    items: [
      { description: 'Brochure', quantity: 2, unitPrice: 100.00, total: 200.00 },
      { description: 'Nhập tên/mô tả mặt hàng', quantity: 1, unitPrice: 0.00, total: 0.00 },
      { description: 'Nhập tên/mô tả mặt hàng', quantity: 1, unitPrice: 0.00, total: 0.00 },
    ],
    subtotal: 200.00,
    tax: 20.00,
    total: 220.00,
    notes: 'Thất tuyệt khắc làm việc của bạn.',
    paymentTerms: 'Vui lòng thực hiện thanh toán trước ngày đến hạn.',
  };

  return (
    <div className="invoice-container">
      {/* Header Section */}
      <div className="invoice-header">
        <div className="company-info">
          <h3>{invoiceData.company.name}</h3>
          <p>{invoiceData.company.address}</p>
        </div>
        <h1>HÓA ĐƠN</h1>
      </div>

      {/* Invoice Info Section */}
      <div className="invoice-info">
        <div className="invoice-details">
          <p><strong>Hóa đơn đến:</strong></p>
          <p>{invoiceData.customer.name}</p>
        </div>
        <div className="invoice-meta">
          <p><strong>Hóa đơn #</strong> {invoiceData.invoice.number}</p>
          <p><strong>Ngày hóa đơn</strong> {invoiceData.invoice.date}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>MẶT HÀNG</th>
            <th>Q.TY</th>
            <th>TY LỆ</th>
            <th>SỐ TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="invoice-totals">
        <div className="totals-row">
          <span>Tổng phụ</span>
          <span>{invoiceData.subtotal.toFixed(2)}</span>
        </div>
        <div className="totals-row">
          <span>Thuế bán hàng (10%)</span>
          <span>{invoiceData.tax.toFixed(2)}</span>
        </div>
        <div className="totals-row total">
          <span><strong>TỔNG B</strong></span>
          <span><strong>VND {invoiceData.total.toFixed(2)}</strong></span>
        </div>
      </div>

      {/* Notes Section */}
      {/* <div className="invoice-notes">
        <p><strong>Ghi chú</strong></p>
        <p>{invoiceData.notes}</p>
        <p><strong>Điều khoản và điều kiện</strong></p>
        <p>{invoiceData.paymentTerms}</p>
      </div> */}

      {/* Footer Button */}
      <button className="add-item-button">Thêm chi tiết đơn hàng</button>
    </div>
  );
};

export default InvoiceDisplay;