<template>
  <div class="view setting-view">
    <div class="sub-view-box setting-profile-view">

      <h1>个人资料</h1>

      <ul class="setting-list">
        <li class="item-view">

          <span class="title">头像</span>
          <div class="avatar-uploader avatar-uploader">
            <div class="avatar">
              <el-image :src="(formData.avatar_review_status===1||formData.avatar_review_status===3)?formData.avatar_review:formData.avatar"
                        lazy></el-image>
            </div>
            <div class="action-box">
              <div class="hint">支持 jpg、png 格式大小 1M 以内的图片
                <span class="hint-review"
                      v-if="formData.avatar_review_status===1||formData.avatar_review_status===3">
                  ({{formData.avatar_review_status===1?'新头像正在审核中，审核通过则显示，否则将换回原头像':'头像审核失败，请重新上传'}})
                </span>
              </div>
              <UploadImage @changeUpload="changeAvatar" />
            </div>
          </div>

        </li>
        <li class="item-view">

          <span class="title">昵称</span>
          <div class="input-box profile-input profile-input">
            <input v-model="formData.nickname"
                   placeholder="填写你的昵称"
                   class="input">
          </div>

        </li>

        <li class="item-view">
          <span class="title">性别</span>
          <div class="input-box profile-radio">
            <input type="radio"
                   name="sex"
                   value="1"
                   v-model="formData.sex"><span>男</span>
            <input type="radio"
                   name="sex"
                   value="2"
                   v-model="formData.sex"><span>女</span>
            <input type="radio"
                   name="sex"
                   value="0"
                   v-model="formData.sex"><span>保密</span>
          </div>
        </li>
        <li class="item-view">

          <span class="title">职业</span>
          <div class="input-box profile-input profile-input">
            <input placeholder="填写你的职业"
                   v-model="formData.profession"
                   class="input">
          </div>

        </li>
        <li class="item-view">

          <span class="title">公司</span>
          <div class="input-box profile-input profile-input">
            <input placeholder="填写你的公司"
                   v-model="formData.company"
                   class="input">
          </div>

        </li>
        <li class="item-view">

          <span class="title">个人介绍</span>
          <div class="input-box profile-input profile-input">
            <input v-model="formData.introduction"
                   placeholder="填写职业技能、擅长的事情、喜欢的事情等"
                   class="input">
          </div>

        </li>
        <li class="item-view">

          <span class="title">个人主页</span>
          <div class="input-box profile-input profile-input">
            <input placeholder="填写你的个人主页"
                   v-model="formData.home_page"
                   class="input">
          </div>

        </li>
      </ul>

      <div class="footer-view">
        <button class="button button-save"
                @click="updateUserInfo">保存
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { UploadImage } from '@components'

export default {
  title () {
    return 'BLOG'
  },
  name: 'profile',
  data: function () {
    return {
      user_info: '',
      formData: {
        nickname: '',
        sex: '',
        profession: '',
        company: '',
        introduction: '',
        home_page: '',
        avatar: '',
        avatar_review: '',
        avatar_review_status: 0
      },
      file: {}
    }
  },
  created () {
    this.getCurrUserInfo()
  },
  methods: {
    getCurrUserInfo () {// 获取当前登录用户信息
      this.$store.dispatch('setting/GET_USER_INFO_ALL', { uid: this.personalInfo.user.uid })
        .then(result => {
          this.$nextTick(() => {
            if (result.state === 'success') {
              this.user_info = result.data
              this.formData = {
                ...result.data.user,
                ...result.data.user_info
              }
            }
          })
        })
    },
    updateUserInfo () {
      this.$store.dispatch('setting/PERSONAL_UPLOAD_INFO', this.formData)
        .then(result => {
          this.$nextTick(() => {
            if (result.state === 'success') {
              this.$message.success('保存成功')
              this.getCurrUserInfo()
            } else {
              this.$message.warning(result.message)
            }
          })
        })
    },
    changeAvatar ({ formData, config }) {
      this.$store.dispatch('setting/PERSONAL_UPLOAD_AVATAR', formData)
        .then(result => {
          this.$nextTick(function () {
            if (result.state === 'success') {
              this.$message.success('上传用户头像成功，头像正在审核中')
              this.getCurrUserInfo()
            } else {
              this.$message.warning(result.message)
            }
          })
        })
    },
  },
  computed: {
    personalInfo () { // 登录后的个人信息
      return this.$store.state.personalInfo || {}
    }
  },
  components: {
    UploadImage
  }
}
</script>

<style scoped lang="scss">
.setting-view {
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  .sub-view-box {
    > h1 {
      color: #333333;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
    }
    .setting-list {
      .item-view {
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        .title {
          font-size: 14px;
          color: #333;
          width: 120px;
        }
        .avatar-uploader {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .input-box {
          flex: 1;
          input {
            width: 100%;
          }
        }
        .profile-radio {
          input {
            width: auto;
            display: inline-block;
          }
          span {
            margin: 0 20px 0 6px;
            font-size: 15px;
            vertical-align: middle;
          }
        }
        .input {
          display: block;
          border: none;
          outline: none;
          color: #909090;
          font-size: 14px;
        }
        .avatar {
          display: inline-block;
          position: relative;
          -webkit-box-flex: 0;
          -ms-flex: 0 0 auto;
          flex: 0 0 auto;
          width: 72px;
          height: 72px;
          margin-right: 12px;
          /deep/ .el-image {
            width: 72px;
            height: 72px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 80px;
            }
          }
        }
        .hint {
          color: #909090;
          font-size: 12px;
          margin-bottom: 18px;
          .hint-review {
            color: #ff4d4f;
            font-size: 12px;
          }
        }
        .button,
        button {
          font-size: 12px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #007fff;
          color: #fff;
          border-radius: 2px;
          border: none;
          padding: 6px 15px;
          outline: none;
          transition: background-color 0.3s, color 0.3s;
          cursor: pointer;
        }
      }
    }
    .action-box,
    .footer-view {
      margin-left: 12px;
      .hint {
        color: #909090;
        font-size: 12px;
        margin-bottom: 18px;
      }
      .button,
      button {
        font-size: 12px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #007fff;
        color: #fff;
        border-radius: 2px;
        border: none;
        display: inline-block;
        padding: 6px 15px;
        outline: none;
        transition: background-color 0.3s, color 0.3s;
        cursor: pointer;
      }
      .button-save {
        padding: 8px 30px;
        font-size: 14px;
        margin-top: 20px;
      }
    }
  }
}
</style>
