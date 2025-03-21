import React, {useState} from 'react';
import './ConfirmDialog.css';
import axios from "axios";

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // If the dialog is not open, return null

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h3>Xác nhận xóa hóa đơn</h3>
                <div className="warning-icon">⚠️</div>
                <p>Bạn xác nhận xóa hóa đơn</p>
                <div className="dialog-buttons">
                    <button className="cancel-btn" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="delete-btn" onClick={onConfirm}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;