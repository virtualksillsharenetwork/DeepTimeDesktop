
const ipc = window.require('electron').ipcRenderer;
//var mysql = require('mysql');
var exec = require('child_process').execFile;
var FormData = require('form-data');
const Fs = require('fs');
const csv = require('csv-parser');
var CryptoJS = require('crypto-js');
const checkInternetConnected = require('check-internet-connected');
const config = {
  timeout: 5000, //timeout connecting to each server, each try
  retries: 5,//number of retries to do before failing
  domain: 'https://www.google.com/',//the domain to check DNS record of
}
checkInternetConnected(config);

let mouse_clicks_detection;
var isPaused = false;
var d = new Date();
let memoo = '';
let updateHours_minutes = 0;

let minnn=0;
let hourrr=0;
let ten_min = 0;
let change_cache = 1;





TimeStop();


  /* ****************************************************start detector************************************************************* */


function fun (){
  console.log("detector start");
  mouse_clicks_detection = exec('C:/Program Files (x86)/Default Company Name/mcd/MouseClickDetector.exe', function(err, data) {  
  console.error(err)
  //console.log(data.toString());                       
  });  
  }

fun();

  /* ****************************************************get project data************************************************************* */

  function getProjectName(org_id,pro_id,email)
{

            const getUserDataOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                projectid: pro_id,
                email: email
          })
          };


          fetch('https://deeptime-digital.com/api/get/data/user-project/name',getUserDataOptions)
          .then(res => {
              if (res.ok) {
                res.json().then(json => {
                  //console.log(json.email_address);
                  $("#projectname").html(json.pro_name);
                  
                });
              }
            })
          .catch((error) => {
            // error callback
              console.error(error);
          });

  }


  function  correctTheTime(email)
{

      const getUserDataOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: email
    })
    };


    fetch('https://deeptime-digital.com/api/send/data-time/user-to/web',getUserDataOptions)
    .then(res => {
        //if (res.ok) {
          //res.json().then(json => {
            //console.log(json.email_address);
            
            
          //});
        //}
      })
    .catch((error) => {
      // error callback
        console.error(error);
    });

  }

  /* ****************************************************get user data************************************************************* */

  function getUser(email)
  {

      const getUserDataOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: email
    })
    };
  
  
    fetch('https://deeptime-digital.com/api/send/data/user-to/desktop',getUserDataOptions)
    .then(res => {
        if (res.ok) {
          res.json().then(json => {
            //console.log(json.email_address);
            $("#username").html(json.first_name+" "+json.last_name);
            
          });
        }
      })
    .catch((error) => {
      // error callback
        console.error(error);
    });
    }


  /* ****************************************************get day************************************************************* */


    if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {
      
      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');
      
      inputStream
        .pipe(csv())
        .on('data', function (row) {
          
            //console.log('A row arrived: ', row.email);
            if(row.email != ""){
              //console.log(d.getDay());
              correctTheTime(row.email);
              getUser(row.email);
              if(d.getDay() == 0){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Sun';
            });
          }
              if(d.getDay() == 1){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Mon';
            });
          }
              if(d.getDay() == 2){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Tue';
            });
          }
              if(d.getDay() == 3){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Wed';
            });
          }
              if(d.getDay() == 4){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Thu';
            });
          }
              if(d.getDay() == 5){
                $( document ).ready(function() {
              document.getElementById("dayofwork").innerHTML = 'Fri';
            });
          }
              if(d.getDay() == 6){
              $( document ).ready(function() {
                document.getElementById("dayofwork").innerHTML = 'Sat';
              });
            }
              

            }
        })
        .on('end', function () {
            //console.log('No more rows!');
        });
    }




      /* ****************************************************time correction on ui************************************************************* */
function timeCorrectUI(){
    if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {
      
      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');
      
      inputStream
        .pipe(csv())
        .on('data', function (row1) {



                if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {
                  
                  const CsvReadableStream = require('csv-reader');
                
                  let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
                  
                  inputStream
                    .pipe(csv())
                    .on('data', function (row) {
                      
                          
                          var org_id = decrypt(row.org_id,"nyshu55055");
                          var pro_id = decrypt(row.pro_id,"nyshu55055");
                          var email = row1.email;
                          getProjectName(org_id,pro_id,email);



                          const getUserDataOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              org_id: org_id,
                              pro_id:pro_id,
                              email:email
                        })
                        };
                        
                        
                        fetch('https://deeptime-digital.com/api/user/get-nowlasthourminute/data/get',getUserDataOptions)
                        .then(res => {
                            if (res.ok) {
                              res.json().then(json => {
                                //console.log(json);
                                if(json[0].today_hour.length > 0){
                                  $("#today_hrs").html(pad(json[0].today_hour[0].hour));
                                }if(json[0].today_minute.length > 0){
                                  $("#today_minuts").html(pad(json[0].today_minute[0].minute));
                                }if(json[0].lastWeek_hour.length > 0){
                                  $("#hours_per_week").html(pad(json[0].lastWeek_hour[0].hours));
                                }if(json[0].lastWeek_minute.length > 0){
                                  $("#minutes_per_week").html(pad(json[0].lastWeek_minute[0].minutes));

                                  var hour = $("#hours_per_week").text();
                                  var hourss = parseInt(hour);
                                  hourss = hourss + parseInt(json[0].lastWeek_minute[0].minutes / 60);
                                  $("#hours_per_week").html(pad(hourss));
                                  var mins = parseFloat(json[0].lastWeek_minute[0].minutes % 60);
                                  //var mins = mins.split(".");
                                  try{
                                  $("#minutes_per_week").html(pad(mins));
                                  }catch(error){
                                    $("#minutes_per_week").html(pad(mins));
                                  }
                                }
                              
                        
                              });
                            }
                          })
                        .catch((error) => {
                          // error callback
                            console.error(error);
                        });


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
  }
  timeCorrectUI();


  /* ****************************************************start interval************************************************************* */

setInterval(Call_Me_After_Every_Minute,60000); //60000 miliseconds = 1 minute

  /* ****************************************************pad function************************************************************* */

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
}
}
  


  /* ****************************************************online button click************************************************************* */

  function online(){


    require('dns').resolve('www.google.com', function(err) {
      if (err) {
        
         alert("Check Internet Connection and Try Again.");

      } else {



      memoo = document.getElementById("memo").value;

      var togBtn =   document.getElementById("togBtn");
      if(togBtn.checked){
      //alert('ok');
      isPaused = !isPaused;
      document.getElementById("memo").readOnly = true; 
      TimeContinue();
      }
      else{
        TimeStop();
      //alert('no');
      //alert(myInter);
      //clearInterval(myInter);
      isPaused = !isPaused;
      document.getElementById("memo").readOnly = false; 
      //mouse_clicks_detection.kill();
      togBtn.checked = false;
      }

    }
    });

  }


  /* ****************************************************back button click************************************************************* */



function backtoselection(){
  if(isPaused){

    //alert('Please Stop Timer');
    $("#gobacke").show();
    $("#gobacke").html('Stop timer first');
     
  }
  else{
    TimeStop();
    isPaused = !isPaused;
    togBtn.checked = false;
    Fs.unlink('C:/Users/Public/selectedorgpro.csv', (err) => {
      if (err) throw err;
      //console.log('successfully deleted');
      //$("#gobacke").show();
      //$("#gobacke").html('Stop timer first');
      ipc.send('gotoSelection');
    });

  }
}


  /* ****************************************************1 minute function************************************************************* */



function Call_Me_After_Every_Minute(){ 



  /* ****************************************************change cache of image************************************************************* */
  change_cache++;
  if (Fs.existsSync('C:/Users/Public/LastCapture.jpg')) {
    $("#lastSSdiv").html('');
    var show_picscode = '<img src="C:/Users/Public/LastCapture.jpg?v='+change_cache+'" id="lastSS" name="lastSS" alt="Current Screen Shoot" style="width: 340px;height: 200px;"></img>';
    $("#lastSSdiv").append(show_picscode);
  }
/* ****************************************************arrange time correctly************************************************************* */
  if(isPaused) {
    ten_min++;
    minnn++;
    if(minnn == 60){
      hourrr++;
      minnn=0;
      thour = document.getElementById("today_hrs").innerHTML;
      hour11 = parseInt(thour) + 1;
      document.getElementById("today_hrs").innerHTML = pad(parseInt(hour11));
      document.getElementById("today_minuts").innerHTML = pad(minnn);
    }
    else{
      tmin = document.getElementById("today_minuts").innerHTML;
    

      minute11 = parseInt(tmin) + 1;
      
      document.getElementById("mins").innerHTML = pad(parseInt(minnn));
      document.getElementById("hourss").innerHTML = pad(parseInt(hourrr));
      //document.getElementById("secnds").innerHTML = pad(parseInt(totalSeconds % 60));
    
      document.getElementById("today_minuts").innerHTML = pad(parseInt(minute11));
    }
    //minsLabel.innerHTML = pad(totalSeconds % 60);
    }
    //timeCorrectUI();

/* ****************************************************update minutes************************************************************* */

if(isPaused) {
  if(updateHours_minutes != 60){

  if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

    const CsvReadableStream = require('csv-reader');

    let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');

    inputStream
    .pipe(csv())
    .on('data', function (row1) {

    //console.log('A row arrived: ', row1.email);
    if(row1.org_id != "" && row1.pro_id != "" && row1.date != ""){
      
      if (Fs.existsSync('C:/Users/Public/totaltimeonproject.csv')) {
      
        const CsvReadableStream = require('csv-reader');

        let inputStream = Fs.createReadStream('C:/Users/Public/totaltimeonproject.csv', 'utf8');

        inputStream
        .pipe(csv())
        .on('data', function (row2) {

          
          var minutes = decrypt(row2.minute,'nyshu55055');
          let add_minutes = parseInt(minutes)+1;
          let monthh = parseInt(d.getMonth())+1;

          const createCsvWriter = require('csv-writer').createObjectCsvWriter;
          const csvWriter = createCsvWriter({
            path: 'C:/Users/Public/totaltimeonproject.csv',
            header: [
                {id: 'org_id', title: 'org_id'},
                {id: 'pro_id', title: 'pro_id'},
                {id: 'day', title: 'day'},
                {id: 'month', title: 'month'},
                {id: 'year', title: 'year'},
                {id: 'hour', title: 'hour'},
                {id: 'minute', title: 'minute'},
                {id: 'memo', title: 'memo'},
                {id: 'date', title: 'date'}
            ]
        });
        
        const records = [
            {org_id: row1.org_id,
             pro_id: row1.pro_id, 
             day: d.getDate(), 
             month: monthh, 
             year: d.getFullYear(), 
             hour: encrypt('0','nyshu55055'), 
             minute: encrypt(add_minutes.toString(),'nyshu55055'), 
             memo: memoo, 
             date: pad(d.getFullYear())+"-"+pad(monthh)+"-"+pad(d.getDate())
            }
        ];
         
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
               // console.log('...minute update Done');
               setTheTime();
            });     
          
        })
        .on('end', function () {
        //console.log('No more rows!');
        });
      
      
      }
      else{

        let monthh = parseInt(d.getMonth())+1;
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            path: 'C:/Users/Public/totaltimeonproject.csv',
            header: [
                {id: 'org_id', title: 'org_id'},
                {id: 'pro_id', title: 'pro_id'},
                {id: 'day', title: 'day'},
                {id: 'month', title: 'month'},
                {id: 'year', title: 'year'},
                {id: 'hour', title: 'hour'},
                {id: 'minute', title: 'minute'},
                {id: 'memo', title: 'memo'},
                {id: 'date', title: 'date'}
            ]
        });
        
        const records = [
            {org_id: row1.org_id,
             pro_id: row1.pro_id, 
             day: d.getDate(), 
             month: monthh, 
             year: d.getFullYear(), 
             hour: encrypt('0','nyshu55055'), 
             minute: encrypt('1','nyshu55055'), 
             memo: memoo, 
             date: pad(d.getFullYear())+"-"+pad(monthh)+"-"+pad(d.getDate())
            }
        ];
         
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
               // console.log('...minute create Done');
               setTheTime();
            });

      }
    }
    })
    .on('end', function () {
    //console.log('No more rows!');
    });

    }

  }
  }

  
/* ****************************************************update hours************************************************************* */

  if(isPaused) { 
    updateHours_minutes++;
    if(updateHours_minutes == 60){

      if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

        const CsvReadableStream = require('csv-reader');
    
        let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
    
        inputStream
        .pipe(csv())
        .on('data', function (row1) {
    
        //console.log('A row arrived: ', row1.email);
        if(row1.org_id != "" && row1.pro_id != "" && row1.date != ""){
          
          if (Fs.existsSync('C:/Users/Public/totaltimeonproject.csv')) {
          
            const CsvReadableStream = require('csv-reader');
    
            let inputStream = Fs.createReadStream('C:/Users/Public/totaltimeonproject.csv', 'utf8');
    
            inputStream
            .pipe(csv())
            .on('data', function (row1) {

              var hours = decrypt(row1.hour,'nyshu55055');
              let add_hours = parseInt(hours)+1;
              let monthh = parseInt(d.getMonth())+1;
              const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: 'C:/Users/Public/totaltimeonproject.csv',
                header: [
                    {id: 'org_id', title: 'org_id'},
                    {id: 'pro_id', title: 'pro_id'},
                    {id: 'day', title: 'day'},
                    {id: 'month', title: 'month'},
                    {id: 'year', title: 'year'},
                    {id: 'hour', title: 'hour'},
                    {id: 'minute', title: 'minute'},
                    {id: 'memo', title: 'memo'},
                    {id: 'date', title: 'date'}
                ]
            });
            
            const records = [
                {org_id: row1.org_id,
                 pro_id: row1.pro_id, 
                 day: d.getDate(), 
                 month: monthh, 
                 year: d.getFullYear(), 
                 hour: encrypt(add_hours.toString(),'nyshu55055'), 
                 minute: encrypt('0','nyshu55055'), 
                 memo: memoo, 
                 date: pad(d.getFullYear())+"-"+pad(monthh)+"-"+pad(d.getDate())
                }
            ];
             
            csvWriter.writeRecords(records)       // returns a promise
                .then(() => {
                    //console.log('...hour update Done');
                    setTheTime();
                });     
              
            })
            .on('end', function () {
            //console.log('No more rows!');
            });
          
          
          }
          else{
            let monthh = parseInt(d.getMonth())+1;
            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: 'C:/Users/Public/totaltimeonproject.csv',
                header: [
                    {id: 'org_id', title: 'org_id'},
                    {id: 'pro_id', title: 'pro_id'},
                    {id: 'day', title: 'day'},
                    {id: 'month', title: 'month'},
                    {id: 'year', title: 'year'},
                    {id: 'hour', title: 'hour'},
                    {id: 'minute', title: 'minute'},
                    {id: 'memo', title: 'memo'},
                    {id: 'date', title: 'date'}
                ]
            });
            
            const records = [
                {org_id: row1.org_id,
                 pro_id: row1.pro_id, 
                 day: d.getDate(), 
                 month: monthh, 
                 year: d.getFullYear(), 
                 hour: encrypt('1','nyshu55055'), 
                 minute: encrypt('0','nyshu55055'), 
                 memo: memoo, 
                 date: pad(d.getFullYear())+"-"+pad(monthh)+"-"+pad(d.getDate())
                }
            ];
             
            csvWriter.writeRecords(records)       // returns a promise
                .then(() => {
                    //console.log('...hour create Done');
                    setTheTime();
                });
    
          }
        }
        })
        .on('end', function () {
        //console.log('No more rows!');
        });
    
        }

    updateHours_minutes = 0;


    }
  }


  
/* ****************************************************upload image data to server********************************************************* */

if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {
  
  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

  inputStream
  .pipe(csv())
  .on('data', function (row1) {

  //console.log('A row arrived: ', row1.email);
  if(row1.email != ""){
    correctTheTime(row1.email);
    
    if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

      const CsvReadableStream = require('csv-reader');

      let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');

      inputStream
      .pipe(csv())
      .on('data', function (roww) {



        if (Fs.existsSync('C:/Users/Public/screenshoots.csv')) {

          const CsvReadableStream = require('csv-reader');
        
          let inputStream = Fs.createReadStream('C:/Users/Public/screenshoots.csv', 'utf8');
        
          inputStream
          .pipe(csv())
          .on('data', function (row2) {
    
    
            var form = new FormData();
              var dfd = new Date();
              let monthh = parseInt(dfd.getMonth())+1;
              var timee = dfd.getFullYear()+"-"+pad(monthh)+"-"+pad(dfd.getDate());
                    const ScreenCaptures = row2.path.split("|");
                    form.append('email', row1.email);
                    form.append('datee', timee);
                    form.append('org_id',decrypt(roww.org_id,"nyshu55055"));
                    form.append('pro_id',decrypt(roww.pro_id,"nyshu55055"));
                    form.append('file1', Fs.createReadStream('C:\\Users\\'+ScreenCaptures[0]+'\\Documents\\ActiveScreens\\'+ScreenCaptures[1]));
                    form.submit('https://deeptime-digital.com/api/upload/data/user-from/desktop', function(err, res) {
                    
                    if(res.statusCode == 200){
                    //console.log('success');
                            var filepath = 'C:\\Users\\'+ScreenCaptures[0]+'\\Documents\\ActiveScreens\\'+ScreenCaptures[1];
    
                            if (Fs.existsSync(filepath)) {
                            Fs.unlink(filepath, (err) => {
                                if (err) {
                                  console.error("SS deleting Error:"+err);
                                return;
                                }
                              //console.log("SS deleted");
                              if (Fs.existsSync('C:/Users/Public/screenshoots.csv')) {
                                Fs.unlink('C:/Users/Public/screenshoots.csv', (err) => {
                                if (err) {
                                  console.error("SS File deleting Error:"+err);
                                return;
                                }
                                //console.log("SS csv deleted");
                                });
                                }
                            });
                            }
    
                           // console.log('SS upload success');
                    }
                    if(err){
                     // console.log("SS uploading Error:"+err);
                     console.error(err);
                      }
                      
                    });
    
    
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
  }
  })
  .on('end', function () {
  //console.log('No more rows!');
  });

  }

/* ****************************************************upload keyboard data to server*********************************************** */

if(ten_min == 10){


if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

  inputStream
  .pipe(csv())
  .on('data', function (row1) {

  //console.log('A row arrived: ', row1.email);
  if(row1.email != ""){
    
    


    if (Fs.existsSync('C:/Users/Public/keyboardpress.csv')) {

      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/keyboardpress.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row2) {
        var dd = new Date();
        var timee = pad(dd.getHours())+":"+pad(dd.getMinutes());
        var tts=[{
          "org_id": decrypt(row2.org_id,"nyshu55055"),
          "pro_id":decrypt(row2.pro_id,"nyshu55055"),
          "clicks":decrypt(row2.clicks,"nyshu55055"),
          "date":decrypt(row2.date,"nyshu55055"),
          "time":timee
        }];

        const getUserDataOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          email: row1.email,
          keybboardactivites: JSON.stringify(tts)
          })
          };


          fetch('https://deeptime-digital.com/api/user/keyboard/activits/send',getUserDataOptions)
          .then(res => {
          if (res.ok) {
          res.json().then(json => {
            
          if(json == 'success'){
            console.log('keyboard data upload success');
            Fs.unlink('C:/Users/Public/keyboardpress.csv', (err) => {
              if (err) throw err;
              console.log('keyboard csv deleted');
            });
            
          }

          });
          }
          })
          .catch((error) => {
          // error callback
          console.error(error);
          });



      })
      .on('end', function () {
      //console.log('No more rows!');
      });
    
      }
      else{
        //not exist
      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row2) {
        var dd = new Date();
        var timee = pad(dd.getHours())+":"+pad(dd.getMinutes());
        var mnth = dd.getMonth()+1;
        var datee = dd.getFullYear()+"-"+pad(mnth)+"-"+pad(dd.getDate());
        var tts=[{
          "org_id": decrypt(row2.org_id,"nyshu55055"),
          "pro_id":decrypt(row2.pro_id,"nyshu55055"),
          "clicks":"0",
          "date":datee,
          "time":timee
        }];

        const getUserDataOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          email: row1.email,
          keybboardactivites: JSON.stringify(tts)
          })
          };


          fetch('https://deeptime-digital.com/api/user/keyboard/activits/send',getUserDataOptions)
          .then(res => {
          if (res.ok) {
          res.json().then(json => {
          
          if(json == 'success'){
            //Fs.unlink('C:/Users/Public/keyboardpress.csv', (err) => {
              //if (err) throw err;
            console.log('keyboard data upload success');
            //});
            
          }

          });
          }
          })
          .catch((error) => {
          // error callback
          console.error(error);
          });



      })
      .on('end', function () {
      //console.log('No more rows!');
      });
      }
  }
  })
  .on('end', function () {
  //console.log('No more rows!');
  });

  }
/* ****************************************************upload mouse data to server*********************************************** */


if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

  inputStream
  .pipe(csv())
  .on('data', function (row1) {

  //console.log('A row arrived: ', row1.email);
  if(row1.email != ""){
    
    correctTheTime(row1.email);


    if (Fs.existsSync('C:/Users/Public/mouseclicks.csv')) {

      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/mouseclicks.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row2) {
        var dd = new Date();
        var timee = pad(dd.getHours())+":"+pad(dd.getMinutes());
        var tts=[{
          "org_id": decrypt(row2.org_id,"nyshu55055"),
          "pro_id":decrypt(row2.pro_id,"nyshu55055"),
          "clicks":decrypt(row2.clicks,"nyshu55055"),
          "date":decrypt(row2.date,"nyshu55055"),
          "time":timee
        }];

        const getUserDataOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          email: row1.email,
          keybboardactivites: JSON.stringify(tts)
          })
          };


          fetch('https://deeptime-digital.com/api/user/mouse/activits/send',getUserDataOptions)
          .then(res => {
          if (res.ok) {
          res.json().then(json => {
          
          if(json == 'success'){
            console.log('mouse data upload success');
             Fs.unlink('C:/Users/Public/mouseclicks.csv', (err) => {
              if (err) throw err;
            console.log('mouse csv deleted success');
            });
            
          }
          });
          }
          })
          .catch((error) => {
          // error callback
          console.error(error);
          });



      })
      .on('end', function () {
      //console.log('No more rows!');
      });
    
      }
      else{
        //not exist
      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row2) {
        var dd = new Date();
        var timee = pad(dd.getHours())+":"+pad(dd.getMinutes());
        var mnth = dd.getMonth()+1;
        var datee = dd.getFullYear()+"-"+pad(mnth)+"-"+pad(dd.getDate());
        var tts=[{
          "org_id": decrypt(row2.org_id,"nyshu55055"),
          "pro_id":decrypt(row2.pro_id,"nyshu55055"),
          "clicks":"0",
          "date":datee,
          "time":timee
        }];

        const getUserDataOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          email: row1.email,
          keybboardactivites: JSON.stringify(tts)
          })
          };


          fetch('https://deeptime-digital.com/api/user/mouse/activits/send',getUserDataOptions)
          .then(res => {
          if (res.ok) {
          res.json().then(json => {
          
          if(json == 'success'){
             //Fs.unlink('C:/Users/Public/mouseclicks.csv', (err) => {
              //if (err) throw err;
            console.log('mouse data upload success');
            //});
            
          }
          });
          }
          })
          .catch((error) => {
          // error callback
          console.error(error);
          });



      })
      .on('end', function () {
      //console.log('No more rows!');
      });
      }
  }
  })
  .on('end', function () {
  //console.log('No more rows!');
  });

  }

ten_min = 0;
}

/* ****************************************************upload time function*********************************************** */



  //timeCorrectUI();

// }
// else{
//   isPaused = false;
//         document.getElementById("memo").readOnly = false; 
//         togBtn.checked = false;
//         alert("Check Internet Connection and Try Again.");
//         TimeStop();
// }

}


/* ****************************************************end timer function*********************************************** */


/* ****************************************************check internet function************************************************************* */
function InternetConnection () {
    checkInternetConnected()
      .then((result) => {
        console.log(result);
        return true;
      })
      .catch((ex) => {
        console.log(ex); // cannot connect to a server or error occurred.
        // isPaused = false;
        // document.getElementById("memo").readOnly = false; 
        // togBtn.checked = false;
        // alert("Check Internet Connection and Try Again.");
        // TimeStop();
        return false;
    });
}

  /* ****************************************************time contnue************************************************************* */


  function TimeContinue () {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'C:/Users/Public/sst.csv',
      header: [
          {id: 'continue', title: 'continue'}
      ]
  });
  
  const records = [
      {continue: "true"}
  ];
   
  csvWriter.writeRecords(records)       // returns a promise
      .then(() => {
          console.log('...sst continue');
      }); 
  }
  
    /* ****************************************************time stop************************************************************* */
  
  function TimeStop () {
  
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
  path: 'C:/Users/Public/sst.csv',
  header: [
      {id: 'continue', title: 'continue'}
  ]
  });
  
  const records = [
  {continue: "false"}
  ];
  
  csvWriter.writeRecords(records)       // returns a promise
  .then(() => {
      console.log('...sst stop');
  }); 
  }






  function setTheTime(){
    if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row1) {
    
      //console.log('A row arrived: ', row1.email);
      if(row1.email != ""){
        
    
    
        if (Fs.existsSync('C:/Users/Public/totaltimeonproject.csv')) {
    
          const CsvReadableStream = require('csv-reader');
        
          let inputStream = Fs.createReadStream('C:/Users/Public/totaltimeonproject.csv', 'utf8');
        
          inputStream
          .pipe(csv())
          .on('data', function (row2) {
        
          //console.log('A row arrived from time file: '+row2);
          if(row2.org_id != ""){
            var tts=[{
                        "org_id": decrypt(row2.org_id,"nyshu55055"),
                        "pro_id": decrypt(row2.pro_id,"nyshu55055"),
                        "day":row2.day,
                        "month":row2.month,
                        "year":row2.year,
                        "hour":decrypt(row2.hour,"nyshu55055"),
                        "minute":decrypt(row2.minute,"nyshu55055"),
                        "memo":row2.memo,
                        "date":row2.date,
                      }];
                      //console.log('A row arrived: ', tts);
            const getUserDataOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
              email: row1.email,
              keybboardactivites: JSON.stringify(tts)
              })
              };
    
              fetch('https://deeptime-digital.com/api/user/time/spent/send',getUserDataOptions)
              .then(res => {
              if (res.ok) {
              res.json().then(json => {
              
              if(json == 'success'){
                console.log('success');
                Fs.unlink('C:/Users/Public/totaltimeonproject.csv', (err) => {
                  if (err) throw err;
                  //console.log('time csv deleted success');
                  //console.log(decrypt(row2.minute,"nyshu55055"));
                });
                
    
              }
              else if(json == 'failed'){
                console.log('failed');
                setTheTime();
              }
              else{
                setTheTime();
              }
    
              });
              //console.log(res);
              }
              else{
                console.log('not ok');
                setTheTime();
              }
              })
              .catch((error) => {
              // error callback
              //console.error(error);
                setTheTime();
              });
        
          }
          })
          .on('end', function () {
          //console.log('No more rows!');
          });
        
          }
          else{
            //file not exist
    
            if(isPaused){
              if(updateHours_minutes != 60){
    
            if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {
    
              const CsvReadableStream = require('csv-reader');
          
              let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
          
              inputStream
              .pipe(csv())
              .on('data', function (row1w) {
          
              //console.log('A row arrived: ', row1.email);
              if(row1w.org_id != "" && row1w.pro_id != "" && row1w.date != ""){
    
                let monthh = parseInt(d.getMonth())+1;
          
              //console.log('A row arrived from orgpro file:');
              var tts=[{
                          "org_id": decrypt(row1w.org_id,"nyshu55055"),
                          "pro_id": decrypt(row1w.pro_id,"nyshu55055"),
                          "day":d.getDate().toString(),
                          "month":monthh.toString(),
                          "year":d.getFullYear().toString(),
                          "hour": '0',
                          "minute": '1',
                          "memo": '',
                          "date":d.getFullYear()+"-"+pad(monthh)+"-"+pad(d.getDate()),
                        }];
                        //console.log('A row arrived: ', tts);
              const getUserDataOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                email: row1.email,
                keybboardactivites: JSON.stringify(tts)
                })
                };
      
                fetch('https://deeptime-digital.com/api/user/time/spent/minute',getUserDataOptions)
                .then(res => {
                if (res.ok) {
                res.json().then(json => {
                
                if(json == 'success'){
                  console.log('success');
                  
                }
                else if(json == 'failed'){
                  console.log('failed');
                  setTheTime();
                }
                else{
                  //console.log('not upload');
                  setTheTime();
                }
      
                });
                }
                else{
                  console.log('not ok');
                  setTheTime();
                }
                //console.log(res);
                })
                .catch((error) => {
                // error callback
                //console.error(error);
                setTheTime();
                });
              
    
          }
    
    
        })
        .on('end', function () {
        //console.log('No more rows!');
        });
      }
              }
           }
    
    
    
    
    
    
          }
    
      }
      })
      .on('end', function () {
      //console.log('No more rows!');
      });
    
      }
  }


















 




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