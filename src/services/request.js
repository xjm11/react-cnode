import {get, post} from './httpRequst';

export const getHomeData = (params) => get('https://cnodejs.org/api/v1/topics', params);

export const getDataById = (params) => get(`https://cnodejs.org/api/v1/topic/${params.topic}`, params);

export const deCollectTopic = (params) => post('https://cnodejs.org/api/v1/topic_collect/de_collect', params);

export const collectTopic = (params) => post('https://cnodejs.org/api/v1/topic_collect/collect', params);

export const loginWithToken = (params) => post('https://cnodejs.org/api/v1/accesstoken', params);

export const getUserInfo = (params) => get('https://cnodejs.org/api/v1/user', params);