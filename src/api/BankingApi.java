package api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;

/**
 * Simple Banking REST API — no dependencies, plain Java.
 *
 * Run:   javac src/api/BankingApi.java -d out && java -cp out api.BankingApi
 *
 * Endpoints:
 *   GET  http://localhost:8080/accounts        → list all accounts
 *   GET  http://localhost:8080/accounts?id=1   → get one account
 *   POST http://localhost:8080/accounts        → create account (JSON body)
 *
 * Example POST body:
 *   {"id": "3", "owner": "Alice", "balance": 500}
 */
public class BankingApi {

    // In-memory store (no database needed)
    static List<Map<String, String>> accounts = new ArrayList<>(Arrays.asList(
        account("1", "Jan Janssen",  "1200.00"),
        account("2", "Marie Dupont", "850.50")
    ));

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/accounts", BankingApi::handleAccounts);
        server.start();
        System.out.println("API running on http://localhost:8080/accounts");
    }

    static void handleAccounts(HttpExchange ex) throws IOException {
        String method = ex.getRequestMethod();

        if ("GET".equals(method)) {
            String query = ex.getRequestURI().getQuery(); // e.g. "id=1"
            String body;

            if (query != null && query.startsWith("id=")) {
                String id = query.substring(3);
                body = accounts.stream()
                    .filter(a -> id.equals(a.get("id")))
                    .findFirst()
                    .map(BankingApi::toJson)
                    .orElse("{\"error\": \"not found\"}");
            } else {
                body = toJsonArray(accounts);
            }
            respond(ex, 200, body);

        } else if ("POST".equals(method)) {
            String raw = new String(ex.getRequestBody().readAllBytes());
            Map<String, String> account = parseJson(raw);
            accounts.add(account);
            respond(ex, 201, toJson(account));

        } else {
            respond(ex, 405, "{\"error\": \"method not allowed\"}");
        }
    }

    // ── Helpers ──────────────────────────────────────────────────────

    static Map<String, String> account(String id, String owner, String balance) {
        Map<String, String> m = new LinkedHashMap<>();
        m.put("id", id); m.put("owner", owner); m.put("balance", balance);
        return m;
    }

    static void respond(HttpExchange ex, int code, String body) throws IOException {
        byte[] bytes = body.getBytes();
        ex.getResponseHeaders().set("Content-Type", "application/json");
        ex.sendResponseHeaders(code, bytes.length);
        ex.getResponseBody().write(bytes);
        ex.getResponseBody().close();
    }

    /** Very small JSON serialiser — avoids external libraries. */
    static String toJson(Map<String, String> m) {
        StringBuilder sb = new StringBuilder("{");
        m.forEach((k, v) -> sb.append("\"").append(k).append("\": \"").append(v).append("\", "));
        if (sb.length() > 1) sb.setLength(sb.length() - 2); // trim last comma
        return sb.append("}").toString();
    }

    static String toJsonArray(List<Map<String, String>> list) {
        StringBuilder sb = new StringBuilder("[");
        list.forEach(m -> sb.append(toJson(m)).append(", "));
        if (sb.length() > 1) sb.setLength(sb.length() - 2);
        return sb.append("]").toString();
    }

    /** Minimal JSON parser for flat {"key": "value"} objects only. */
    static Map<String, String> parseJson(String json) {
        Map<String, String> map = new LinkedHashMap<>();
        json = json.replaceAll("[{}\"]", "");
        for (String pair : json.split(",")) {
            String[] kv = pair.split(":", 2);
            if (kv.length == 2) map.put(kv[0].trim(), kv[1].trim());
        }
        return map;
    }
}
