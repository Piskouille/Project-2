module.exports = {
  mongodb: {
    // Mongo atlas server Adress
    dbURI: process.env.ATLAS_SERVER,
  },
  google: {
    //Your client ID
    clientID: process.env.GOOGLE_CLIENT_ID,
    //Your client Secret
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
