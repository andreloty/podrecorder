module.exports = {
  index (req, res) {
    return res
      .status(200)
      .json({ msg: 'Sim, estou te ouvindo... 🤣' })
  }
}
