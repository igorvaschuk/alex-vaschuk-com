# Alex Vaschuk — selected works

An artwork-focused static portfolio for **alex.vaschuk.com**.

## Current status

Draft implementation. **Not yet published.** Artwork selection is pending access to Alex’s Facebook photos without unrelated private Messenger content. `public/works.js` deliberately has no placeholder or invented artwork.

- Repository: https://github.com/igorvaschuk/alex-vaschuk-com
- Hosting: Firebase project `vaschuk-com`, site `alex-vaschuk`
- Default hosting URL: https://alex-vaschuk.web.app
- Custom domain attached: `alex.vaschuk.com`, awaiting DNS
- GitHub OIDC provider: `alex-repo`, restricted to this repository and `refs/heads/main`
- Service account created: `alex-deployer@vaschuk-com.iam.gserviceaccount.com`
- Deployment IAM grants: pending explicit approval; not applied

The workflow will deploy on pushes to `main` once deployment IAM is configured. It uses short-lived OIDC credentials, with no service-account key in GitHub.

## Content

Website files are in `public/`. Add curated images to `public/images/` and their metadata to `public/works.js`. Each entry supports `file`, `title`, `description`, `category`, `date`, `source`, `width`, and `height`. Titles and dates should come from the original work; label descriptive editorial titles when originals are unavailable. Preserve original source links.

The gallery supports category filters and an accessible modal viewer with previous/next buttons, arrow-key navigation, Escape to close, and focus return.

Do not publish the draft before real artwork has been curated.

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
