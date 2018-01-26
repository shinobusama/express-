$(function () {
    $('#signup-form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                            min: 2,
                            max: 6,
                            message: '请输入正确的中文姓名'
                    },
                }
            },
            age: {
                validators: {
                    notEmpty: {
                        message: '年龄不能为空'
                    },
                    regexp: {
                        regexp: /^[0-9_]+$/,
                        message: '年龄只能是数字'
                    },
                    stringLength: {//检测长度  
                        min: 1,  
                        max: 2,  
                        message: '请输入正确的年龄信息'  
                    }
                }
            },
            tel: {
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    stringLength: {//检测长度  
                        min: 11,  
                        max: 11,  
                        message: '请输入正确的11位手机号码'  
                    },
                    regexp: {
                        regexp: /^[0-9_]+$/,
                        message: '手机号码只能是数字'
                    }
                }
            }
        }
    });
});