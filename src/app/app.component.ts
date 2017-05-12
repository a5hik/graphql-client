import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import * as faker from 'faker';

import gql from 'graphql-tag';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'graphql-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  users: any;
  sub: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.users = this.apollo.watchQuery<any>({
      query: gql`
        query {
          users {
            firstName
            lastName
            email
          }
        }
      `
    }).map(result => result.data.users);

    this.apollo.subscribe({
      query: gql`
        subscription {
          user(filter: { mutation_in: CREATED }) {
            node {
              id
              email
            }
          }
        }
      `
    }).subscribe((data) => {
      this.users.updateQuery((prev) => {
        const users = prev.users || [];

        return {
          ...prev,
          users: [...users, data.user.node]
        };
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub = undefined;
  }

  createRandomUser() {
    this.apollo.mutate({
      mutation: gql`
        mutation ($firstName: String!, $lastName: String!, $email: String!) {
          createUser(firstName: $firstName, lastName: $lastName, email: $email) {
            id
            firstName
            lastName
            email
          }
        }
      `,
      variables: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
      }
    }).toPromise();
  }

}
