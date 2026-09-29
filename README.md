# 🎨 소셜스킬 놀이터

여섯 가지 놀이(공감·경청·사과·화해·칭찬·거절)로 마음을 배우는 교실용 웹앱입니다.

| 파일 | 설명 |
|---|---|
| `index.html` | 학생용 놀이터 |
| `dashboard.html` | 선생님 대시보드 (학생별 별점 표) |
| `config.js` | 구글 시트 연결 주소 설정 |
| `apps-script/Code.gs` | 결과를 저장하는 구글 Apps Script 코드 |

## 1. GitHub Pages로 배포하기

1. GitHub에서 새 저장소(예: `social-skill-playground`)를 만듭니다. **Public**으로 만들어야 무료 Pages를 쓸 수 있어요.
2. 이 폴더의 파일을 모두 업로드합니다. (`Add file` → `Upload files`로 끌어다 놓아도 됩니다.)
3. 저장소 `Settings` → `Pages` → **Branch: `main` / `(root)`** 선택 → `Save`.
4. 1~2분 뒤 `https://<내아이디>.github.io/social-skill-playground/` 주소로 접속됩니다.

여기까지만 해도 놀이는 모두 동작합니다. 별점은 각 학생 기기(브라우저)에만 저장돼요.

## 2. (선택) 선생님 대시보드에 결과 모으기

GitHub Pages에는 서버가 없어서, 구글 시트를 저장소로 사용합니다.

1. 새 구글 시트를 만들고 `확장 프로그램` → `Apps Script`를 엽니다.
2. `apps-script/Code.gs` 내용을 통째로 붙여넣고, `RESET_PIN` 값을 원하는 비밀번호로 바꾼 뒤 저장합니다.
3. `배포` → `새 배포` → 유형 **웹 앱** 선택
   - 실행 사용자: **나**
   - 액세스 권한: **모든 사용자**
4. `배포`를 누르고 권한을 승인한 뒤, 나오는 **웹 앱 URL**(`https://script.google.com/macros/s/.../exec`)을 복사합니다.
5. `config.js`의 `API_URL: ''` 따옴표 안에 붙여넣고 GitHub에 다시 올립니다.

이제 학생이 활동을 마치고 별점을 누르면 시트에 한 줄씩 쌓이고, `dashboard.html`에서 5초마다 자동으로 새로고침됩니다.

> ℹ️ Apps Script 코드를 수정했다면 `배포` → `배포 관리` → 연필 아이콘 → 버전 **새 버전**으로 다시 배포해야 반영돼요.
