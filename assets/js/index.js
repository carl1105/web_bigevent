$(function () {
    // 调用获取用户信息
    getUserinfo()
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1.清除本地存储的tolken
            localStorage.removeItem('token')
            // 2.跳转到登陆页面
            location.href = './login.html'

            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用渲染用户函数
            renderAvatar(res.data)
        },
       
    })
}

//渲染用户
function renderAvatar(user) {
    // 1.获取用户昵称并渲染
    let name = user.nickname || user.username
    let firstname = name[0].toUpperCase()
    $('#welcome').html(`欢迎&nbsp;&nbsp; ${name}`)
    // 2.按需渲染用户头像  
    // 判断有无图片头像，若有则渲染图片头像，否则，渲染文字头像
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        $('.text-avatar').html(`${firstname}`).show()
        $('.layui-nav-img').hide()
    }

}