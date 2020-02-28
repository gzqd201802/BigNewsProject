(function(){


    // 需求：在每次发送 ajax 请求前，添加请求头
    $.ajaxSetup({
        // 全局添加请求头，全局请求头不会被 $.ajax() 里的 headers 覆盖掉
        headers:{
            // 服务器要求添加请求头 Authorization，值为登录成功后保存到本地存储中的 token 字符串
            Authorization: localStorage.getItem('token')
        },

        // 发送 ajax 请求前 - 作业：添加请求进度条
        beforeSend: function(){
            // alert('ajax请求发送前触发');
        },

        // 请求成功 - success 一般不写在全局，因为会被 $.ajax() 里面的 success 覆盖掉
        // success:function(){
        //     alert('成功');
        // },
        
        // 请求失败，意味服务器拒绝给你数据，造成这个原因往往是用户没有没有正确的 token
        // 没有正确的 token 就跳到登录页，让用户重新登录并获取 token
        error: function(){
            // alert('失败，请重新登录');
            // location.href = './login.html';
            $('.modal').modal();
            $('.modal p').html('数据获取失败，请重新登录');
        },
        
        // 完成 - 不管成功失败都执行
        complete: function(){
            // alert('完成');
        }

    });


    // 点击去登录的按钮后跳转到登录页
    $('.to-login').click(function(){
        // 设置为登录页的路径
        location.href = './login.html';
    });


})(window);