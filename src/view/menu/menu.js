//菜单栏目
const sidebarMenu = [
    {
        id: 'View_Sys', name: '系统菜单', childNode: [
            { id: 'View_Sys_User', name: '用户信息', button: [] },
            { id: 'View_Sys_Authinfo', name: '权限信息', button: [] },
            { id: 'View_Sys_Roleinfo', name: '角色信息', button: [] },
        ]
    },
];
//验证菜单权限
function VerifyMenu() {
    
}
export default sidebarMenu;