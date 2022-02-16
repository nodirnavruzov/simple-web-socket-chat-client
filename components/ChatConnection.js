export default class ChatConnection {
  
  onevent = eventCode => {}
  constructor(url) {
    this.url = url
        
  }
  connect() {
    // this.url = 'ws://81.95.238.161:31633'
    this.url = 'ws://192.168.2.8:8081'
    // this.url = 'ws://192.168.43.92:8081'
    this._signallingChannel = new WebSocket(this.url)
    
    console.log('connect')
    return new Promise((resolve, reject) => {
      let resolved = false
      this._signallingChannel.onopen = _ => {
        console.log('Connection opened !!!')
        resolve()
      }
      this._signallingChannel.onmessage = data => {
        resolved = true
        this.listeners(data)
      }

      this._signallingChannel.onclose = _ => {
        this.connectionStatus(false)
        console.log('Connection closed')
        reject({
          response: {
            status: 403,
            message: 'Connection closed'
          }
        })
      }

      this._signallingChannel.onerror = () => {
        this.connectionStatus(false)
        console.log('Connection failed')
        if (!resolved) {
          console.error('Connection failed')
          reject({
            response: {
              status: 403,
              message: 'Connection failed'
            }
          })
        } else {
          console.error('Log in again')
          this.connect()
        }
      }
    })
  }

  close() {
    this._signallingChannel.close()
  }

  sendMessage(body) {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'NEW_MESSAGE',
        body: body
      })
    )
  }

  login(body) {
    console.log('body', body)
    this._signallingChannel.send(
      JSON.stringify({
        action: 'LOGIN', 
        body: body 
      })
    )
  }
  reLogin(body) {
    console.log('reLogin', body)
    this._signallingChannel.send(
      JSON.stringify({
        action: 'RE_LOGIN', 
        body: body 
      })
    )
  }
  
  createRoom(body) {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'CREATE_ROOM', 
        body: body 
      })
    )
  }
  
  roomList() {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'ROOM_LIST', 
      })
    )
  }

  joinToRoom(body) {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'JOIN_TO_ROOM',
        body
      })
    )
  }

  exitRoom(body) {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'EXIT_ROOM',
        body
      })
    )
  }
  pong() {
    this._signallingChannel.send(
      JSON.stringify({
        action: 'PONG',
      })
    )
  }

  listeners(event) {
    const msg = JSON.parse(event.data)
    switch (msg.action) {
      case 'CONNECTION':
        console.log('CONNECTION')
        this.connectionStatus(true)
        break
      case 'LOGIN': 
        console.log('msg.body', msg.body)
        this.onLogin(msg.body)
        break
      case 'RE_LOGIN': 
        this.onReLogin(msg.body)
        break
      case 'CREATE_ROOM':
        this.onCreateRoom(msg.body)
        break
      case 'JOIN_ROOM':
        this.onJoinRoom(msg.body)
        break
      case 'NEW_MESSAGE':
        this.onAddMessage(msg.body)
        break
      case 'USER_LEFT':
        this.onUserLeft(msg.body)
        break
      case 'ROOM_LIST':
        this.onRoomList(msg.body)
        break
      case 'PING': 
        if (this._signallingChannel) {
          this.pong()
        }
        break
        
    }
  }

}
