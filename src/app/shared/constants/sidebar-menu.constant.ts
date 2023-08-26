import { SidebarMenu } from '../interfaces/sidebar-menu.interface';

export const SIDEBAR_MENU: SidebarMenu[] = [
  {
    id: 1,
    menu_th: 'หน้าหลัก',
    menu_en: 'Home Management',
    icon: 'pi-chart-bar',
    router: '/dashboard',
  },
  {
    id: 2,
    menu_th: 'อู่รถเมล์',
    menu_en: 'Management Management',
    icon: 'pi-th-large',
    router: '/bus-depot',
  },
  {
    id: 2,
    menu_th: 'กองปฏิบัติการเดินรถ',
    menu_en: 'Management Management',
    icon: 'pi-building',
    router: '/bus-division',
  },
  {
    id: 4,
    menu_th: 'ประเภทรถเมล์',
    menu_en: 'Warehouse Management',
    icon: 'pi-sliders-v',
    router: '/bus-type',
  },
  {
    id: 2,
    menu_th: 'ราคาตั๋วรถเมล์',
    menu_en: 'Management Management',
    icon: 'pi-money-bill',
    router: '/fare',
  },
  {
    id: 2,
    menu_th: 'สายรถเมล์',
    menu_en: 'Management Management',
    icon: 'pi-sitemap',
    router: '/bus-lines',
  },
  {
    id: 2,
    menu_th: 'ท่ารถเมล์',
    menu_en: 'Management Management',
    icon: 'pi-truck',
    router: '/bus-terminal',
  },
  {
    id: 3,
    menu_th: 'รายการรถเมล์',
    menu_en: 'Import Management',
    icon: 'pi-car',
    router: '/bus-vehicle',
  },

  {
    id: 5,
    menu_th: 'ผู้ใช้งาน',
    menu_en: 'Export Management',
    icon: 'pi-users',
    router: '/user',
  },
  {
    id: 6,
    menu_th: 'สิทธ์การใช้งาน',
    menu_en: 'Setting',
    icon: 'pi-verified',
    router: '/role'
  },

];
