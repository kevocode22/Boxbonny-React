const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const enviarVerificacion = async (email, string) => {

  const myOAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_ID,
    "https://developers.google.com/oauthplayground"
  )

  myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
  })

  const accessToken = myOAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "SomosBoxBonny@gmail.com",
      type: "OAuth2",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false //para evitar que bloquee el antivirus
    }
  })

  let mailOptions = {
    from: process.env.USER_MAIL,
    to: email,
    subject: 'verificar cuenta',
    html: `
    <body style="background-position: cover; color: rgba(0, 0, 0, 0.651); font-family:Poppins; text-align: center;">
        <div style="background-color: #F6F7EB; border-radius: 50px; margin: 2rem; padding: 1rem;">
            <h1 style="letter-spacing: 4px; font-size: 20px; text-shadow: 0px 0px 40px grey; margin: 3rem;">BIENVENIDO<span style="font-family:'Poppins'; color: #FF8E72; font-size: 20px;"> BOXBONNIER!</span></h1>
            <h2 style="font-size:20px; letter-spacing: 4px; text-shadow: 0px 0px 40px grey;">Estamos muy contentos que estes acá!</h2>
            <h2 style="margin: 2rem; color: #393E41; letter-spacing: 6px; text-shadow: 0px 0px 40px grey; font-size: 25px;">por favor verifica tu cuenta haciendo click!</h2>
            <button style="background-color:#FF8E72; color: white; padding: 1rem; border: none; border-radius: 30px;-webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
            box-shadow: 0px 15px 20px grey; margin: 1rem;">
            <a href=${process.env.BACKEND_URL}api/verificar/${string} style="text-decoration: none; color:black; font-family:Poppins; font-size: 20px">CLICK!</a>
            </button>
            <h3 style="margin: 2rem; font-size: 20px; color: #393E41; letter-spacing: 5px; text-shadow: 0px 0px 40px grey; ">NOS VEMOS!</h3>
            <h3 style="font-size:20px">El Equipo de BoxBonny</h3>
        </div>    
    </body>
    `
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log(`checkea ${email} para confirmar tu cuenta`)
    }
  })
}

module.exports = enviarVerificacion