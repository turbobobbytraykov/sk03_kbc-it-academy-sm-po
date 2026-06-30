# Database Demos — SQL vs NoSQL

This folder shows how Java backend code communicates with a database.  
Two runnable demos cover the two database styles most commonly used in banking.

> **No real database needed.** Both demos simulate the database in memory,
> so you can run them instantly without installing anything.

---

## Files

| File | Role |
| :--- | :--- |
| `DemoLogger.java` | Shared utility — mirrors every output line to the console **and** to a `.txt` log file |
| `SqlBankingDemo.java` | Demo: Java talking to a **relational (SQL)** database |
| `NoSqlBankingDemo.java` | Demo: Java talking to a **document (NoSQL)** database |
| `sql_demo_output.txt` | *(generated)* — created/overwritten each time `SqlBankingDemo` runs |
| `nosql_demo_output.txt` | *(generated)* — created/overwritten each time `NoSqlBankingDemo` runs |

---

## How to Run

Run all commands from the **project root** folder:

```bash
# 1. Compile all database demos at once
javac src/database/*.java -d out

# 2a. Run the SQL demo
#     → output printed to console  AND  saved to src/database/sql_demo_output.txt
java -cp out database.SqlBankingDemo

# 2b. Run the NoSQL demo
#     → output printed to console  AND  saved to src/database/nosql_demo_output.txt
java -cp out database.NoSqlBankingDemo
```

---

## What Each Demo Shows

### SQL Demo — `SqlBankingDemo.java`
Simulates a Java connection to **Oracle / PostgreSQL / MySQL** via JDBC.

| Step | SQL Command | What it does |
| :---: | :--- | :--- |
| 1 | `INSERT INTO accounts …` | Add a new bank account (row) |
| 2 | `SELECT * FROM accounts` | Read every account |
| 3 | `SELECT … WHERE balance > 1000` | Filter accounts by balance |
| 4 | `UPDATE accounts SET balance …` | Change a balance after a payment |
| 5 | `INSERT INTO transactions …` | Record the payment in a second table |
| 6 | `SELECT … JOIN …` | Link the two tables to show who sent money |

Key concept: data lives in **tables** with fixed columns.  
Tables are linked by shared keys — that linking is called a **JOIN**.

---

### NoSQL Demo — `NoSqlBankingDemo.java`
Simulates a Java connection to **MongoDB** via the MongoDB Java Driver.

| Step | MongoDB Command | What it does |
| :---: | :--- | :--- |
| 1 | `db.accounts.insertOne({…})` | Store an account as a JSON document |
| 2 | `db.accounts.find({})` | Read all account documents |
| 3 | `db.accounts.find({ balance: { $gt: 1000 } })` | Filter by balance |
| 4 | `db.accounts.updateOne(…, { $inc: … })` | Increment/decrement a field |
| 5 | `db.transactions.insertOne({…})` | Record the payment as a document |
| 6 | `db.transactions.find({ from: … })` | Find all payments from one account |

Key concept: data lives in **documents** (JSON objects).  
Different documents can have different fields — no rigid schema required.

---

## SQL vs NoSQL at a Glance

| | SQL — Relational | NoSQL — Document |
| :--- | :--- | :--- |
| How data is stored | Rows in fixed-column **tables** | Flexible **JSON documents** |
| Linking data | `JOIN` between tables | Query collections separately |
| Schema | Strict — all rows share the same columns | Flexible — each document can differ |
| Typical banking use | Core accounts, payments, compliance | Customer profiles, event logs, mobile sessions |
| Real-world examples | Oracle, PostgreSQL, MySQL | MongoDB, Couchbase, DynamoDB |

Both styles are used side-by-side in modern banking systems —  
SQL for structured, auditable data; NoSQL for fast, flexible reads.
