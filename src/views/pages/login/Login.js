import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone } from '@coreui/icons'
import { loginUser, sendPhoneOtp, verifyPhoneOtp } from '../../../actions/authLoginActions'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  // Tab: 'email' | 'otp'
  const [activeTab, setActiveTab] = useState('email')

  // Email/Password form
  const [emailForm, setEmailForm] = useState({ email: '', password: '' })

  // OTP form state
  const [otpStep, setOtpStep] = useState(1) // 1=enter phone, 2=enter code
  const [otpForm, setOtpForm] = useState({ phone: '', code: '' })
  const [otpMessage, setOtpMessage] = useState(null)
  const [otpError, setOtpError] = useState(null)
  const [otpLoading, setOtpLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value })
  }

  const handleOtpChange = (e) => {
    setOtpForm({ ...otpForm, [e.target.name]: e.target.value })
  }

  // Email/Password submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser(emailForm))
    if (result?.success) {
      navigate('/dashboard')
    }
  }

  // OTP Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setOtpError(null)
    setOtpMessage(null)
    setOtpLoading(true)
    const result = await dispatch(sendPhoneOtp(otpForm.phone))
    setOtpLoading(false)
    if (result?.success) {
      setOtpMessage('OTP sent! Check your SMS.')
      setOtpStep(2)
    } else {
      setOtpError(result?.message || 'Failed to send OTP')
    }
  }

  // OTP Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setOtpError(null)
    setOtpLoading(true)
    const result = await dispatch(verifyPhoneOtp(otpForm.phone, otpForm.code))
    setOtpLoading(false)
    if (result?.success) {
      navigate('/dashboard')
    } else {
      setOtpError(result?.message || 'Invalid or expired OTP')
    }
  }

  const handleResendOtp = () => {
    setOtpStep(1)
    setOtpMessage(null)
    setOtpError(null)
    setOtpForm({ ...otpForm, code: '' })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 shadow-sm">
                <CCardBody>
                  {/* Tab switcher */}
                  <CNav variant="tabs" className="mb-4">
                    <CNavItem>
                      <CNavLink
                        active={activeTab === 'email'}
                        onClick={() => setActiveTab('email')}
                        style={{ cursor: 'pointer' }}
                      >
                        Email / Password
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        active={activeTab === 'otp'}
                        onClick={() => { setActiveTab('otp'); setOtpStep(1); setOtpError(null); setOtpMessage(null) }}
                        style={{ cursor: 'pointer' }}
                      >
                        Phone OTP
                      </CNavLink>
                    </CNavItem>
                  </CNav>

                  <CTabContent>
                    {/* ── Email / Password Tab ─────────────────────────── */}
                    <CTabPane visible={activeTab === 'email'}>
                      <CForm onSubmit={handleEmailSubmit}>
                        <h1 className="mb-1">Login</h1>
                        <p className="text-body-secondary mb-4">Sign in to your account</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={emailForm.email}
                            onChange={handleEmailChange}
                            required
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={emailForm.password}
                            onChange={handleEmailChange}
                            required
                          />
                        </CInputGroup>

                        {error && (
                          <div className="alert alert-danger py-2 mb-3">{error}</div>
                        )}

                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit" disabled={loading}>
                              {loading ? 'Signing in...' : 'Login'}
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-end">
                            <Link to="/forgot-password">
                              <CButton color="link" className="px-0">
                                Forgot password?
                              </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CTabPane>

                    {/* ── Phone OTP Tab ────────────────────────────────── */}
                    <CTabPane visible={activeTab === 'otp'}>
                      <h1 className="mb-1">Phone Login</h1>
                      <p className="text-body-secondary mb-4">
                        {otpStep === 1
                          ? 'Enter your registered phone number'
                          : `Code sent to ${otpForm.phone}`}
                      </p>

                      {otpStep === 1 ? (
                        <CForm onSubmit={handleSendOtp}>
                          <CInputGroup className="mb-4">
                            <CInputGroupText>
                              <CIcon icon={cilPhone} />
                            </CInputGroupText>
                            <CFormInput
                              name="phone"
                              placeholder="Phone (e.g. 0771234567)"
                              value={otpForm.phone}
                              onChange={handleOtpChange}
                              required
                            />
                          </CInputGroup>

                          {otpError && (
                            <div className="alert alert-danger py-2 mb-3">{otpError}</div>
                          )}

                          <CButton color="primary" type="submit" disabled={otpLoading} className="px-4">
                            {otpLoading ? 'Sending...' : 'Send OTP'}
                          </CButton>
                        </CForm>
                      ) : (
                        <CForm onSubmit={handleVerifyOtp}>
                          {otpMessage && (
                            <div className="alert alert-success py-2 mb-3">{otpMessage}</div>
                          )}

                          <CInputGroup className="mb-4">
                            <CInputGroupText>#</CInputGroupText>
                            <CFormInput
                              name="code"
                              placeholder="6-digit code"
                              maxLength={6}
                              value={otpForm.code}
                              onChange={handleOtpChange}
                              required
                              autoFocus
                            />
                          </CInputGroup>

                          {otpError && (
                            <div className="alert alert-danger py-2 mb-3">{otpError}</div>
                          )}

                          <CRow>
                            <CCol xs={6}>
                              <CButton color="primary" type="submit" disabled={otpLoading} className="px-4">
                                {otpLoading ? 'Verifying...' : 'Verify & Login'}
                              </CButton>
                            </CCol>
                            <CCol xs={6} className="text-end">
                              <CButton color="link" className="px-0" onClick={handleResendOtp}>
                                Resend OTP
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      )}
                    </CTabPane>
                  </CTabContent>
                </CCardBody>
              </CCard>

              <CCard className="text-white py-5" style={{ width: '44%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                <CCardBody className="text-center d-flex flex-column justify-content-center">
                  <h2 className="mb-3">QFOX</h2>
                  <p className="mb-4 opacity-75">
                    Smart vending machine management platform for coffee and food dispensing.
                  </p>
                  <Link to="/register">
                    <CButton color="light" className="mt-2 px-4" active tabIndex={-1}>
                      Register Now
                    </CButton>
                  </Link>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
