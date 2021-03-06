import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        const heroesIndex = [];

        let index;
        let acc = 0;
        while (acc < 4) {
          index = Math.abs(Math.ceil(Math.random() * heroes.length - 1));
          if (!heroesIndex.find(value => value === index)) {
            heroesIndex.push(index);
            this.heroes.push(heroes[index]);
            acc++;
          }
        }
      });
  }
}
