import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOADING,
  IMAGE_UPLOAD_FAIL,
  STORE_IMAGE_LOCALLY
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
  };
};

export function storeAvatar(source) {
  return {
    type: STORE_IMAGE_LOCALLY,
    payload: source
  };
};
