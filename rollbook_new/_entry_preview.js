var fs = require('fs');
var vm = require('vm');

initRuntimeEnv();

var dirHome = process.env['COMX_SDK'];
var dirUnit = __dirname + '/';

if(process.platform == 'win32')
{
    require('bindings')('js_ext_comx_qtshell-native-win.node');
    require('bindings')('js_ext_comx_resource-native-win.node');
    require('bindings')('js_ext_comx_mutex-native-win.node');
}

if(process.platform == 'linux')
{
    require('bindings')('js_ext_comx_qt-native-linux.node');
    require('bindings')('js_ext_comx_resource-native-linux.node');
    require('bindings')('js_ext_comx_mutex-native-linux.node');
}

var require_ = require('require-from-string');
var __ = (_)=>{
    (new vm.Script(_)).runInNewContext({
	'require' : require,
	'process' : process,
	'comx' : comx,
	'exports' :exports,
	'comx_startup' : ()=>{
	    comx.resource.qt.loadUnit(dirUnit, exports, function(){
		if(process.argv.length >= 3)
		    unit.form[process.argv[2]].ShowPreview();
		else
		    unit.form._entry.ShowPreview();
	    }, (form)=>{
		//readyForm
	    });
	}
    });
};

var tmpl = fs.readFileSync(dirHome+'template/4e7b90182d3b4e11a7ca74d8fc8c545f');
comx.resource.Initialize(require_, __, tmpl);

if(!comx.resource.hasResource)
{
    if(process.argv.length == 4)
    {
	var tmpl = fs.readFileSync(dirHome+'template/008f111453704f82b9616e9bf92655f0');
	comx.resource.LoadKernelRemote(parseInt(process.argv[3]), false, tmpl);
    }
    else
    {
	var tmpl = fs.readFileSync(dirHome+'template/ad72fee60eea4a89844aa934b9bc099b');
	comx.resource.LoadKernelRemote(getWSAddress(), false, tmpl);
    }
}
else
{
    comx.resource.qt.loadUnit(dirUnit, exports, function(){
	if(process.argv.length >= 3)
	    unit.form[process.argv[2]].ShowPreview();
	else
	    unit.form._entry.ShowPreview();
    }, (form)=>{
	//readyForm
    });
}

process.on('uncaughtException', (e)=>{
    console.error('process error is:', e.message);
});

/////////////////////////////////////////////////////////////////////////////
// Init Runtime Env

function initRuntimeEnv()
{
    process.env.COMX_SDK = getHomeDir();

    var depsDir = getDepsDir();

    if(depsDir)
    {
	process.chdir(depsDir);
    }
}

function getParentDir(dirName)
{
    var idx = dirName.lastIndexOf('/');
    if(idx == -1)
    {
	idx = dirName.lastIndexOf('\\');
    }

    return dirName.substr(0, idx);
}

function getHomeDir()
{
    return getParentDir(getParentDir(__dirname)) + '/';
}

function getDepsDir()
{
    if(process.platform == 'win32')
    {
	return getHomeDir() + 'deps\\windows\\bin\\';
    }

    if(process.platform == 'linux')
    {
	return getHomeDir() + 'deps/linux/bin/';
    }

    return false;
}

function getWSAddress()
{
    var fpath = getHomeDir() + '/cache/ws.cache';

    if(!fs.existsSync(fpath))
    {
	return "ws://localhost:3000";
    }
    else
    {
	return '' + fs.readFileSync(fpath);
    }
}
