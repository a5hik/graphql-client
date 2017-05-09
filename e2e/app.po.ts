import { browser, element, by } from 'protractor';

export class GraphqlClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('graphql-client-root h1')).getText();
  }
}
