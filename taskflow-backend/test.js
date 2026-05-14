const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.todoapp.ofvyiza.mongodb.net",
  (err, addresses) => {

    if (err) {
      console.log("ERROR:", err);
    } 
    
    else {
      console.log(addresses);
    }

  }
);