package database;

import java.util.*;

/**
 * NoSQL DATABASE DEMO — How Java talks to a document database
 *
 * In a real bank this would connect to MongoDB (or Couchbase / DynamoDB)
 * via the MongoDB Java Driver.
 * Here we SIMULATE the database so you can run it without any setup.
 *
 * KEY IDEA: NoSQL organises data as DOCUMENTS (think: sticky notes / JSON).
 *   • No fixed columns — every document can have different fields
 *   • Flexible structure is great for data that changes shape over time
 *     (e.g. different card types, different loan products)
 *   • Java builds a Java object → driver converts it to JSON → database stores it
 *
 * Compare with SqlBankingDemo.java to see the difference in style!
 *
 * Run:
 *   javac src/database/NoSqlBankingDemo.java -d out
 *   java  -cp out database.NoSqlBankingDemo
 */
public class NoSqlBankingDemo {

    // ── Simulated MongoDB "accounts" collection ───────────────────────────────
    //
    //  Each account is a DOCUMENT — basically a Map / JSON object.
    //  Notice: documents can have different shapes (customerProfile, preferences…)
    //
    static List<Map<String, Object>> accountsCollection    = new ArrayList<>();
    static List<Map<String, Object>> transactionsCollection = new ArrayList<>();

    // ─────────────────────────────────────────────────────────────────────────
    public static void main(String[] args) {

        DemoLogger.open("src/database/nosql_demo_output.txt");

        DemoLogger.println("╔══════════════════════════════════════════════════════════╗");
        DemoLogger.println("║    NoSQL — Banking with a Document Database (MongoDB)    ║");
        DemoLogger.println("╚══════════════════════════════════════════════════════════╝");
        DemoLogger.println();

        // ── 1. insertOne — store a document ──────────────────────────────────
        //
        //  In SQL you had strict columns.  Here we insert a flexible document.
        //  Jan has a 'customerProfile' sub-document; Marie has 'preferences'.
        //  Both are valid — NoSQL does not enforce a fixed schema.
        //
        nosql("db.accounts.insertOne({\n" +
              "  _id: 'acc_001',\n" +
              "  owner: 'Jan Janssen',\n" +
              "  balance: 1200.00,\n" +
              "  iban: 'BE68 5390 0754 7034',\n" +
              "  customerProfile: { tier: 'gold', since: 2018 }\n" +
              "})");
        insertAccount("acc_001", "Jan Janssen",  1200.00, "BE68 5390 0754 7034",
            Map.of("tier", "gold", "since", 2018), null);

        nosql("db.accounts.insertOne({\n" +
              "  _id: 'acc_002',\n" +
              "  owner: 'Marie Dupont',\n" +
              "  balance: 850.50,\n" +
              "  iban: 'BE71 3100 8237 5916',\n" +
              "  preferences: { language: 'fr', paperlessStatements: true }\n" +
              "})");
        insertAccount("acc_002", "Marie Dupont",  850.50, "BE71 3100 8237 5916",
            null, Map.of("language", "fr", "paperlessStatements", true));

        nosql("db.accounts.insertOne({\n" +
              "  _id: 'acc_003',\n" +
              "  owner: 'Luca Rossi',\n" +
              "  balance: 3200.00,\n" +
              "  iban: 'BE45 0670 3999 8765'\n" +
              "})");
        insertAccount("acc_003", "Luca Rossi",   3200.00, "BE45 0670 3999 8765",
            null, null);

        DemoLogger.println("  → 3 documents inserted.");
        DemoLogger.println();

        // ── 2. find — read all documents ──────────────────────────────────────
        nosql("db.accounts.find({})");
        printCollection(accountsCollection);

        // ── 3. find with filter — like SQL WHERE ──────────────────────────────
        nosql("db.accounts.find({ balance: { $gt: 1000 } })");
        List<Map<String, Object>> result = findWhere("balance", 1000.00);
        printCollection(result);

        // ── 4. updateOne — change one field ───────────────────────────────────
        nosql("db.accounts.updateOne(\n" +
              "  { _id: 'acc_001' },\n" +
              "  { $inc: { balance: -200.00 } }\n" +
              ")");
        updateBalance("acc_001", -200.00);
        DemoLogger.println("  → Document updated. New state:");
        printCollection(accountsCollection);

        // ── 5. insertOne — record a transaction as a document ─────────────────
        nosql("db.transactions.insertOne({\n" +
              "  _id: 'tx_001',\n" +
              "  from: 'acc_001',\n" +
              "  to:   'acc_002',\n" +
              "  amount: 200.00,\n" +
              "  date:   '2026-06-30',\n" +
              "  metadata: { channel: 'mobile-app', deviceOS: 'iOS' }\n" +
              "})");
        insertTransaction("tx_001", "acc_001", "acc_002", 200.00, "2026-06-30");
        DemoLogger.println("  → Transaction document stored.");
        DemoLogger.println();

        // ── 6. find on transactions ───────────────────────────────────────────
        //
        //  In MongoDB there is no JOIN.  Instead, you query each collection
        //  separately and combine in application code (or use $lookup pipeline).
        //  This simpler style makes reads very fast for a single document type.
        //
        nosql("db.transactions.find({ from: 'acc_001' })");
        printCollection(transactionsCollection);

        DemoLogger.println("✓ NoSQL demo complete.");
        DemoLogger.println();
        DemoLogger.println("─── Key differences vs SQL ───────────────────────────────");
        DemoLogger.println("  SQL   → fixed columns, strict schema, powerful JOINs");
        DemoLogger.println("  NoSQL → flexible documents, schema-less, fast single reads");
        DemoLogger.println("  Both are used in modern banking for different purposes.");
        DemoLogger.println();
        DemoLogger.close();
    }

    // ── Helper: print the MongoDB command before "executing" it ──────────────
    static void nosql(String command) {
        DemoLogger.println("┌─ MongoDB command sent to database ─────────────────────");
        DemoLogger.println("│  " + command.replace("\n", "\n│  "));
        DemoLogger.println("└────────────────────────────────────────────────────────");
    }

    // ── Simulated MongoDB operations ──────────────────────────────────────────

    static void insertAccount(String id, String owner, double balance, String iban,
                              Map<String, Object> profile, Map<String, Object> prefs) {
        Map<String, Object> doc = new LinkedHashMap<>();
        doc.put("_id",     id);
        doc.put("owner",   owner);
        doc.put("balance", balance);
        doc.put("iban",    iban);
        if (profile != null) doc.put("customerProfile", profile);
        if (prefs   != null) doc.put("preferences",     prefs);
        accountsCollection.add(doc);
    }

    static List<Map<String, Object>> findWhere(String field, double minValue) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> doc : accountsCollection) {
            if ((double) doc.get(field) > minValue) result.add(doc);
        }
        return result;
    }

    static void updateBalance(String id, double delta) {
        for (Map<String, Object> doc : accountsCollection) {
            if (id.equals(doc.get("_id"))) {
                doc.put("balance", (double) doc.get("balance") + delta);
            }
        }
    }

    static void insertTransaction(String txId, String from, String to,
                                  double amount, String date) {
        Map<String, Object> doc = new LinkedHashMap<>();
        doc.put("_id",    txId);
        doc.put("from",   from);
        doc.put("to",     to);
        doc.put("amount", amount);
        doc.put("date",   date);
        doc.put("metadata", Map.of("channel", "mobile-app", "deviceOS", "iOS"));
        transactionsCollection.add(doc);
    }

    static void printCollection(List<Map<String, Object>> docs) {
        if (docs.isEmpty()) { DemoLogger.println("  (no documents)"); DemoLogger.println(); return; }
        for (Map<String, Object> doc : docs) {
            DemoLogger.println("  " + toJson(doc));
        }
        DemoLogger.println();
    }

    static String toJson(Map<String, Object> map) {
        StringBuilder sb = new StringBuilder("{ ");
        map.forEach((k, v) -> {
            sb.append('"').append(k).append("\": ");
            if (v instanceof String) sb.append('"').append(v).append('"');
            else if (v instanceof Map)  sb.append(toJson((Map<String, Object>) v));
            else sb.append(v);
            sb.append(", ");
        });
        if (sb.length() > 2) sb.setLength(sb.length() - 2);
        return sb.append(" }").toString();
    }
}
