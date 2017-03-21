cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-dialogs": "1.3.0",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-sqlite-storage": "1.4.8"
}
// BOTTOM OF METADATA
});