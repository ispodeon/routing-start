import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id']; // IMPORTANT to make sure the id you are getting is a number so you use the '+' in front to cast to number
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']); // this will work
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); // relative since we want the router to append to current route
  }                                                                                            // you can use 'merge' instead of 'preserve' if you want to merge the current params with new route
                                                                                               // 'preserve' maintains the old params for the new route

}
