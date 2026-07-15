# CodexManager 使用教程

[English](docs/en/README.md) · [Русский](docs/ru/README.md) · [한국어](docs/ko/README.md)

CodexManager 是一个本地账号管理与 OpenAI 兼容网关工具。它可以管理已授权账号、平台 API Key、模型目录和第三方 Aggregate API 上游，并为客户端提供本地 API 入口。

## 1. 安装与启动（Windows）

在当前仓库的 [Releases](../../releases) 下载其一：

- `CodexManager_<version>_x64-setup.exe`：安装版，按安装程序提示完成安装。
- `CodexManager-portable.exe`：便携版，解压或复制到任意可写目录后直接运行。

首次启动后，应用会显示本地服务状态。默认服务地址为 `localhost:48760`；除非你在设置中主动修改端口，客户端 API Base URL 应使用 `http://localhost:48760/v1`。

## 2. 首次配置账号

1. 在首页启动服务；服务未启动时，网关不会处理请求。
2. 打开“账号管理”，选择添加账号并完成浏览器授权。
3. 授权回调未自动识别时，复制回调 URL 并在应用内手动解析。
4. 刷新账号用量与状态，确认账号可用后再创建平台 Key。

账号、授权回调和导出的资料都属于敏感信息，请勿分享或提交到代码仓库。

## 3. 创建平台 API Key 并连接客户端

1. 打开“平台 Key”页面，创建一个 API Key，并按需要配置可用模型与推理档位。
2. 在你的客户端中填写：

   ```text
   Base URL: http://localhost:48760/v1
   API Key: <你刚创建的平台 Key>
   Authorization: Bearer <你刚创建的平台 Key>
   ```

3. 主要兼容入口为：

   - `POST /v1/responses`
   - `POST /v1/chat/completions`

示例中的 Key 仅为占位符；不要把真实 Key 写进截图、聊天记录、配置模板或公开仓库。

## 4. 选择 GPT-5.6 模型

在“模型”或平台 Key 的模型配置中，可看到账号允许使用的模型目录。GPT‑5.6 系列包括：

| 显示名称 | 模型标识 |
| --- | --- |
| GPT-5.6（GPT-5.6 Sol 的别名） | `gpt-5.6` |
| GPT-5.6 Sol | `gpt-5.6-sol` |
| GPT-5.6 Terra | `gpt-5.6-terra` |
| GPT-5.6 Luna | `gpt-5.6-luna` |

可用推理档位为 `none`、`low`、`medium`、`high`、`xhigh`、`max`。模型出现在目录中不等于当前账号一定有 API 使用权限；请以你的账号可见性和实际请求结果为准。

## 5. 配置 Aggregate API 上游

Aggregate API 用于接入第三方兼容上游。

1. 打开“Aggregate API”，新增上游并填写名称、地址和上游 Key。
2. 通用上游地址填写根地址，例如 `https://api.example.com`，不要额外填写 `/v1`。网关会保留该路径前缀并追加客户端请求路径；若同时写入 `/v1`，可能形成 `/v1/v1/...`。
3. 使用应用中的测试功能验证连接，再配置模型映射和优先级。
4. 将需要的模型映射到该上游；同一模型存在多个上游时，按优先级选择。

上游 Key 同样是密钥，只应保存在本地应用配置中。

## 6. 代理与网络设置

在“设置”中可配置上游代理、请求超时和 SSE 保活。若某些上游域名必须直连，请把它们单独写入“代理 Bypass 域名”；它与“上游代理”是两个独立设置。

默认仅在本机使用网关。如果将服务暴露到局域网或公网，必须启用平台 Key，并通过防火墙、反向代理或访问控制限制来源；不要把无认证的网关暴露到互联网。

## 7. 常见问题

**客户端无法连接**：确认服务已启动，Base URL 是 `http://localhost:48760/v1`，并检查端口没有被防火墙或其他程序阻塞。

**401 或权限错误**：确认使用的是平台 Key，不是上游 Key；检查 Key 是否被禁用，以及该 Key 是否允许所请求的模型。

**模型未显示或请求失败**：刷新账号状态和模型目录。模型可见性、可用 API 和推理档位受账号授权影响。

**Aggregate API 请求地址异常**：检查通用上游地址中是否重复填写了 `/v1`，并重新运行连接测试。

## 8. 从源码构建（Windows）

前提：已安装 Rust、Node.js、pnpm 和 PowerShell 7（`pwsh`），并在项目根目录执行：

```powershell
pwsh -NoLogo -NoProfile -File scripts/rebuild.ps1 -Bundle nsis -CleanDist -Portable
```

安装包会输出到 Tauri 的 bundle 目录；便携版输出到 `portable/CodexManager-portable.exe`。

## 安全与免责声明

本项目仅用于学习和开发。使用时请遵守上游平台的服务条款，不要用它绕过服务或速率限制。你对账号、API Key、代理和网络暴露方式负责。
