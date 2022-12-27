import React from "react";
import { useSelector } from "react-redux";
import team from "../../assets/images/terms.png";
import profileIcon from "../../assets/images/profileIcon.png";
import pdfIcon from "../../assets/images/pdfIcon.png";
const ProfileDocList = () => {
  const { profileDetail } = useSelector((state) => state.getProfileDetail);

  function findExtention(url) {
    if (url) {
      let a = url;
      let b = a.split(".");
      let c = b.length - 1;
      let type = b[c];
      return type;
    }
    return url;
  }

  return (
    <>
      <div>
        <div className="name_section w-100 ">
          <div className="coach_name  d-flex justify-content-center align-items-center">
            <h4>Image</h4>
          </div>
          <div className="coach_name  d-flex justify-content-center align-items-center">
            <h4>DocId</h4>
          </div>

          <div className="coach_name  d-flex justify-content-center align-items-center">
            <h4>DocumentType</h4>
          </div>
          <div className="coach_name  d-flex justify-content-center align-items-center">
            <h4>Status</h4>
          </div>
        </div>
      </div>
      {profileDetail?.data?.documentsList?.map((item, i) => {
        return (
          <div>
            <div className="name_section w-100 ">
              <div className="coach_name  d-flex justify-content-center align-items-center">
                <img
                  src={
                    item.document
                      ? findExtention(item.document) === "pdf"
                        ? pdfIcon
                        : item.document
                      : profileIcon
                  }
                  onError={team}
                  alt="team"
                  height="50px"
                  width="50px"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="coach_name  d-flex justify-content-center align-items-center">
                <h4>{item.docId}</h4>
              </div>

              <div className="coach_name  d-flex justify-content-center align-items-center">
                <h4>{item.documentType}</h4>
              </div>
              <div className="coach_name  d-flex justify-content-center align-items-center">
                <h4>{item.status}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProfileDocList;
