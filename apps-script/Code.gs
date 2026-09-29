// 소셜스킬 놀이터 결과 저장용 Google Apps Script
// 구글 시트 > 확장 프로그램 > Apps Script 에 이 코드를 붙여넣고 웹앱으로 배포하세요.

const SHEET_NAME = 'results';
const RESET_PIN = '1234'; // 대시보드 '전체 초기화'용 비밀번호 — 꼭 바꿔주세요!

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['at', 'name', 'activityId', 'activityTitle', 'stars']);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// 대시보드가 결과를 읽어갈 때
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const entries = rows
    .filter(r => r[1])
    .map(r => ({
      at: new Date(r[0]).getTime(),
      name: String(r[1]),
      activityId: String(r[2]),
      activityTitle: String(r[3]),
      stars: Number(r[4])
    }));
  return json_({ entries });
}

// 학생이 활동을 완료했을 때 / 선생님이 초기화할 때
function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const sheet = getSheet_();

  if (data.action === 'reset') {
    if (String(data.pin) !== RESET_PIN) return json_({ ok: false });
    if (sheet.getLastRow() > 1) sheet.deleteRows(2, sheet.getLastRow() - 1);
    return json_({ ok: true });
  }

  const name = String(data.name || '').trim().slice(0, 10);
  const stars = Math.max(1, Math.min(5, Number(data.stars) || 0));
  if (!name || !data.activityId) return json_({ ok: false });

  sheet.appendRow([new Date(), name, String(data.activityId), String(data.activityTitle || ''), stars]);
  return json_({ ok: true });
}
