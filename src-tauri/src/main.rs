#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// use tauri_plugin_store::PluginBuilder;
// use tauri_plugin_store::StoreBuilder;
use tauri_plugin_sql::{TauriSql, Migration, MigrationKind };

fn main() {
  // let storage = StoreBuilder::new(".setting".parse().unwrap())
  //   .build();

  tauri::Builder::default()
    .plugin(TauriSql::default().add_migrations("sqlite:test.db", vec![Migration {
      version: 1,
      description: "create todo",
      sql: include_str!("../migrations/1.sql"),
      kind: MigrationKind::Up,
    }]))
    // .plugin(PluginBuilder::default().stores([settings]).freeze().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
