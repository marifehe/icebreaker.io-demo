'use strict';

import React, { Component } from 'react';
import icebreaker from 'icebreaker.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connId: '',
      connIdInput: '',
      localVideoStream: null,
      remoteVideoStream: null,
      getUserMediaError: null
    };

    this.localVideoId = 'local-video';
    this.remoteVideoId = 'remote-video';

    this.initIcebreakerClient = this.initIcebreakerClient.bind(this);
    this.onConnectionEnded = this.onConnectionEnded.bind(this);
    this.onConnIdInputChange = this.onConnIdInputChange.bind(this);
    this.onGetUserMediaError = this.onGetUserMediaError.bind(this);
    this.onLocalStreamoReady = this.onLocalStreamoReady.bind(this);
    this.onRemoteStreamReady = this.onRemoteStreamReady.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
    this.onStopClick = this.onStopClick.bind(this);
  }

  initIcebreakerClient() {
    const host = document.location.host;
    this.icebreakerClient = icebreaker(`https://${host}`, {
      path: '/socket'
    });

    this.icebreakerClient.events.connectionEnded.addOnce(this.onConnectionEnded);
    this.icebreakerClient.events.getUserMediaError.addOnce(this.onGetUserMediaError);
    this.icebreakerClient.events.localStreamReady.addOnce(this.onLocalStreamoReady);
    this.icebreakerClient.events.remoteStreamReady.addOnce(this.onRemoteStreamReady);

    const connIdInput = (this.state.connIdInput && this.state.connIdInput.length > 0) ?
      this.state.connIdInput : null;
    const webrtcProps = {
      connId: connIdInput,
      mediaConstraints: {
        audio: true,
        video: true
      },
      configuration: {
        iceServers: [
          {
            url: 'stun:stun.l.google.com:19302'
          }
        ]
      }
    };
    this.icebreakerClient.start(webrtcProps).then(connId => {
      console.log('>>>>> The connection id is: ', connId);
    });
  }

  onConnectionEnded() {
    this.setState({
      connId: '',
      connIdInput: '',
      localVideoStream: null,
      remoteVideoStream: null,
      getUserMediaError: null
    });
    delete this.icebreakerClient;
  }

  onConnIdInputChange(event) {
    event.preventDefault();
    const connIdInput = event.target.value;
    this.setState({
      connIdInput
    });
  }

  onGetUserMediaError(event) {
    this.setState({
      connId: '',
      connIdInput: '',
      localVideoStream: null,
      remoteVideoStream: null,
      getUserMediaError: event.error
    });

    delete this.icebreakerClient;
  }

  setVideoStream(videoId, stream) {
    const video = document.getElementById(videoId);
    if (typeof video.srcObject == 'object') {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream)
    }
  }

  onLocalStreamoReady(event) {
    this.setState({
      connId: event.connId,
      localVideoStream: event.stream,
      remoteVideoStream: this.state.remoteVideoStream,
      getUserMediaError: null
    });
    this.setVideoStream(this.localVideoId, event.stream);
  }

  onRemoteStreamReady(event) {
    this.setState({
      connId: event.connId,
      localVideoStream: this.state.localVideoStream,
      remoteVideoStream: event.stream,
      getUserMediaError: null
    });
    this.setVideoStream(this.remoteVideoId, event.stream);
  }

  onStartClick(event) {
    if (!this.icebreakerClient) {
      this.initIcebreakerClient();
    }
    event.preventDefault();
  }

  onStopClick(event) {
    if (this.icebreakerClient) {
      this.icebreakerClient.stop();
    }
    event.preventDefault();
  }

  render() {
    const localVideoClass = this.state.localVideoStream ? '' : 'hidden';
    const remoteVideoClass = this.state.remoteVideoStream ? '' : 'hidden';
    const connIdMsg = this.state.connId ?
      `The connection id is: ${this.state.connId}` : '';
    const remoteLoaderClass = (this.state.localVideoStream && !this.state.remoteVideoStream) ?
      'loader' : 'hidden';
    const startButtonClass = this.state.localVideoStream ?
      'btn btn-primary disabled' : 'btn btn-primary';
    const stopButtonClass = this.state.localVideoStream ?
      'btn btn-primary' : 'btn btn-primary disabled';
    const errorMsg = this.state.getUserMediaError ?
      `Error received while trying to get user media: ${this.state.getUserMediaError.name}` : '';

    return (
      <div className="container">
      <div className="row d-flex justify-content-center">
          <p>To start a video chat enter a connection id and click Start. If the connection exists, you will join it.
          If, instead, this is a new connection, share the id with a remote peer so he can join.</p>
        </div>
        <div className="row d-flex justify-content-center">
          <form>
            <div className="row d-flex justify-content-center">
              <div className="form-group text-center">
                <input type="text"
                  className="form-control"
                  id="chat-connId"
                  placeholder="Enter connection id"
                  value={this.state.connIdInput}
                  onChange={this.onConnIdInputChange} />
                <small className="form-text text-muted">If left blank a new connection id will be generated.</small>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 d-flex justify-content-center">
                <button type="submit"
                  className={startButtonClass}
                  onClick={this.onStartClick}>Start</button>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <button type="submit"
                  className={stopButtonClass}
                  onClick={this.onStopClick}>Stop</button>
              </div>
            </div>
          </form>
        </div>
        <br />
        <div className="row d-flex justify-content-center">
          <strong>{connIdMsg}</strong>
        </div>
        <div className="row d-flex justify-content-center">
          <strong className="error">{errorMsg}</strong>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-block">
                <h4 className="card-title">You</h4>
                <video id={this.localVideoId} autoPlay className={localVideoClass}></video>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-block">
                <h4 className="card-title">Remote peer</h4>
                <div className={remoteLoaderClass}></div>
                <video id={this.remoteVideoId} autoPlay className={remoteVideoClass}></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;