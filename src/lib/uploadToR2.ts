export const uploadToR2 = async (file: File, uid: string) => {
  const filename = `${uid}/${Date.now()}-${file.name}`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", filename);
  formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append("uploadPreset", "default");
  formData.append("folder", "/lunalinkmedia");

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Basic ${btoa(
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY! + ":"
      )}`,
    },
  });

  let result;
  try {
    result = await res.json();
  } catch {
    throw new Error("❌ Could not parse upload response.");
  }

  if (!res.ok || !result || !result.filePath) {
    console.error("Upload error response:", result);
    throw new Error("❌ Upload failed. Check credentials or endpoint.");
  }

  return {
    url: result.filePath,
    fileId: result.fileId,
  };
};
