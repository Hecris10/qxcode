type SearchParamsNotPromise = { [key: string]: string | string[] | undefined };
type ParamsNotPromise = { slug: string };

type Params = Promise<ParamsNotPromise>;
type SearchParams = Promise<SearchParamsNotPromise>;

type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
