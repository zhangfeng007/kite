<template>
  <article class="content-box content-box-index">
    <div class="info-box">
      <div class="info-row title-row">
        <router-link class="title"
                     :to="{name:'article',params:{aid:articleItem.aid}}">{{articleItem.title}}</router-link>
      </div>

      <div class="info-row meta-row">
        <ul class="meta-list">
          <li class="item username clickable">
            <router-link :to="{name:'user',params:{uid:articleItem.user.uid}}"
                         class="name">{{articleItem.user.nickname}}</router-link>
          </li>
          <li class="item item-icon read-count">
            <i class="el-icon-reading"></i>
            <strong v-text="articleItem.read_count"></strong>
          </li>
          <li class="item item-icon like-article">
            <i class="el-icon-star-off"></i>
            <strong v-text="articleItem.like_count"></strong>
          </li>
          <li class="item item-icon comment-count">
            <i class="el-icon-chat-dot-round"></i>
            <strong v-text="articleItem.comment_count"></strong>
          </li>
          <li class="item"
              v-text="articleItem.create_at"></li>
          <li class="item"
              v-if="articleItem.article_tag_ids">
            <router-link v-for="(itemArticleTag,key) in articleTagFilter(articleItem.article_tag_ids)"
                         class="tag-class frontend"
                         :key="key"
                         :to="{name:'article_tag',params:{article_tag_en_name:itemArticleTag.article_tag_en_name}}">{{itemArticleTag.article_tag_name}}</router-link>
          </li>
          <li class="item operat-view"
              v-if="personalInfo.islogin&&personalInfo.user.uid===user_info.user.uid">
            <el-dropdown trigger="click"
                         @command="commandChange">
              <div class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit"
                                  :command="{name:'Write',params:{type:articleItem.aid}}">修改</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete"
                                  :command="{name:'delete'}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="item"
              style="color:#F07178"
              v-if="~[3,4,5].indexOf(articleItem.status)">{{statusList[articleItem.status]}}:{{articleItem.rejection_reason}}</li>
        </ul>
      </div>
    </div>
    <div class="lazy thumb thumb loaded"
         v-if="articleItem.cover_img">
      <el-image :src="articleItem.cover_img"
                lazy></el-image>
    </div>
  </article>
</template>

<script>
export default {
  name: "TopArticleItem",
  props: {
    articleItem: {
      type: Object
    }
  },
  data () {
    return {
      statusList: [
        "草稿",
        "审核中",
        "审核通过",
        "审核失败",
        "回收站",
        "已删除"
      ]
    };
  },
  methods: {
    deleteArticle () {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/DELETE_ARTICLE", {
              aid: this.articleItem.aid
            })
            .then(result => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$emit("delete-change");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    commandChange (val) {
      if (val.name !== "delete") {
        this.$router.push(val);
      } else {
        this.deleteArticle();
      }
    },
    articleTagFilter: function (val) {
      var _arr = [];
      this.articleTagAll.map(function (item, key) {
        if (val.split(",").indexOf(String(item.article_tag_id)) !== -1) {
          _arr.push(item);
        }
      });
      return _arr;
    }
  },
  computed: {
    articleTagAll () {
      return this.$store.state.articleTag.article_tag_all;
    },
    personalInfo () {
      // 登录后的个人信息
      return this.$store.state.personalInfo || {};
    },
    user_info () {
      // 登录后的个人信息
      return this.$store.state.user.user_info || {};
    }
  }
};
</script>

<style scoped lang="scss">
.content-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.8rem 0;
  min-height: 5.75rem;
  .info-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-width: 0;
    .title-row {
      margin: 0.5rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .title {
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: 600;
        line-height: 1.2;
        color: #333;
      }
    }
    .content-text {
      font-size: 13px;
      line-height: 24px;
      color: #999;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .meta-row {
      .meta-list {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        white-space: nowrap;
        .item {
          display: inline-block;
          color: #b3bac1;
          font-size: 12px;
          &:after {
            display: inline-block;
            content: "\B7";
            margin: 0 4px;
            color: #b2bac2;
          }
          &:last-of-type {
            &:after {
              content: "";
            }
          }
          a,
          span {
            font-size: 12px;
          }
          a {
            color: #b3bac1;
          }
          .tag-class {
            padding: 0.38rem 0;
            font-size: 12px;
            text-align: center;
            line-height: 1;
            border-radius: 2px;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #b3bac1;
            &:after {
              content: "/";
              color: #b3bac1;
              margin: 0 3px;
            }
            &:last-of-type {
              &:after {
                content: "";
              }
            }
          }
        }
        .item-icon {
          display: inline-block;
          font-size: 12px;
          color: #b4b4b4;
          &:hover {
            color: #333;
          }
          strong {
            margin-left: 2px;
            font-weight: normal;
          }
          &.like-article {
            cursor: pointer;
          }
          &.like-article-off {
            color: #00bb29;
          }
        }

        .operat-view {
          position: relative;
          cursor: pointer;
        }
      }
    }
  }
  .thumb {
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 7.5rem;
    height: 4.5rem;
    margin-left: 2rem;
    border-radius: 2px;
    /deep/ .el-image {
      width: 7.5rem;
      height: 4.5rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
  &.article-list {
    padding-left: 0;
    padding-right: 0;
  }
  &.content-box-index {
    .thumb {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 10px;
      .el-image {
        width: 4.5rem;
        height: 4.5rem;
      }
    }
  }
  @media (max-width: 767px) {
    &.content-box-index {
      .thumb {
        display: none;
      }
    }
  }
}
</style>
