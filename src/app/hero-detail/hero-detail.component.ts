import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-25%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 1, transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (Number.isNaN(id)) { return; }

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

}
