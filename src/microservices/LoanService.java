package microservices;

/**
 * LOAN SERVICE — Independent microservice
 *
 * This service runs on its own, with its own data.
 * It knows nothing about cards or notifications.
 */
public class LoanService {

    public void calculatePayment(double amount, int months) {
        if (months <= 0) {
            System.out.println("[LoanService] Cannot calculate payment: months must be greater than zero.");
            return;
        }
        double payment = amount / months;
        System.out.println("[LoanService] Monthly payment for €" + amount + " = €" + String.format("%.2f", payment));
    }

    public static void main(String[] args) {
        System.out.println("=== Loan Service (independent) ===\n");
        LoanService service = new LoanService();
        service.calculatePayment(12000, 24);
        service.calculatePayment(5000, 12);
        System.out.println("\n✓ Loan Service operational.");
    }
}
