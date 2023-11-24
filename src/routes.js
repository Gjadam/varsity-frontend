import Index from "./Pages/Index/Index"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Category from "./Pages/Category/Category"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import NotFound from "./Pages/NotFound/NotFound"
import Courses from "./Pages/Courses/Courses"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import Articles from "./Pages/Articles/Articles"
import ContactUs from "./Pages/ContactUs/ContactUs"
import Search from "./Pages/Search/Search"
import AdminPanel from "./Pages/AdminPanel/AdminPanel"
import Users from "./Pages/AdminPanel/Users/Users"
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses"
import Menus from "./Pages/AdminPanel/Menus/Menus"
import AdminArticles from "./Pages/AdminPanel/AdminArticles/AdminArticles"
import AdminCategory from "./Pages/AdminPanel/AdminCategory/AdminCategory"
import Contact from "./Pages/AdminPanel/Contact/Contact"
import Sessions from "./Pages/AdminPanel/Sessions/Sessions"
import Session from "./Pages/Session/Session"
import Comments from "./Pages/AdminPanel/Comments/Comments"
import Offs from "./Pages/AdminPanel/Offs/Offs"
import Draft from "./Pages/AdminPanel/AdminArticles/Draft/Draft"
import AdminPanelIndex from "./Pages/AdminPanel/AdminPanelIndex/AdminPanelIndex"
import UserPanel from "./Pages/UserPanel/UserPanel"
import UserPanelIndex from "./Pages/UserPanel/UserPanelIndex/UserPanelIndex"
import Orders from "./Pages/UserPanel/Orders/Orders"
import OrderDetail from "./Pages/UserPanel/Orders/OrderDetail/OrderDetail"
import UserPanelCourses from "./Pages/UserPanel/UserPanelCourses/UserPanelCourses"
import UserTicket from "./Pages/UserPanel/UserTicket/UserTicket"
import SendTicket from "./Pages/UserPanel/UserTicket/SendTicket/SendTicket"
import AnswerTicket from "./Pages/UserPanel/UserTicket/AnswerTicket/AnswerTicket"
import EditAccount from "./Pages/UserPanel/EditAccount/EditAccount"
import PAdminPrivate from "./Components/Private/PAdminPrivate"
import Tickets from "./Pages/AdminPanel/Tickets/Tickets"
import Discounts from "./Pages/AdminPanel/Discounts/Discounts"
import AboutUs from "./Pages/AboutUs/AboutUs"
const routes = [
  { path: '/', element: <Index /> },
  { path: '/course-info/:courseName', element: <CourseInfo /> },
  { path: '/:courseName/:sessionID', element: <Session /> },
  { path: '/category-info/:categoryName/:page', element: <Category /> },
  { path: '/article-info/:articleName', element: <ArticleInfo /> },
  { path: '/articles/:page', element: <Articles /> },
  { path: '/courses/:page', element: <Courses /> },
  { path: '/contact-us', element: <ContactUs /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/search/:value', element: <Search /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '*', element: <NotFound /> },

  {
    path: '/p-admin/*',
    element:
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>,
    children: [
      { path: '', element: <AdminPanelIndex /> },
      { path: 'users', element: <Users /> },
      { path: 'courses', element: <AdminCourses /> },
      { path: 'sessions', element: <Sessions /> },
      { path: 'menus', element: <Menus /> },
      { path: 'articles', element: <AdminArticles /> },
      { path: 'articles/draft/:shortName', element: <Draft /> },
      { path: 'category', element: <AdminCategory /> },
      { path: 'contacts', element: <Contact /> },
      { path: 'comments', element: <Comments /> },
      { path: 'offs', element: <Offs /> },
      { path: 'discounts', element: <Discounts /> },
      { path: 'tickets', element: <Tickets /> },
    ]
  },
  {
    path: '/my-account/*',
    element: <UserPanel />,
    children: [
      { path: '', element: <UserPanelIndex /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:orderID', element: <OrderDetail /> },
      { path: 'buyed', element: <UserPanelCourses /> },
      { path: 'ticket', element: <UserTicket /> },
      { path: 'ticket/send-ticket', element: <SendTicket /> },
      { path: 'ticket/answer/:id', element: <AnswerTicket /> },
      { path: 'edit-account', element: <EditAccount /> },
    ]
  },
]

export default routes