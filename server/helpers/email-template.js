exports.emailVerificationTemplate = (user_name, link) => {
  return `

    <p><strong>Hello ${user_name} welcome to Mern Auth .</strong></p>
    
  <p><strong><img alt="Broadway Learn" src="https://blog.logrocket.com/wp-content/uploads/2019/07/full-stack-mern-app-jwt-auth.jpeg" style="height:124px; width:210px" /></strong></p>
  
  <p>We wanted to let you know that your account&nbsp; was created.</p>
  
  <p>Now please verify your email account by clicking&nbsp;<a href=${link}>Here</a>&nbsp;.</p>
  
  <p>Link will be expired in 10 minutes .</p>
  
  <p>Thank You</p>
  
  `
}
