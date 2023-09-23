var fs = require('fs');
var path = require('path');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Initialize codes.
AutoLoadPlugins();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//You can load the plugins in global field, if the next line codes are uncommented.
//AutoLoadGlobalPlugins();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sample codes.
exports.Test = function(student) {
        var XLSX = require('xlsx');
        const today = getCurrentDate();

        const outputPath = path.join(__dirname, "点名册.xlsx");
        let workbook;

        if (fs.existsSync(outputPath)) {

                workbook = XLSX.readFile(outputPath);
        } else {

                workbook = XLSX.utils.book_new();
        }

        const newWorksheet = XLSX.utils.aoa_to_sheet(student);

        XLSX.utils.book_append_sheet(workbook, newWorksheet, today);

        XLSX.writeFile(workbook, outputPath);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Put you codes here
function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要加1，然后用padStart函数补0
        const day = currentDate.getDate().toString().padStart(2, '0'); // 获取日期并用padStart函数补0
        const seconds = currentDate.getSeconds();

        const formattedDate = `${year}${month}${day}-${seconds}`;
        return formattedDate;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AutoLoadPlugins Function Implement Start.

function AutoLoadPlugins() {
        var plugin_dir = (__dirname + '/../addon/');
        if (!fs.existsSync(plugin_dir)) {
                return;
        }

        var files = fs.readdirSync(plugin_dir);
        files.forEach(function(filename) {
                var filedir = path.join(plugin_dir, filename);
                var stats = fs.statSync(filedir);
                if (!stats.isDirectory()) {
                        if (filedir.indexOf('-linux.node') != -1 && require('os').platform() == 'linux') {
                                require(filedir);
                        }

                        if (filedir.indexOf('-win.node') != -1 && require('os').platform() == 'win32') {
                                require(filedir);
                        }
                }
        });
}

function AutoLoadGlobalPlugins() {
        var plugin_dir = (process.env['COMX_SDK'] + 'addon/');
        if (!fs.existsSync(plugin_dir)) {
                return;
        }

        var files = fs.readdirSync(plugin_dir);
        files.forEach(function(filename) {
                var filedir = path.join(plugin_dir, filename);
                var stats = fs.statSync(filedir);
                if (!stats.isDirectory()) {
                        if (filedir.indexOf('-linux.node') != -1 && require('os').platform() == 'linux') {
                                require(filedir);
                        }

                        if (filedir.indexOf('-win.node') != -1 && require('os').platform() == 'win32') {
                                require(filedir);
                        }
                }
        });
}

//AutoLoadPlugins Function Implement End.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ide_info Function Implement Start.

exports.ide_info = (msg) => {
        if (process.send) {
                process.send({
                        type: 'debug',
                        info: msg
                });
        }
}

//ide_info Function Implement End.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////