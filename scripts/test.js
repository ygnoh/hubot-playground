module.exports = robot => {
    robot.hear(/javascript/i, res => {
        res.send("wow");
    });
};