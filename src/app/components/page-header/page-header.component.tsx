import { faChevronLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/navigation"

type PageHeaderProps = {
  icon: IconDefinition,
  title: string
}

const PageHeader = (props: PageHeaderProps) => {
  const router = useRouter()
  const {
    icon, title
  } = props
  
  return (
    <section>
      <div className="bg-white py-4 px-7 shadow -mt-6 -ms-6 -me-6 z-[99]">
        <div className="leading-[1] text-accent flex items-center">
          <Link href={""} onClick={router.back}>
            <FontAwesomeIcon
              className="text-black me-4 text-2xl"
              icon={faChevronLeft}
            />
          </Link>

          <FontAwesomeIcon
            className="text-black me-4 text-2xl"
            icon={icon}
          />

          <h2 className="font-bold">
            <div className="text-black">{title}</div>
          </h2>
        </div>
      </div>
    </section>
  )
}

export {
  PageHeader
}