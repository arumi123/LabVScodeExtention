import * as vscode from 'vscode';

export function registerChatView(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('chatView', new AIChatViewProvider(context))
    );
}

export class AIChatViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getWebviewContent();
  }

  private getWebviewContent() {
    return `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 10px;
          }
          #chat-container {
            border: 1px solid #ccc;
            padding: 10px;
            height: 300px;
            overflow-y: auto;
          }
          #chat-input {
            width: calc(100% - 60px);
            padding: 10px;
            margin-top: 10px;
          }
          #send-button {
            padding: 10px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>カスタムRAG Chat</h1>
        <div id="chat-container"></div>
        <input type="text" id="chat-input" placeholder="Type a message..."/>
        <button id="send-button" onclick="sendMessage()">Send</button>
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