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
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilInstitution, cilHospital } from '@coreui/icons'
import { loginUser  } from '../../../actions/authLoginActions'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (event) => {
    setIsSuperAdmin(event.target.checked)
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(
  //     loginUser({
  //       email: formData.email,
  //       password: formData.password,
  //     })
  //   )
  //   if (response?.success) {
  //   navigate('/dashboard') // ✅ Navigate after login
  // }
  // }
  const handleSubmit = async (e) => {
  e.preventDefault()

  const result = await dispatch(
    loginUser({
      email: formData.email,
      password: formData.password,
    })
  )

  if (result?.success) {
    navigate('/dashboard') // 🎯 Navigate after successful login
  }
}

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign in to your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="username"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    {!isSuperAdmin && (
                      <>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilHospital} />
                          </CInputGroupText>
                          <CFormInput placeholder="Client ID" disabled />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilInstitution} />
                          </CInputGroupText>
                          <CFormInput placeholder="Org ID" disabled />
                        </CInputGroup>
                      </>
                    )}

                    <CCol xs={12} className="mb-4">
                      <CFormCheck
                        id="isActiveCheck"
                        label="Is Super Admin"
                        checked={isSuperAdmin}
                        onChange={handleCheckboxChange}
                      />
                    </CCol>

                    {error && <p className="text-danger">{error}</p>}

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign Up</h2>
                    <p>
                      Don't have an account yet? Register now to access the system.
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
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