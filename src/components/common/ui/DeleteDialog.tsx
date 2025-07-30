'use client';

import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';

interface ConfirmDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteDialog = ({
  onCancel,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 space-y-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-full">
            <TbAlertTriangle className="text-red-600 text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-300 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer">{cancelText}</button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
