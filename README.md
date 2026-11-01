# Alex Vaschuk — selected works

An artwork-focused static portfolio for **alex.vaschuk.com**.

## Current status

Nine original drawings: eight curated from Alex’s Facebook album “Мои рисунки/относительно новое”, shared June 7, 2014, and the horned portrait used as his cover photo, shared July 9, 2017. The site uses descriptive editorial titles and preserves links to each original post. A personal photograph in the album is omitted to keep the focus on the drawings.

- Repository: https://github.com/igorvaschuk/alex-vaschuk-com
- Hosting: Firebase project `vaschuk-com`, site `alex-vaschuk`
- Default hosting URL: https://alex-vaschuk.web.app
- Custom domain attached: `alex.vaschuk.com`; CNAME added at GoDaddy
- GitHub OIDC provider: `alex-repo`, restricted to this repository and `refs/heads/main`
- Service account created: `alex-deployer@vaschuk-com.iam.gserviceaccount.com`
- Deployment IAM grants: approved and applied (Firebase Hosting Admin, Service Usage Consumer, and repository impersonation)

The workflow deploys on pushes to `main`. It uses short-lived OIDC credentials, with no service-account key in GitHub. It verifies Firebase access and checks that curated artwork exists before publishing.

## Content

Website files are in `public/`. Add curated images to `public/images/` and their metadata to `public/works.js`. Each entry supports `file`, `title`, `description`, `category`, `date`, `source`, `width`, and `height`. Titles and dates should come from the original work; label descriptive editorial titles when originals are unavailable. Preserve original source links.

The gallery supports category filters and an accessible modal viewer with previous/next buttons, arrow-key navigation, Escape to close, and focus return.

Artwork images retain the original downloaded files. The source album is https://www.facebook.com/media/set/?set=a.535232863255047&type=3. Uploaded dates describe sharing dates, not verified creation dates.

## DNS

Firebase requested this record on setup:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `alex` | `alex-vaschuk.web.app` |

Firebase manages HTTPS. Check the custom domain’s current verification state before changing challenge records; they can change.

## Development

No build step or application dependencies. Serve `public/` with a static HTTP server.

```sh
node --check public/app.js
node --check public/works.js
firebase deploy --only hosting --project vaschuk-com
```

`firebase.json` selects only `alex-vaschuk`; it does not deploy other sites, Firestore rules, or functions.
