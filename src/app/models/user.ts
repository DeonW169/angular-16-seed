export interface User {
  id: any;
  username: string;
  isSuperuser?: boolean;
  isStaff?: boolean;
  groups?: any[];
  customer?: any;
}
