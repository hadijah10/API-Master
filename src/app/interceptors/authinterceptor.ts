import { HttpResponse,HttpInterceptorFn,HttpRequest,HttpHandlerFn } from "@angular/common/http"
import { environment } from "../../environments/environment.development"
import { tap } from "rxjs";

export const Authinterceptor: HttpInterceptorFn=(req: HttpRequest<unknown>, next: HttpHandlerFn)=>{
if (req.url.includes(`${environment.apiUrl}/posts`)){
    const token= localStorage.getItem('authtoken');
    if(token){
        const authReq = req.clone({
            setHeaders: {Authorization: `Bearer ${token}`},
            headers: req.headers.append('X-Authentication-Token', token),
        });
        return next(authReq)
    }
}
return next(req)
}
