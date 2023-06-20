export interface User {
  id: any;
  username: string;
  role: string;
  isSuperuser?: boolean;
  isStaff?: boolean;
  groups?: any[];
  customer?: any;
}
