'use strict';

import { AppRoutes } from './shared/endpoints.enum';
import { NavItem } from 'src/app/models/NavItem';

export const pwa = AppRoutes.PWA;
export const navQuotes = AppRoutes.QUOTE_LIST;
export const navCustomers = AppRoutes.CUSTOMER_LIST;
export const navCustomer = AppRoutes.CUSTOMER_DETAILS;
export const navProducts = AppRoutes.PRODUCT_LIST;
export const navRentals = AppRoutes.RENTAL_PRICING_LIST;
export const navTransport = AppRoutes.TRANSPORT_CHARGE_LIST;

export const navItems: NavItem[] = [
  {
    type: navQuotes,
    name: 'Quotes',
    icon: '',
    tab: navQuotes,
    route: `${pwa}${navQuotes}`,
    permissions: ['customer', 'staff', 'admin'],
  },
  {
    type: navCustomer,
    name: 'My Details',
    icon: '',
    tab: navCustomer,
    route: `${pwa}${navCustomer}`,
    permissions: ['customer'],
  },
  {
    type: navCustomers,
    name: 'Customers',
    icon: '',
    tab: navCustomers,
    route: `${pwa}${navCustomers}`,
    permissions: ['staff', 'admin'],
  },
  {
    type: navProducts,
    name: 'Products',
    icon: '',
    tab: navProducts,
    route: `${pwa}${navProducts}`,
    permissions: ['staff', 'admin'],
  },
  {
    type: navRentals,
    name: 'Rental Pricing',
    icon: '',
    tab: navRentals,
    route: `${pwa}${navRentals}`,
    permissions: ['staff', 'admin'],
  },
  {
    type: navTransport,
    name: 'Transport Charge',
    icon: '',
    tab: navTransport,
    route: `${pwa}${navTransport}`,
    permissions: ['staff', 'admin'],
  },
];
