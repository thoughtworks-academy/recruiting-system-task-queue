'use strict';



module.exports = {
  status: function(req, res) {
    res.send({'task-queue': 'connected'});
  }
};
