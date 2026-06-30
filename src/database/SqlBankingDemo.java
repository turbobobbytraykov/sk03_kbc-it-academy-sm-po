package database;

import java.util.*;

/**
 * SQL DATABASE DEMO — How Java talks to a relational database
 *
 * In a real bank this would connect to Oracle, PostgreSQL or MySQL via JDBC.
 * Here we SIMULATE the database so you can run it without any setup.
 *
 * KEY IDEA: SQL organises data in TABLES (think: Excel sheets).
 *   • Every row  = one record   (e.g. one bank account)
 *   • Every column = one field  (e.g. owner, balance, iban)
 *   • Java sends an SQL text command → database executes it → returns a result
 *
 * Run:
 *   javac src/database/SqlBankingDemo.java -d out
 *   java  -cp out database.SqlBankingDemo
 */
public class SqlBankingDemo {

    // ── Simulated "accounts" table ────────────────────────────────────────────
    //
    //   id  | owner          | balance  | iban
    //   ----|----------------|----------|---------------------
    //   1   | Jan Janssen    | 1200.00  | BE68 5390 0754 7034
    //   2   | Marie Dupont   |  850.50  | BE71 3100 8237 5916
    //   3   | Luca Rossi     | 3200.00  | BE45 0670 3999 8765
    //
    static List<Map<String, Object>> accountsTable    = new ArrayList<>();
    static List<Map<String, Object>> transactionsTable = new ArrayList<>();
    static int nextTxId = 1;

    // ─────────────────────────────────────────────────────────────────────────
    public static void main(String[] args) {

        DemoLogger.open("src/database/sql_demo_output.txt");

        DemoLogger.println("╔══════════════════════════════════════════════════════════╗");
        DemoLogger.println("║      SQL — Banking with a Relational Database (JDBC)     ║");
        DemoLogger.println("╚══════════════════════════════════════════════════════════╝");
        DemoLogger.println();

        // ── 1. INSERT — add new accounts ──────────────────────────────────────
        sql("INSERT INTO accounts (id, owner, balance, iban) VALUES (1, 'Jan Janssen',  1200.00, 'BE68 5390 0754 7034')");
        insertAccount(1, "Jan Janssen",  1200.00, "BE68 5390 0754 7034");

        sql("INSERT INTO accounts (id, owner, balance, iban) VALUES (2, 'Marie Dupont',  850.50, 'BE71 3100 8237 5916')");
        insertAccount(2, "Marie Dupont",  850.50, "BE71 3100 8237 5916");

        sql("INSERT INTO accounts (id, owner, balance, iban) VALUES (3, 'Luca Rossi',   3200.00, 'BE45 0670 3999 8765')");
        insertAccount(3, "Luca Rossi",   3200.00, "BE45 0670 3999 8765");

        DemoLogger.println("  → 3 rows inserted.");
        DemoLogger.println();

        // ── 2. SELECT ALL — read every row ────────────────────────────────────
        sql("SELECT * FROM accounts");
        printTable(accountsTable);

        // ── 3. SELECT with WHERE — filter rows ────────────────────────────────
        sql("SELECT * FROM accounts WHERE balance > 1000.00");
        List<Map<String, Object>> richAccounts = selectWhere("balance", 1000.00);
        printTable(richAccounts);

        // ── 4. UPDATE — change a value ────────────────────────────────────────
        sql("UPDATE accounts SET balance = balance - 200.00 WHERE id = 1");
        updateBalance(1, -200.00);
        DemoLogger.println("  → 1 row updated. New state:");
        printTable(accountsTable);

        // ── 5. INSERT into a second table — record the transaction ────────────
        sql("INSERT INTO transactions (id, from_account_id, to_account_id, amount, tx_date)" +
            "\n         VALUES (1, 1, 2, 200.00, '2026-06-30')");
        insertTransaction(1, 2, 200.00, "2026-06-30");
        DemoLogger.println("  → Transaction recorded.");
        DemoLogger.println();

        // ── 6. JOIN — combine data from two tables ────────────────────────────
        //
        //  This is a core SQL feature: link rows across tables by a shared key.
        //  Here we link transactions → accounts to show the sender's name.
        //
        sql("SELECT t.id, a.owner AS sender, t.amount, t.tx_date" +
            "\n  FROM transactions t" +
            "\n  JOIN accounts a ON t.from_account_id = a.id");
        printTransactionsWithNames();

        DemoLogger.println("✓ SQL demo complete.");
        DemoLogger.println();
        DemoLogger.close();
    }

    // ── Helper: print the SQL before "executing" it ───────────────────────────
    static void sql(String query) {
        DemoLogger.println("┌─ SQL sent to database ─────────────────────────────────");
        DemoLogger.println("│  " + query.replace("\n", "\n│  "));
        DemoLogger.println("└────────────────────────────────────────────────────────");
    }

    // ── Simulated SQL operations ──────────────────────────────────────────────

    static void insertAccount(int id, String owner, double balance, String iban) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id",      id);
        row.put("owner",   owner);
        row.put("balance", balance);
        row.put("iban",    iban);
        accountsTable.add(row);
    }

    static List<Map<String, Object>> selectWhere(String column, double minValue) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> row : accountsTable) {
            if ((double) row.get(column) > minValue) result.add(row);
        }
        return result;
    }

    static void updateBalance(int id, double delta) {
        for (Map<String, Object> row : accountsTable) {
            if ((int) row.get("id") == id) {
                row.put("balance", (double) row.get("balance") + delta);
            }
        }
    }

    static void insertTransaction(int fromId, int toId, double amount, String date) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id",              nextTxId++);
        row.put("from_account_id", fromId);
        row.put("to_account_id",   toId);
        row.put("amount",          amount);
        row.put("tx_date",         date);
        transactionsTable.add(row);
    }

    static void printTransactionsWithNames() {
        DemoLogger.println("  id | sender         | amount  | tx_date");
        DemoLogger.println("  ---|----------------|---------|----------");
        for (Map<String, Object> tx : transactionsTable) {
            int fromId = (int) tx.get("from_account_id");
            String sender = accountsTable.stream()
                .filter(a -> (int) a.get("id") == fromId)
                .map(a -> (String) a.get("owner"))
                .findFirst().orElse("?");
            DemoLogger.printf("  %-2s | %-14s | %7.2f | %s%n",
                tx.get("id"), sender, tx.get("amount"), tx.get("tx_date"));
        }
        DemoLogger.println();
    }

    static void printTable(List<Map<String, Object>> rows) {
        if (rows.isEmpty()) { DemoLogger.println("  (no results)"); DemoLogger.println(); return; }
        DemoLogger.println("  id | owner          | balance  | iban");
        DemoLogger.println("  ---|----------------|----------|---------------------");
        for (Map<String, Object> r : rows) {
            DemoLogger.printf("  %-2s | %-14s | %8.2f | %s%n",
                r.get("id"), r.get("owner"), r.get("balance"), r.get("iban"));
        }
        DemoLogger.println();
    }
}
