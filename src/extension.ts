import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // ボタンをクリックしたときに実行されるコマンドを登録
  context.subscriptions.push(vscode.commands.registerCommand('labextention.createDirectories', () => {
	// ディレクトリを作成する関数
	createDirectories();
  }));

  // チャット画面を表示するコマンドを登録
  context.subscriptions.push(vscode.commands.registerCommand('labextention.showChat', () => {
    showChatPanel(context);
  }));

  // チャットビューをサイドバーに表示
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('chatView', new ChatViewProvider(context))
  );

  // コマンドパレットからチャットビューを表示するコマンドを登録
  context.subscriptions.push(vscode.commands.registerCommand('labextention.showChatView', () => {
    vscode.commands.executeCommand('workbench.view.extension.chatContainer');
  }));
}

function createDirectories() {
  // 作成するディレクトリ群のパス
  const directories = [
	'dir1',
	'dir2',
	'dir3/subdir1',
	'dir3/subdir2',
  ];

  // ディレクトリを作成
  directories.forEach((directory) => {
  vscode.workspace.fs.createDirectory(vscode.Uri.file(directory));
  });
}

function showChatPanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'chatPanel', // 識別子
    'Chat', // タイトル
    vscode.ViewColumn.One, // 表示するカラム
    {
      enableScripts: true // スクリプトを有効にする
    }
  );

  // Webview の HTML コンテンツを設定
  panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chat</title>
    </head>
    <body>
      <h1>Chat</h1>
      <div id="chat-container"></div>
      <input type="text" id="chat-input" placeholder="Type a message..."/>
      <button onclick="sendMessage()">Send</button>
      <script>
        const chatContainer = document.getElementById('chat-container');
        const chatInput = document.getElementById('chat-input');

        function sendMessage() {
          const message = chatInput.value;
          if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatContainer.appendChild(messageElement);
            chatInput.value = '';
          }
        }
      </script>
    </body>
    </html>
  `;
}

// チャットビューをサイドバーに表示
class ChatViewProvider implements vscode.WebviewViewProvider {
  // チャットビュー
  private _view?: vscode.WebviewView;

  // コンストラクタ
  constructor(private readonly context: vscode.ExtensionContext) {}

  // ビューを作成
  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getWebviewContent();
  }

  // ビューを更新
  private getWebviewContent() {
    return `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat</title>
      </head>
      <body>
        <h1>Chat</h1>
        <div id="chat-container"></div>
        <input type="text" id="chat-input" placeholder="Type a message..."/>
        <button onclick="sendMessage()">Send</button>
        <script>
          const chatContainer = document.getElementById('chat-container');
          const chatInput = document.getElementById('chat-input');

          function sendMessage() {
            const message = chatInput.value;
            if (message) {
              const messageElement = document.createElement('div');
              messageElement.textContent = message;
              chatContainer.appendChild(messageElement);
              chatInput.value = '';
            }
          }
        </script>
      </body>
      </html>
    `;
  }
}