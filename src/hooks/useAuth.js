import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const token =  JSON.parse(localStorage.getItem('token'));
            if (!token) {
                setIsExpired(true); // No token found, mark as expired
                return;
            }

            try {
                const decodedToken = jwtDecode(token); // Using the 'decode' function
                const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds

                if (Date.now() > expirationTime) {
                    setIsExpired(true); // Token expired
                } else {
                    setIsExpired(false); // Token is valid
                }
            } catch (error) {
                setIsExpired(true); // If decoding fails, treat it as expired
            }
        };

        checkToken();
    }, []);

    return { isExpired };
};
