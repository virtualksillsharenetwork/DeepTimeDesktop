var mysql = require('mysql');
const ipc = window.require('electron').ipcRenderer;
const Fs = require('fs');
const csv = require('csv-parser');
var CryptoJS = require('crypto-js');



        if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

        const CsvReadableStream = require('csv-reader');

        let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');

        inputStream
        .pipe(csv())
        .on('data', function (row) {

        //console.log('A row arrived: ', row.email);
        if(row.org_id != '' && row.pro_id != '' && row.date != ''){
          ipc.send('createTrackingWindow');
          }
          else
              if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

              const CsvReadableStream = require('csv-reader');

              let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

              inputStream
              .pipe(csv())
              .on('data', function (row1) {

              console.log('A row arrived: ', row1.email);
              if(row1.email != ""){
                getOrgs(row1.email);
              }
              })
              .on('end', function () {
              //console.log('No more rows!');
              });

              }

             
        
      })
      .on('end', function () {
      //console.log('No more rows!');
      });
      }
      else{
        if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

          const CsvReadableStream = require('csv-reader');

          let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

          inputStream
          .pipe(csv())
          .on('data', function (row1) {

          console.log('A row arrived: ', row1.email);
          if(row1.email != ""){
            getOrgs(row1.email);
          }
          })
          .on('end', function () {
          //console.log('No more rows!');
          });

          }
      }



// offline_con.connect(function(err) {
//   if (err) throw err;
//   offline_con.query("SELECT * FROM `selectedorgpro`", function (err, result, fields) {
//     if (err) throw err;
//     //console.log(result);

//     offline_con.query("SELECT * FROM logeduserinfo", function (err, result1, fields) {
//       if (err) throw err;
//       if(result1.length > 0){
//       getOrgs(result1[0].email);
//       }
//     });

//       if(result.length > 0){
//         ipc.send('createTrackingWindow');
//         }
//   });
// });

function changeorg(){

  var org_id = document.getElementById('org').value;

  getPros(org_id);


}

function goToTimeTracking(){

  var org_id = document.getElementById('org').value;
  var pro_id = document.getElementById('pro').value;
  if(org_id === "" || pro_id === ""){
    $("#response").show();
    $("#response").html('Select Organization then Project');
  }
  else
  {
    var d = new Date();
    var month = d.getMonth() +1;
    var datee = d.getDate() +"/"+ month +"/"+ d.getFullYear() +"/"+ d.getHours() +"/"+ d.getMinutes() +"/"+ d.getSeconds();


    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'C:/Users/Public/selectedorgpro.csv',
        header: [
            {id: 'org_id', title: 'org_id'},
            {id: 'pro_id', title: 'pro_id'},
            {id: 'date', title: 'date'}
        ]
    });
    console.log();
    const records = [
        {org_id: encrypt(org_id,"nyshu55055"), pro_id: encrypt(pro_id,"nyshu55055"), date: datee}
    ];
     
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
            $("#response").hide();
            $("#response").html('');
            ipc.send('createTrackingWindow');
        });
  }


}


const getOrgs = async(email) => {

  const getUserDataOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email
})
};


await fetch('https://deeptime-digital.com/api/user/organizations/enabled/get',getUserDataOptions)
.then(res => {
    if (res.ok) {
      res.json().then(json => {
        //console.log(json);
      
      $("#org").html('');
      $('#org').html('<option value="">--Select--</option>'); 
      $.each(json,function(key,value){
      $("#org").append('<option value="'+value.org_id+'">'+value.org_name+'</option>');
      });


      });
    }
   })
.catch((error) => {
  // error callback
    console.error(error);
});

  }






  function getPros(org_id){

        if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

        const CsvReadableStream = require('csv-reader');

        let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

        inputStream
        .pipe(csv())
        .on('data', function (row) {

        console.log('A row arrived: ', row.email);
        if(row.email != ""){

                      const getUserDataOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                      org_id: org_id,
                      email: row.email
                      })
                      };


                      fetch('https://deeptime-digital.com/api/user/projects/get',getUserDataOptions)
                      .then(res => {
                      if (res.ok) {
                      res.json().then(json => {
                      //console.log(json[0]);

                      $("#pro").html('');
                      $('#pro').html('<option value="">--Select--</option>'); 
                      $.each(json,function(key,value){
                      $("#pro").append('<option value="'+value.pro_id+'">'+value.pro_name+'</option>');
                      });


                      });
                      }
                      })
                      .catch((error) => {
                      // error callback
                      console.error(error);
                      });
        }
        })
        .on('end', function () {
        //console.log('No more rows!');
        });
        }


    }

















    //encryption code




var keySize = 256;
var ivSize = 128;
var saltSize = 256;
var iterations = 1000;



function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(saltSize/8);

  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(ivSize/8);

  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC

  });

    var encryptedHex = base64ToHex(encrypted.toString());
    var base64result = hexToBase64(salt + iv + encryptedHex);


  return base64result;
}

function decrypt (transitmessage, pass) {

  var hexResult = base64ToHex(transitmessage)

  var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
  var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
  var encrypted = hexToBase64(hexResult.substring(96));

  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC

  })

  return decrypted.toString(CryptoJS.enc.Utf8); 
}

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

function base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
}









//encryption code