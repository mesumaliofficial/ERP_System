'use client'

import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

interface SuccessDialogProps {
    onClose: () => void
    message?: string
    title?: string
    buttonText?: string
}

const SuccessDialog = ({ onClose, message, title, buttonText }: SuccessDialogProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 space-y-4 border border-gray-200">
                <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 w-8 h-8 mt-1" />
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end pt-2">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessDialog
