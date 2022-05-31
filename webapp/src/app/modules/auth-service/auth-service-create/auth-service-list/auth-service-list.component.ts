import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-service-list',
  templateUrl: './auth-service-list.component.html',
  styleUrls: ['./auth-service-list.component.scss']
})
export class AuthServiceListComponent implements OnInit {
  filteredCollaboratorList = new MatTableDataSource();

  displayedCollaborator: string[] = [
    'collaborator',
    'admissionDate',
    'status',
    'icon',
  ];

  Collaborator: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createCollaborator() {
    this.router.navigate(['autorizacao/novo']);
  }

}
