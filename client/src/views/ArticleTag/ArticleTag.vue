<template>
  <!--article-list-lay layout-content start-->
  <section class="tag-lay layout-content">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="article-list"
               v-if="articleTag">
            <div class="main-top">
              <div class="thumb">
                <el-image :src="articleTag.article_tag_icon"
                          lazy></el-image>
              </div>

              <div class="title">
                <a class="name"
                   href="javascript:;">
                  {{articleTag.article_tag_name}}</a>
              </div>
              <div class="info">
                收录了
                {{count}} 篇文章 ·
                {{subscribeCount}} 人关注
              </div>
            </div>
            <ul class="trigger-menu">
              <!-- <li class=""><a href="/"><i class="iconfont ic-latestcomments"></i> 最新评论</a></li>-->
              <li class="active"><a href="javascript:;"><i class="iconfont ic-articles"></i> 最新收录</a></li>
              <!-- <li class=""><a href="/"><i class="iconfont ic-hot"></i> 热门</a></li>-->
            </ul>
            <div class="list-container">
              <div class="article-view">
                <div class="article-item"
                     v-for="(item,key) in articleList"
                     :key="key">
                  <ArticleItem :articleItem="item"
                               :key="key" />
                </div>
              </div>
              <Page :count="pagination"
                    :page="Number($route.query.page)||1"
                    @pageChange="pageChange"></Page>
            </div>
          </div>
          <div v-else
               class="no-data">
            <span class="info">标签不存在</span>
          </div>
        </div>

      </div>
    </div>
  </section>
  <!--article-list-lay layout-content end-->
</template>

<script>
import ArticleItem from '@views/Article/component/ArticleItem'
import { Page } from '@components'
import { mapState } from 'vuex'
export default {
  name: 'ArticleTag',
  metaInfo () {
    return {
      title: '标签',
      titleTemplate: `%s - ${this.website.meta.website_name}`,
      meta: [{                 // set meta
        name: 'description',
        content: `标签-${this.website.meta.website_name}`,
      }],
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  async asyncData ({ store, route }) {
    return store.dispatch('articleTag/GET_ARTICLE_TAG',
      {
        article_tag_en_name: route.params.article_tag_en_name,
        page: route.query.page || 1,
      }
    )
  },
  methods: {
    pageChange (val) {
      this.$router.push({
        name: 'article_tag',
        params: {
          article_tag_en_name: this.$route.params.article_tag_en_name,
        },
        query: {
          page: val
        }
      })
    }
  },
  computed: {
    ...mapState(['website']),
    count () {
      return this.$store.state.articleTag.tag.count
    },
    subscribeCount () {
      return this.$store.state.articleTag.tag.subscribe_count
    },
    pagination () { // 分页
      return Math.ceil(this.tag.count / this.tag.pageSize)
    },
    tag () {
      return this.$store.state.articleTag.tag
    },
    articleTag () {
      return this.$store.state.articleTag.tag.article_tag
    },
    articleList () {
      return this.$store.state.articleTag.tag.article_list
    },
  },
  components: {
    ArticleItem,
    Page
  }
}
</script>

<style scoped lang="scss">
.tag-lay.layout-content {
  padding-bottom: 50px;
  .main-top {
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;

    .thumb {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 15px;
      /deep/ .el-image {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 15px;
        }
      }
    }
    .tag-img-icon {
      width: 80px;
      height: 80px;
      display: inline-block;
      background-color: #fff;
      background-position: 50%;
      background-repeat: no-repeat;
    }
    .tag-font-icon {
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      i {
        font-size: 35px;
      }
    }

    .title {
      padding: 10px 0 0 0;
      .name {
        display: inline;
        font-size: 21px;
        font-weight: 700;
        vertical-align: middle;
      }
    }
    .info {
      margin-top: 10px;
      font-size: 14px;
      color: #969696;
    }
  }
  .trigger-menu {
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0;
    list-style: none;
    li {
      position: relative;
      display: inline-block;
      padding: 8px 0;
      margin-bottom: -1px;
      a {
        padding: 13px 20px;
        font-size: 15px;
        font-weight: 700;
        color: #969696;
        line-height: 25px;
      }
      &.active {
        border-bottom: 2px solid #646464;
      }
    }
  }
  .list-container {
    .article-view {
      > .article-item {
        border-bottom: 1px solid rgba(178, 186, 194, 0.15);
        &:hover {
          background: #f9f9f9;
        }
      }
    }
  }
}
.no-data {
  .info {
    text-align: center;
    background: #969696;
    display: block;
    margin-top: 25px;
    padding: 25px;
    border-radius: 20px;
    color: #fff;
  }
}
</style>
