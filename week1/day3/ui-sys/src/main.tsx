import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router";
import ButtonPages from "./day4/button_page.tsx";
import SeachFieldPage from "./day4/seach_field_page.tsx";
import CardPage from "./day4/card_page.tsx";
import ReactList02 from "./samples/react_list02.tsx";
import StatePractice from "./samples/state_practice.tsx";
import Day5 from "./day5/day5.tsx";
import Day6Homework from "./day6/day6homework.tsx";
import Day6Practice from "./day6/day6practice.tsx";
import Day5Homework3 from "./day5/day5_homework3.tsx";
import Day5Homework2 from "./day5/day5_homework2.tsx";
import Day5Homework1 from "./day5/day5_homework1.tsx";
import NotFound from "./pages/not_found.tsx";
import Welcome from "./pages/welcome.tsx";
import Day7Practice from "./day7/day7practice.tsx";
import Products from "./day7/pages/products.tsx";
import ProductList from "./day7/widgets/product_list.tsx";
import HomePage from "./day7/pages/home_page.tsx";
import Paging from "./day7/pages/paging.tsx";
import Day7Homework from "./day7/day7homework.tsx";
import Day9Practice1 from "./day9/practice1/day9_practice1";
import Home1 from "./day9/practice1/home1.tsx";
import { StrictMode } from "react";
import Day9Practice2 from "./day9/practice2/day9_practice2.tsx";
import SignInDay9 from "./day9/practice1/signin_day9.tsx";
import RegisterDay9 from "./day9/practice1/register_day9.tsx";
import Day9Practice3 from "./day9/practice3/day8_practice3.tsx";
import HomeworkDay9 from "./day9/homework/homework_day9.tsx";
import Day10Practice from "./day10_practice/day10_practice.tsx";
import LoginDay10 from "./day10_practice/login_day10.tsx";
import WorkspacePage from "./day10_practice/workspace_page.tsx";
import {
  getLocalUser,
  login,
  setLocalUser,
} from "./day10_practice/api/index.tsx";
import ListDay10 from "./day10_practice/page/list_day10.tsx";
import CreateTaskDay10 from "./day10_practice/page/create_day10.tsx";

export const navData: string[] = [
  "day3-btns",
  "day3-search-fields",
  "day3-cards",
  "day4",
  "day4-2",
  "day5",
  "day5homework1",
  "day5homework2",
  "day5homework3",
  "day6",
  "day6homework",
  "day7practice",
  "day7homework",
  "day9practice1",
  "day9practice2",
  "day9practice3",
  "day9homework",
  "day10practice",
];

export const day7homeworkRoutes: RouteObject[] = [
  {
    path: "patient",
    element: <h1>Patient Page</h1>,
  },
  {
    path: "overview",
    element: <h1>Overview Page</h1>,
  },
  {
    path: "map",
    element: <h1>Map Page</h1>,
  },
  {
    path: "doctors",
    element: <h1>Doctors Page</h1>,
  },
  {
    path: "departments",
    element: <h1>Departments Page</h1>,
  },
  {
    path: "history",
    element: <h1>History Page</h1>,
  },
  {
    path: "settings",
    element: <h1>Settings Page</h1>,
  },
];

export const day7Routes: RouteObject[] = [
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "products",
    element: <Products />,
    children: [
      {
        path: ":cat_id",
        element: <ProductList />,
        children: [
          {
            path: "page/:page",
            element: <Paging />,
          },
        ],
      },
    ],
  },
  {
    path: "categories",
    element: <h1>Categories Page</h1>,
  },
  {
    path: "blog",
    element: <h1>Blog Page</h1>,
  },
  {
    path: "login",
    element: <h1>Login Page</h1>,
  },
  {
    path: "customer",
    element: <h1>Customer Page</h1>,
  },
];

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/day3-btns",
        element: <ButtonPages />,
      },
      {
        path: "/day3-search-fields",
        element: <SeachFieldPage />,
      },
      {
        path: "/day3-cards",
        element: <CardPage />,
      },
      {
        path: "/day4",
        element: <ReactList02 />,
      },
      {
        path: "/day4-2",
        element: <StatePractice />,
      },
      {
        path: "/day5",
        element: <Day5 />,
      },
      {
        path: "/day5homework1",
        element: <Day5Homework1 />,
      },
      {
        path: "/day5homework2",
        element: <Day5Homework2 />,
      },
      {
        path: "/day5homework3",
        element: <Day5Homework3 />,
      },
      {
        path: "/day6",
        element: <Day6Practice />,
      },
      {
        path: "/day6homework",
        element: <Day6Homework />,
      },
      {
        path: "/day7practice",
        element: <Day7Practice />,
        children: day7Routes,
      },
      {
        path: "/day7homework",
        element: <Day7Homework />,
        children: [
          {index: true, element: <Navigate to="patient" />},
          ...day7homeworkRoutes],
      },
      {
        path: "/day9practice1",
        element: <Day9Practice1 />,
        children: [
          {
            index: true,
            element: <Home1 />,
          },
          {
            path: "login/:email",
            element: <SignInDay9 />,
          },
          {
            path: "register/:email",
            element: <RegisterDay9 />,
          },
          {
            path: "register",
            element: <RegisterDay9 />,
          },
        ],
      },
      {
        path: "/day9practice2",
        element: <Day9Practice2 />,
      },
      {
        path: "/day9practice3",
        element: <Day9Practice3 />,
      },
      {
        path: "/day9homework",
        element: <HomeworkDay9 />,
      },
      {
        path: "/day10practice",
        element: <Day10Practice />,
        loader: async () => {
          const localUser = getLocalUser();
          if (localUser) {
            const response = await login(localUser.email, localUser.password);
            if (response.ok) {
              const userData = await response.json();
              setLocalUser({
                ...userData.loggedInUser,
                accessToken: userData.access_token,
              });
              return userData;
            }
          }
          return null;
        },
        children: [
          {
            path: "login",
            element: <LoginDay10 />,
          },
          {
            path: "workspace",
            element: <WorkspacePage />,
            children: [
              {
                index: true,
                element: <Navigate to="list" />,
              },
              {
                path: "list",
                element: <ListDay10 />,
              },
              {
                path: "create",
                element: <CreateTaskDay10 />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
