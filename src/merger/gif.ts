/* eslint-disable */
import Worker from './upng.worker'
// import UPNG from './upng';
import { GifWriter } from 'omggif'

function sendMessage(methods, args) {
  const promiseMap = {}
  const data = {
    methods,
    args,
    asyncId: Math.random()
  }

  let worker = new Worker()
  worker.onmessage = function(event) {
    // 异步 promise
    if (event.data.asyncId && promiseMap[event.data.asyncId]) {
      promiseMap[event.data.asyncId](event.data.payload)
      delete promiseMap[event.data.asyncId]
      worker.terminate()
      worker = null
    }
  }

  return new Promise(resolve => {
    promiseMap[data.asyncId] = resolve
    worker.postMessage(data)
  })
}

// GIF 生成, 从 https://www.photopea.com/ 抠的
// datas = [Uint8Array, delay]
export async function exportGif(datas, width, height, config) {
  if (!config) {
    // 质量、速率、循环次数、是否禁止透明度
    config = [100, 0, 0, false]
  }

  var buffers = []
  var delays = []
  var pixelLength = width * height * 4
  var transparent = null

  for (var j = 0; j < datas.length; j++) {
    var uint8 = datas[j][0]

    if (!config[3]) {
      for (var i = 0; i < pixelLength; i += 4) {
        var alpha = (uint8[i + 3] = uint8[i + 3] > 127 ? 255 : 0)
        if (alpha == 0) uint8[i] = uint8[i + 1] = uint8[i + 2] = 0
      }
    }

    buffers.push(uint8.buffer)
    delays.push(datas[j][1])
  }

  // psize ：调色板尺寸（想要多少种颜色）
  var psize = Math.round(2 + (254 * config[0]) / 100)

  // { ctype: 文件的颜色类型（Truecolor，灰度，调色板...）, depth: 像素数据的位深度（1、2、4、8、16）, plte: 调色板-颜色列表, frames: 有关帧的其他信息（帧延迟等）  }
  var info = await sendMessage(
    ['encode', 'compress'],
    [buffers, width, height, psize, [!0, !1, !1, 8, !1], config[3]]
  )
  // var info = UPNG.encode.compress(buffers, width, height, psize, [!0, !1, !1, 8, !1]);
  var plte = info.plte

  var rbga = new Uint8Array(4)
  var unit32Rgba = new Uint32Array(rbga.buffer)

  for (var i = 0; i < plte.length; i++) {
    unit32Rgba[0] = plte[i]
    var r = rbga[0]
    rbga[0] = rbga[2]
    rbga[2] = r
    plte[i] = unit32Rgba[0]
    if (unit32Rgba[0] == 0) transparent = i
  }

  while (plte.length < 256) plte.push(0)

  var resultBuf = new Uint8Array(2e3 + width * height * datas.length)
  var loop = config[2]
  var options = { palette: plte }

  if (loop != 1) options.loop = loop == 0 ? 0 : loop - 1
  var gif = new GifWriter(resultBuf, width, height, options)

  for (var i = 0; i < datas.length; i++) {
    var frame = info.frames[i]
    var rect = frame.rect
    var dispose = frame.dispose

    gif.addFrame(rect.x, rect.y, rect.width, rect.height, frame.img, {
      transparent: transparent,
      disposal: dispose + 1,
      delay: Math.round(delays[i] / 10)
    })
  }
  return resultBuf.slice(0, gif.end()).buffer
}
