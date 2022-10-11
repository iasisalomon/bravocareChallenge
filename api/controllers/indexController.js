module.exports = {
  index: function (req, res, next) {
    res.send({
      name: 'Iasi Salomon',
      age: 31,
      message: 'Thank you for the opportunity! of doing this challenge, I hope you like it!'
    })
  }
}
