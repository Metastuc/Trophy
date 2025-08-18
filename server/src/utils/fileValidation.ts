export const SUPPORTED_IMAGE_FORMATS = ["image/gif", "image/jpeg", "image/jpg", "image/png"];

export const isValidImageFormat = (mimeType: string): boolean => {
  return SUPPORTED_IMAGE_FORMATS.includes(mimeType.toLowerCase());
};
