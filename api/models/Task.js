var homeworkQuizzesStatus = require('../mixin/constant').homeworkQuizzesStatus;

module.exports = {

  attributes: {
    homeworkURL: {
      type: 'string'
    },
    status: {
      type: 'integer',
      defaultsTo: homeworkQuizzesStatus.LINE_UP
    },
    version: {
      type: 'string'
    },
    branch: {
      type: 'string'
    },
    commitTime: {
      type: 'integer'
    },
    homeworkDetail: {
      type: 'string'
    },
    callbackURL: {
      type: 'string'
    }
  }
};
