export const SITE_NAME='Odonto em Pauta';
export const SITE_URL=(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? 'https://'+process.env.VERCEL_URL:'http://localhost:3000')).replace(/\/$/,'');
export const url=(path:string)=>SITE_URL+path;
