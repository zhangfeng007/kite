<template>
  <article class="content-box content-box-index">
    <div class="info-box"
         v-if="articleItem.aid">
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
            <router-link v-for="(item_article_tag,key) in articleTagFilter(articleItem.article_tag_ids)"
                         class="tag-class frontend"
                         :key="key"
                         :to="{name:'article_tag',params:{article_tag_en_name:item_article_tag.article_tag_en_name}}">{{item_article_tag.article_tag_name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="thumb"
         v-if="articleItem.cover_img">
      <el-image :src="articleItem.cover_img"
                lazy></el-image>
    </div>
  </article>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    articleItem: {
      type: Object,
      default: {}
    }
  },
  methods: {
    articleTagFilter (val) {
      var _arr = [];
      this.articleTagAll.map((item, key) => {
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
