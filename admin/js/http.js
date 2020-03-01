(function (w) {

    // http.js 文件用于封装 ajax 请求时的公共代码
    // 需求1：在每次发送 ajax 请求前，添加请求头
    // 请求错误的统一处理。
    $.ajaxSetup({
        // 全局添加请求头，全局请求头不会被 $.ajax() 里的 headers 覆盖掉
        headers: {
            // 服务器要求添加请求头 Authorization，值为登录成功后保存到本地存储中的 token 字符串
            Authorization: localStorage.getItem('token')
        },

        // 发送 ajax 请求前 - 作业：添加请求进度条
        beforeSend: function () {
            // 显示进度条
            // 进度条插件引入后会在 window 对象上添加一个 NProgress 成员，所以才能全局调用
            // 如果有页面没有引入 NProgress 插件，那 window 对象上就没有 NProgress，那就不调用
            if (window.NProgress) {
                NProgress.start();
            }
        },

        // 请求成功 - success 一般不写在全局，因为会被 $.ajax() 里面的 success 覆盖掉
        // success:function(){
        //     alert('成功');
        // },

        // 请求失败，意味服务器拒绝给你数据，造成这个原因往往是用户没有没有正确的 token
        // 没有正确的 token 就跳到登录页，让用户重新登录并获取 token
        error: function (xhr) {
            // alert('ajax请求出错了，请看控制台');
            console.log('ajax请求出错了,xhr对象打印', xhr);
            // ajax 请求参数错误的状态码是 400
            if (xhr.status === 400) {
                alert('请输入正确的数据');
            }
            // 进入 index.html 页面的时候还没登录，未登录状态码是 403
            else if (xhr.status === 403) {
                $('.modal').modal();
                $('.modal p').html('数据获取失败，请重新登录');
                // 点击去登录的按钮后跳转到登录页
                // 请求失败才给按钮注册跳转事件。
                $('.to-login').click(function () {
                    // 设置为登录页的路径
                    location.href = './login.html';
                });
            }
        },

        // 完成 - 不管成功失败都执行
        // 请求完成后隐藏进度条
        complete: function () {

            if (window.NProgress) {
                // 隐藏进度条
                NProgress.done();
            }
        }

    });


    // 需求2：把所有的 ajax 请求的 url 地址封装到一个对象中管理

    // 基地址，注意这里不要写多了斜杠
    const baseUrl = 'http://localhost:8080/api/v1';

    // 拼接好的 url 放到一个对象中管理
    const BigNew = {
        // 用户信息接口
        user_info: `${baseUrl}/admin/user/info`,        // 2、获取用户信息
        user_detail: `${baseUrl}/admin/user/detail`,      // 3、获取用户详情
        user_edit: `${baseUrl}/admin/user/edit`,        // 4、编辑用户信息
        // 分类接口
        category_list: `${baseUrl}/admin/category/list`,    // 5、所有文章类别
        category_add: `${baseUrl}/admin/category/add`,      // 6、新增文章类别
        category_search: `${baseUrl}/admin/category/search`,   // 7、根据id查询指定文章类别
        category_edit: `${baseUrl}/admin/category/edit`,     // 8、编辑文章类别
        category_delete: `${baseUrl}/admin/category/delete`,   // 9、删除文章类别
        // 文章接口
        article_query: `${baseUrl}/admin/article/query`,      // 10、文章搜索
        article_publish: `${baseUrl}/admin/article/publish`,    // 11、发布文章
        article_search: `${baseUrl}/admin/article/search`,    // 12、根据id获取文章信息
        article_edit: `${baseUrl}/admin/article/edit`,      // 13、文章编辑
        article_delete: `${baseUrl}/admin/article/delete`,     // 14、删除文章
        // 数据统计接口
        data_info: `${baseUrl}/admin/data/info`,     // 15、获取统计数据
        data_article: `${baseUrl}/admin/data/article`,     // 16、日新增文章数量统计
        data_category: `${baseUrl}/admin/data/category`,     // 17、各类型文章数量统计
        data_visit: `${baseUrl}/admin/data/visit`,     // 18、日文章访问量
        // 评论接口
        comment_search: `${baseUrl}/admin/comment/search`,     // 19、文章评论搜索
        comment_pass: `${baseUrl}/admin/comment/pass`,       //  20、评论审核通过
        comment_reject: `${baseUrl}/admin/comment/reject`,     // 21、评论审核不通过
        comment_delete: `${baseUrl}/admin/comment/delete`,     // 22、删除评论
    };

    // window 是实参， w 是函数的形参，保存了 window 对象的地址
    // 把局部的 BigNew 添加到 window 对象上
    w.BigNew = BigNew;

})(window);