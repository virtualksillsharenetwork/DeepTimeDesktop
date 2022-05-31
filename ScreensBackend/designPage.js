
const ipc = window.require('electron').ipcRenderer;
//var mysql = require('mysql');
var exec = require('child_process').execFile;
var FormData = require('form-data');
const Fs = require('fs');
const csv = require('csv-parser');
var CryptoJS = require('crypto-js');
const sqlite3 = require('sqlite3').verbose();

let mouse_clicks_detection;
var isPaused = false;
var d = new Date();
let memoo = '';
let updateHours_minutes = 0;
let ten_min =0;
let minnn=0;
let hourrr=0;
let change_cache = 1;


const ddb = new sqlite3.Database("C:/ProgramData/deeptime.db",sqlite3.OPEN_READWRITE, (err)=>{
    if(err){ console.error(err);}
    else
    {console.log('connected');}
});

process.on('uncaughtException', function (err) {
  console.error(err);
});













TimeStop();


  /* ****************************************************start detector************************************************************* */


function fun (){
  //console.log("detector start");
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


          fetch('https://admin.deeptime-digital.com/api/get/data/user-project/name',getUserDataOptions)
          .then(res => {
              if (res.ok) {
                res.json().then(json => {
                  //console.log(json);
                  $("#projectname").html(json.pro_name);
                  
                });
              }
            })
          .catch((error) => {
            // error callback
              console.error(error);
          });

  }


//   function  correctTheTime(email)
// {

//       const getUserDataOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//             email: email
//     })
//     };


//     fetch('https://admin.deeptime-digital.com/api/send/data-time/user-to/web',getUserDataOptions)
//     .then(res => {
//         //if (res.ok) {
//           //res.json().then(json => {
//             //console.log(json.email_address);
            
            
//           //});
//         //}
//       })
//     .catch((error) => {
//       // error callback
//         console.error(error);
//     });

//   }

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
  
  
    fetch('https://admin.deeptime-digital.com/api/send/data/user-to/desktop',getUserDataOptions)
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
              //correctTheTime(row.email);
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
          //correctTheTime(row1.email);


                if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {
                  
                  const CsvReadableStream = require('csv-reader');
                
                  let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
                  
                  inputStream
                    .pipe(csv())
                    .on('data', function (row) {
                      
                          
                          var org_id = decrypt(row.org_id,"p45iw2hecw");
                          var pro_id = decrypt(row.pro_id,"p45iw2hecw");
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
                        
                        
                        fetch('https://admin.deeptime-digital.com/api/user/get-nowlasthourminute/data/get',getUserDataOptions)
                        .then(res => {
                          
                            if (res.ok) {
                              res.json().then(json => {
                                console.log(json);
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
                                  if(hourss > 0){
                                    $("#hours_per_week").html(pad(hourss));
                                  }
                                  else{
                                    $("#hours_per_week").html('00');
                                  }
                                  
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


    // require('dns').resolve('www.google.com', function(err) {
    //   if (err) {
        
    //      alert("Check Internet Connection and Try Again.");

    //   } else {



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

    // }
    // });

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
  // if(isPaused) {
  //   updateHours_minutes++;
  // }
  //timeCorrectUI();
  //setTime();


  /* ****************************************************change cache of image************************************************************* */
  change_cache++;
  if (Fs.existsSync('C:/Users/Public/LastCapture.jpg')) {
    $("#lastSSdiv").html('');
    var show_picscode = '<img src="C:/Users/Public/LastCapture.jpg?v='+change_cache+'" id="lastSS" name="lastSS" alt="Current Screen Shoot" style="width: 340px;height: 200px;"></img>';
    $("#lastSSdiv").append(show_picscode);
  }

    

/* ****************************************************update minutes************************************************************* */

if(isPaused) {
  
  //if(updateHours_minutes != 60){

  if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

    const CsvReadableStream = require('csv-reader');

    let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');

    inputStream
    .pipe(csv())
    .on('data', function (row1) {

    //console.log('A row arrived: ', row1.email);
    if(row1.org_id != "" && row1.pro_id != "" && row1.date != ""){

      var dat = new Date();
        let monthh = parseInt(dat.getMonth())+1;
        var updateMinute = "SELECT * FROM timespentonproject WHERE day=? and month=? and year=?";

        ddb.all(updateMinute,[pad(dat.getDate()),monthh,dat.getFullYear()],(err,rows)=>{
            if(err) console.log(err);
            //console.log(rows);
            if(rows.length>0){
            rows.forEach(row => {
              var datt = new Date();
              var updateMinute2 = "UPDATE timespentonproject SET minute=? WHERE day=? and month=? and year=?";
               var mint = parseInt(decrypt(row.minute.toString(),"p45iw2hecw"))+1;
              ddb.run(updateMinute2,[encrypt(mint.toString(),"p45iw2hecw"),pad(datt.getDate()),monthh,datt.getFullYear()],(err)=>{
                if(err){ console.log(err);}
                else{
                  //console.log('minute update');
                  setTime();
                }
            });
          
            });
          }
          else{

             var dat = new Date();
             let monthh = parseInt(dat.getMonth())+1;

            var createMinute = "INSERT INTO timespentonproject (orgid, proid, day,month,year,hour,minute,memo,date) VALUES (?,?,?,?,?,?,?,?,?)";
              ddb.run(createMinute,[row1.org_id,row1.pro_id,dat.getDate(),monthh,d.getFullYear(),encrypt('0','p45iw2hecw'),encrypt('1','p45iw2hecw'),memoo,pad(dat.getFullYear())+"-"+pad(monthh)+"-"+pad(dat.getDate())],(err)=>{
                if(err){ console.log(err);}
                else{
                  //console.log('minute created');
                  setTime();
                }

            });
          }

        });

    }
    })
    .on('end', function () {
    //console.log('No more rows!');
    });

    }

  //}
  }

  
/* ****************************************************update hours************************************************************* */

  // if(isPaused) {
  //   if(updateHours_minutes == 60){

  //     if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

  //       const CsvReadableStream = require('csv-reader');
    
  //       let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');
    
  //       inputStream
  //       .pipe(csv())
  //       .on('data', function (row1) {
    
  //       //console.log('A row arrived: ', row1.email);
  //       if(row1.org_id != "" && row1.pro_id != "" && row1.date != ""){

  //         var dat = new Date();
  //         let monthh = parseInt(dat.getMonth())+1;
  //         var updateHour = "SELECT * FROM timespentonproject WHERE day=? and month=? and year=?";
  
  //         ddb.all(updateHour,[pad(dat.getDate()),monthh,dat.getFullYear()],(err,rows)=>{
  //             if(err) console.log(err);
  //             console.log(rows);
  //             if(rows.length>0){
  //             rows.forEach(row => {
  //               var datt = new Date();
  //               var updateMinute2 = "UPDATE timespentonproject SET hour=?, minute=? WHERE day=? and month=? and year=?";
  //                var hourr = parseInt(decrypt(row.hour.toString(),"p45iw2hecw"))+1;
  //               ddb.run(updateMinute2,[encrypt(hourr.toString(),"p45iw2hecw"),encrypt('0',"p45iw2hecw"),pad(datt.getDate()),monthh,datt.getFullYear()],(err)=>{
  //                 if(err){ console.log(err);}
  //                 else{
  //                   console.log('hour update');
  //                   setTime();
  //                 }
  //             });
            
  //             });
  //           }
  //           else{
  
  //             var datt = new Date();
  //              let monthh = parseInt(datt.getMonth())+1;
  
  //             var createMinute = "INSERT INTO timespentonproject (orgid, proid, day,month,year,hour,minute,memo,date) VALUES (?,?,?,?,?,?,?,?,?)";
  //               ddb.run(createMinute,[row1.org_id,row1.pro_id,datt.getDate(),monthh,datt.getFullYear(),encrypt('1','p45iw2hecw'),encrypt('0','p45iw2hecw'),memoo,pad(datt.getFullYear())+"-"+pad(monthh)+"-"+pad(datt.getDate())],(err)=>{
  //                 if(err){ console.log(err);}
  //                 else{
  //                   console.log('hour created');
  //                   setTime();
  //                 }
  
  //             });
  //           }
  
  //         });
  //       }
  //       })
  //       .on('end', function () {
  //       //console.log('No more rows!');
  //       });
    
  //       }

  //   updateHours_minutes = 0;


  //   }
  // }

  
  
/* ****************************************************upload image data to server********************************************************* */

if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

  
  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

  inputStream
  .pipe(csv())
  .on('data', function (row1) {

  //console.log('A row arrived: ', row1.email);
  if(row1.email != ""){
    //correctTheTime(row1.email);
    
    if (Fs.existsSync('C:/Users/Public/selectedorgpro.csv')) {

      const CsvReadableStream = require('csv-reader');

      let inputStream = Fs.createReadStream('C:/Users/Public/selectedorgpro.csv', 'utf8');

      inputStream
      .pipe(csv())
      .on('data', function (roww) {

              var sql = "Select * from screenshoots";

              ddb.all(sql,[],(err,rows)=>{
                  if(err) console.log(err);

                  rows.forEach(row => {
                    
            var form = new FormData();
            var dfd = new Date();
            let monthh = parseInt(dfd.getMonth())+1;
                  const ScreenCaptures = row.path.toString().split("|");
                  form.append('email', row1.email);
                  form.append('datee', decrypt(row.date.toString(),"p45iw2hecw"));
                  form.append('time', decrypt(row.time.toString(),"p45iw2hecw"));
                  form.append('org_id',decrypt(row.orgid.toString(),"p45iw2hecw"));
                  form.append('pro_id',decrypt(row.proid.toString(),"p45iw2hecw"));
                  form.append('file1', Fs.createReadStream('C:\\Users\\'+ScreenCaptures[0]+'\\Documents\\ActiveScreens\\'+ScreenCaptures[1]));
                  form.submit('https://admin.deeptime-digital.com/api/upload/data/user-from/desktop', function(err, res) {
                  
                  if(res.statusCode == 200){
                  //console.log('success');
                          var filepath = 'C:\\Users\\'+ScreenCaptures[0]+'\\Documents\\ActiveScreens\\'+ScreenCaptures[1];
  
                          if (Fs.existsSync(filepath)) {
                          Fs.unlink(filepath, (err) => {
                              if (err) {
                                console.error("SS deleting Error:"+err);
                                //return;
                              }
                          });
                          }

                          var sql = "DELETE FROM screenshoots WHERE id=?";

                            ddb.run(sql,[row.id],(err)=>{
                                if(err) console.log(err);

                                //console.log('SS row Deleted');
                            });
  
                         // console.log('SS upload success');
                  }
                  if(err){
                   // console.log("SS uploading Error:"+err);
                   console.error(err);
                      
                    }
                    
                  });


                  });
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

/* ****************************************************upload keyboard data to server*********************************************** */

//if(ten_min == 10){


if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {


  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');

  inputStream
  .pipe(csv())
  .on('data', function (row1) {

  //console.log('A row arrived: ', row1.email);
  if(row1.email != ""){
    
                var sql = "Select * from keyboardclicks";

                ddb.all(sql,[],(err,rows)=>{
                    if(err) console.log(err);

                    rows.forEach(row => {
                      var tts=[{
                        "org_id": decrypt(row.orgid.toString(),"p45iw2hecw"),
                        "pro_id":decrypt(row.proid.toString(),"p45iw2hecw"),
                        "clicks":decrypt(row.clicks.toString(),"p45iw2hecw"),
                        "date":decrypt(row.date.toString(),"p45iw2hecw"),
                        "time":decrypt(row.time.toString(),"p45iw2hecw")
                      }];
                      const getUserDataOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                        email: row1.email,
                        keybboardactivites: JSON.stringify(tts)
                        })
                        };


                        fetch('https://admin.deeptime-digital.com/api/user/keyboard/activits/send',getUserDataOptions)
                          .then(res => {
                          if (res.ok) {
                          res.json().then(json => {
                            
                            if(json == 'success'){
                              //console.log('keyboard data upload success');
                              var sql = "DELETE FROM keyboardclicks WHERE id=?";

                              ddb.run(sql,[row.id],(err)=>{
                                  if(err) console.log(err);
                                  //console.log('keyboard row Deleted');
                              });
                            }

                          });
                          }
                          })
                          .catch((error) => {
                          // error callback
                          console.error(error);
                          });

                      

                    });
                });
       
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
    
    //correctTheTime(row1.email);

            var sql = "Select * from mouseclicks";

            ddb.all(sql,[],(err,rows)=>{
                if(err) console.log(err);

                rows.forEach(row => {
                  
                  var tts=[{
                    "org_id": decrypt(row.orgid.toString(),"p45iw2hecw"),
                    "pro_id":decrypt(row.proid.toString(),"p45iw2hecw"),
                    "clicks":decrypt(row.clicks.toString(),"p45iw2hecw"),
                    "date":decrypt(row.date.toString(),"p45iw2hecw"),
                    "time":decrypt(row.time.toString(),"p45iw2hecw")
                  }];
                  const getUserDataOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                    email: row1.email,
                    keybboardactivites: JSON.stringify(tts)
                    })
                    };

                              
                    fetch('https://admin.deeptime-digital.com/api/user/mouse/activits/send',getUserDataOptions)
                    .then(res => {
                    if (res.ok) {
                    res.json().then(json => {
                    
                    if(json == 'success'){
                      //console.log('mouse data upload success');
                      var sql = "DELETE FROM mouseclicks WHERE id=?";

                      ddb.run(sql,[row.id],(err)=>{
                          if(err) console.log(err);
                          //console.log('mouse row Deleted');
                      });
                    }



                    });
                    }
                    })
                    .catch((error) => {
                    // error callback
                    console.error(error);
                    });


                });
            });
  }
  })
  .on('end', function () {
  //console.log('No more rows!');
  });

  }

//ten_min = 0;
//}

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
//timeCorrectUI();
}


/* ****************************************************end timer function*********************************************** */


/* ****************************************************check internet function************************************************************* */
function InternetConnection () {
  const checkInternetConnected = require('check-internet-connected');
const config = {
  timeout: 5000, //timeout connecting to each server, each try
  retries: 5,//number of retries to do before failing
  domain: 'https://www.google.com/',//the domain to check DNS record of
}
checkInternetConnected(config);
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
          //console.log('...sst continue');
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
      //console.log('...sst stop');
  }); 
  }



  function setTime(){
    if (Fs.existsSync('C:/Users/Public/logininfo.csv')) {

      const CsvReadableStream = require('csv-reader');
    
      let inputStream = Fs.createReadStream('C:/Users/Public/logininfo.csv', 'utf8');
    
      inputStream
      .pipe(csv())
      .on('data', function (row1) {
    
      //console.log('A row arrived: ', row1.email);
      if(row1.email != ""){
        

                  var sql = "Select * from timespentonproject";

                  ddb.all(sql,[],(err,rows)=>{
                      if(err) console.log(err);

                      rows.forEach(row => {
                        
                        var tts=[{
                          "org_id": decrypt(row.orgid.toString(),"p45iw2hecw"),
                          "pro_id": decrypt(row.proid.toString(),"p45iw2hecw"),
                          "day":row.day.toString(),
                          "month":row.month.toString(),
                          "year":row.year.toString(),
                          "hour":decrypt(row.hour.toString(),"p45iw2hecw"),
                          "minute":decrypt(row.minute.toString(),"p45iw2hecw"),
                          "memo":row.memo.toString(),
                          "date":row.date.toString(),
                        }];
                        const getUserDataOptions = {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ 
                          email: row1.email,
                          keybboardactivites: JSON.stringify(tts)
                          })
                          };


                          fetch('https://admin.deeptime-digital.com/api/user/time/spent/send',getUserDataOptions)
                            .then(res => {
                            if (res.ok) {
                            res.json().then(json => {
                            
                            if(json == 'success'){
                              
                              var sql = "DELETE FROM timespentonproject WHERE id=?";

                              ddb.run(sql,[row.id],(err)=>{
                                  if(err) console.log(err);
                                  console.log('time_sent');
                              });
                  
                            }
                            else if(json == 'failed'){
                              console.log('failed');
                            }
                  
                            });

                            }
                            })
                            .catch((error) => {
                              
                            });
                        
                          });
                      });
    
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