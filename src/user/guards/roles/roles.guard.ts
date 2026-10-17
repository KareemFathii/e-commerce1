import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from "../../decorators/roles.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext,):  Promise<boolean>  {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) 
    return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const UserRole  = await user.then((userr) =>{ return userr.role});  
    if(!roles.includes(UserRole)){
        return false;
    }
    return true;
  }
}