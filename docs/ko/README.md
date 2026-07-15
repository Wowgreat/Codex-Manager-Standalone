# CodexManager 사용 안내

[中文](../../README.md) · [English](../en/README.md) · [Русский](../ru/README.md)

CodexManager는 로컬 계정 관리 및 OpenAI 호환 게이트웨이입니다. 인증된 계정, 플랫폼 API 키, 모델 카탈로그, 서드파티 Aggregate API 업스트림을 관리하고 클라이언트용 로컬 API를 제공합니다.

## 1. 설치 및 시작 (Windows)

[Releases](https://github.com/qxcnm/Codex-Manager/releases)에서 다음 중 하나를 받으세요.

- `CodexManager_<version>_x64-setup.exe`: 설치형 버전입니다.
- `CodexManager-portable.exe`: 포터블 버전입니다. 쓰기 가능한 폴더에 두고 바로 실행하세요.

처음 실행한 뒤 로컬 서비스 상태를 확인하세요. 기본 서비스 주소는 `localhost:48760`입니다. Settings에서 포트를 바꾸지 않았다면 클라이언트 Base URL은 `http://localhost:48760/v1`입니다.

## 2. 계정 인증

1. 홈 화면에서 서비스를 시작합니다. 서비스가 중지되어 있으면 게이트웨이는 요청을 처리하지 않습니다.
2. **Account Management**를 열고 계정을 추가한 다음 브라우저 인증을 완료합니다.
3. callback이 자동으로 인식되지 않으면 callback URL을 앱에 붙여 넣어 수동으로 파싱합니다.
4. 사용량과 계정 상태를 새로 고치고, 계정이 사용 가능한지 확인한 후 플랫폼 키를 만듭니다.

계정, 인증 callback, 내보낸 계정 데이터는 민감한 정보입니다. 다른 사람과 공유하거나 저장소에 커밋하지 마세요.

## 3. 플랫폼 API 키 만들기 및 클라이언트 연결

1. **Platform Keys**에서 키를 만들고 필요에 따라 허용 모델과 reasoning level을 선택합니다.
2. 클라이언트를 다음과 같이 설정합니다.

   ```text
   Base URL: http://localhost:48760/v1
   API Key: <your-platform-key>
   Authorization: Bearer <your-platform-key>
   ```

3. 주요 호환 endpoint는 다음과 같습니다.

   - `POST /v1/responses`
   - `POST /v1/chat/completions`

예시의 키는 자리표시자입니다. 실제 키를 스크린샷, 채팅, 템플릿, 공개 저장소에 넣지 마세요.

## 4. GPT-5.6 모델 선택

**Models** 페이지와 플랫폼 키 설정에는 계정에 허용된 모델 카탈로그가 표시됩니다.

| 표시 이름 | 모델 slug |
| --- | --- |
| GPT-5.6 (GPT-5.6 Sol 별칭) | `gpt-5.6` |
| GPT-5.6 Sol | `gpt-5.6-sol` |
| GPT-5.6 Terra | `gpt-5.6-terra` |
| GPT-5.6 Luna | `gpt-5.6-luna` |

reasoning level은 `none`, `low`, `medium`, `high`, `xhigh`, `max`입니다. 카탈로그에 모델이 보여도 API 접근이 보장되는 것은 아닙니다. 표시 여부, API 사용 가능 여부, reasoning level은 계정과 실제 요청 결과에 따라 달라집니다.

## 5. Aggregate API 업스트림 설정

Aggregate API로 호환되는 서드파티 업스트림을 연결할 수 있습니다.

1. **Aggregate API**를 열고 업스트림을 추가한 뒤 이름, 주소, 업스트림 키를 입력합니다.
2. `https://api.example.com` 같은 일반 base URL을 사용하고 `/v1`은 붙이지 마세요. 게이트웨이가 클라이언트 경로를 추가하므로 `/v1`을 넣으면 `/v1/v1/...`가 될 수 있습니다.
3. 앱에서 연결을 테스트한 후 모델 매핑과 우선순위를 설정합니다.
4. 필요한 모델을 업스트림에 매핑합니다. 하나의 모델을 여러 업스트림이 제공하면 우선순위로 선택됩니다.

업스트림 키도 비밀 정보입니다. 로컬 앱 설정에만 보관하세요.

## 6. 프록시 및 네트워크 설정

**Settings**에서 업스트림 프록시, 요청 시간 제한, SSE keepalive를 설정합니다. 직접 연결해야 하는 업스트림 도메인은 **Proxy Bypass Domains**에 지정하세요. 이 항목은 업스트림 프록시 설정과 별개입니다.

게이트웨이는 기본적으로 로컬 사용을 위한 것입니다. LAN이나 인터넷에 노출하기 전에 플랫폼 키를 요구하고 방화벽, reverse proxy 또는 다른 네트워크 제어로 접근을 제한하세요. 인증되지 않은 게이트웨이를 공개하지 마세요.

## 7. 문제 해결

**클라이언트가 연결되지 않음:** 서비스가 실행 중인지, Base URL이 `http://localhost:48760/v1`인지, 포트가 막히지 않았는지 확인하세요.

**401 또는 권한 오류:** 업스트림 키가 아니라 플랫폼 키를 사용해야 합니다. 키가 활성화되어 있고 요청 모델을 허용하는지 확인하세요.

**모델이 없거나 요청 실패:** 계정 상태와 모델 카탈로그를 새로 고치세요. 사용 가능 여부는 계정에 따라 달라집니다.

**Aggregate API URL이 잘못됨:** 일반 업스트림 URL의 중복 `/v1`을 제거하고 연결 테스트를 다시 실행하세요.

## 8. 소스에서 빌드 (Windows)

Rust, Node.js, pnpm, PowerShell 7 (`pwsh`)을 설치한 뒤 저장소 루트에서 실행합니다.

```powershell
pwsh -NoLogo -NoProfile -File scripts/rebuild.ps1 -Bundle nsis -CleanDist -Portable
```

설치 프로그램은 Tauri bundle output에, 포터블 실행 파일은 `portable/CodexManager-portable.exe`에 생성됩니다.

## 보안 및 면책 조항

이 프로젝트는 학습과 개발을 위한 것입니다. 각 업스트림 플랫폼의 약관을 준수하고 서비스 또는 rate limit을 우회하는 용도로 사용하지 마세요. 계정, API 키, 프록시, 네트워크 노출 방식에 대한 책임은 사용자에게 있습니다.
