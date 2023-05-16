const { generateId, generateDate } = require('./utils');
const books = require('./books');

//#region addBookHandler
const addBookHandler = (request, h) => {
  const { payload } = request;

  const initialData = {
    id: generateId(),
    finished: payload.readPage === payload.pageCount,
    insertedAt: generateDate(),
    updatedAt: this.insertedAt,
  };

  books.push({
    ...initialData,
    ...payload,
  });

  // 400
  // Client tidak melampirkan properti name pada request body.
  if (!payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // 400
  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
  if (payload.readPage > payload.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // 201
  const isSuccess = books
    .filter((book) => book.id === initialData.id)
    .length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: initialData.id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(500);
  return response;
};
//#endregion addBookHandler

//#region getAllBooksHandler
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let bookResult = books;

  if (name) {
    bookResult = bookResult.filter((book) => book.name
      .toLowerCase()
      .includes(name.toLowerCase()));
  }
  if (reading) {
    bookResult = bookResult.filter((book) => !!parseInt(reading) === book.reading);
  }
  if (finished) {
    bookResult = bookResult.filter((book) => !!parseInt(finished) === book.finished);
  }

  const response = h.response({
    status: 'success',
    data: { books: bookResult },
  });
  response.code(200);
  return response;
};
//#endregion getAllBooksHandler

//#region getBookByIdHandler
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const filteredBook = books.filter((book) => book.id === bookId)[0];

  if (filteredBook !== undefined) {
    return {
      status: 'success',
      data: {
        book: filteredBook,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
//#endregion getBookByIdHandler

//#region editBookByIdHandler
const editBookByIdHandler = (request, h) => {
  const { payload, params: { bookId } } = request;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  // 400
  // Client tidak melampirkan properti name pada request body.
  if (!payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // 400
  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
  if (payload.readPage > books[bookIndex].pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // 200
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      ...payload,
      updatedAt: generateDate(),
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
//#endregion editBookByIdHandler

//#region deleteBookByIdHandler
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
//#endregion deleteBookByIdHandler

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
