const ipc = window.require('electron').ipcRenderer;
var mysql = require('mysql');
var exec = require('child_process').execFile;
var CryptoJS = require('crypto-js');
const Fs = require('fs');
const csv = require('csv-parser');

// mouse_clicks_detection = exec('C:/xampp/xampp-control.exe', function(err, data) {  
//   console.log(err)
//   console.log(data.toString());                       
//   });


if (Fs.existsSync('C:/ProgramData/deeptime.db')) {

}
else{

    Fs.writeFile('C:/ProgramData/deeptime.db','', function (err) {
        if (err){}
        else{
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database("C:/ProgramData/deeptime.db",sqlite3.OPEN_READWRITE, (err)=>{
                if(err){ console.error(err);}
                else
                {console.log('connected');}
            });
            


            var screenshoots = "CREATE TABLE IF NOT EXISTS screenshoots(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,orgid varchar(1000), proid varchar(1000), path varchar(1000), date varchar(1000), time varchar(1000))";

            db.run(screenshoots,[],(err)=>{
                if(err){console.error(err);} 
                else{
                    console.log('screenshoots');
                }
            });

                var keyboardclicks = "CREATE TABLE IF NOT EXISTS keyboardclicks(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,orgid varchar(1000), proid varchar(1000), clicks varchar(1000), date varchar(1000), time varchar(1000))";

            db.run(keyboardclicks,[],(err)=>{
                if(err){console.error(err);} 
                else{
                    console.log('keyboardclicks');
                }

            });
                var mouseclicks = "CREATE TABLE IF NOT EXISTS mouseclicks(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,orgid varchar(1000), proid varchar(1000), clicks varchar(1000), date varchar(1000), time varchar(1000))";

            db.run(mouseclicks,[],(err)=>{
                if(err){console.error(err);} 
                else{
                    console.log('mouseclicks');
                }
            
                
            });


            var timespentonproject = "CREATE TABLE IF NOT EXISTS timespentonproject(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,orgid varchar(1000), proid varchar(1000), day varchar(1000), month varchar(1000), year varchar(1000), hour varchar(1000), minute varchar(1000), memo varchar(1000), date varchar(1000))";

            db.run(timespentonproject,[],(err)=>{
                if(err){console.error(err);} 
                else{
                    console.log('timespentonproject');
                }
            
                
            });


        }
        ipc.send('relaunch');
    });
    
        
}








  if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {
      
    const CsvReadableStream = require('csv-reader');
  
    let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');
    
    inputStream
      .pipe(csv())
      .on('data', function (row) {
        
          console.log('A row arrived: ', row.email);
          if(row.email != ""){
            ipc.send('createIndexWindow');
          }
      })
      .on('end', function () {
          //console.log('No more rows!');
      });



  }

 









const getLoginInformation = async() => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
    })
    };

    await fetch('https://deeptime-digital.com/api/login/user-from/desktop',requestOptions)
    .then(res => {
        if (res.ok) {
          res.json().then(json => {
            console.log(json);
            if(json === 'failed'){
                $("#response").show();
                $("#response").html('Error while fetching. Please Contact to Admin');
            }
            else{
                $("#response").show();
                $("#response").html('save');


                const createCsvWriter = require('csv-writer').createObjectCsvWriter;
                const csvWriter = createCsvWriter({
                    path: 'C:/Users/Public/logininfo.csv',
                    header: [
                        {id: 'email', title: 'email'}
                    ]
                });
                 
                const records = [
                    {email: json}
                ];
                 
                csvWriter.writeRecords(records)       // returns a promise
                    .then(() => {
                        console.log('...Done');
                        ipc.send('createIndexWindow');
                    });
                    
                    
            }
          });
        }
       })
    .catch((error) => {
      // error callback
        console.error(error);
        $("#response").show();
        $("#response").html(error);
    });
}




$('#loginbtn').click(function(e){
    getLoginInformation();
});


// sessionStorage.setItem("name", "John Doe");

// sessionStorage.getItem("name");

// sessionStorage.removeItem("name");

// // Remove all saved data from sessionStorage
// sessionStorage.clear();



// let code = (function(){
//   return{
//     encryptMessage: function(messageToencrypt = '', secretkey = ''){
//       var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
//       return encryptedMessage.toString();
//     },
//     decryptMessage: function(encryptedMessage = '', secretkey = ''){
//       var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
//       var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

//       return decryptedMessage;
//     }
//   }
// })();
// //  var encstring = code.encryptMessage('Naeem','b14ca5898a4e4133bbce2ea2315a1916');
// //  console.log(encstring);

// //  var encstring = code.decryptMessage('PVnLGHruHHgNgkjRNczvXg==','b14ca5898a4e4133bbce2ea2315a1916');
// //  console.log(encstring);





























// var keySize = 256;
// var ivSize = 128;
// var saltSize = 256;
// var iterations = 1000;

// var message = "yn+n7SmomHI5eayi2IBpkLr2G5aoajA9iKR540NLaQZOZhpHQLzEcmABsWkofYdF32Q1qiWHB5KJyGagIRSUhg==";
// var password = "nyshu5505";



// function encrypt (msg, pass) {
//   var salt = CryptoJS.lib.WordArray.random(saltSize/8);

//   var key = CryptoJS.PBKDF2(pass, salt, {
//       keySize: keySize/32,
//       iterations: iterations
//     });

//   var iv = CryptoJS.lib.WordArray.random(ivSize/8);

//   var encrypted = CryptoJS.AES.encrypt(msg, key, { 
//     iv: iv, 
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC

//   });

//     var encryptedHex = base64ToHex(encrypted.toString());
//     var base64result = hexToBase64(salt + iv + encryptedHex);


//   return base64result;
// }

// function decrypt (transitmessage, pass) {

//   var hexResult = base64ToHex(transitmessage)

//   var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
//   var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
//   var encrypted = hexToBase64(hexResult.substring(96));

//   var key = CryptoJS.PBKDF2(pass, salt, {
//       keySize: keySize/32,
//       iterations: iterations
//     });

//   var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
//     iv: iv, 
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC

//   })

//   return decrypted.toString(CryptoJS.enc.Utf8); 
// }

// function hexToBase64(str) {
//   return btoa(String.fromCharCode.apply(null,
//     str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
//   );
// }

// function base64ToHex(str) {
//   for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
//     var tmp = bin.charCodeAt(i).toString(16);
//     if (tmp.length === 1) tmp = "0" + tmp;
//     hex[hex.length] = tmp;
//   }
//   return hex.join("");
// }



// console.log(encrypt("sheri",password));