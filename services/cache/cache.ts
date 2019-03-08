import getArticle from './actions/articles/getArticle';
import getFeaturedArticles from './actions/articles/getFeaturedArticles';
import getLatestArticles from './actions/articles/getLatestArticles';
import getLatestFromCategory from './actions/articles/getLatestFromCategory';
import setArticle from './actions/articles/setArticle';
import removeArticle from './actions/articles/removeArticle';
import setArticleNotExist from './actions/articles/setArticleNotExist';
import setArticleExist from './actions/articles/setArticleExist';
import ifArticleExist from './actions/articles/ifArticleExist';
import getBlog from './actions/blogs/getBlog';
import setBlog from './actions/blogs/setBlog';
import setUserRegistered from './actions/users/setUserRegistered';
import isUserRegistered from './actions/users/isUserRegistered';

export {
    getArticle,
    getBlog,
    getFeaturedArticles,
    ifArticleExist,
    getLatestArticles,
    getLatestFromCategory,
    setBlog,
    setArticle,
    setArticleNotExist,
    setArticleExist,
    removeArticle,
    setUserRegistered,
    isUserRegistered
}