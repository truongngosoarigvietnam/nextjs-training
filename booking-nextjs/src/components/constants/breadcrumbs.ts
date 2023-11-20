import { BreadcrumbsItem } from '../Breadcrumbs';
import { pageRouters } from './router';

interface BreadcrumbsData {
    [key: string]: BreadcrumbsItem;
}

export const breadcrumbsData: BreadcrumbsData = {
    [pageRouters.DOCTOR]: {
        href: pageRouters.DOCTOR,
        name: 'Doctors',
        current: false,
    },
    [pageRouters.DOCTOR_DETAIL('2')]: {
        href: pageRouters.DOCTOR_DETAIL('2'),
        name: 'Detail',
        current: false,
    },
};
