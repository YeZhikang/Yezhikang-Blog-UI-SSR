module.exports = (mode) => {
  let config;
  if(process.env.NODE_ENV === 'development'){
    config = {
      BASE_URL: '127.0.0.1:3000'
    }
  }else{
    config = {
      BASE_URL: 'http://www.yezhikang.site:3000'
    }
  }
  return config
}
