import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';
import { ReactComponent as IconProduct } from '../../assets/svg/icon_product.svg';
import { ReactComponent as IconVoucher } from '../../assets/svg/icon_voucher.svg';

const SidebarAdminData = [
  {
    id: 1,
    title: 'Voucher',
    path: '/admin/voucher/list',
    icon: IconVoucher,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Buat voucher',
        path: '/admin/voucher/new',
        icon: IconVoucher,
      },
      {
        title: 'Daftar voucher',
        path: '/admin/voucher/list',
        icon: IconVoucher,
      },
    ],
  },
  {
    id: 2,
    title: 'Kategori',
    path: '/admin/category/list',
    icon: IconProduct,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Daftar kategori',
        path: '/admin/category/list',
        icon: IconProduct,
      },
      {
        title: 'Buat kategori',
        path: '/admin/category/new',
        icon: IconProduct,
      },
    ],
  },
];

export default SidebarAdminData;
