import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone, cilEnvelopeClosed } from '@coreui/icons'
import { registerUser } from '../../../actions/authLoginActions'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (formData.password !== formData.repeatPassword) {
      return setError('Passwords do not match')
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)
    const result = await registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    })()

    setLoading(false)
    if (result?.success) {
      setSuccess('Account created successfully! Redirecting to login...')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', repeatPassword: '' })
      setTimeout(() => navigate('/login'), 2000)
    } else {
      setError(result?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow-sm">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1 className="mb-1">Create Account</h1>
                  <p className="text-body-secondary mb-4">
                    Register for QFOX management access
                  </p>

                  <CRow className="g-2 mb-3">
                    <CCol sm={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol sm={6}>
                      <CFormInput
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      name="phone"
                      placeholder="Phone (e.g. 0771234567)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Password (min 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="repeatPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  {error && (
                    <div className="alert alert-danger py-2 mb-3">{error}</div>
                  )}
                  {success && (
                    <div className="alert alert-success py-2 mb-3">{success}</div>
                  )}

                  <div className="d-grid mb-3">
                    <CButton color="success" type="submit" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </CButton>
                  </div>

                  <div className="text-center">
                    <small className="text-muted">
                      Already have an account?{' '}
                      <Link to="/login">Sign in</Link>
                    </small>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
