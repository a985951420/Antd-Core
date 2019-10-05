//获取Storage值
export function GetStorage(key) {
    return localStorage.getItem(key)
}
//赋值Storage值
export function SetStorage(key, value) {
    localStorage.setItem(key, value)
}
//删除Key
export function RemoveStorage(key) {
    localStorage.removeItem(key);
}