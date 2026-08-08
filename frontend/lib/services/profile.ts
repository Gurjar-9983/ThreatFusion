
import { api } from "@/lib/api";

export interface ProfileData {
  user: {
    full_name: string;
    email: string;
    joined: string;
    active: boolean;
  };

  stats: {
    reports: number;
    iocs: number;
    searches: number;
    api_calls: number;
  };
}

export interface UpdateProfileData {
  full_name: string;
  email: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

export async function getProfile(): Promise<ProfileData> {
  const { data } = await api.get("/users/me/profile");

  return data;
}

export async function updateProfile(
  data: UpdateProfileData
) {
  const response = await api.put(
    "/users/me",
    data
  );

  return response.data;
}

export async function changePassword(
  data: ChangePasswordData
) {
  const response = await api.post(
    "/users/me/password",
    data
  );

  return response.data;
}