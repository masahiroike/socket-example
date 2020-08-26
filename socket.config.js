module.exports = {
  apps: [
    {
      name: 'socket',
      'log-date-format': 'YYYY-MM-DD HH:mm Z',
      script: './src/index.ts',
      interpreter: 'node',
      interpreter_args:
        '-r ts-node/register --max-old-space-size=4096 -r tsconfig-paths/register',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 9090
      },
      env_test: {
        NODE_ENV: 'test'
      },
      env_prod: {
        NODE_ENV: 'production'
      }
    }
  ]
};
