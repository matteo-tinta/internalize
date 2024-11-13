"use client";

import { PageHeader } from "@/app/_components/page-header/page-header.component";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

const UserHeading = () => {
  const { id: userId } = useParams<{ id: string }>();

  return (
    <PageHeader 
      title={decodeURIComponent(userId)}
      icon={faUser} 
    />
  );
};

export { UserHeading };
