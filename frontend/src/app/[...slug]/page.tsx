import { fetchAPI } from "../utils/fetch-api";
import { sectionRenderer } from "../utils/section-renderer";

export default async function Page({ params }: { params: { slug: string } }) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const slug: string = params.slug[0];
  const path = `/pages`;
  const urlParamsObject = { filters: { slug } };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  const data = response.data[0].attributes.contentSections;
  // console.log(data)
  return data.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}

