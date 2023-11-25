module.exports = {
    appenders: {
        console: {
            "type": "console",
            "category": "console"
        },
        everything: {
            type: "file",
            filename: "/log/access.log",
            maxLogSize: 1024 * 1024 * 8,
            backups: 5,
            keepFileExt: true,
            compress: false
        },
        errorFile: {
            type: 'file',
            filename: "/log/error.log",
            maxLogSize: 1024 * 1024 * 8,
            backups: 10,
            keepFileExt: true,
            compress: false
        },
        errors: { type: 'logLevelFilter', level: 'error', appender: 'errorFile' }
    },
    "categories": {
        "default": {
            "appenders": [
                "everything",
                "errors",
                "console"
            ],
            //日志记录级别 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
            "level": "INFO"
        }
    },
    "pm2": true,
    "replaceConsole": true
};