import { environment } from 'src/environments/environment';
export class EndPoints {
  // Authentication
  public static readonly LOGIN = 'portal/accounts/login/';
  public static readonly CURRENT_USER = 'portal/accounts/me/';

  public static readonly UPDATE = 'api/users/update';
  public static readonly USER_TYPES = '/api/user-types';
  public static readonly USER_ACCESS_TYPES = 'api/users/access-types';
}

export class AppRoutes {
  public static readonly LOGIN = 'login';
  public static readonly REGISTER = 'portal/accounts/register/user/';
  public static readonly FORGOT_PASSWORD = 'accounts/password_reset/';
  
  public static readonly DASHBOARD = '/';
}
