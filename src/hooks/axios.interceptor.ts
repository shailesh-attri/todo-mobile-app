import axios, { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { baseurl } from "../utils/backendApi";
// Create an axios instance so you don’t mess with global axios defaults
const apiClient = axios.create({
  baseURL: baseurl, // ✅ Replace this
  timeout: 10000,
});

// 🕓 For measuring request duration
const requestTimers: Record<string, number> = {};

// 🟢 REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestId = `${config.method?.toUpperCase()} ${config.url ?? ''}`;
    requestTimers[requestId] = Date.now();

    console.log("📡 [Request Start]");
    console.log("➡️ URL:", `${config.baseURL ?? ''}${config.url ?? ''}`);
    console.log("🧭 Method:", config.method?.toUpperCase());
    console.log("📦 Payload:", config.data || "—");
    console.log("🧾 Headers:", config.headers);

    return config;
  },
  (error: AxiosError) => {
    console.log("❌ [Request Error]", error.message);
    return Promise.reject(error);
  }
);

// 🟣 RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const requestId = `${response.config.method?.toUpperCase()} ${response.config.url ?? ''}`;
    const duration = Date.now() - (requestTimers[requestId] || Date.now());

    console.log("✅ [Response Success]");
    console.log("➡️ URL:", `${response.config.baseURL ?? ''}${response.config.url ?? ''}`);
    console.log("🧭 Method:", response.config.method?.toUpperCase());
    console.log("📊 Status:", response.status, response.statusText);
    console.log("🕒 Duration:", `${duration}ms`);
    console.log("📦 Response Data:", response.data);

    return response;
  },
  (error: AxiosError) => {
    const { response, config } = error;

    console.log("🚨 [Response Error]");
    console.log("➡️ URL:", config?.baseURL ?? "" + config?.url);
    console.log("🧭 Method:", config?.method?.toUpperCase());
    console.log("⚠️ Message:", error.message);

    if (response) {
      console.log("📊 Status:", response.status);
      console.log("📦 Error Data:", response.data);
    } else {
      console.log("❗ No response received (network error or timeout)");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
