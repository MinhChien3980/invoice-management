import React, {useState} from 'react';
import './updateInvoice.css';
import InvoiceDisplay from './invoiceDisplay';
import {Link} from "react-router-dom";

const UpdateInvoiceTest = () => {
    // State to manage form data
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        userName: '',
        dateBuy: '',
        price: '',
        outOfDateToPay: '',
        amountOfProduct: '',
        productName: '',
        statusPaid: '',
    });
    const errors = null;

    // Handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
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

    return (<div className="container">
            <div className="form-wrapper">
                <Link to="/" className="back-button">
                    ← Trở về
                </Link>
                <div className="form-header">
                    <h1 className="title">Tạo Hóa Đơn</h1>
                </div>
                <form className="form" onSubmit={handleSubmit}>


                    <div className="form-group">
                        <label>Tổng tiền</label>
                        <input
                            type="number"
                            name="totalPrice"
                            value={formData.totalPrice}
                            onChange={handleChange}
                            placeholder="Nhập tổng số tiền"
                        />
                        {errors.totalPrice && <span className="error-message">{errors.totalPrice}</span>}
                    </div>

                    <div className="form-group">
                        <label>Tên sản phẩm </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Nhập tên sảm phẩm"
                        />
                        {errors.productName && <span className="error-message">{errors.productName}</span>}
                    </div>

                    <label>Upload File:</label>
                    <button type="button" onClick={() => fileInputRef.current.click()}>📂 Chọn Tệp</button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png"
                    />
                    {selectedFile && <p>📄 Selected File: {selectedFile.name}</p>}
                    {uploadMessage && <p>{uploadMessage}</p>}

                    {invoice.pdfOrImgPath && (
                        <p>🔗 Current File: <a href={`http://localhost:8080/files/${invoice.pdfOrImgPath}`}
                                              target="_blank"
                                              rel="noopener noreferrer">View File</a></p>
                    )}

                    <div className="button-container">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Tạo Hóa Đơn'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInvoiceTest;