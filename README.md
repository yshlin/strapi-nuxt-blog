# Strapi-Nuxt blog
A full-featured blogware based on [JAMSTACK](https://jamstack.org/) ([Strapi](https://strapi.io/) for backend and [Nuxt](https://nuxtjs.org/) for frontend).
Comes with rich markdown extensions to blog **music notations**, **math typesetting**, **charting**, **UML diagrams**, **code syntaxt highlighting**, etc...

## Featuring:
* Full-featured Strapi built-in Backend includes
  * Admin panel
    * WYSIWYG Editor
    * User roles & permissions management
    * Extensible content type management system
  * Simple RESTful API and client library
  * And customized with
    * Tags
    * i18n plugin
    * Custom Toast UI Editor plugin with built-in markdown extensions
      * Music Notations (Customized plugin using [abc.js](https://www.abcjs.net/) & [alphatab](https://www.alphatab.net/))
      * Math typesetting (Customized plugin using [mathjax](https://www.mathjax.org/))
      * Code syntax highlight (TUI built-in with [prismjs](https://prismjs.com/))
      * Chart (TUI built-in with [tui-chart](https://ui.toast.com/tui-chart))
      * UML diagram (TUI built-in with [PlantUML](https://plantuml.com/))
* Frontend (Nuxt-based SPA, can run in CSR, [SSR](https://nuxtjs.org/docs/concepts/server-side-rendering/), or [SSG](https://nuxtjs.org/docs/concepts/static-site-generation/) mode)
  * Simple one-column blog template
  * Categories as menu
  * i18n with dynamic routing and non-english slugs
  * Sitemap/RSS feed module included with dynamic & non-english route support
  * GTM module included to track (Nuxt-Route-based) pageviews in GA

## Get it running

```shell
git clone --recurse-submodules git@github.com:yshlin/strapi-nuxt-blog.git
# or later `git submodule update —init —reursive` if `--recurse-submodules` not provided initially

# Install backend dependencies
cd strapi-nuxt-blog/backend/plugins/strapi-plugin-wysiwyg-toastui/submodules/tui.editor
npm install
cd ../../
# now in strapi-nuxt-blog/backend/plugins/strapi-plugin-wysiwyg-toastui/
npm install
cd ../../
# now in strapi-nuxt-blog/backend/
npm install
# run strapi backend, access via http://localhost:1337/admin
npm run develop

# use another terminal to install frontend dependencies
cd ../frontend/
# now in strapi-nuxt-blog/frontend/
npm install
npm syncassets
# run nuxt frontend, access from http://localhost:3000/
npm run develop
```

## Notes on backup and restore
Currently, it's simple to back up and restore data, simply copy these 2 folders:
```shell
.tmp/
public/uploads/
```

## TODOs
* Integrate [Netlify CLI](https://docs.netlify.com/cli/get-started/) to automate deployment
* Better initial data to demonstrate the capability of the blogware
* Externalize project-specific config