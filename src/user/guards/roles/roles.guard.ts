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
    const user = await request.user.then((userr) =>{ return userr});
    if(!roles.includes(user.role)){
        return false;
    }
    if(user.role === "user" && user.id !== request.params.id) 
      return false;
    return true;
  }
}