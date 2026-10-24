# Photo Booth

A self-service birthday photo booth that runs in the browser and installs on phones and tablets.

- Countdown with single photo, 4-photo strip, or 2×2 grid layouts
- Party cam for quick candid shots and selfies (back or selfie camera, optional 3s/5s timer)
- Guest QR code: guests scan it to use the party cam on their own phones, uploading to the same Google Drive album
- Themed frames with a corner sticker, name, message and date
- Works offline once installed (Add to Home Screen)

Open the GitHub Pages link on a phone or tablet, then use **Share → Add to Home Screen** (iPhone/iPad) or **⋮ → Install app** (Android).

## Save every photo to Google Drive

1. Go to [script.google.com](https://script.google.com) and click **New project**.
2. Delete what's there and paste in the contents of [`google-drive-uploader.gs`](google-drive-uploader.gs). Click **Save**.
3. Click **Deploy → New deployment**, choose the gear icon → **Web app**, set **Execute as: Me** and **Who has access: Anyone**, then **Deploy**. Approve the Google permission prompts.
4. Copy the **Web app URL** (ends in `/exec`).
5. In the booth, **Hold for settings** → paste it into **Google Drive upload link** → **Test connection** → **Save settings**.

Each finished photo then uploads to the Drive folder named in the script. Photos taken without internet wait on the device and upload when it reconnects; the chip at the top shows how many are waiting.
