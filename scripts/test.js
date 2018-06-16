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
};
