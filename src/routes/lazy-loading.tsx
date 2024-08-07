import { lazy } from 'react';

export const Catalog = lazy(() => import('@/pages/catalog-page'));
export const Product = lazy(() => import('@/pages/product-page'));
export const Cart = lazy(() => import('@/pages/cart-page'));
export const About = lazy(() => import('@/pages/about-page'));
export const Main = lazy(() => import('@/pages/main-page'));
export const NotFound = lazy(() => import('@/pages/not-found-page'));
