const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handler');

const routes = [
  // add Book
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // get all Books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // get Book detail by id
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  // edit Book by id
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
  // delete Book by id
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
