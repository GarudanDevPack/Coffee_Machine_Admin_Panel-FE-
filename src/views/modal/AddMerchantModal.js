
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
import { useDispatch,useSelector } from 'react-redux';
import LocationPickerModal from '../../views/modal/LocationPickerModal';
import { addClient, updateClientById, fetchClientById,fetchCurrentClient,fetchLoggedClient  } from '../../actions/clientAction';

const AddMerchantModal = ({ visible, onClose, editData }) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [clientName, setClientName] = useState('');
  const [password, setPassword] = useState('');  
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState(null);
  const authUser = useSelector((state) => state.auth.user)
  const clientId = authUser?.id


  // Fetch client data when in edit mode
//   useEffect(() => {
  
//     if (editData) {
//       console.log("Loaded Edit Data:", editData); // Debug log
//       setMerchantName(editData.name || '');
//       setProperties(
//         editData.org?.map((org, index) => ({
//           id: org.id || `${index + 1}`,
//           name: org.name || '',
//           location: org.location || { latitude: 0, longitude: 0 }
//         })) || []
//       );
//        setPassword('');  
//     } else {
//       resetForm();
    
//   }
// }, [visible, editData]);
//  useEffect(() => {
//     const init = async () => {
//        if (visible && (editData?.id ?? true)) {
//         setIsLoading(true);
//         const res = await dispatch(fetchClientById(editData.id));
//         setCurrentId(editData.id);
//         if (!res) {   
//           setIsLoading(false);
//           return;
//         }
        
//         // expecting res?.data?.name and res?.data?.org
//         const payload = res?.data ?? res; // handle either {data:{...}} or {...}
//         const name = payload?.name ?? '';
//         const orgs = Array.isArray(payload?.org) ? payload.org : [];
//         + setClientName(name);
//         setCurrentId(payload?.id ?? editData?.id ?? null);
//         setProperties(
//           orgs.map((o, idx) => ({
//             id: o?.id ?? String(idx + 1),
//             name: o?.name ?? '',
//             location: o?.location ?? { latitude: 0, longitude: 0 },
//           }))
//         );
//         setIsLoading(false);
//       } else {
//         resetForm();
//       }
//     };
//     init();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [visible, editData?.id]);
useEffect(() => {
  const loadClient = async () => {
    const res = await dispatch(fetchLoggedClient());
   if (res?.success) {
  setClientName(res.data.name || '') // show in Client Name input
    }
  };
  loadClient();
}, [dispatch, visible]);

  const loadCurrentClientData = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(fetchCurrentClient());
      if (response && response.success && response.data) {
        setCurrentId(response.data.id);
        setClientName(response.data.name || '');
        
        // Load existing organizations
        const orgs = Array.isArray(response.data.org) ? response.data.org : [];
        setProperties(
          orgs.map((org, idx) => ({
            id: org.id || String(idx + 1),
            name: org.name || '',
            location: org.location || { latitude: 0, longitude: 0 },
          }))
        );
      } else {
        Swal.fire('Error', 'Failed to load your client data', 'error');
        onClose();
      }
    } catch (error) {
      console.error('Error loading client data:', error);
      Swal.fire('Error', 'Failed to load your client data', 'error');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const initializeModal = async () => {
    setIsLoading(true);
    
    try {
      if (editData && editData.id && userRole === 'admin') {
        // Admin editing specific client
        await loadClientData(editData.id);
      } else {
        // Logged-in client managing their own data
        await loadCurrentUserData();
      }
    } catch (error) {
      console.error('Error initializing modal:', error);
      Swal.fire('Error', 'Failed to load client data', 'error');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

   const loadClientData = async (clientId) => {
    const res = await dispatch(fetchClientById(clientId));
    if (res && res.success && res.data) {
      populateFormData(res.data);
    } else {
      throw new Error('Failed to load client data');
    }
  };

  // Load current user data (for logged-in client)
  const loadCurrentUserData = async () => {
    // You'll need to add this action to get current logged-in user
    const res = await dispatch(fetchCurrentClient()); // New action needed
    if (res && res.success && res.data) {
      populateFormData(res.data);
    } else {
      // If no existing data, initialize empty form for new client
      resetForm();
    }
  };

  // Populate form with client data
  const populateFormData = (clientData) => {
    setCurrentId(clientData.id);
    setClientName(clientData.name || '');
    
    const orgs = Array.isArray(clientData.org) ? clientData.org : [];
    setProperties(
      orgs.map((org, idx) => ({
        id: org.id || String(idx + 1),
        name: org.name || '',
        location: org.location || { latitude: 0, longitude: 0 },
      }))
    );
  };


  const resetForm = () => {
    setClientName('');
    setProperties([]);
    setPassword('');
    setShowLocationPicker(false);
    setActiveLocationIndex(null);
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

//   const handleSave = async () => {
//     if (!merchantName.trim()) {
//       Swal.fire('Error', 'Merchant name is required', 'error');
//       return;
//     }

//     if (properties.length === 0) {
//       Swal.fire('Error', 'At least one organization is required', 'error');
//       return;
//     }

//     const data = {
//       ...(editData?.id && { id: editData.id }),
//       id: editData?.id,
//       name: merchantName,
//       org: properties.map(org => ({
//         id: org.id,
//         name: org.name,
//         location: org.location
//       })),
//       ...(editData?.id ? { password } : {}),  
//     };

//     try {
//       setIsLoading(true);
//       let response;
      
//       if (editData?.id) {
//   data.id = editData.id;
//   if (!password || password.trim().length < 4) {
//           Swal.fire('Error', 'Password is required to update organizations', 'error');
//           return;
//         }
//   response = await dispatch(updateClientById(data)); // ✅ Correct
// } else {
//   response = await dispatch(addClient(data)); // ✅ For new records
// }

//       if (response) {
//         Swal.fire({
//           title: 'Success!',
//           text: `Merchant ${editData?.id ? 'updated' : 'created'} successfully`,
//           icon: 'success'
//         });
//         resetForm();
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error saving merchant:', error);
//       Swal.fire({
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to save merchant',
//         icon: 'error'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
// const handleSave = async () => {
//     if (!clientName.trim()) {
//       Swal.fire('Error', 'Client name is required', 'error');
//       return;
//     }
//     if (properties.length === 0) {
//       Swal.fire('Error', 'At least one organization is required', 'error');
//       return;
//     }
//     if (!password || password.trim().length < 4) {
//       Swal.fire('Error', 'Password is required to update organizations', 'error');
//       return;
//     }

//     const payload = {
//       id: editData.id, // id is mandatory for update
//       name: clientName,
//       org: properties.map(o => ({
//         id: o.id,
//         name: o.name,
//         location: o.location,
//       })),
//       password, // server must bcrypt.compare(...)
//     };

//     try {
//       setIsLoading(true);
//       const response = await dispatch(updateClientById(payload));
//       if (response?.success) {
//         Swal.fire({ title: 'Success!', text: 'Organizations updated successfully', icon: 'success' });
//         resetForm();
//         onClose();
//       } else {
//         Swal.fire({ title: 'Error', text: response?.message || 'Update failed', icon: 'error' });
//       }
//     } catch (error) {
//       console.error('Error updating client:', error);
//       Swal.fire({
//         title: 'Error',
//         text: error?.response?.data?.message || 'Failed to update client',
//         icon: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
 const handleSave = async () => {
      if (!clientName.trim()) {
      Swal.fire('Error', 'Client name is required', 'error');
      return;
    }

    if (properties.length === 0) {
      Swal.fire('Error', 'At least one organization is required', 'error');
      return;
    }

    // Password required for organization updates
    if (!password || password.trim().length < 4) {
      Swal.fire('Error', 'Password is required to update organizations (minimum 4 characters)', 'error');
      return;
    }

    const payload = {
      name: clientId,
      org: properties.map(prop => ({
        id: prop.id,
        name: prop.name,
        location: prop.location,
      })),
      password: password
    };

    // Add ID for existing clients
    if (currentId) {
      payload.id = currentId;
    }

    try {
      setIsLoading(true);
      let response;

      if (currentId) {
        // Update existing client
        response = await dispatch(updateClientById(payload));
      } else {
        // This shouldn't happen in normal flow since clients register first
        // But keeping for completeness
        response = await dispatch(addClient(payload));
      }

      if (response && response.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Organizations updated successfully',
          icon: 'success'
        });
        resetForm();
        onClose();
      } else {
        Swal.fire({
          title: 'Error',
          text: response?.message || 'Failed to update client',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error saving client:', error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to update client',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  ;


  const handleModalClose = () => {
    resetForm();
    onClose();
  };
 const handleUpdateOrganizations = async () => {
    // Simple validation
    if (!clientName.trim()) {
      Swal.fire('Error', 'Client name is required', 'error');
      return;
    }

    if (!password || password.trim().length < 4) {
      Swal.fire('Error', 'Password is required and must be at least 4 characters', 'error');
      return;
    }

    if (properties.length === 0) {
      Swal.fire('Error', 'At least one organization is required', 'error');
      return;
    }

    // Validate organization names
    const emptyOrgNames = properties.some(prop => !prop.name.trim());
    if (emptyOrgNames) {
      Swal.fire('Error', 'All organizations must have names', 'error');
      return;
    }

    const payload = {
      id: clientId,
      name: clientName.trim(),
      password: password.trim(),
      org: properties.map(prop => ({
        id: prop.id,
        name: prop.name.trim(),
        location: prop.location,
      })),
    };

    try {
      setIsLoading(true);
      const response = await dispatch(updateClientById(payload));

      if (response && response.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Organizations updated successfully',
          icon: 'success'
        });
        onClose();
      } else {
        Swal.fire({
          title: 'Error',
          text: response?.message || 'Failed to update organizations. Please check your credentials.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating organizations:', error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to update organizations',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
  //   <CModal
  //     alignment="center"
  //     scrollable
  //     visible={visible}
  //    onClose={handleModalClose}
  //     aria-labelledby="MerchantModal"
  //   >
  //     <CModalHeader>
  //       <CModalTitle id="MerchantModal">
  //         {editData?._id ? 'Edit Merchant' : 'Add Merchant'}
  //       </CModalTitle>
  //     </CModalHeader>
  //     <CModalBody>
  //       <CCard className="mb-4">
  //         <CCardBody>
  //           <CRow className="mb-3">
  //             <CCol md={12}>
  //               <CRow className="mb-3">
  //                 <CCol md={3}>
  //                   <CFormLabel>Merchant Name:</CFormLabel>
  //                 </CCol>
  //                 <CCol md={9}>
  //                   <CFormInput
  //                     type="text"
  //                     value={clientName}
  //                     onChange={(e) => setClientName(e.target.value)}
  //                     placeholder="Enter merchant name"
  //                     disabled={isLoading}
  //                   />
  //                 </CCol>
  //               </CRow>
  //             </CCol>
  //           </CRow>
  //             {/* Password (required to update)
  //           <CRow className="mb-3">
  //             <CCol md={3}><CFormLabel>Password:</CFormLabel></CCol>
  //             <CCol md={9}>
  //               <CFormInput
  //                 type="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 placeholder="Enter your password to update organizations"
  //                 disabled={isLoading}
  //               />
  //             </CCol>
  //           </CRow> */}
  //            {/* Password field - only show for edit mode */}
  //             {/* Password Section - Always visible for organization updates */}
  //           <CRow className="mb-3">
  //             <CCol md={3}>
  //               <CFormLabel>Password:</CFormLabel>
  //             </CCol>
  //             <CCol md={9}>
  //               <CFormInput
  //                 type="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 placeholder="Enter your password to update organizations"
  //                 disabled={isLoading}
  //                 required
  //               />
  //               <small className="text-muted">
  //                 Password verification required to update organizations
  //               </small>
  //             </CCol>
  //           </CRow>

  //           <CRow>
  //             <CCol xs={12}>
  //               <div className="mb-2">
  //                 <CButton
  //                   color="info"
  //                   onClick={addProperty}
  //                   disabled={isLoading}
  //                   className="mb-3"
  //                 >
  //                   Add Organization <CIcon icon={cilPlus} className="ms-2" />
  //                 </CButton>

  //                 {properties.map((property, index) => (
  //                   <div key={index} className="border p-3 mb-3 rounded">
  //                     <CRow className="mb-2">
  //                       <CCol>
  //                         <CFormInput
  //                           type="text"
  //                           value={property.name}
  //                           onChange={(e) => {
  //                             const updated = [...properties];
  //                             updated[index].name = e.target.value;
  //                             setProperties(updated);
  //                           }}
  //                           placeholder="Organization name"
  //                           disabled={isLoading}
  //                         />
  //                       </CCol>
  //                       <CCol xs="auto">
  //                         <CButton
  //                           color="danger"
  //                           size="sm"
  //                           onClick={() => removeProperty(index)}
  //                           disabled={isLoading}
  //                         >
  //                           <CIcon icon={cilTrash} />
  //                         </CButton>
  //                       </CCol>
  //                     </CRow>

  //                     <CRow className="align-items-center mt-2">
  //                       <CCol>
  //                         <span className="text-muted">
  //                           Location: {property.location.latitude.toFixed(6)}, {property.location.longitude.toFixed(6)}
  //                         </span>
  //                       </CCol>
  //                       <CCol xs="auto">
  //                         <CButton
  //                           color="primary"
  //                           size="sm"
  //                           onClick={() => {
  //                             setActiveLocationIndex(index);
  //                             setShowLocationPicker(true);
  //                           }}
  //                           disabled={isLoading}
  //                         >
  //                           add Location
  //                         </CButton>
  //                       </CCol>
  //                     </CRow>
  //                   </div>
  //                 ))}
  //               </div>
  //             </CCol>
  //           </CRow>
  //         </CCardBody>
  //       </CCard>

  //       <LocationPickerModal
  //         visible={showLocationPicker}
  //         onClose={() => setShowLocationPicker(false)}
  //         onSelect={handleLocationSelect}
  //       />
  //     </CModalBody>
  //     <CModalFooter>
  //       <CButton
  //         color="secondary"
  //         onClick={() => {
  //           resetForm();
  //           onClose();
  //         }}
  //         disabled={isLoading}
  //       >
  //         Cancel
  //       </CButton>
  //       <CButton
  //         color="primary"
  //         onClick={handleSave}
  //         disabled={isLoading || !clientName.trim() || properties.length === 0}
  //       >
  //         {isLoading ? 'Saving...' : 'Save Changes'}
  //       </CButton>
  //     </CModalFooter>
  //   </CModal>
  // );
  <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={handleModalClose}
      aria-labelledby="UpdateOrganizationsModal"
    >
      <CModalHeader>
        <CModalTitle id="UpdateOrganizationsModal">
          Update Organizations
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
           {/* Client Name pulled from logged-in id */}
            <CRow className="mb-3">
              <CCol md={3}><CFormLabel>Client Name:</CFormLabel></CCol>
              <CCol md={9}>
                <CFormInput
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your client name"
                  disabled={isLoading}
                  readOnly         // set to false if you want to allow rename
                  className="bg-light"
                />
                <small className="text-muted">Loaded from your account</small>
              </CCol>
            </CRow>

            {/* Password input (required) */}
            <CRow className="mb-3">
              <CCol md={3}><CFormLabel>Password:</CFormLabel></CCol>
              <CCol md={9}>
                <CFormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password to update"
                  disabled={isLoading}
                  required
                  minLength={4}
                />
                <small className="text-muted">Password verification required to update organizations</small>
              </CCol>
            </CRow>


            <hr className="my-3" />

            {/* Organizations Section */}
            <CRow>
              <CCol xs={12}>
                <div className="mb-2">
                  <h6 className="mb-3">Organizations:</h6>
                  <CButton
                    color="info"
                    onClick={addProperty}
                    disabled={isLoading}
                    className="mb-3"
                  >
                    Add Organization <CIcon icon={cilPlus} className="ms-2" />
                  </CButton>

                  {properties.length === 0 && (
                    <div className="text-center text-muted py-3">
                      No organizations added yet. Click "Add Organization" to start.
                    </div>
                  )}

                  {properties.map((property, index) => (
                    <div key={property.id} className="border p-3 mb-3 rounded">
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
                            placeholder={`Organization ${index + 1} name`}
                            disabled={isLoading}
                            required
                          />
                        </CCol>
                        <CCol xs="auto">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => removeProperty(index)}
                            disabled={isLoading}
                            title="Remove Organization"
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
                            Select Location
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
          onClick={handleModalClose}
          disabled={isLoading}
        >
          Cancel
        </CButton>
        <CButton
          color="primary"
          onClick={handleUpdateOrganizations}
          disabled={
            isLoading || 
            !clientName.trim() || 
            !password.trim() ||
            password.trim().length < 4 ||
            properties.length === 0
          }
        >
          {isLoading ? 'Updating...' : 'Update Organizations'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddMerchantModal;