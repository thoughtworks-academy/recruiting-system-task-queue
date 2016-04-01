/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {
    homeworkURL: {
      type: 'string'
    },
    status: {
      type: 'integer'
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
    }
  }
};
