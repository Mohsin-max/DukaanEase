// Enhanced OTP Input Component
const OtpInput = ({ otp, setOtp, length = 6, firstInputRef, onEnter }) => {
  const inputs = Array(length).fill('')

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    if (!value) return

    const newOtp = otp.split('')
    newOtp[index] = value
    const combinedOtp = newOtp.join('')
    setOtp(combinedOtp)

    // Auto-focus next input
    if (index < length - 1 && value) {
      document.getElementById(`otp-${index + 1}`).focus()
    }

    // Auto-submit if all digits entered
    if (combinedOtp.length === length && onEnter) {
      setTimeout(() => onEnter(), 100)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
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
      className="flex justify-center gap-2 mb-4"
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
            w-14 h-14 text-center text-2xl font-bold
            rounded-xl border-2 border-gray-300
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
            outline-none transition-all
            hover:border-gray-400
            dark:bg-gray-900 dark:border-gray-700 dark:text-white
            placeholder:text-gray-300
          "
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

export default OtpInput