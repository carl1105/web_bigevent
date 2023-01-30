$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return layer.msg('昵称长度必须为1-6字符')
            }
        }
    })

    initUserinfo()

    //初始化用户基本信息
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserinfo', res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })

    // 提交修改表单数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:  $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!')
                }
                layer.msg('修改用户信息成功')
                // 修改用户信息的同时，调用getUserinfo方法重新渲染用户头像和昵称
                window.parent.getUserinfo()
            }
        })
    })

})


