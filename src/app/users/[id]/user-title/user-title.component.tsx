"use client";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";

const UserHeading = () => {
  const { id: userId } = useParams<{ id: string }>();

  return (
    <section>
      <div className="bg-white py-4 px-7 shadow -mt-6 -ms-6 -me-6 z-[99]">
        <p className="leading-[1] text-accent flex items-center">
          <Link href={"/users"}>
            <FontAwesomeIcon
              className="text-blue-950 me-4 text-2xl"
              icon={faChevronLeft}
            />
          </Link>

          <FontAwesomeIcon
            className="text-blue-950 me-4 text-2xl"
            icon={faUser}
          />

          <h2 className="font-bold">
            <div className="text-blue-950">{decodeURIComponent(userId)}</div>
          </h2>
        </p>
      </div>
    </section>
  );
};

export { UserHeading };
