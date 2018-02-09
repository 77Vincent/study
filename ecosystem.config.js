module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'client',
      script    : 'index.html',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'admin',
      host : '39.104.108.82',
      ref  : 'origin/master',
      repo : 'git@github.com:77Vincent/study.git',
      path : '/data/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      env  : {
        NODE_ENV: 'production'
      }
    },
    dev : {
      user : 'admin',
      host : '39.104.108.82',
      ref  : 'origin/develop',
      repo : 'git@github.com:77Vincent/study.git',
      path : '/data/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
