package microservices;

/**
 * NOTIFICATION SERVICE — Independent microservice
 *
 * === HOW TO SIMULATE A BUG ===
 * Change NOTIFICATION_BUG to true (line below).
 * This service will crash — but LoanService and CardService keep working.
 */
public class NotificationService {

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  CHANGE THIS TO 'true' TO SIMULATE A BUG                   ║
    // ╚══════════════════════════════════════════════════════════════╝
    private static final boolean NOTIFICATION_BUG = false;

    public void send(String customerId, String message) {
        if (NOTIFICATION_BUG) {
            throw new RuntimeException("BUG: formatting error in notification template");
        }
        System.out.println("[NotificationService] Sent to " + customerId + ": " + message);
    }

    public static void main(String[] args) {
        System.out.println("=== Notification Service (independent) ===\n");
        NotificationService service = new NotificationService();
        service.send("CUST-001", "Your payment was processed.");
        service.send("CUST-002", "Your salary arrived.");
        System.out.println("\n✓ Notification Service operational.");
    }
}
