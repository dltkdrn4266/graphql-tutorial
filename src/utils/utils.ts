import { LINKS_PER_PAGE } from '../constants/constants';

export const timeDifference = (current: number, previous: number): string => {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
        return 'just now';
    }

    if (elapsed < milliSecondsPerMinute) {
        return 'less than 1 min ago';
    }
    if (elapsed < milliSecondsPerHour) {
        return `${Math.round(elapsed / milliSecondsPerMinute)} min ago`;
    }
    if (elapsed < milliSecondsPerDay) {
        return `${Math.round(elapsed / milliSecondsPerHour)} h ago`;
    }
    if (elapsed < milliSecondsPerMonth) {
        return `${Math.round(elapsed / milliSecondsPerDay)} days ago`;
    }
    if (elapsed < milliSecondsPerYear) {
        return `${Math.round(elapsed / milliSecondsPerMonth)} months ago`;
    }
    return `${Math.round(elapsed / milliSecondsPerYear)} years ago`;
};

export const timeDifferenceForDate = (date: string | number | Date): string => {
    const now = new Date().getTime();
    const updated = new Date(date).getTime();
    return timeDifference(now, updated);
};

export const getQueryVariables = (
    isNewPage: boolean,
    page: number,
): { take: number; skip: number; orderBy: { createdAt: string } } => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = { createdAt: 'desc' };
    return { take, skip, orderBy };
};
