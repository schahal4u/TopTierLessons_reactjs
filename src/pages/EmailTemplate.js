import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailTemplateAction } from "../redux/actions/EmailTemplateAction";

const EmailTemplate = () => {
  const { emailTemplate } = useSelector((state) => state.emailTemplateReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bookingId: 0,
    bookingStatus: 0,
    coachId: 0,
  });

  useEffect(() => {
    let obj = {
      bookingId: 0,
      bookingStatus: 1,
      coachId: null,
    };
    dispatch(EmailTemplateAction(obj));
  }, []);

  return (
    <div>
      emailTemplate
      <p>{}</p>
      <button>Accept</button>
      <button>Declined</button>
    </div>
  );
};
export default EmailTemplate;
