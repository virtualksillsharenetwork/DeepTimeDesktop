const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./mock.db",sqlite3.OPEN_READWRITE, (err)=>{
    if(err) console.log(err);
    console.log('connected to sqlite');
});


var sql = "INSERT INTO cars(id, name, price) VALUES (?,?,?)";

db.run(sql,[1,'hona','1555555'],(err)=>{
    if(err) console.log(err);

    console.log('row created');
});


// var sql = "Select * from cars";

// db.all(sql,[],(err,rows)=>{
//     if(err) console.log(err);

//     rows.forEach(row => {
       
//     console.log(row); 
//     });
// });