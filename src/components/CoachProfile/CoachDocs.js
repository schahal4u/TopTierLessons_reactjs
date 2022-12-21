import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PhotoUploadAction,
  updateFileAction,
  UploadDocumentAction,
} from "../../redux/actions/UploadPhoto";
import team from "../../assets/images/terms.png";
import ProfileDocList from "./ProfileDocList";
import pdfIcon from "../../assets/images/pdfIcon.png";
const CoachDocs = () => {
  const { uploadFile } = useSelector((state) => state.uploadFile);
  const { profileDetail } = useSelector((state) => state.getProfileDetail);

  const [preview, setPreview] = useState({ Roster: "", IdProof: "" });

  const dispatch = useDispatch();

  const uploadHandler = (e) => {
    let data = new FormData();
    data.append("file", e.target.files[0]);
    dispatch(updateFileAction(data));
  };

  const previewHandler = (e, url) => {
    e.preventDefault();
    window.open(url);
  };

  useEffect(() => {
    if (uploadFile?.data?.url) {
      let a = uploadFile?.data?.url;
      let b = a.split(".");
      let c = b.length - 1;
      let type = b[c];

      if (type === "pdf") {
        setPreview({ ...preview, Roster: a });
      }

      if (type === "png" || type === "jpg" || type === "jpeg") {
        setPreview({ ...preview, IdProof: a });
      }
    }
  }, [uploadFile]);

  // useEffect(() => {
  //   if (profileDetail?.data?.documentsList) {
  //     profileDetail?.data?.documentsList?.map((item, i) => {
  //       if (Object.keys(preview).find((key) => key == item.documentType)) {
  //         setPreview({ ...preview, [item.documentType]: item.document });
  //       }
  //     });
  //   }
  // }, [profileDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    let docList = [
      {
        document: preview.Roster,
        documentType: 1,
      },
      {
        document: preview.IdProof,
        documentType: 2,
      },
    ];
    if (preview.Roster || preview.IdProof) {
      dispatch(UploadDocumentAction({ docList }));
    }
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="row py-4 ">
            <div className=" col-sm-12 col-md-5 ">
              <label for="formFile" className="form-label">
                Roaster
              </label>
              <input
                className="form-control form-control-md"
                type="file"
                id="formFile"
                accept="application/pdf"
                onChange={(e) => uploadHandler(e)}
              />
            </div>
            <div className="col-sm-12 col-md-5 ">
              <label for="formFile" className="form-label">
                Id Proof
              </label>
              <input
                className="form-control form-control-md"
                type="file"
                id="formFile"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => uploadHandler(e)}
              />
            </div>
            <div className="col-sm-12 col-md-2 d-flex justify-content-center align-items-end">
              <button
                className="btn btn-success"
                onClick={(e) => submitHandler(e)}
              >
                submit
              </button>
            </div>
          </div>

          {(preview.Roster || preview.IdProof) && (
            <div className="row py-4">
              <div className="col-sm-12 col-md-5">
                {preview.Roster && (
                  <div className="d-flex justify-content-starts align-items-center">
                    {/* <iframe
                      src={`${preview.Roster}`}
                      height="150px"
                      width="150px"
                      scrolling="no"

                      //   style={{ overflowY: "hidden" }}
                    ></iframe> */}
                    <img
                      src={preview.Roster && pdfIcon}
                      className="mx-2"
                      height="100"
                      width="100px"
                    />
                    <button
                      className="btn mx-2"
                      style={{ background: "#e38226" }}
                      onClick={(e) => previewHandler(e, preview.Roster)}
                    >
                      <i className="fa fa-eye text-white"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="col-sm-12 col-md-5">
                {preview.IdProof && (
                  <div className="d-flex justify-content-starts align-items-center">
                    <img
                      src={preview.IdProof}
                      className="mx-2"
                      height="100"
                      width="100px"
                    />
                    <button
                      className="btn mx-2"
                      style={{ background: "#e38226" }}
                      onClick={(e) => previewHandler(e, preview.IdProof)}
                    >
                      <i className="fa fa-eye text-white"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <ProfileDocList />
        </form>
      </div>
    </>
  );
};

export default CoachDocs;
