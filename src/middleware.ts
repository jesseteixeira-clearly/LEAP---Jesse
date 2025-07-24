
import { NextRequest } from 'next/server';
import { checkSession } from './utils/auth';

export async function middleware(request: NextRequest) {

 
  const isUserLoggedIn = await checkSession(request)
 
  if(!isUserLoggedIn ) {
    return Response.redirect(new URL('/login', request.url));
  }


} 
//just protecting the dasboard to showcase it for now
export const config = {
  matcher: [ '/dashboard']  
}