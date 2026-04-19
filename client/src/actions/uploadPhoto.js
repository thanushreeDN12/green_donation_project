import { UPLOAD_PHOTO } from '../constants/actionTypes'
import * as api from '../api/index'

export const uploadPhoto = (formData) => async (dispatch) => {
  try {
    console.log('inside action');
    // console.log(formData)
    
    const response = await api.uploadPhoto(formData);
    
    dispatch({ type: UPLOAD_PHOTO, payload: response.data });
  } catch (error) {
    console.error('Upload error:', error.message);
  }
};
