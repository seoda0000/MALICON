import React from "react";
import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function BasicModal({
  //   children,
  // }: PropsWithChildren<JSX.Element>): JSX.Element {
  children,
  open,
  setOpen,
}: any): JSX.Element {
  const onCloseModal = () => setOpen((prev: boolean) => !prev);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}

