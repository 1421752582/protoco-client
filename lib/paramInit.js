/**
 * Created by dev03 on 2018/7/23.
 */
var paramInit = function () {
    
};

paramInit.prototype.DevEUI = function (param) {

    var bufferNodeId = Buffer.from(param, 'hex');
    var length = bufferNodeId.length;
    if (length == 8) {
        return bufferNodeId.toString('hex')
    }
    else {
        console.error('error nodeId')
    }

};

paramInit.prototype.fcnt = function (param) {

    if (Number.isInteger(param)) {
        return param;
    }
    else {
        console.error('error type of fcnt')
    }

};

paramInit.prototype.payload = function (param) {

    var bufferPayload = Buffer.from(param, 'hex');
    var length = bufferPayload.length;
    if (Number.isInteger(length / 16)) {
        return bufferPayload.toString('hex')
    }
    else {
        console.error('error payload')
    }

};

paramInit.prototype.DevNonce = function (param) {

    var bufferDevNonce = Buffer.from(param, 'hex');
    var length = bufferDevNonce.length;
    if (length == 2) {
        return bufferDevNonce.toString('hex')
    }
    else {
        console.error('error DevNonce')
    }

};

paramInit.prototype.DevAddr = function (param) {

    var bufferDevAddr = Buffer.from(param, 'hex');
    var length = bufferDevAddr.length;
    if (length == 4) {
        return bufferDevAddr.toString('hex')
    }
    else {
        console.error('error DevAddr')
    }

};

paramInit.prototype.AppKey = function (param) {

    var bufferAppKey = Buffer.from(param, 'hex');
    var length = bufferAppKey.length;
    if (length == 16) {
        return bufferAppKey.toString('hex')
    }
    else {
        console.error('error AppKey')
    }

};

paramInit.prototype.AppNonce = function (param) {

    var bufferAppNonce = Buffer.from(param, 'hex');
    var length = bufferAppNonce.length;
    if (length == 2) {
        return bufferAppNonce.toString('hex')
    }
    else {
        console.error('error AppNonce')
    }

};

var RandomNumBoth = function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
};

paramInit.prototype.RandomBuffer = function (length) {
    var buffer = Buffer.alloc(length);
    for (var i = 0; i < length; i++) {
        buffer.writeUInt8(RandomNumBoth(0, 255), i, 1);
    }
    buffer = buffer.toString('hex');
    return buffer;
};

module.exports = paramInit;