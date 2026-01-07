import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Base_URL from '../context/Base_Url'
import { toast } from 'react-toastify'
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  Home,
  ArrowRight
} from 'lucide-react'

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const firstInputRef = useRef(null)
  const emailRef = useRef(null)

  // Focus management
  useEffect(() => {
    if (step === 1 && emailRef.current) {
      emailRef.current.focus()
    }
    if (step === 2 && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
    if (step === 3) {
      document.querySelector('input[type="password"]')?.focus()
    }
  }, [step])

  // Resend timer logic
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // STEP 1: SEND OTP
  const sendOTP = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${Base_URL}/api/auth/forgot-password/send-otp`, {
        email: email.toLowerCase().trim()
      })

      toast.success(res.data.message || 'OTP sent successfully!')
      setStep(2)
      setResendTimer(30) // 30 seconds cooldown
    } catch (err) {
      console.error('OTP Send Error:', err)
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to send OTP. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP function
  const resendOTP = async () => {
    if (resendTimer > 0) {
      toast.warning(`Please wait ${resendTimer} seconds before resending`)
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${Base_URL}/api/auth/forgot-password/resend-otp`, {
        email: email.toLowerCase().trim()
      })

      toast.success(res.data.message || 'New OTP sent!')
      setResendTimer(30)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  // STEP 2: VERIFY OTP
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter complete 6-digit OTP')
      return
    }

    // Validate OTP contains only numbers
    if (!/^\d+$/.test(otp)) {
      toast.error('OTP must contain only numbers')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${Base_URL}/api/auth/forgot-password/verify-otp`, {
        email: email.toLowerCase().trim(),
        otp: otp.trim()
      })

      toast.success(res.data.message || 'OTP verified successfully!')
      setStep(3)
    } catch (err) {
      console.error('Verify OTP Error:', err)
      toast.error(
        err.response?.data?.message ||
        'Invalid or expired OTP. Please try again.'
      )
      // Clear OTP on error
      setOtp('')
      setTimeout(() => firstInputRef.current?.focus(), 100)
    } finally {
      setLoading(false)
    }
  }

  // STEP 3: RESET PASSWORD
  const resetPassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Basic password strength check
    if (newPassword.length > 50) {
      toast.error('Password is too long')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${Base_URL}/api/auth/forgot-password/reset`, {
        email: email.toLowerCase().trim(),
        otp: otp.trim(),
        newPassword: newPassword.trim()
      })

      toast.success(res.data.message || 'Password reset successful!')
      setStep(4)
    } catch (err) {
      console.error('Reset Password Error:', err)
      toast.error(
        err.response?.data?.message ||
        'Password reset failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e, step) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (step === 1) sendOTP()
      if (step === 2) verifyOTP()
      if (step === 3) resetPassword()
    }
  }

  // Go back to previous step
  const goBack = () => {
    if (step === 2) {
      setStep(1)
      setOtp('')
    } else if (step === 3) {
      setStep(2)
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className="min-h-screen px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-primary/40">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-36 mb-8">
              <img src="dukaan-ease-logo.png" alt="Dukaan Ease Logo" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600 text-sm">
              {step === 1 && 'Enter your registered email address to receive OTP'}
              {step === 2 && 'Enter 6-digit verification code sent to your email'}
              {step === 3 && 'Create your new secure password'}
              {step === 4 && 'Password has been reset successfully'}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2
                  ${step >= num
                    ? 'bg-primary text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                  ${step === num ? 'ring-4 ring-red-100' : ''}
                  transition-all duration-300
                `}>
                  {step > num ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    num
                  )}
                </div>
                {num < 4 && (
                  <div className={`w-16 h-1 ${step > num ? 'bg-primary' : 'bg-gray-200'} transition-all duration-300`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Back button for steps 2 & 3 */}
          {(step === 2 || step === 3) && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
          )}

          {/* STEP 1: Email Input */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 1)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition placeholder:text-gray-400"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Code sent to <span className="font-semibold text-primary">{email}</span>
                </p>

                <OtpInput
                  otp={otp}
                  setOtp={setOtp}
                  length={6}
                  firstInputRef={firstInputRef}
                  // onEnter={verifyOTP}
                />

                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={resendOTP}
                    disabled={loading || resendTimer > 0}
                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {loading && <Loader2 className="animate-spin" size={14} />}
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Change Email
                  </button>
                </div>
              </div>

              <button
                onClick={verifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          )}

          {/* STEP 3: New Password */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative mb-4">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 3)}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg focus:border-primary outline-none transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 3)}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg focus:border-primary outline-none transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Password must be at least 6 characters long
                </p>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-600 mt-2">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                onClick={resetPassword}
                disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={30} className="text-red-600" />
                  </div>
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  Password Reset Successful!
                </h3>
                <p className="text-gray-600">
                  Your password has been updated. You can now login with your new password.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="/login"
                  className="block w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Go to Login
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <a href="/login" className="font-medium text-primary transition-colors">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced OTP Input Component with backspace fix
const OtpInput = ({ otp, setOtp, length = 6, firstInputRef, onEnter }) => {
  const inputs = Array(length).fill('')

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    const newOtp = otp.split('')

    if (value) {
      newOtp[index] = value
      const combinedOtp = newOtp.join('')
      setOtp(combinedOtp)

      // Auto-focus next input
      if (index < length - 1 && value) {
        setTimeout(() => {
          const nextInput = document.getElementById(`otp-${index + 1}`)
          if (nextInput) nextInput.focus()
        }, 10)
      }

      // Auto-submit if all digits entered
      if (combinedOtp.length === length && onEnter) {
        setTimeout(() => onEnter(), 100)
      }
    }
  }

  const handleKeyDown = (e, index) => {
    const newOtp = otp.split('')

    if (e.key === 'Backspace') {
      e.preventDefault()

      if (otp[index]) {
        // If current input has value, clear it
        newOtp[index] = ''
      } else if (index > 0) {
        // If current is empty, go to previous and clear it
        newOtp[index - 1] = ''
        setOtp(newOtp.join(''))
        setTimeout(() => {
          const prevInput = document.getElementById(`otp-${index - 1}`)
          if (prevInput) prevInput.focus()
        }, 10)
        return
      }

      setOtp(newOtp.join(''))
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      document.getElementById(`otp-${index + 1}`).focus()
    }

    if (e.key === 'Enter' && onEnter && otp.length === length) {
      onEnter()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (pastedData.length === length) {
      setOtp(pastedData)
      document.getElementById(`otp-${length - 1}`).focus()
    }
  }

  return (
    <div
      className="flex justify-center gap-3 mb-6"
      onPaste={handlePaste}
    >
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={i === 0 ? firstInputRef : null}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="1"
          value={otp[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="
            w-14 h-14 text-center text-3xl font-bold
            rounded-lg border-2
            border-gray-300
            focus:border-primary
            outline-none transition-all duration-200
            hover:border-gray-400
            text-gray-800
            bg-white
            placeholder:text-gray-300
          "
          autoComplete="one-time-code"
          placeholder="0"
        />
      ))}
    </div>
  )
}

export default ForgotPassword