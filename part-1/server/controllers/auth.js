const bcrypt = require("bcrypt");
const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
  
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username /*&& users[i].passwordHash === password*/) {
          if (bcrypt.compareSync(password, users[i].passwordHash, (err, result) => {
            return result;
          })) {
            console.log(users[i]);
            delete users[i].passwordHash;
            console.log(users[i]);
            console.log("Login Successful");
            return res.status(200).send(users[i]);
          } else {
            res.status(400).send("Incorrect password");
          } 
          
        } else {
          // res.status(400).send("User not found.");
        }
      }
      
    },
    register: (req, res) => {
        const saltRounds = 10;
        const plainTextPassword = req.body.password;
        
        // Hashing of plainTextPassword
        bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
          if (!err) {
            console.log(hash);
            // New user object to push to database
            let newUser = {
              username: req.body.username, 
              email: req.body.email, 
              firstName: req.body.firstName, 
              lastName: req.body.lastName, 
              passwordHash: 0
            };           
            newUser.passwordHash = hash;
            console.log(newUser)
            res.status(200).send(req.body);
            users.push(newUser);
          } else {
            res.status(400).send(`Not lookin' so good, ${err}`);
          }
        })
      
        // console.log(newUser);
        console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)
    }
}