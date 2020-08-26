module.exports = {
  apps: [
    {
      name: 'proxy',
      'log-date-format': 'YYYY-MM-DD HH:mm Z',
      script: './src/Servers/Proxy.ts',
      uid: 'root',
      'log-date-format': 'YYYY-MM-DD HH:mm Z',
      interpreter: 'node',
      interpreter_args:
        '-r ts-node/register --max-old-space-size=4096 -r tsconfig-paths/register',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        TARGET_PORT: 9090,
        DOMAIN: 'example.com'
      },
      env_prod: {
        NODE_ENV: 'production'
      }
    }
  ]
};
