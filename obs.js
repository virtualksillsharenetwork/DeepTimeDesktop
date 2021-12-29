var JavaScriptObfuscator = require('javascript-obfuscator');
var fs = require('fs');



fs.readFile('./ScreensBackend/designPage.js', "UTF-8", function(err, data) {
        if (err) {
            throw err;
        }
    
        // Obfuscate content of the JS file
        var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        
        // Write the obfuscated code into a new file
        fs.writeFile('./ScreensBackend/designPagee.js', obfuscationResult.getObfuscatedCode() , function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });

    fs.readFile('./ScreensBackend/mysql.js', "UTF-8", function(err, data) {
        if (err) {
            throw err;
        }
    
        // Obfuscate content of the JS file
        var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        
        // Write the obfuscated code into a new file
        fs.writeFile('./ScreensBackend/mysqll.js', obfuscationResult.getObfuscatedCode() , function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });

    fs.readFile('./ScreensBackend/login.js', "UTF-8", function(err, data) {
        if (err) {
            throw err;
        }
    
        // Obfuscate content of the JS file
        var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        
        // Write the obfuscated code into a new file
        fs.writeFile('./ScreensBackend/loginn.js', obfuscationResult.getObfuscatedCode() , function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });

    fs.readFile('./main.js', "UTF-8", function(err, data) {
        if (err) {
            throw err;
        }
    
        // Obfuscate content of the JS file
        var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        
        // Write the obfuscated code into a new file
        fs.writeFile('./mainn.js', obfuscationResult.getObfuscatedCode() , function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });