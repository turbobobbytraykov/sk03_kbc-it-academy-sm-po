package monolith;

/**
 * MONOLITH EXAMPLE
 *
 * Everything runs in ONE application, sharing ONE database.
 * All modules are tightly coupled together.
 *
 * === HOW TO SIMULATE A BUG ===
 * Change NOTIFICATION_BUG to true (line below).
 * This simulates a developer introducing a bug in the Notification module.
 * Watch how it crashes the ENTIRE application — including Loans and Cards.
 */
public class BankingApp {

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  CHANGE THIS TO 'true' TO SIMULATE A BUG IN NOTIFICATIONS  ║
    // ╚══════════════════════════════════════════════════════════════╝
    private static final boolean NOTIFICATION_BUG = false;

    // Shared database — all modules use this
    private double accountBalance = 2500.00;

    // --- LOAN MODULE ---
    public double calculateLoanPayment(double amount, int months) {
        double payment = amount / months;
        System.out.println("[Loan] Monthly payment for €" + amount + " = €" + String.format("%.2f", payment));
        return payment;
    }

    // --- CARD MODULE ---
    public boolean processCardPayment(double amount) {
        if (amount > accountBalance) {
            System.out.println("[Card] Payment of €" + amount + " DECLINED (insufficient funds)");
            return false;
        }
        accountBalance -= amount;
        System.out.println("[Card] Payment of €" + amount + " OK. Remaining: €" + String.format("%.2f", accountBalance));
        return true;
    }

    // --- NOTIFICATION MODULE (contains the bug) ---
    public void sendNotification(String customerId, String message) {
        if (NOTIFICATION_BUG) {
            // Bug: developer accidentally divides by zero while formatting
            // In a monolith, this crashes the ENTIRE application
            int crash = 1 / 0;
        }
        System.out.println("[Notification] Sent to " + customerId + ": " + message);
    }

    // --- MAIN: All modules run together ---
    public static void main(String[] args) {

        BankingApp app = new BankingApp();

        System.out.println("=== MONOLITH: All modules in one application ===\n");

        // Step 1: Loan calculation
        app.calculateLoanPayment(12000, 24);

        // Step 2: Card payment
        app.processCardPayment(49.99);

        // Step 3: Send notification — if NOTIFICATION_BUG = true, this CRASHES everything
        app.sendNotification("CUST-001", "Your payment was processed.");

        // Step 4: Another card payment — this NEVER executes if the bug is active
        app.processCardPayment(2400.00);

        System.out.println("\n✓ All operations completed.");
        System.out.println("  (Set NOTIFICATION_BUG = true to see how one bug kills everything)");
    }
}
