import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService //šo papildinām (kaut kāds circular dependency šeit. video tā teica)
        ) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler()); //kopēts no nestjs mājaslapas
        
        if(!roles){//kopēts no nestjs mājaslapas
            return true;
        }
        const request = context.switchToHttp().getRequest();
        
        const user: User = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;
                console.log(hasRole)
                if(hasRole()) {
                    //console.log('has role true') tikai lai nočekotu
                    hasPermission = true
                }
                return user && hasPermission;
            })
        )
        //return true; tiks mainīts, priekš kompilēšanas ieliekam pagaidām placeholder vērtību


    }
}
