import { GraphqlClientPage } from './app.po';

describe('graphql-client App', () => {
  let page: GraphqlClientPage;

  beforeEach(() => {
    page = new GraphqlClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('graphql-client works!');
  });
});
