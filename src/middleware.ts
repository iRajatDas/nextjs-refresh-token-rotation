import { chain } from "./middlewares/chain";
import { withInitializeResponse } from "./middlewares/initialize-response";
import { withAuth } from "./middlewares/with-auth";
import { withRoleBasedAuth } from "./middlewares/with-role-based-auth";

export default chain([withInitializeResponse, withAuth, withRoleBasedAuth]);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
