
import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilTrash } from '@coreui/icons';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import LocationPickerModal from '../../views/modal/LocationPickerModal';
import { addClient, updateClientById, fetchClientById } from '../../actions/clientAction';

const AddMerchantModal = ({ visible, onClose, editData }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [merchantName, setMerchantName] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState(null);


  // Fetch client data when in edit mode
  useEffect(() => {
  
    if (editData) {
      console.log("Loaded Edit Data:", editData); // Debug log
      setMerchantName(editData.name || '');
      setProperties(
        editData.org?.map((org, index) => ({
          id: org.id || `${index + 1}`,
          name: org.name || '',
          location: org.location || { latitude: 0, longitude: 0 }
        })) || []
      );
    } else {
      resetForm();
    
  }
}, [visible, editData]);

  const resetForm = () => {
    setMerchantName('');
    setProperties([]);
  };
//
const handleMerchantNameChange = (event) => {
  setMerchantName(event.target.value);
};

const handleOrganizationNameChange = (index, event) => {
  const updated = [...properties];
  updated[index].name = event.target.value;
  setProperties(updated);
};

const handleLocationButtonClick = (index) => {
  setActiveLocationIndex(index);
  setShowLocationPicker(true);
};

const handleRemoveOrganization = (index) => {
  const updated = [...properties];
  updated.splice(index, 1);
  setProperties(updated);
};
  const addProperty = () => {
    setProperties([
      ...properties,
      {
        id: Date.now().toString(),
        name: '',
        location: { latitude: 0, longitude: 0 }
      }
    ]);
  };

  const removeProperty = (index) => {
    const updated = [...properties];
    updated.splice(index, 1);
    setProperties(updated);
  };

  const handleLocationSelect = (latlng) => {
    if (activeLocationIndex !== null) {
      const updated = [...properties];
      updated[activeLocationIndex].location = {
        latitude: latlng.lat,
        longitude: latlng.lng,
      };
      setProperties(updated);
      setShowLocationPicker(false);
    }
  };

  const handleSave = async () => {
    if (!merchantName.trim()) {
      Swal.fire('Error', 'Merchant name is required', 'error');
      return;
    }

    if (properties.length === 0) {
      Swal.fire('Error', 'At least one organization is required', 'error');
      return;
    }

    const data = {
      ...(editData?.id && { id: editData.id }),
      id: editData?.id,
      name: merchantName,
      org: properties.map(org => ({
        id: org.id,
        name: org.name,
        location: org.location
      }))
    };

    try {
      setIsLoading(true);
      let response;
      
      if (editData?.id) {
  data.id = editData.id;
  response = await dispatch(updateClientById(data)); // ✅ Correct
} else {
  response = await dispatch(addClient(data)); // ✅ For new records
}

      if (response) {
        Swal.fire({
          title: 'Success!',
          text: `Merchant ${editData?.id ? 'updated' : 'created'} successfully`,
          icon: 'success'
        });
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error('Error saving merchant:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save merchant',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => {
        resetForm();
        onClose();
      }}
      aria-labelledby="MerchantModal"
    >
      <CModalHeader>
        <CModalTitle id="MerchantModal">
          {editData?._id ? 'Edit Merchant' : 'Add Merchant'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel>Merchant Name:</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <CFormInput
                      type="text"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      placeholder="Enter merchant name"
                      disabled={isLoading}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs={12}>
                <div className="mb-2">
                  <CButton
                    color="info"
                    onClick={addProperty}
                    disabled={isLoading}
                    className="mb-3"
                  >
                    Add Organization <CIcon icon={cilPlus} className="ms-2" />
                  </CButton>

                  {properties.map((property, index) => (
                    <div key={index} className="border p-3 mb-3 rounded">
                      <CRow className="mb-2">
                        <CCol>
                          <CFormInput
                            type="text"
                            value={property.name}
                            onChange={(e) => {
                              const updated = [...properties];
                              updated[index].name = e.target.value;
                              setProperties(updated);
                            }}
                            placeholder="Organization name"
                            disabled={isLoading}
                          />
                        </CCol>
                        <CCol xs="auto">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => removeProperty(index)}
                            disabled={isLoading}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                      </CRow>

                      <CRow className="align-items-center mt-2">
                        <CCol>
                          <span className="text-muted">
                            Location: {property.location.latitude.toFixed(6)}, {property.location.longitude.toFixed(6)}
                          </span>
                        </CCol>
                        <CCol xs="auto">
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => {
                              setActiveLocationIndex(index);
                              setShowLocationPicker(true);
                            }}
                            disabled={isLoading}
                          >
                            add Location
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                  ))}
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <LocationPickerModal
          visible={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
          onSelect={handleLocationSelect}
        />
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            resetForm();
            onClose();
          }}
          disabled={isLoading}
        >
          Cancel
        </CButton>
        <CButton
          color="primary"
          onClick={handleSave}
          disabled={isLoading || !merchantName.trim() || properties.length === 0}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddMerchantModal;