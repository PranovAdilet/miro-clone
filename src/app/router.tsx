import { createBrowserRouter } from "react-router";
import { redirect } from "react-router-dom";
import { App } from "./app";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.BOARDS,
        lazy: () => import("@/features/boards-list/boards-list.page"),
      },

      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },

      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },
    ],
  },
]);
