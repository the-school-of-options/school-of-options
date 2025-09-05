import { useRef, useState } from "react";

export  function useCloudFlare() {
 const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      setError(String('Please select a valid video file (MP4, MOV, AVI, MKV)'));
      return;
    }

    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > maxSize) {
      setError(String('File size must be less than 500MB'));
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        if (result.error) {
          errorMessage = result.error;
        } else if (result.errorReasonText) {
          errorMessage = result.errorReasonText;
        } else if (result.errors && Array.isArray(result.errors)) {
          errorMessage = result.errors.map((e: any) => e.message || e).join(', ');
        }
        throw new Error(errorMessage);
      }

      console.log('Upload result:', result);
      setUploadResult(result);
      setUploadProgress(100);
    } catch (err: any) {
      console.error('Upload error:', err);
      let errorMessage = 'Upload failed';
      
      if (err && typeof err === 'object') {
        if (err.message) {
          errorMessage = err.message;
        } else if (err.errorReasonText) {
          errorMessage = err.errorReasonText;
        } else if (err.error) {
          errorMessage = err.error;
        } else {
          errorMessage = JSON.stringify(err);
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(String(errorMessage));
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadProgress,
    uploadResult,
    error,
    fileInputRef,
    handleFileSelect,
    handleFileUpload,   
  }
}