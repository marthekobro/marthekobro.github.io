# Marthe Trygg Kobro – portfolio

Personal portfolio for Marthe Trygg Kobro, senior interaction designer.
Live at **https://marthekobro.github.io**.

A plain static site: one HTML page, one stylesheet and one small script.
There is no build step, framework or package manager. Edit the files, commit,
and GitHub Pages publishes the result.

> **Note:** This site was designed and coded with AI assistance
> (Claude, by Anthropic), directed and reviewed by Marthe.

## Files

```
index.html      All content: home page and every project page
css/style.css   All styling, with colours and spacing at the top
js/main.js      Shows the right page based on the URL (#studio, #aidn, ...)
img/            Images (JPG)
.nojekyll       Tells GitHub Pages to serve the files as they are
```

## How the site works

`index.html` holds every "page" at once:

- `<div id="view-home">` is the home page: name, project index, image strip,
  About, Experience, and Education.
- `<article id="view-studio">`, `<article id="view-aidn">` and so on hold one
  project each. They start hidden.

`js/main.js` reads the part of the address after `#` and shows the matching
block. For example, `marthekobro.github.io/#aidn` shows the Aidn project,
while `#om-meg` shows the home page and scrolls to About. Links between
pages are ordinary links such as `<a href="#aidn">`.

## Common edits

**Change text.** Find the text in `index.html` and edit it. Each project
starts with a comment such as `<!-- ============ AIDN ============ -->`.

**Change a colour.** Edit the variables at the top of `css/style.css`. The
pink accent is `--accent`. All text colours pass WCAG AA contrast (4.5:1)
against white and against the hover tint, so check contrast if you change
them.

**Change spacing on phones.** Everything for small screens (up to 860px wide)
is in section 8 at the bottom of `css/style.css`.

**Replace an image.** Put the new file in `img/`, then update `src` and `alt`
on the `<img>` tag in `index.html`. Keep `alt` as a short description of what
the image shows.

**Add a project.**
1. Copy an existing `<article class="case wrap" id="view-...">` block in
   `index.html` and give it a new id, for example `view-nytt`.
2. Add a row to the project index (`<section id="prosjekter">`) with
   `href="#nytt"`.
3. Add `"nytt"` to the `CASES` list at the top of `js/main.js`, in the same
   order as the index.
4. Update the `01 / 07` counters and the previous/next links (`.pager`) on the
   neighbouring projects.

### Image layouts in project pages

Inside each `<section class="part">`, images are wrapped in a class that sets
the layout:

| Class          | Use                                                    |
| -------------- | ------------------------------------------------------ |
| *(none)*       | Full-width image                                       |
| `narrow`       | Single image, max 1000px wide                          |
| `mid`          | Single image, max 880px wide                           |
| `narrowsmall`  | Phone screenshot, max 420px wide                       |
| `pair`         | Two images side by side (stacked on phones)            |
| `tiles`        | Grid of screenshots on grey boxes, two per row         |
| `scroll`       | Wide diagram that scrolls sideways on small screens    |

## Preview locally

Open `index.html` in a browser, or run a tiny local server from the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing

GitHub Pages serves the `main` branch. Anything merged or pushed to `main`
is live within a minute or two. For larger changes, work on a branch and
open a pull request so the change can be reviewed first.

## Accessibility

- Pink accent `#b8336a` has a 5.65:1 contrast ratio on white; secondary
  text colours are 4.5:1 or higher.
- A "skip to content" link appears on keyboard focus.
- When a project opens, keyboard and screen-reader focus moves to its heading.
- Hover effects also apply to keyboard focus, and animations are turned off
  for visitors who prefer reduced motion.
