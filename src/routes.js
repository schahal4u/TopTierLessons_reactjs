export const routes = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About Us",
    path: "/about",
  },
  {
    id: 3,
    name: "Contact Us",
    path: "/contactUs",
  },
];
export const coachRoutes = [
  {
    id: 4,
    name: "Booking",
    path: "/bookingList",
    coachType: 2,
  },
  {
    id: 5,
    name: "Slots",
    path: "/bookingslot",
    coachType: 2,
  },
  {
    id: 6,
    name: "Chats",
    path: "/conversation",
    coachType: 2,
  },
];

export const navbarMenu1 = [...routes];
export const navbarMenu2 = [...navbarMenu1, ...coachRoutes];
export const navbarMenu3 = [...navbarMenu1];
