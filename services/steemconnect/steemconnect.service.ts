const sc2 = require('steemconnect');

import getRefreshToken from './actions/getRefreshToken'
import vote from './actions/vote'
import comment from './actions/comment'

const dashboard = sc2.Initialize({
    app: process.env.STEEMCONNECT_ID,
    callbackURL: process.env.SC2_REDIRECT_DASHBOARD,
    scope: ['offline', 'login', 'vote', 'comment', 'comment_options', 'claim_reward_balance','delete_comment']
});

const blog = sc2.Initialize({
    app: process.env.STEEMCONNECT_ID,
    callbackURL: process.env.SC2_REDIRECT_BLOG,
    scope: ['login', 'vote', 'comment']
});

const sc = {
    dashboard,
    blog,
    getRefreshToken,
    vote,
    comment
}

export default sc;