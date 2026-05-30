package microservices;

/**
 * CARD SERVICE — Independent microservice
 *
 * This service handles card payments independently.
 * Even if NotificationService crashes, this keeps working.
 */
public class CardService {

    private double balance = 2500.00;

    public void processPayment(double amount) {
        if (amount > balance) {
            System.out.println("[CardService] Payment of €" + amount + " DECLINED");
            return;
        }
        balance -= amount;
        System.out.println("[CardService] Payment of €" + amount + " OK. Remaining: €" + String.format("%.2f", balance));
    }

    public static void main(String[] args) {
        System.out.println("=== Card Service (independent) ===\n");
        CardService service = new CardService();
        service.processPayment(49.99);
        service.processPayment(25.00);
        System.out.println("\n✓ Card Service operational.");
    }
}
