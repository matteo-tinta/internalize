import { loadPageData } from "./actions";
import { UserPage } from "./_components/user-page";

const Page = () => {
  return (
    <UserPage loadPageData={loadPageData} />
  )
};

export default Page;
