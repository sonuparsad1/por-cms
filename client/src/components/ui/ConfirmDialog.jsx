import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import PremiumButton from './PremiumButton';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', type = 'danger' }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center p-2">
                <div className={`p-4 rounded-full mb-4 ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    <AlertTriangle size={32} />
                </div>
                <p className="text-[var(--text-secondary)] font-medium mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex gap-4 w-full">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl font-bold border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' : 'bg-[var(--accent)] hover:opacity-90 shadow-[var(--accent)]/20'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
