import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string;
}
/* resolver loads the data before routing */
@Injectable()
export class ServerResolver implements Resolve<Server> { // 'Resolve' is a generic type and wraps the item or type that we will fetch

    constructor(private serverService: ServersService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server>| Promise<Server> | Server {
        return this.serverService.getServer(+route.params['id']);
    }
}