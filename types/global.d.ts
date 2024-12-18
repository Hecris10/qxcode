type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
