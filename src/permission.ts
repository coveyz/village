import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style
import router from "@/router";
import {
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteRecordRaw,
} from "vue-router";
import { useStore } from "@/store";
import { getToken } from "@/utils/auth";
import { getPageTitle } from "@/utils/box";

NProgress.configure({ showSpinner: false });

const whiteList = ["/user/login", "/user/register", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    NProgress.start();
    document.title = getPageTitle(to.meta.title as string);

    const hasToken = getToken();

    if (hasToken) {
      if (to.path === "/user/login" || to.path === "/user/register") {
        next({ path: "/" });
        NProgress.done();
      } else {
        const store = useStore();
        const hasPermissionList = store.getters.permission_list;

        if (hasPermissionList && hasPermissionList.length) {
          next();
        } else {
          try {
            const permission_list = await store.dispatch(
              "user/getPermissionList"
            );
            const accessRoutes: RouteRecordRaw[] = await store.dispatch(
              "permission/generateRoutes",
              permission_list
            );

            console.log('accessRoutes???', accessRoutes)
            accessRoutes.forEach((route: RouteRecordRaw) => {
              router.addRoute(route);
            });
            next({ ...to, replace: true });
          } catch (error) {
            console.log('permission->catch=>', error)
            store.dispatch("user/resetToken");
            next("/user/login");
            NProgress.done();
          }
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next();
      } else {
        next({ path: "/user" });
        NProgress.done();
      }
    }
  }
);

router.afterEach(() => {
  NProgress.done();
});
