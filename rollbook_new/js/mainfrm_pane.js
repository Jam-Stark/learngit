////////////////////////////////////////////////////////////////////////////
// System Pre-define Functions
// 95099372-ef3e-11ea-9c81-bf848405c62e

function OnInitializeData() {
        callstudent(11);
}

function OnCloseForm() {

}

function OnException(err) {
        //ui.MessageBox('Error', '' + err, MessageBox.Icon.Critical, MessageBox.Button.Ok);
}

//////////////////////////////////////////////////////////////////////////
// Callback Functions.
// 641a254c-ef3e-11ea-bc8a-379bb908bdd7
var g_students = [
        '宫照堰*',
        '杨蕊源*',
        '梁含璋#',
        '余天然',
        '黄千骏',
        '曹宝泉',
        '鞠欣睿',
        '王鑫宇',
        '邓钧',
        '宋岩',
        '丹增达哇'
];

function getRandom(array, num) {
        var arr = array.slice(0),
                i = arr.length,
                min = i - num,
                temp, index;
        while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = arr[index];
                arr[index] = arr[i];
                arr[i] = temp;
        }
        return arr.slice(min);
}

function callstudent(num) {
        var students = getRandom(g_students, num);
        ui.list.table = [
                ['姓名']
        ].concat((students.map(item => {
                return [item];
        })));
        var idx = 0;
        var colors = students.map(item => { //@item.@String colors.@Array
                if (item.indexOf('*') !== -1) {
                        return [idx++, 0, '#00FF00'];
                }
                if (item.indexOf('#') !== -1) {
                        return [idx++, 0, '#00FFFF'];
                }
                return [idx++, 0, '#FFFF00'];
        });

        colors.forEach(item => {
                ui.list.color = item;
        });

        ui.list.head_size = [0];
        model.Test(ui.list.table);
}

function sortOne() {
        callstudent(1);
}

function sortMutiple() {
        callstudent(6);
}


//////////////////////////////////////////////////////////////////////////
// Utils Functions.
// 6c165ad6-ef3e-11ea-987c-b761a131c2fe

/*Usage of BLOCK_EVENT
        BLOCK_EVENT(()=>{
                ui.[name].[var] = ...;
        });
*/

function BLOCK_EVENT(cb) {
        ui.block_event = true;

        cb();

        ui.block_event = false;
}