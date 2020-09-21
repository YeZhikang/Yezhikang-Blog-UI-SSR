const path = require('path');

const mapConfig = {
  development: path.resolve(__dirname, './config.dev.js'),
  production: path.resolve(__dirname, './config.prod.js')
}

const getConfig = (env) => {
  let config;
  try{
    config = require(mapConfig[env])
  }catch (e){
    config = {}
  }
  return config;
}

module.exports = getConfig
