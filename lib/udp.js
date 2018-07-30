/**
 * Created by dev03 on 2018/7/23.
 */
var udpClient = function () {

    var that = this;

    const dgram = require('dgram');

    this.client = dgram.createSocket('udp4');

    this.write = function (message,port,host) {
        that.client.send(JSON.stringify(message),port,host);
    };

    this.end = function () {
        that.client.on('close',()=>{
            console.log('socket close');
        });
    };

};
var util = require('util');
var paramInit = require('./paramInit');
util.inherits(udpClient,paramInit);
udpClient.prototype.message = function (callback) {
    this.client.on('message',function(msg,rinfo){
        callback(msg,rinfo)
    });
};

module.exports = udpClient;