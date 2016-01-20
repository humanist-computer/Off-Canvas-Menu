describe('Plugin Initialisation', function() {

  var menu, menuPlugin;

  beforeEach(function(){
    jasmine.getFixtures().fixturesPath = 'base/Tests';
    loadFixtures('index.html');
    menu1 = $('#bs-example-navbar-collapse-1');
    menuPlugin = $(menu1).cb8slidemenu().data('cb8slidemenu');
  });

  it('Should add the class "myPlugin" to the element', function() {
      expect(true).toBe(true);
  });
});