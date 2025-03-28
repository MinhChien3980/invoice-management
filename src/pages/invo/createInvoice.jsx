import React, {useState} from "react";
import './createInvoice.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(

        {
            invoiceNumber: "",
            userName: "ADMIN",
            statusPaid: false,
            aproved:false,
            aproveDate:"",
            customerName:"",
            statusHasInvoice: false,
            dateBuy: "",
            outOfDateToPay: "",
            pdfOrImgPath: ""
        });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const validateForm = () => {
    //     const newErrors = {};

    //     // Validate Customer Name
    //     if (!formData.customerName.trim()) {
    //         newErrors.customerName = 'Tên khách hàng không được để trống';
    //     }

    //     // Validate Date
    //     if (!formData.invoiceDate) {
    //         newErrors.invoiceDate = 'Ngày hóa đơn không được để trống';
    //     }

    //     // Validate Items
    //     if (!formData.items.trim()) {
    //         newErrors.items = 'Mặt hàng không được để trống';
    //     }

    //     // Validate Unit Price
    //     if (!formData.unitPrice) {
    //         newErrors.unitPrice = 'Giá đơn vị không được để trống';
    //     } else if (Number(formData.unitPrice) <= 0) {
    //         newErrors.unitPrice = 'Giá đơn vị phải lớn hơn 0';
    //     }

    //     // Validate Quantity
    //     if (!formData.quantity) {
    //         newErrors.quantity = 'Số lượng không được để trống';
    //     } else if (Number(formData.quantity) <= 0) {
    //         newErrors.quantity = 'Số lượng phải lớn hơn 0';
    //     }

    //     // Validate Total Amount
    //     if (!formData.totalAmount) {
    //         newErrors.totalAmount = 'Tổng số tiền không được để trống';
    //     } else if (Number(formData.totalAmount) <= 0) {
    //         newErrors.totalAmount = 'Tổng số tiền phải lớn hơn 0';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        setIsSubmitting(true);

        try {
            // API call would go here
            const response = await axios.post('http://localhost:8080/api/invoices', formData);
            console.log(response)
            // Success handling
            alert('Hóa đơn đã được tạo thành công!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            // Error handling
            alert('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <Link to="/" className="back-button">
                    ← Trở về
                </Link>
                <div className="form-header">
                    <h1 className="title">Tạo Hóa Đơn</h1>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã hóa đơn</label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            placeholder="Nhập tên khách hàng"
                        />
                        {errors.invoiceNumber && <span className="error-message">{errors.invoiceNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label>Tên Khách Hàng</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Nhập tên khách hàng"
                        />
                        {errors.customerName && <span className="error-message">{errors.customerName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Người tạo hóa đơn</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            // onChange={handleChange}
                            placeholder="Người tạo hóa đơn"
                        />
                        {errors.userName && <span className="error-message">{errors.userName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Ngày mua</label>
                        <input
                            type="date"
                            name="dateBuy"
                            value={formData.dateBuy}
                            onChange={handleChange}
                        />
                        {errors.dateBuy && <span className="error-message">{errors.dateBuy}</span>}
                    </div>

                    <div className="form-group">
                        <label>Ngày đến hạn</label>
                        <input
                            type="date"
                            name="outOfDateToPay"
                            value={formData.outOfDateToPay}
                            onChange={handleChange}
                        />
                        {errors.dateExpired && <span className="error-message">{errors.dateExpired}</span>}
                    </div>

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

export default InvoiceForm;