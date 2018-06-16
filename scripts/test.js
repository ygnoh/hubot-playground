module.exports = robot => {
  // hear: anytime a message's text matches
  robot.hear(/javascript/i, res => {
    res.send('wow');
  });

  // respond: when messages are immediately preceded by the robot’s name or alias
  robot.respond(/hello/i, res => {
    res.reply('hi');
  });
};
