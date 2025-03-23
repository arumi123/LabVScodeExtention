import * as vscode from 'vscode';
import { registerChatHandler } from './chatHandler';
import { registerChatView } from './AIChatViewProvider';
import { registerChatExtension } from './chatextention';

export function activate(context: vscode.ExtensionContext) {
  // HTMLでサイドバーにチャット画面を表示するためのchatViewを登録
  registerChatView(context);

  // GitHubCopilotの@でtutorを呼び出すことのできるchatHandlerを登録
  registerChatHandler(context);

  // Azure上のRAGシステムを呼び出すchatExtensionを登録
  registerChatExtension(context);
}

