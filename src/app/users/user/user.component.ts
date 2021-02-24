import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],   // if you know for sure that this component does not need to 
      name: this.route.snapshot.params['name']// be reloaded from this same componet to update values then 
    };                                        // you dont need to subscribe as show below
    this.paramsSubscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe(); // its not necessary but since normally when a compoenent lifecycle ends the subscricption doesnt
                                           // have to. so its best to unsbuscribe from a subscription in ngOnDestroy()
  }

}