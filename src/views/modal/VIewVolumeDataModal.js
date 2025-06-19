/**
 * Created by Sudeera De Silva
 * Copyright 2025
 */

import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilTrash } from '@coreui/icons';
import Swal from 'sweetalert2';
import { fetchMachineById, updateMachineById } from '../../actions/machineActions';
import { useDispatch } from 'react-redux';
import { fetchItemsByClient } from '../../actions/itemAction';

const ViewVolumeDataModal = ({ visible, onClose, editData, addOREdit }) => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [machineName, setMachineName] = useState('');
  const [clientId, setClientId] = useState('');
  const [orgId, setOrgId] = useState('');

  const addProperty = () => {
    setProperties([...properties, { item_id: '', stock: '', qty: '', nozzle: '' }]);
  };

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const handlePropertyChange = (index, field, value) => {
    if (field === 'stock' || field === 'qty') {
      value = value.replace(/[^0-9.]/g, '');
    }

    const updatedProperties = [...properties];
    updatedProperties[index] = { ...updatedProperties[index], [field]: value };

    if (field === 'item_id') {
      const selectedItem = itemData.find((item) => item.id.toString() === value);
      updatedProperties[index].nozzle = selectedItem ? selectedItem.nozzle : '';
    }

    setProperties(updatedProperties);
  };

  const getItemData = async (clientId, orgId) => {
    try {
      if (!clientId || !orgId) return;
      const result = await dispatch(fetchItemsByClient(`client_id=${clientId}&org_id=${orgId}`));
      setItemData(result.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const resetForm = () => {
    setProperties([]);
    setMachineName('');
    setClientId('');
    setOrgId('');
    setItemData([]);
  };

  useEffect(() => {
    if (visible) {
      if (editData) {
        setSelectedId(editData.id || '');
        setMachineName(editData.name || '');

        const cid = editData.client_id;
        const oid = editData.org_id;
        setClientId(cid);
        setOrgId(oid);

        getItemData(cid, oid);

        setProperties(
          editData.inventory?.map((item) => ({
            item_id: item.item_id.toString(),
            stock: item.stock.toString(),
            qty: item.qty.toString(),
            nozzle: item.nozzle || '',
          })) || []
        );
      } else if (addOREdit) {
        resetForm();
      }
    }
  }, [visible, editData, addOREdit]);

  const handleSave = async () => {
    if (!selectedId || properties.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please add at least one item with volume details.',
      });
      return;
    }

    const data = {
      item_id: properties.map((prop) => prop.item_id),
      inventory: properties.map((prop) => ({
        item_id: prop.item_id,
        nozzle: prop.nozzle,
        stock: Number(prop.stock),
        qty: Number(prop.qty),
        cupcount: Number(prop.qty),
      })),
    };

    try {
      const response = await dispatch(updateMachineById(selectedId, data));
      if (response) {
        Swal.fire({
          title: 'Saved!',
          text: 'Stock is saved successfully!',
          icon: 'success',
        });
        resetForm();
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving data.',
      });
    }
  };

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit Volume</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <CRow className="mb-2">
                  <CCol>
                    <CFormLabel>Machine Name :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color="success">{machineName || ''}</CBadge>
                  </CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol>
                    <CFormLabel>Client ID :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color="info">{clientId}</CBadge>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <CFormLabel>Organization ID :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color="warning">{orgId}</CBadge>
                  </CCol>
                </CRow>
              </CCol>

              <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Items</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Volume For Item&nbsp;
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>

                  {properties.map((property, index) => {
                    const selectedItem = itemData.find(
                      (item) => item.id.toString() === property.item_id
                    );

                    return (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CCol>
                          <CFormSelect
                            style={{ minWidth: '200px' }}
                            aria-label="Select Item"
                            value={property.item_id}
                            onChange={(e) =>
                              handlePropertyChange(index, 'item_id', e.target.value)
                            }
                          >
                            <option value="">- Select -</option>
                            {itemData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name} (Nozzle: {item.nozzle})
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>

                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.stock}
                          onChange={(e) =>
                            handlePropertyChange(index, 'stock', e.target.value)
                          }
                          placeholder="Volume in ml"
                        />

                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.qty}
                          onChange={(e) =>
                            handlePropertyChange(index, 'qty', e.target.value)
                          }
                          placeholder="Cup count"
                        />

                        <CButton
                          color="danger"
                          type="button"
                          onClick={() => removeProperty(index)}
                        >
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    );
                  })}
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ViewVolumeDataModal;
