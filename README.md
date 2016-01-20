# Off Canvas Menu plugin

This is a jQuery off-canvas menu plugin that works with Twitter Bootstrap.

### Usage

Usage is pretty simple. Toggle the menu using a button or link, making sure to Bootstrap's data-toggle: calapse, and set data-target to the menu element.

HTML:

    <!-- Toggle -->
    <button data-toggle="collapse" data-target="#my-off-canvas-menu">

    <!-- Menu -->
    <div id="my-off-canvas-menu">
        ... this will slide
    </>

JS:

    $('#my-off-canvas-menu').offcanvas({
        elements: ['#header', '#content'],
        direction: 'left'
    });

### Motivation

I had a specific use-case for off canvas menus – i.e. multiple on the page, explicitly set a number of "elements" which should "slide". There was nothing that would quite give me the flexibility I needed so I ended up creating this plugin.

### Installation

Provide code examples and explanations of how to get the project.

### API Reference

    $('#my-off-canvas-menu').offcanvas();

#### Options

* Elements: an array of jQuery selectors which will slide
* direction (string: 'left', 'right'): the direction of the slide

### Tests

Please see the /tests directory. 

The project uses Jasmine and Karma for all tests. You'll need to install node / bower dependancies

    npm install
    bower install

Run the tests using gulp:

    gulp test

### Contributors

Me, myself and I.

### License

MIT