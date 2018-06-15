const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h1>USER</h1>');
});

router.post('/', (req, res, next) => {
  res.send('<h1>UserPOST</h1>');
});

// router.get('/add', (req, res, next) => {
//   res.send('<h1>User GET/ADD</h1>');
// });
module.exports = router;
