import { PageHeader } from "@/app/components/page-header/page-header.component";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

const RoleHeading = () => {
  const { role } = useParams<{ role: string }>();

  return (
    <PageHeader 
      title={decodeURIComponent(role)}
      icon={faUserLock} 
    />
  );
}

export {
  RoleHeading
}