import 'next-auth';

declare module 'next-auth' {
    interface User {
        id?: string;
        username?: string;
        role?: 'USER' | 'ADMIN';
    }

    interface Session {
        user: User;
    }
}
