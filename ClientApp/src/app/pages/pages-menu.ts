import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Master',
    icon: 'nb-locked',
    children: [
      {
        title: 'Risk Indicator',
        link: '/pages/master/risk-indicator',
      },
      {
        title: 'Risk Matriks Indicator',
        link: '/pages/master/risk-mastriks-indicator',
      },
    ],
  },
 
];
