import { forwardRef, Ref } from "react"
import { Modal, ModalProps, ModalRef } from "./modal.component"

type SidewayModalProps = {
  onClose: ModalProps["onClose"]
  render: ModalProps["render"]
}

const SidewayModal = forwardRef((props: SidewayModalProps, ref: Ref<ModalRef>) => {
  return (
    <Modal 
      onClose={props.onClose}
      ref={ref} 
      backdropClassName="!justify-end"
      className="sideway-modal h-[100vh] w-[80vw] rounded-none"
      render={props.render} 
    />
  )
})

SidewayModal.displayName = "SidewayModal"

export {
  SidewayModal
}