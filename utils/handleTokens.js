const jwt = require("jsonwebtoken")

const createAccessToken = (payload)=>{
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1d"})
}

const createRefreshToken = (payload)=>{
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"})
}

const createClientToken = (payload)=>{
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"8h"})
}


module.exports ={
  createAccessToken,
  createRefreshToken,
  createClientToken
}