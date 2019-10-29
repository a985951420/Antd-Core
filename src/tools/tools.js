//获取Storage值
export function GetStorage(key) {
    var val = localStorage.getItem(key);
    if (isJSON(val)) {
        return JSON.parse(val);
    }
    return val;
}
//赋值Storage值
export function SetStorage(key, value) {
    var val = "";
    if (isObject(value)) {
        val = JSON.stringify(value);
    } else {
        val = value;
    }
    localStorage.setItem(key, val);
}

//删除Key
export function RemoveStorage(key) {
    localStorage.removeItem(key);
}
//时间比较 Start > end
export function TimeCompare(start, end) {
    var s = new Date(start);
    var e = new Date(end);
    if (s > e) {
        return true;
    }
    return false;
}

function isObject(val) {
    return val instanceof Object;
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            //console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
    //console.log('It is not a string!')
}