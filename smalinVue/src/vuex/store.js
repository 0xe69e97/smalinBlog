import * as TYPES from './mutation-types.js'

const state = {
    login: {
        user: null,
        isLogin: false
    },
    leftBarState: null,
    editArticle: false,
    getArticleId: {
        show: false,
        id: 0
    },
    showBar: false,
    title: '',  // 获取当前文章的标题，保存时自动填写上
    changeFlag: true, // 保存文章时，刷新文章列表所需要的监听变量
};

const mutations = {
    [TYPES.SET_LOGIN]:(state,login)=>{ state.login = login },
    [TYPES.SET_LEFTBARSTATE]:(state,leftBarState)=>{ state.leftBarState = leftBarState },
    [TYPES.SET_EDITARTICLE]:(state,editArticle)=>{ state.editArticle = editArticle },
    [TYPES.SET_GETARTICLEID]:(state,getArticleId)=>{ state.getArticleId = getArticleId },
    [TYPES.SET_SHOWBAR]:(state,showBar)=>{ state.showBar = showBar },
    [TYPES.SET_TITLE]:(state,title)=>{ state.title = title },
    [TYPES.SET_CHANGEFLAG]:(state,changeFlag)=>{ state.changeFlag = changeFlag },
};

const getters = {
    [TYPES.login]: ({ login }) => login,
    [TYPES.leftBarState]: ({ leftBarState }) => leftBarState,
    [TYPES.editArticle]: ({ editArticle }) => editArticle,
    [TYPES.getArticleId]: ({ getArticleId }) => getArticleId,
    [TYPES.showBar]: ({ showBar }) => showBar,
    [TYPES.title]: ({ title }) => title,
    [TYPES.changeFlag]: ({ changeFlag }) => changeFlag
};

const actions = {
    [TYPES.changelogin]: ({
        commit,
        getters
    }, login) => {
        commit(TYPES.SET_LOGIN, login);
    },
    [TYPES.changeleftBarState]: ({
        commit,
        getters
    }, leftBarState) => {
        commit(TYPES.SET_LEFTBARSTATE, leftBarState);
    },
    [TYPES.changeeditArticle]: ({
        commit,
        getters
    }, editArticle) => {
        commit(TYPES.SET_EDITARTICLE, editArticle);
    },
    [TYPES.changegetArticleId]: ({
        commit,
        getters
    }, getArticleId) => {
        commit(TYPES.SET_GETARTICLEID, getArticleId);
    },
    [TYPES.changeshowBar]: ({
        commit,
        getters
    }, showBar) => {
        commit(TYPES.SET_SHOWBAR, showBar);
    },
    [TYPES.changetitle]: ({
        commit,
        getters
    }, title) => {
        commit(TYPES.SET_TITLE, title);
    },
    [TYPES.changechangeFlag]: ({
        commit,
        getters
    }, changeFlag) => {
        commit(TYPES.SET_CHANGEFLAG, changeFlag);
    },
};

export default {
	state,
	mutations,
	getters,
	actions,
};