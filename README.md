# frankbosma.nl

The repository for [frankbosma.nl](http://frankbosma.nl)

## Installation
Use `git clone --recursive` to install this repository including the submodule
[Responsive](https://github.com/responsivebp/responsive), which I'm using as
 a SASS responsive grid framework.


### prerequisites
Frankbosma.nl uses [Jekyll](http://jekyllrb.com/) to generate pages and 
[GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/)
for image resizing through the [gulp-image-resize](https://www.npmjs.org/package/gulp-image-resize) plugin.
Install Jekyll and one of the magicks, preferably GraphicsMagick.
I'm also using [NPM](https://www.npmjs.org), [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/), so install them as well
if not already available.

### then
After installing NodeJS, NPM, Jekyll, an image tool, Gulp and Bower, use `npm install`, `bower install` and `gulp install`
respectively to install all prerequisites.

Use `gulp watch` to start an ExpressJS server on [localhost:4000](http://localhost:4000),
a [livereload](https://github.com/vohof/gulp-livereload) server and automatically
generated CSS and HTML through SASS and Jekyll. Or use `gulp serve` to just serve up the site.