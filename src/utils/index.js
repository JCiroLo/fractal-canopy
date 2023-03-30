const Utils = {}

Utils.getRandom = (min, max, float = false) => {
  const number = Math.random() * (max - min) + min
  return float ? number.toFixed(2) : Math.round(number)
}

Utils.getId = () => {
  return Date.now()
}

export default Utils
