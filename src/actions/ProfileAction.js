import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOADING,
  IMAGE_UPLOAD_FAIL
} from './types';

export function uploadImageSuccess(url) {
  return {
    type: IMAGE_UPLOAD_SUCCESS,
    payload: url
  };
};

export function uploadingImage() {
  return {
    type: IMAGE_UPLOADING
  }
}
