// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAllBookingAction } from "../../redux/actions/GetAllBookingAction";

// const modalStyles = {
//   position: "fixed",
//   bottom: 0,
//   right: 100,
//   width: "400px",
//   height: "500px",
// };

// const ChatModal = ({ openChat, setOpenChat }) => {
//   const { getAllBooking } = useSelector((state) => state.getAllBookingResponse);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (openChat) {
//       const defautFormData = {
//         page: 1,
//         pageSize: 10,
//       };
//       dispatch(GetAllBookingAction(defautFormData));
//     }
//   }, [openChat]);

//   if (openChat) {
//     return (
//       <>
//         <div style={modalStyles} className="bg-success">
//           <div className="modal-dialog" style={{ margin: 0 }}>
//             <div className="modal-content" style={{ height: "500px" }}>
//               <div className="modal-header">
//                 <h5 className="modal-title text-white" id="exampleModalLabel">
//                   booking list
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setOpenChat(false)}
//                 ></button>
//               </div>
//               <div className="modal-body text-white  bg-success">
//                 <ol>
//                   {openChat.map((item, i) => {
//                     return <li>item</li>;
//                   })}
//                 </ol>
//               </div>
//               <div className="modal-footer"></div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return null;
// };

// export default ChatModal;
