package microservices;

/**
 * MICROSERVICES APP — Same business operations as the monolith
 *
 * This calls each independent service to produce the same result
 * as monolith/BankingApp.java — but with fault isolation.
 *
 * If NotificationService has a bug (NOTIFICATION_BUG = true),
 * only notifications fail. Loans and Cards keep working.
 *
 * Compare: in monolith/BankingApp.java the same bug crashes EVERYTHING.
 */
public class App {

    public static void main(String[] args) {
        LoanService loanService = new LoanService();
        CardService cardService = new CardService();
        NotificationService notificationService = new NotificationService();

        System.out.println("=== MICROSERVICES APP ===\n");

        // Same operations as the monolith:
        loanService.calculatePayment(12000, 24);

        cardService.processPayment(49.99);

        try {
            notificationService.send("CUST-001", "Your payment was processed.");
        } catch (Exception e) {
            System.out.println("[NotificationService] ✗ CRASHED: " + e.getMessage());
            System.out.println("[NotificationService]   Other services continue!\n");
        }

        cardService.processPayment(2400.00);

        System.out.println("\n✓ Done. All working services completed successfully.");
    }
}
