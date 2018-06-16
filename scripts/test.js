const PRIVATE = require('./private');

module.exports = robot => {
  // hear: anytime a message's text matches
  robot.hear(/javascript/i, res => {
    /**
     * res is an instance of Response
     * 'send' a message back to the room the 'res' came from
     */
    res.send('wow');
  });

  // respond: when messages are immediately preceded by the robot's name or alias
  robot.respond(/hello/i, res => {
    // 'reply' to the person(Dave) that sent the message: 'Dave: hi'
    res.reply('hi');
  });

  robot.hear(/emote/i, res => {
    // 'emote' a message to a room
    // TODO: I have no idea what emote is for yet
    res.emote('this is a response to emote!!');
  });


  // Messages can be sent to a specified room or user using the messageRoom function.
  robot.hear(/send to myroom/i, res => {
    const roomName = 'myroom';
    res.messageRoom(roomName, 'You\'ve got a message from someone.');
  });


  // capturing data
  robot.respond(/open the (.*) doors/i, res => {
    const doorType = res.match[1];

    if (doorType === 'pod bay') {
      res.reply('I\'m afraid I can\'t let you do that.');
    } else {
      res.reply(`Opening ${doorType} doors`);
    }
  });

  // HTTP calls
  robot.respond(/how is the weather today in (.*)/i, res => {
    const region = res.match[1];

    // I'm using 'https://openweathermap.org/current'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${region}
      &units=metric&appid=${PRIVATE.WHEATER_API_ID}`;

    robot.http(url).get()((err, response, body) => {
      body = JSON.parse(body);
      const weather = body.weather[0].main;
      const { temp, humidity } = body.main;

      res.send(`${region}'s weather:`);
      res.send(`${temp}°C ${humidity}% ${weather}`);
    });
  });

  /**
   * HTTP listener and test curl:
   * curl -X POST -H "Content-Type: application/json" -d '{"secret":"C-TECH Astronomy"}' http://127.0.0.1:8080/hubot/room/1
   */
  robot.router.post('/room/:room_id', (req, res) => {
    const roomId = req.params.room_id;
    const data = req.body.payload ? JSON.parse(req.body.payload) : req.body;
    const { secret } = data;

    robot.messageRoom(roomId, `I have a secret: ${secret}`);
    res.send('OK');
  });
};
