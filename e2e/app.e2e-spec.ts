import { AngularProLevelPage } from './app.po';

describe('angular-pro-level App', () => {
  let page: AngularProLevelPage;

  beforeEach(() => {
    page = new AngularProLevelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
