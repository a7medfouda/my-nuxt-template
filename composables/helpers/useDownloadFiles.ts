export const useUseDownloadFiles = (fileUrl: string) => {
  if (!fileUrl) return;

  try {
    // Use your API endpoint as a proxy
    window.location.href = `/api/download?url=${encodeURIComponent(fileUrl)}`;
  } catch (error) {
    console.error("Download failed:", error);
  }
};
