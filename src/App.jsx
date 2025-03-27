import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './App.css';
import ConfirmDialog from "./components/ConfirmDialog.jsx";

const API_BASE_URL = 'http://localhost:8080/api/invoices';

const InvoiceManager = () => {
  const [invoices, setInvoices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  // Open Delete Confirmation Dialog
  const handleOpenDialog = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedInvoiceId) return;

    try {
      await axios.delete(`${API_BASE_URL}/${selectedInvoiceId}`);
      setInvoices((prevInvoices) => prevInvoices.filter(invoice => invoice.id !== selectedInvoiceId));
      setIsDialogOpen(false);
      setSelectedInvoiceId(null);
    } catch (error) {
      console.error('🚨 Error deleting invoice:', error);
    }
  };

  return (
      <div className="invoice-manager">
        <div className="main-content">
          <h1>Quản Lý Hóa Đơn</h1>
          <table className="invoice-table">
            <thead>
            <tr>
              <th>Mã Hóa Đơn</th>
              <th>Khách Hàng</th>
              <th>Ngày mua</th>
              <th>Ngày Đến Hạn</th>
              <th>Số lượng</th>
              <th>Tổng Tiền</th>
              <th>Tên Sản Phẩm</th>
              <th>Status Hóa đơn</th>
              <th>Status đã trả tiền</th>
            </tr>
            </thead>
            <tbody>
            {invoices.length > 0 ? (
                invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.userName}</td>
                      <td>{invoice.dateBuy}</td>
                      <td>{invoice.outOfDateToPay}</td>
                      <td>{invoice.amountOfProduct}</td>
                      <td>{invoice.price} VND</td>
                      <td>{invoice.productName}</td>
                      <td>{invoice.statusHasInvoice ? '✔️' : '❌'}</td>
                      <td>{invoice.statusPaid ? '✔️' : '❌'}</td>
                      <td>
                        {invoice.pdfOrImgPath ? (
                            <a
                                href={
                                  invoice.pdfOrImgPath.includes("/files/")
                                      ? invoice.pdfOrImgPath.replace("/files/", "/uploads/") // Convert "/files/" to "/uploads/"
                                      : `http://localhost:8080/uploads/${invoice.pdfOrImgPath.split('/').pop()}` // Ensure correct path
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                              📄 View File
                            </a>
                        ) : 'No File'}
                      </td>
                      <td>
                        <button className="action-button edit" onClick={() => navigate(`/update/${invoice.id}`)}>✏️
                        </button>
                        <button className="action-button delete" onClick={() => handleOpenDialog(invoice.id)}>🗑️</button>
                        <ConfirmDialog
                            isOpen={isDialogOpen}
                            onClose={handleCloseDialog}
                            onConfirm={() => handleConfirmDelete(invoice.id)}
                        />
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="6">No invoices found.</td>
                </tr>
            )}
            </tbody>
          </table>
          {message && <p>{message}</p>}
        </div>
      </div>
  );
};

export default InvoiceManager;