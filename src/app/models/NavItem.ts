export interface NavItem {
  type: string;
  name: string;
  icon?: string;
  tab?: string;
  route: string;
  permissions: string[];
}
