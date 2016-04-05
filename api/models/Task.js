var homeworkQuizzesStatus = require('../mixin/constant').homeworkQuizzesStatus;

module.exports = {

  attributes: {
    userAnswerRepo: {
      type: 'string'
    },
    status: {
      type: 'integer',
      defaultsTo: homeworkQuizzesStatus.LINE_UP
    },
    result: {
      type: 'string',
      defaultsTo: "正在排队,请稍后......"  //当前没有执行结果
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
