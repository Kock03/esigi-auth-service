import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidateTokenComponent implements OnInit {
  token!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('id')!;

    if (!this.token) {
      location.replace(environment.portal);
    } else {
      localStorage.setItem('token', this.token);
      this.router.navigate(['/autorizacao/lista']);
    }
  }
}
