import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormTextarea,
} from '@coreui/react'


/**
 * author Anushka Isuru Lakmal
 * created on 28-05-2025-14h-55m
 * copyright 2025
 */

const AddItemTypeModal = ({ visible, onClose }) => {
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])

  const addProperty = () => {
    setProperties([...properties, { name: '', values: '' }])
  }

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index))
  }

  const handlePropertyNameChange = (index, value) => {
    const updatedProperties = [...properties]
    updatedProperties[index].name = value
    setProperties(updatedProperties)
  }

  const handlePropertyValuesChange = (index, value) => {
    const updatedProperties = [...properties]
    updatedProperties[index].values = value
    setProperties(updatedProperties)
  }

  function updateImagesOrder(images) {
    //console.log(arguments);
    setImages(images)
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Item Type</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Client</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">CUS-00001 John</option>
                    <option value="2">CUS-00011 Mark</option>
                    <option value="3" disabled>
                      CUS-00011 Kane
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Organization</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">CUS-00001 John</option>
                    <option value="2">CUS-00011 Mark</option>
                    <option value="3" disabled>
                      CUS-00011 Kane
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Item Type Name"
                  placeholder="Name"
                />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Item Size</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3" disabled>
                      Large
                    </option>
                  </CFormSelect>
                </CCol>
              </div>

              <CCol className="mt-2" md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-75 words long."
                ></CFormTextarea>
              </CCol>

              <div className="mt-2">
                <CFormInput type="file" id="formFile" label="Upload Image" />
              </div>
              {/* image uploader end */}

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddItemTypeModal
