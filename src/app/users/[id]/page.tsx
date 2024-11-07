import { loadPageData } from "./actions";
import { UserPage } from "./components/user-page";

const Page = () => {
  return (
    <UserPage loadPageData={loadPageData} />
  )
};

export default Page;
