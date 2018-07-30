# @handsometechs/protocol-client


### Installation

	npm i --save @handsometechs/protocol-client


## @handsometechs/protocol-client -> API

### 初始化


## Examples

### Client

```javascript
var tcpClient = require('@handsometechs/protocol-client').tcpClient;
var HOST = 3000;
var PORT = 'localhost';
var use_tcpClient = new tcpClient(PORT,HOST);
var DevEUI = use_tcpClient.RandomBuffer(8);
var DevNonce = use_tcpClient.RandomBuffer(2);
var send = {
    'DevEUI' : DevEUI,
    'DevNonce' : DevNonce
};
use_tcpClient.write(send);
use_tcpClient.message(function (data) {
    console.log('data',data);
})

