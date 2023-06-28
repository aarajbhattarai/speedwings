export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options:Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export const getMenuItems = async () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  );

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const menuRes = await fetch(
    `${getStrapiURL("/api/navbar-sections?populate=%2A")}`,
    requestOptions
  );

  const menuItems = await menuRes.json();
  return menuItems;
};

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));
