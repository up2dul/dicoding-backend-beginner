const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage';
    },
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Cannot access with that method request';
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About page';
    },
  },
  {
    method: '*',
    path: '/*',
    handler: (request, h) => {
      return 'Page not found';
    },
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, h) => {
      const { name = 'Stranger' } = request.params;
      const { lang } = request.query;

      if (lang === 'id') return `Halo ${name}`;
      return `Hello ${name}!`;
    },
  },
  {
    method: '*',
    path: '/about',
    handler: (request, h) => {
      return 'Cannot access with that method request';
    },
  },
];

module.exports = routes;
