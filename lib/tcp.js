/**
 * Created by dev03 on 2018/7/23.
 */
var tcpClient = function (tcpPort,tcpHost) {

    var that = this;

    var net = require('net');

    this.client = net.connect(tcpPort, tcpHost, function() {
        console.log('AccessLink-CommonAccess virtual tcp client# Connected to the server.');
    });

    this.write = function (message) {
        that.client.write(JSON.stringify(message));
    };

    this.end = function () {
        that.client.on('end', function() {
            console.log('Server disconnected.');
        });
    };

};
var util = require('util');
var paramInit = require('./paramInit');
util.inherits(tcpClient,paramInit);
tcpClient.prototype.message = function (callback) {
    this.client.on('data',function(data){
        callback(data)
    });
};

module.exports = tcpClient;