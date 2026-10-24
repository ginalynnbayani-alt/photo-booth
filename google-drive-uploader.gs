/**
 * Photo booth -> Google Drive uploader.
 *
 * Paste this into a new Google Apps Script project (script.google.com), then
 * Deploy > New deployment > Web app, with "Execute as: Me" and
 * "Who has access: Anyone". Copy the web app link (ends in /exec) into the
 * booth's settings under "Google Drive upload link".
 *
 * Every finished booth photo is saved into the Drive folder named below,
 * which is created the first time a photo arrives.
 */
const FOLDER_NAME = "Azalea's Birthday Photo Booth";

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.image) return reply({ ok: false, error: 'No photo in the request' });
    const name = String(data.filename || 'photobooth.jpg').replace(/[^\w.-]+/g, '-');
    const type = /\.png$/i.test(name) ? 'image/png' : 'image/jpeg';
    const blob = Utilities.newBlob(Utilities.base64Decode(data.image), type, name);
    lock.waitLock(20000); // one photo at a time, so the folder is only created once
    const file = folder().createFile(blob);
    return reply({ ok: true, id: file.getId(), folder: FOLDER_NAME });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// "Test connection" in the booth settings calls this.
function doGet() {
  return reply({ ok: true, folder: FOLDER_NAME });
}

function folder() {
  const found = DriveApp.getFoldersByName(FOLDER_NAME);
  return found.hasNext() ? found.next() : DriveApp.createFolder(FOLDER_NAME);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
