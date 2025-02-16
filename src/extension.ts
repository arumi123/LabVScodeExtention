// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// ジュール 'vscode' には、VS Code の拡張機能 API が含まれています。 
// モジュールをインポートし、エイリアス vscode を使用してコード内で参照します。
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// 拡張機能がアクティブ化されたときにこのメソッドが呼び出されます
// コマンドが初めて実行されたときに拡張機能がアクティブ化されます

// exportは、モジュール（ファイル）内の関数、変数、クラスなどを、外部からアクセスできるようにするためのキーワード
// activate関数は、拡張機能がアクティブ化されたときに呼び出される関数であり、拡張機能がアクティブ化される度に実行される
// contextは、拡張機能の状態を保持するオブジェクト
// vscode.commands.registerCommandメソッドは、コマンドを登録するメソッド
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// コンソールを使用して診断情報（console.log）やエラー（console.error）を出力します
	// このコード行は、拡張機能がアクティブ化されたときに一度だけ実行されます
	console.log('Congratulations, your extension "labextention" is now active! 拡張機能の起動に成功！');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// コマンドは package.json ファイルで定義されています
	// 次に、registerCommand を使用してコマンドの実装を提供します
	// commandId パラメータは、package.json の command フィールドと一致している必要があります
	const disposable = vscode.commands.registerCommand('labextention.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from LabExtention! LabExtentionからこんにちは!');
	});

	// registerCommand によって作成された disposable を、context.subscriptions 配列に追加します
	// これにより、VS Code が拡張機能をアンロードするときに、disposable を破棄することができます
	context.subscriptions.push(disposable);
}

// このメソッドは、拡張機能が無効化されたときに呼び出されます
// This method is called when your extension is deactivated
export function deactivate() {}
