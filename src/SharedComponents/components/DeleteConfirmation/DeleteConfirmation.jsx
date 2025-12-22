import React from "react";
import notFoundImg from "../../../assets/images/notFoundImg.png";

export default function DeleteConfirmation({
  show,
  onClose,
  onConfirm,
  deletedElement = "item",
}) {
  if (!show) return null;
  console.log("show",show)

  return (
    <>
      <div className="modal fade show d-block" tabIndex="1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="d-flex justify-content-end me-4 mt-4 ">
              <button className="btn-close text-danger border border-4 border-danger rounded-circle p-2" onClick={onClose} ></button>
            </div>

            <div className="modal-body text-center">
              <img src={notFoundImg} alt="" className="mb-3" />
              <h5>Delete this {deletedElement}?</h5>
              <p>
                Are you sure you want to delete this {deletedElement}?
                This action cannot be undone.
              </p>
            </div>

            <div className="modal-footer">
             
              <button className="btn  border-2  delete_btn" onClick={onConfirm}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
