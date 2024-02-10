const statsController = {};
const User = require('../models/userModel')


// statsController.addStats = (req, res, next) => {

//     const { username, age, sex, height, weight, goal } = req.body;

//     if (!age || !sex || !weight || !goal)
//     return next({
//         log: 'Missing inputs in UserController.createUser',
//         message : {err: 'An error occured'}
//     })

//     User.find({username: username})
// }

statsController.updateStats = (req, res, next) => {
    //console.log(req.cookies);
    const { goal: newGoal, weight: newWeight } = req.body;
    const { ssid } = req.cookies;
    User.findByIdAndUpdate({_id: ssid}, {goal: newGoal, weight: newWeight}, {new: true})
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
        //console.log(user);
        // user.goal = goal;
        // user.weight = weight;
        return next();
    }).catch(err => next({
        log: 'error in statsController.updateStats',
        message: {
          err: `Error: ${err}`
        }}))
}
statsController.updateLogs = (req, res, next) => {
  //console.log(req.cookies);
  const { data } = req.body;
  const { ssid } = req.cookies;
  User.findByIdAndUpdate({_id: ssid}, {data: data}, {new: true})
  .then(user => {
    if (!user) {
      throw new Error('User not found');
    }
      //console.log(user);
      // user.goal = goal;
      // user.weight = weight;
      return next();
  }).catch(err =>
     next({
      log: 'error in statsController.updateLogs',
      message: {
        err: `Error: ${err}`
      }}))
}

statsController.getUserInfo = (req, res, next) => {
  //console.log(req);
  const {ssid} = req.cookies;
  User.findById({_id: ssid})
  .then(user => {
    if (!user) {
      throw new Error('User not found');
    }
    //console.log(user);
    const { firstName, lastName, age, sex, height, weight, goal, data } = user;
    res.locals.userInfo = { firstName, lastName, age, sex, height, weight, goal, data }
    return next();
  }).catch (err => next({
    log: 'error in statsController.getCookies',
        message: {
          err: `Error: ${err}`
  }}))

}


module.exports = statsController;