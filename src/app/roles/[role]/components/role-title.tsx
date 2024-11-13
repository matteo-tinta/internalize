import { PageHeader } from "@/app/_components/page-header/page-header.component";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

const RoleHeading = () => {
  const { role } = useParams<{ role: string }>();

  return (
    <PageHeader 
      title={decodeURIComponent(role)}
      icon={faUserTie} 
    />
  );
}

export {
  RoleHeading
}