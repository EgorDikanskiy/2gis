export const routerUrls = {
  root: '/',
  detail: {
    mask: '/detail/:id',
    create: (id: number) => `/detail/${id}`,
  },
};
