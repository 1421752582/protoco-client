/**
 * Created by dev03 on 2018/3/19.
 */
var chai = require('chai');
var should = require('chai').should();

var testConfig = require('./config.json')

describe('make a test for param init',function(){

    var udpClient = require('./../index').udpClient;
    var use_udpClient = new udpClient();

    it('RandomBuffer Format Detection return data length should be which you set', function (done) {
        Buffer.from(use_udpClient.RandomBuffer(6),'hex').length.should.equal(6);
        done();
    });

    it('DevEUI Format Detection return data length should be 8', function (done) {
        var DevEUI = use_udpClient.RandomBuffer(8);
        Buffer.from(use_udpClient.DevEUI(DevEUI),'hex').length.should.equal(8);
        done();
    });

    it('fcnt Format Detection return data type should be number', function (done) {
        var fcnt = 1;
        use_udpClient.fcnt(fcnt).should.equal(fcnt);
        done();

    });

    it('DevNonce Format Detection return data length should be 2', function (done) {
        var DevNonce = use_udpClient.RandomBuffer(2);
        Buffer.from(use_udpClient.DevNonce(DevNonce),'hex').length.should.equal(2);
        done();

    });
    it('DevAddr Format Detection return data length should be 4', function (done) {
        var DevAddr = use_udpClient.RandomBuffer(4);
        Buffer.from(use_udpClient.DevAddr(DevAddr),'hex').length.should.equal(4);
        done();

    });

    it('AppKey Format Detection return data length should be 16', function (done) {
        var AppKey = use_udpClient.RandomBuffer(16);
        Buffer.from(use_udpClient.AppKey(AppKey),'hex').length.should.equal(16);
        done();

    });

});

describe('make a test for udp Client',function(){

    before(function () {
        const dgram = require('dgram');
        const server = dgram.createSocket('udp4');

        server.on('close',()=>{
            console.log('socket已关闭');
    });

        server.on('error',(err)=>{
            console.log(err);
    });

        server.on('listening',()=>{
            console.log('socket正在监听中...');
    });

        server.on('message',(msg,rinfo)=>{
            console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
        server.send('123456',rinfo.port,rinfo.address)
    });
        server.bind(testConfig.udpPort);
    });

    it('Check the udp communication', function (done) {

        var udpClient = require('./../index').udpClient;
        var use_udpClient = new udpClient();
        var DevEUI = use_udpClient.RandomBuffer(8);
        var DevNonce = use_udpClient.RandomBuffer(2);
        var send = {
            'DevEUI' : DevEUI,
            'DevNonce' : DevNonce
        };
        use_udpClient.write(send,testConfig.udpPort,'localhost')
        use_udpClient.message(function (msg,rinfo) {
            console.log('msg,rinfo',msg,rinfo);
            Buffer.from(msg,'hex').toString().should.equal('123456')
            rinfo.port.should.equal(testConfig.udpPort)
            done();
        })

    });

});

describe('make a test for tcp Client',function(){

    before(function () {
        var net = require('net');
        var HOST = testConfig.tcpHost;
        var PORT = testConfig.tcpPort;
        net.createServer(function(sock) {
            console.log('CONNECTED: ' +
                sock.remoteAddress + ':' + sock.remotePort);
            sock.on('data', function(data) {
                console.log('DATA ' + sock.remoteAddress + ': ' + data);
                sock.write('test');
            });
            sock.on('close', function(data) {
                console.log('CLOSED: ' +
                    sock.remoteAddress + ' ' + sock.remotePort);
            });

        }).listen(PORT, HOST);

    });


    it('Check the tcp communication', function (done) {
        var tcpClient = require('./../index').tcpClient;
        var HOST = testConfig.tcpHost;
        var PORT = testConfig.tcpPort;
        var use_tcpClient = new tcpClient(PORT,HOST);
        var DevEUI = use_tcpClient.RandomBuffer(8);
        var DevNonce = use_tcpClient.RandomBuffer(2);
        var send = {
            'DevEUI' : DevEUI,
            'DevNonce' : DevNonce
        };
        use_tcpClient.write(send);
        use_tcpClient.message(function (data) {
            data.from(msg,'hex').toString().should.equal('test')
            done();
        })

    });

});
