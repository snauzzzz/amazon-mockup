import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 9,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();

    let deliveryDate = today;
    
    let remainingDays = deliveryOption.deliveryDays;

    //Make sure that the delivery date isn't on the weekends
    while (remainingDays > 0) {

        deliveryDate = deliveryDate.add(
            1,
            'days'
        );
        
        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        };

    }

    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    return dateString;
}

export function isWeekend(deliveryDate) {
    const dateString = deliveryDate.day();
    return dateString === 6 || dateString === 0;
}