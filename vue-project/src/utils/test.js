const test = {
    //验证邮箱
    email(value) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
    },
    //验证手机号
    phone(value) {
        return /^1[23456789]\d{9}$/.test(value);
    },
    //验证URL
    url(value) {
        return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
    },
    //验证日期格式
    date(value) {
        return !/Invalid|NaN/.test(new Date(value).toString());
    },
    //验证ISO类型的日期格式
    dateISO(value) {
        return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
    },
    //验证十进制数字
    number(value) {
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    },
    //验证整数
    digits(value) {
        return /^\d+$/.test(value);
    },
    //验证身份证号
    idCard(value) {
        return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
    },
    //验证车牌号
    carNo(value) {
        // 新能源车牌
        const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        // 旧车牌
        const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if (value.length === 7) {
            return creg.test(value);
        } else if (value.length === 8) {
            return xreg.test(value);
        } else {
            return false;
        }
    },
    //验证金额,保留2位小数
    amount(value) {
        return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
    },
    //验证是否为中文
    chinese(value) {
        let reg = /^[\u4e00-\u9fa5]+$/gi;
        return reg.test(value);
    },
    //验证是否为字母
    letter(value) {
        return /^[a-zA-Z]*$/.test(value);
    },
    //验证字母或者数字
    enOrNum(value) {
        let reg = /^[0-9a-zA-Z]*$/g;
        return reg.test(value);
    }
};

export default test;