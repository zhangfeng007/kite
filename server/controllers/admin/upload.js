const { resAdminJson } = require('../../utils/resData')
const upload = require('../../utils/upload') // 上传工具类

class Picture {
  /**
   * -----------------------------------权限操作--------------------------------
   * 创建标签
   * @param   {object} ctx 上下文对象
   */
  static async uploadPicture (ctx) {
    try {
      await upload('admin').single('file')(ctx)
      let destination = ctx.req.file.destination.split('static')[1]
      let filename = ctx.req.file.filename
      let origin = ctx.request.header.origin
      resAdminJson(ctx, {
        state: 'success',
        message: '返回成功',
        data: {
          filename: `${origin}${destination}/${filename}` // 返回文件名
        }
      })
    } catch (err) {
      resAdminJson(ctx, {
        state: 'error',
        message: '上传图片大于1m'
      })
      return false
    }
  }
}

module.exports = Picture
