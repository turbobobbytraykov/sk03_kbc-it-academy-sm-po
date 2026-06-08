| Action | Method | URL | Body |
| :--- | :--- | :--- | :--- |
| List all accounts | GET | `http://localhost:8080/accounts` | — |
| Get one account | GET | `http://localhost:8080/accounts?id=1` | — |
| Create account | POST | `http://localhost:8080/accounts` | `{"id": "3", "owner": "Alice", "balance": "500"}` |


## Run:
1. Compile (once)
javac src/api/BankingApi.java -d out

2. Run
java -cp out api.BankingApi