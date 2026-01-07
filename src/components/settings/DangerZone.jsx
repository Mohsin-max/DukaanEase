import React, { useState } from 'react'
import axios from 'axios'
import { AlertCircle, RefreshCw, XCircle, X } from 'lucide-react'
import { toast } from 'react-toastify'
import Base_URL from '../../context/Base_Url'
import { getToken } from '../../utils/token'
import { useNavigate } from 'react-router-dom'

const DangerZone = ({ onLogout }) => {
    const [openModal, setOpenModal] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmText, setConfirmText] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const CONFIRM_PHRASE = 'delete my account'

    const handleDeleteAccount = async () => {
        if (confirmText !== CONFIRM_PHRASE) {
            toast.error('Confirmation text does not match')
            return
        }

        try {
            setLoading(true)

            await axios.delete(`${Base_URL}/api/auth/delete-account`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                data: { password },
            })

            toast.success('Account deleted successfully')

            // Clear local storage and redirect to login
            await onLogout()

            navigate('/login', { replace: true })

        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to delete account'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* DANGER ZONE UI */}
            <div className="bg-red-100/50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-4">
                    Danger Zone
                </h3>

                <div className="space-y-3">
                    <button className="danger-btn">
                        <AlertCircle size={18} /> Delete All Sales Data
                    </button>

                    <button className="danger-btn">
                        <RefreshCw size={18} /> Reset All Settings
                    </button>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition"
                    >
                        <XCircle size={18} />
                        Delete Account Permanently
                    </button>
                </div>

                <p className="text-sm text-red-600 dark:text-red-400 mt-4 flex items-center gap-1">
                    <AlertCircle size={16} />
                    This action cannot be undone
                </p>
            </div>

            {/* MODAL */}
            {openModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6 relative">

                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X />
                        </button>

                        <h3 className="text-lg font-semibold text-red-600 mb-2">
                            Delete Account
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            This action is permanent. All data will be deleted.
                        </p>

                        {/* PASSWORD */}
                        <label className="block text-sm mb-1">Current Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Enter your password"
                        />

                        {/* CONFIRM TEXT */}
                        <label className="block text-sm mt-4 mb-1">
                            Type <span className="font-semibold text-red-600">
                                {CONFIRM_PHRASE}
                            </span>
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                            placeholder={CONFIRM_PHRASE}
                        />

                        {/* ACTION BUTTON */}
                        <button
                            disabled={
                                loading ||
                                !password ||
                                confirmText !== CONFIRM_PHRASE
                            }
                            onClick={handleDeleteAccount}
                            className={`mt-5 w-full py-2.5 rounded-lg text-white transition
                ${confirmText === CONFIRM_PHRASE
                                    ? 'bg-red-600 hover:bg-red-500'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {loading ? 'Deleting...' : 'Confirm Delete Account'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DangerZone
