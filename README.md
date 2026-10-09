# Malar Goat Management System

Plain HTML, CSS and JavaScript. No backend, no database, free to host.

## Files
- `index.html` – page layout and login screen
- `style.css` – all styling
- `app.js` – all features

## Host on Vercel (free)
1. Put these 3 files in a GitHub repository (in the root folder).
2. On vercel.com, click **Add New → Project**, import the repository.
3. Framework preset: **Other**. No build command. Click **Deploy**.
4. Open the link on Amma's phone and use "Add to Home screen" so it opens like an app.

## First sign-in
- Username: `malar`
- Password: `malar123`
- Change both in **Settings → Sign-in details**.

## Where the data is saved
- All records are saved in the browser on that device (localStorage), so they stay after closing the app.
- The sign-in itself uses sessionStorage (plus "keep me signed in" if ticked).
- Data does NOT sync between phones. Use one main phone.
- **Download a backup every week** (Settings → Download backup file). If the phone changes or browser data is cleared, use "Restore from backup".

## How profit is calculated
Total cost of a goat = buying cost + spending recorded for that goat only + an equal share of common costs (feed, labour, etc.) split between all goats on the farm that day.
Profit or loss = sale price − total cost.
