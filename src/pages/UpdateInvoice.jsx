import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/invoices';

const UpdateInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        invoiceNumber: '',
        userName: '',
        dateBuy: '',
        price: 0
    });

    useEffect(() => {
        fetchInvoice();
    }, []);

    const fetchInvoice = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            setInvoice(response.data);
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/${id}`, invoice, {
                headers: { 'Content-Type': 'application/json' }
            });
            navigate('/'); // Redirect to Invoice Manager after update
        } catch (error) {
            console.error('Error updating invoice:', error);
        }
    };

    return (
        <div className="edit-invoice">
            <h2>Chỉnh Sửa Hóa Đơn</h2>
            <form onSubmit={handleSubmit}>
                <label>Mã Hóa Đơn:</label>
                <input type="text" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleChange} required />

                <label>Khách Hàng:</label>
                <input type="text" name="userName" value={invoice.userName} onChange={handleChange} required />

                <label>Ngày Mua:</label>
                <input type="date" name="dateBuy" value={invoice.dateBuy} onChange={handleChange} required />

                <label>Tổng Tiền:</label>
                <input type="number" name="price" value={invoice.price} onChange={handleChange} required />

                <button type="submit">Cập Nhật</button>
                <button type="button" onClick={() => navigate('/')}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateInvoice;
