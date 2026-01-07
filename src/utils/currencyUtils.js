// src/utils/currency.js

import { getUserInfo } from "./user";

// 1. Sirf yeh EK function banayein:
export function formatCurrency(amount) {
    // 2. User ki currency nikalein
    const userData = getUserInfo();
    let currency = 'USD'; // Default

    if (userData) {
        try {
            const user = userData;
            currency = user.currency || 'USD';
        } catch (error) {
            console.log('Error parsing user data');
        }
    }

    // 3. Symbol set karein
    let symbol = '$'; // Default PKR

    if (currency === 'INR') {
        symbol = '₹';
    } else if (currency === 'USD') {
        symbol = '$';
    } else if (currency === 'PKR') {
        symbol = 'Rs';
    }

    // 4. Return karein symbol + amount
    return `${symbol} ${amount.toLocaleString()}`;
}