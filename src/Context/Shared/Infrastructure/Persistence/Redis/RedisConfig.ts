export interface RedisConfig {
  url: string;
  username?: string;
  password?: string;
  socket?: {
    connectTimeout: number;
  };
}
