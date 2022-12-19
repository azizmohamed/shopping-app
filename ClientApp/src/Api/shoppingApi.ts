import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postOrderCalculate: build.mutation<
      PostOrderCalculateApiResponse,
      PostOrderCalculateApiArg
    >({
      query: (queryArg) => ({
        url: `/Order/calculate`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postOrderPlace: build.mutation<
      PostOrderPlaceApiResponse,
      PostOrderPlaceApiArg
    >({
      query: (queryArg) => ({
        url: `/Order/place`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getProduct: build.query<GetProductApiResponse, GetProductApiArg>({
      query: (queryArg) => ({
        url: `/Product`,
        params: { page: queryArg.page, count: queryArg.count },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as shoppingApi };
export type PostOrderCalculateApiResponse =
  /** status 200 Success */ OrderAmount;
export type PostOrderCalculateApiArg = {
  body: OrderProduct[];
};
export type PostOrderPlaceApiResponse = /** status 200 Success */ Order;
export type PostOrderPlaceApiArg = {
  body: OrderProduct[];
};
export type GetProductApiResponse = /** status 200 Success */ Product[];
export type GetProductApiArg = {
  page?: number;
  count?: number;
};
export type OrderAmount = {
  shipping?: number;
  total?: number;
  amount?: number;
};
export type OrderProduct = {
  productId?: string;
  orderId?: string;
  quantity?: number;
};
export type Order = {
  id?: string;
  orderProducts?: OrderProduct[] | null;
};
export type Product = {
  id?: string;
  name?: string | null;
  price?: number;
  description?: string | null;
  orderProducts?: OrderProduct[] | null;
  thumbnail?: string | null;
};
export const {
  usePostOrderCalculateMutation,
  usePostOrderPlaceMutation,
  useGetProductQuery,
} = injectedRtkApi;
