import React, {useState} from "react";
import './createInvoice.css';
import {Link, useNavigate} from "react-router-dom";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        dateBuy: '',
        dateExpired: '',
        quantity: '',
        productName: '',
        totalPrice: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Validate Customer Name
        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Tên khách hàng không được để trống';
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail = 'Email không được để trống';
        } else if (!emailRegex.test(formData.customerEmail)) {
            newErrors.customerEmail = 'Email không hợp lệ';
        }

        // Validate Date
        if (!formData.invoiceDate) {
            newErrors.invoiceDate = 'Ngày hóa đơn không được để trống';
        }

        // Validate Items
        if (!formData.items.trim()) {
            newErrors.items = 'Mặt hàng không được để trống';
        }

        // Validate Unit Price
        if (!formData.unitPrice) {
            newErrors.unitPrice = 'Giá đơn vị không được để trống';
        } else if (Number(formData.unitPrice) <= 0) {
            newErrors.unitPrice = 'Giá đơn vị phải lớn hơn 0';
        }

        // Validate Quantity
        if (!formData.quantity) {
            newErrors.quantity = 'Số lượng không được để trống';
        } else if (Number(formData.quantity) <= 0) {
            newErrors.quantity = 'Số lượng phải lớn hơn 0';
        }

        // Validate Total Amount
        if (!formData.totalAmount) {
            newErrors.totalAmount = 'Tổng số tiền không được để trống';
        } else if (Number(formData.totalAmount) <= 0) {
            newErrors.totalAmount = 'Tổng số tiền phải lớn hơn 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // API call would go here
            // const response = await axios.post('your-api-endpoint', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

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
                            name="dateExpired"
                            value={formData.dateExpired}
                            onChange={handleChange}
                        />
                        {errors.dateExpired && <span className="error-message">{errors.dateExpired}</span>}
                    </div>

                    <div className="form-group">
                        <label>Số lượng</label>
                        <input
                            type='number'
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Nhập số lượng sản phẩm"
                        ></input>
                        {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                    </div>

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