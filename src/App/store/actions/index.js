import {
  ADD_TO_TMP_LIST,
  CHANGE_ARTICLE_DISPOSITION,
  ERROR_API,
  REQUEST_API,
  RESET_ALL_SETTINGS,
  SET_ACTIVE_SITE,
  SET_CHECKBOX_VISIBILITY,
  SET_FONT_SIZE,
  SET_IN_CACHE,
  SET_NOTIFICATION_DATE,
  SET_PAGE,
  SET_TOP_ARTICLE,
  SET_TYPE,
  SUCCESS_API,
  TOGGLE_CAROUSEL,
  TRIGGER_PERSISTENCE,
  SET_TMP_LIST,
  TOGGLE_ALARM_VISIBILITY
} from '../constants';
import request from '../../config/api';

export const requestApi = (site, typeOfResult, pageNumber) => ({
  type: REQUEST_API,
  site,
  typeOfResult,
  pageNumber
});

export const setFontSize = value => ({
  type: SET_FONT_SIZE,
  value
});


export const successApi = (result, render) => ({
  type: SUCCESS_API,
  result,
  render
});

/**
 * @param error
 */
export const errorApi = error => ({
  type: ERROR_API,
  error
});

/**
 * @param result
 */
export const setInCache = result => ({
  type: SET_IN_CACHE,
  result
});

/**
 * @param articleType
 */
export const setType = articleType => ({
  type: SET_TYPE,
  articleType
});

/**
 * @param page
 */
export const setPage = (page = 1) => ({
  type: SET_PAGE,
  page
});

/**
 * @param visible
 */
export const showCheckbox = visible => ({
  type: SET_CHECKBOX_VISIBILITY,
  visible
});

/**
 * @param activeSite
 */
export const setActiveSite = activeSite => ({
  type: SET_ACTIVE_SITE,
  activeSite
});

/**
 * @param notificationDate
 */
export const setNotificationDate = notificationDate => ({
  type: SET_NOTIFICATION_DATE,
  notificationDate
});

/**
 * @param key
 * @type string
 * @param data
 * @type object
 */
export const persist = (key, data) => ({
  type: TRIGGER_PERSISTENCE,
  key,
  data
});

/**
 * @type string
 * @type object
 */
export const setTopArticle = topArticle => ({
  type: SET_TOP_ARTICLE,
  topArticle
});

/**
 * @param showCarousel
 */
export const setToggleCarousel = showCarousel => ({
  type: TOGGLE_CAROUSEL,
  showCarousel
});

export const changeArticleDisposition = () => ({
  type: CHANGE_ARTICLE_DISPOSITION,
});

export const addToTMPList = id => ({
  type: ADD_TO_TMP_LIST,
  id
});

export const setTmpArticleList = tmpArticleList => ({
  type: SET_TMP_LIST,
  tmpArticleList
});

export const toggleAlarmAction = () => ({
  type: TOGGLE_ALARM_VISIBILITY
});

/**
 * @param site
 * @param typeOfResult
 * @param pageNumber
 * @param render
 * @param action callback Action
 * @returns {function(*)}
 */
export const fetchApi = (
  site,
  typeOfResult,
  pageNumber,
  render = false,
  action = false
) => {
  return (dispatch) => {

    if (render) {
      dispatch(setPage(1));
    }

    dispatch(requestApi(site, typeOfResult, pageNumber));

    return request(site, typeOfResult, pageNumber)
      .then(({ data }) => data)
      .then(json => {
        if (action) {
          dispatch(action(json));
        } else {
          dispatch(successApi(json, render));
          dispatch(setType(typeOfResult));
        }
      })
      .catch(e => {
        console.log(e);
      })
  }
};

export const setDefaultSettings = () => ({
  type: RESET_ALL_SETTINGS
});