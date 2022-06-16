const bcrypt = require("bcrypt");
const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const saltRounds = 10;
        const plainTextPassword = req.body.password;
        let newUser = {
          username: req.body.username, 
          email: req.body.email, 
          firstName: req.body.firstName, 
          lastName: req.body.lastName, 
          passwordHash: 0
        };
        // newUser.passwordHash = 20;
        // console.log(newUser.passwordHash);
        bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
          if (!err) {
            console.log(hash);
            // New user object to push to database
            // let newUser = {
            //   username: req.body.username, 
            //   email: req.body.email, 
            //   firstName: req.body.firstName, 
            //   lastName: req.body.lastName, 
            //   passwordHash: 0
            // };           
            newUser.passwordHash = hash;
            console.log(newUser)
            res.status(200).send(console.log("Lookin' good!"));
            users.push(newUser);
            // console.log(users);
          } else {
            res.status(400).send(`Not lookin' so good, ${err}`);
          }
        })
      
      
      
        console.log('asldfklsdkjf')
        console.log(newUser);
        console.log('Registering User')
        console.log(req.body)
        // users.push(req.body)
        res.status(200).send(req.body)
    }
}