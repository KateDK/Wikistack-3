const express = require('express');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('<h1>WIKI</h1>');
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const page = await Page.findOne({
    where: { slug: req.params.slug },
  });
  res.send(wikiPage(page));
});

module.exports = router;
