# CodexManager User Guide

[中文](../../README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md)

CodexManager is a local account-management and OpenAI-compatible gateway. It manages authorized accounts, platform API keys, model catalogs, and third-party Aggregate API upstreams, then exposes a local API for your clients.

## 1. Install and start (Windows)

Download one asset from [Releases](https://github.com/qxcnm/Codex-Manager/releases):

- `CodexManager_<version>_x64-setup.exe`: installer edition.
- `CodexManager-portable.exe`: portable edition; place it in any writable folder and run it.

After first launch, check the local service status. The default service address is `localhost:48760`. Unless you changed it in Settings, configure clients with `http://localhost:48760/v1`.

## 2. Authorize an account

1. Start the service from the home page; the gateway cannot serve requests while it is stopped.
2. Open **Account Management**, add an account, and finish browser authorization.
3. If the callback is not recognized automatically, paste its callback URL into the app for manual parsing.
4. Refresh usage and account status. Confirm the account is available before creating a platform key.

Accounts, authorization callbacks, and exported account data are sensitive. Never share them or commit them to a repository.

## 3. Create a platform API key and connect a client

1. Open **Platform Keys**, create a key, and select permitted models and reasoning levels when needed.
2. Configure your client:

   ```text
   Base URL: http://localhost:48760/v1
   API Key: <your-platform-key>
   Authorization: Bearer <your-platform-key>
   ```

3. The primary compatible endpoints are:

   - `POST /v1/responses`
   - `POST /v1/chat/completions`

The key above is a placeholder. Do not put real keys in screenshots, chats, templates, or public repositories.

## 4. Select GPT-5.6 models

The **Models** page and platform-key configuration show the catalog allowed by your account.

| Display name | Model slug |
| --- | --- |
| GPT-5.6 (alias of GPT-5.6 Sol) | `gpt-5.6` |
| GPT-5.6 Sol | `gpt-5.6-sol` |
| GPT-5.6 Terra | `gpt-5.6-terra` |
| GPT-5.6 Luna | `gpt-5.6-luna` |

Reasoning levels are `none`, `low`, `medium`, `high`, `xhigh`, and `max`. A model listed in the catalog is not a guarantee of API access: visibility, API availability, and supported reasoning levels depend on your account and the request result.

## 5. Configure an Aggregate API upstream

Use Aggregate API to connect a compatible third-party upstream.

1. Open **Aggregate API**, add an upstream, and enter its name, address, and upstream key.
2. Use a generic base URL such as `https://api.example.com`; do not append `/v1`. The gateway appends the client path, so including `/v1` can create `/v1/v1/...`.
3. Test the connection in the app, then configure model mappings and priority.
4. Map required models to the upstream. When more than one upstream serves a model, priority determines selection.

Treat upstream keys as secrets and keep them only in local application settings.

## 6. Proxy and network settings

In **Settings**, configure the upstream proxy, request timeouts, and SSE keepalive. Use **Proxy Bypass Domains** for upstream domains that must connect directly; it is separate from the upstream proxy setting.

The gateway is intended for local use by default. Before exposing it to a LAN or the Internet, require platform keys and restrict access with a firewall, reverse proxy, or equivalent network controls. Never expose an unauthenticated gateway publicly.

## 7. Troubleshooting

**The client cannot connect:** confirm the service is running, the Base URL is `http://localhost:48760/v1`, and the port is not blocked.

**401 or permission error:** use a platform key rather than an upstream key; check that the key is enabled and permits the requested model.

**A model is missing or fails:** refresh account status and the model catalog. Availability is account-dependent.

**Aggregate API builds the wrong URL:** remove a duplicated `/v1` from the generic upstream URL and run the connection test again.

## 8. Build from source (Windows)

Install Rust, Node.js, pnpm, and PowerShell 7 (`pwsh`). From the repository root, run:

```powershell
pwsh -NoLogo -NoProfile -File scripts/rebuild.ps1 -Bundle nsis -CleanDist -Portable
```

The installer is placed in the Tauri bundle output. The portable executable is `portable/CodexManager-portable.exe`.

## Safety and disclaimer

This project is for learning and development. Follow the terms of each upstream platform; do not use it to bypass service or rate limits. You are responsible for your accounts, API keys, proxies, and network exposure.
