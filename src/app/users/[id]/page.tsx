"use client";

import { loadPageData } from "./actions";
import { UserPage } from "./user-page";

const Page = () => {
  return (
    <UserPage loadPageData={loadPageData} />
  )
};

export default Page;
