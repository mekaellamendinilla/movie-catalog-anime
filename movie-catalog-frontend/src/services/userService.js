import api from "./api";

export const getCurrentUserProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const updateUserProfile = async (payload) => {
  const response = await api.put("/auth/profile", payload);
  return response.data;
};

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  const response = await api.post("/auth/profile/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
