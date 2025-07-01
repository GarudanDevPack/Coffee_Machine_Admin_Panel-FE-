import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../../actions/clientAction'
import Swal from 'sweetalert2'
import { addPromotions,updatePromotionsById } from '../../actions/promotionAction'

const AddPromotionModal = ({ visible, onClose ,editData }) => {
  const dispatch = useDispatch()
  const [clients, setClients] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [status, setStatus] = useState('active')
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (editData?.status) {
      setStatus(editData.status)
    }
  }, [editData])
  
  useEffect(() => {
    const getClientData = async () => {
      try {
        const result = await dispatch(fetchClients())
        setClients(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getClientData()
  }, [dispatch])

  const handleClientChange = (event) => {
    const clientId = event.target.value
    setSelectedClient(clientId)

    const client = clients.find((c) => c.id.toString() === clientId)
    setOrganizations(client ? client.org : [])
  }

  const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value)
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
  }

//   const handleSave = async () => {
//     const data = {
//       client_id: Number(selectedClient),
//       org_id: Number(selectedOrg),
//       type: 'Banner',
//       status: status,
//       img_preferences: {
//         img_path: imageFile ? `/uploads/${imageFile.name}` : '',
//         alt_text: 'Banner',
//         image_format: imageFile ? imageFile.name.split('.').pop() : '',
//         image_size: {
//           width: 1200,
//           height: 600,
//         },
//       },
//     }

//     try {
//       const response = await dispatch(addPromotions(data))
//       if (response) {
//         Swal.fire({
//           title: 'Saved!',
//           text: 'Advertisement saved successfully!',
//           icon: 'success',
//         })
//         onClose()
//       } else {
//         Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' })
//       }
//     } catch (error) {
//       console.error('Error saving data:', error)
//     }
//   }
useEffect(() => {
  const getClientData = async () => {
    try {
      const result = await dispatch(fetchClients());
      setClients(result.data);

      if (editData) {
        setSelectedClient(editData.client_id);
        setSelectedOrg(editData.org_id);
        setStatus(editData.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  getClientData();
}, [dispatch, editData]);
const handleSave = async () => {
  const data = editData
    ? { id: editData.id, status }
    : {
        client_id: Number(selectedClient),
        org_id: Number(selectedOrg),
        type: 'Banner',
        status: status,
        img_preferences: {
          img_path: imageFile ? `/uploads/${imageFile.name}` : '',
          alt_text: 'home page',
          image_format: imageFile ? imageFile.name.split('.').pop() : '',
          image_size: { width: 1200, height: 600 },
        },
      };

  try {
    const response = await dispatch(editData ? updatePromotionsById(data) : addPromotions(data));
    if (response) {
      Swal.fire({ title: 'Saved!', text: 'Advertisement saved!', icon: 'success' });
      onClose();
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Advertisement</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol className="mt-2" md={12}>
                <CFormLabel>Client</CFormLabel>
                <CFormSelect value={selectedClient} onChange={handleClientChange}>
                  <option>- Select -</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormLabel>Organization</CFormLabel>
                <CFormSelect value={selectedOrg} onChange={handleOrgChange}>
                  <option>- Select -</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput type="file" label="Upload Image" onChange={handleFileChange} />
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck
                  id="isActiveCheck"
                  label="Is Active"
                  checked={status === 'active'}
                  onChange={() => setStatus((prev) => (prev === 'active' ? 'inactive' : 'active'))}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddPromotionModal
