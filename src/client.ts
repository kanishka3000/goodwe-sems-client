import axios, { AxiosInstance } from 'axios';
import {
  SemsClientConfig,
  TokenData,
  PowerStationDetail,
  ApiResponse,
} from './types';

const LOGIN_URL = 'https://www.semsportal.com/api/v2/Common/CrossLogin';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'token': '{"version":"","client":"ios","language":"en"}',
};

export class SemsClient {
  private username: string;
  private password: string;
  private powerStationId: string;
  private timeout: number;
  private tokenData: TokenData | null = null;
  private httpClient: AxiosInstance;

  constructor(config: SemsClientConfig) {
    this.username = config.username;
    this.password = config.password;
    this.powerStationId = config.powerStationId;
    this.timeout = config.timeout ?? 30000;
    this.httpClient = axios.create({
      timeout: this.timeout,
      headers: DEFAULT_HEADERS,
    });
  }

  private async login(): Promise<TokenData> {
    const response = await this.httpClient.post<ApiResponse<TokenData>>(
      LOGIN_URL,
      { account: this.username, pwd: this.password },
    );

    const data = response.data;

    if (data.code !== 0 && data.code !== '0') {
      throw new Error(`Login failed: ${data.msg || 'Unknown error'} (code: ${data.code})`);
    }

    if (!data.data) {
      throw new Error('Login response missing data field');
    }

    this.tokenData = {
      token: data.data.token,
      timestamp: data.data.timestamp,
      uid: data.data.uid,
      client: data.data.client || 'ios',
      version: data.data.version || '',
      language: data.data.language || 'en',
      api: data.api || '',
    };

    return this.tokenData;
  }

  private async ensureAuthenticated(): Promise<TokenData> {
    if (!this.tokenData) {
      return this.login();
    }
    return this.tokenData;
  }

  private buildAuthHeaders(token: TokenData): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'token': JSON.stringify({
        uid: token.uid,
        timestamp: token.timestamp,
        token: token.token,
        client: token.client,
        version: token.version,
        language: token.language,
        api: token.api,
      }),
    };
  }

  private async request<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    const token = await this.ensureAuthenticated();
    const url = `${token.api}${endpoint}`;

    const response = await this.httpClient.post<ApiResponse<T>>(
      url,
      body,
      { headers: this.buildAuthHeaders(token) },
    );

    const data = response.data;

    if (data.code !== 0 && data.code !== '0') {
      if (data.code === 100002 || data.msg?.includes('token')) {
        this.tokenData = null;
        return this.request(endpoint, body);
      }
      throw new Error(`API error: ${data.msg || 'Unknown error'} (code: ${data.code})`);
    }

    return data.data;
  }

  async getMonitorDetail(): Promise<PowerStationDetail> {
    return this.request<PowerStationDetail>(
      '/v3/PowerStation/GetMonitorDetailByPowerstationId',
      { powerStationId: this.powerStationId },
    );
  }

  clearToken(): void {
    this.tokenData = null;
  }
}
