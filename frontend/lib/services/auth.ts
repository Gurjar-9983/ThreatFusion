
import { api } from "@/lib/api";
import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from "@/lib/types/auth";

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function register(data: RegisterRequest) {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
}