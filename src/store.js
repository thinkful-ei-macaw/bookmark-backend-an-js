const uuid = require('uuid/v4')

const bookmarks =
[{         
    id: uuid(),
    title: 'Aaaa',
    url: `https://courses.thinkful.com/ei-node-postgres-v1/checkpoint/9`,
    description: 'Aaaa',
    rating: 4, 
}]


module.exports = { bookmarks }