const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

// const Pug = db.define('pugs', {
//     name: Sequelize.STRING,
//     cute: Sequelize.BOOLEAN,
//     age: Sequelize.INTEGER,
//     bio: Sequelize.TEXT
//   })

const slugFunc = function(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
};

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING, // the page's title
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING, // a url-safe version of the page title, for links
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT, //	the page content
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed'), //	if the page is open or closed
});

Page.beforeValidate(page => {
  if (!page.slug) {
    page.slug = slugFunc(page.title);
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING, //	full name of the user
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING, // 	a unique, identifying email address
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { db, Page, User };
