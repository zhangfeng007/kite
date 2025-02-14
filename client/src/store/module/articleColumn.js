import { fetch } from '@request'

const state = () => ({
  home_column: [],
  column_list: {
    count: 0,
    list: [],
    page: 1,
    pageSize: 25
  },
  currColumnEnName: '' // 当前 文章专栏
})

const mutations = {
  SET_ARTICLE_COLUMN (state, data) {
    // 设置获取的文章专栏
    state.home_column = data.list
  },
  SET_CURRENT_ARTICLE_COLUMN (state, data) {
    // 设置当前切换的文章专栏
    state.currColumnEnName = data
  },
  SET_ARTICLE_COLUMN_LIST (state, data) {
    // 设置文章专栏列表
    state.column_list = data
  }
}

const actions = {
  GET_ARTICLE_COLUMN ({ commit, dispatch, state }) {
    // 获取文章专栏
    return fetch({
      url: '/article/column',
      method: 'get',
      parameter: ''
    }).then(result => {
      commit('SET_ARTICLE_COLUMN', result.data)
      return result
    })
  },
  GET_ARTICLE_COLUMN_LIST ({ commit, dispatch, state }, parameter) {
    // 获取文章
    return fetch({
      url: '/article-column/list',
      method: 'get',
      parameter: { params: parameter }
    }).then(result => {
      commit('SET_ARTICLE_COLUMN_LIST', result.data)
      return result
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
