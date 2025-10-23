export const ByteFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const isFileSizeExceeded = (file: File): boolean => {
  const maxSizeBytes = 25 * 1024 * 1024
  return file.size > maxSizeBytes
}
