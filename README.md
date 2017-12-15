
# icebreaker.io-demo

This project implements a simple video-chat application to show how to use icebreaker.io.

## Context

icebreaker.io enables peer-to-peer real-time communications, using WebRTC technology. It is built on top of [socket.io](https://github.com/socketio/socket.io), and it basically allows two peers to resolve how to connect over the internet and start an RTCPeerConnection. It consists in:

- a [Node.js signaling server](https://github.com/elbecita/icebreaker.io-client)
- a [Javascript client library](https://github.com/elbecita/icebreaker.io-client) for the browser


## How to run the demo

1. You will need to install npm. Follow the instructions described in [this article](http://blog.npmjs.org/post/85484771375/how-to-install-npm) from the npm blog.

2. [Clone this repository](https://help.github.com/articles/cloning-a-repository/) and navigate to the created folder.
3. Install the dependencies with `npm install`.
4. Start the application with `npm run dev`.

After following these steps you are all set. You should see the following messages in your console:
```bash
>>>>> Server listening on port: 8081
>>>>> Access website through https://localhost:8081
```

If you open the url `https://localhost:8081` in your browser, you should view the application:


![alt text](./dev/icebreaker.io-demo.png?raw=true "Demo screenshot")


## License

[MIT](LICENSE)
