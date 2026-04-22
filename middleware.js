export {default} from 'next-auth/middleware';

export const config = {
    matcher: ['/profile', '/properties/add', '/messages', '/properties/saved']
}