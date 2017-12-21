const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const moreMovieType = [
  'hot_showing', 'coming_soon', 'top_50'
]
const moreMovieUrl = {
  '正在热映':'4122',
  '即将上映':'123',
  '经典top50':'456'
}

module.exports = {
  formatTime: formatTime,
  moreMovieUrl: moreMovieUrl
}
