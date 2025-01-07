import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CFormInput,
  CButton,
  CFormCheck,
  CCardHeader,
  CCardBody,
  CFormLabel,
} from '@coreui/react'
import { cilPlus, cilTrash } from '@coreui/icons'
import { TableViewMachine } from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddMachineModal } from '../../modal/AddComponentModel'
import MachineDataTableMui from '../../../components/tblcomponents/MachineDataTableWithFilter'

const Machines = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      {/* <CCard className="mb-4">
        <CCardHeader>Manage Machines</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={6}>
              <CFormInput type="text" id="machineName" label="Machine Name" placeholder="Name" />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="machineType" label="Machine Type" placeholder="Type" />
            </CCol>
            <CCol xs={12} md={12} className="mt-3">
              <div className="mb-2">
                <CRow>
                  <CFormLabel className="mb-3">Properties</CFormLabel>
                </CRow>
                <CButton
                  color="info"
                  type="button"
                  onClick={addProperty}
                  className="btn-default text-sm mb-4"
                >
                  Add
                  <CIcon className="ml-2" icon={cilPlus} size="sm" />
                </CButton>
                {properties.length > 0 &&
                  properties.map((property, index) => (
                    <div className="d-flex gap-2 mb-2" key={index}>
                      <CFormInput
                        type="text"
                        className="mb-0"
                        value={property.name}
                        onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                        placeholder="Property name (e.g., color)"
                      />
                      <CFormInput
                        type="text"
                        className="mb-0"
                        value={property.values}
                        onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                        placeholder="Values, comma-separated"
                      />
                      <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                        <CIcon className="ml-2" icon={cilTrash} size="sm" />
                      </CButton>
                    </div>
                  ))}
              </div>
            </CCol>
            <CCol xs={12} className="mt-3">
              <CFormCheck id="isActiveCheck" label="Is Active" />
            </CCol>
            <CCol xs={12} className="mt-3">
              <CButton color="primary">Submit</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard> */}
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Machines</div>
            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddMachineModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
              {/* <CButton
                color="info"
                type="button"
                onClick={() => console.log('popup add items!')}
                className="btn-default text-sm"
              >
                Add  
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton> */}
            </div>
          </div>
          {/* <CRow> */}
          {/* <div className="d-flex auto">
            <div>Manage Machines</div>
            <CButton
              color="info"
              type="button"
              onClick={console.log('popup add items !')}
              className="btn-default text-sm mb-4"
            >
              Add
              <CIcon className="ml-2" icon={cilPlus} size="sm" />
            </CButton>
          </div> */}
          {/* </CRow> */}
        </CCardHeader>

        <CCardBody className="mt-4">
          <MachineDataTableMui />
          {/* <TableViewMachine /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Machines
