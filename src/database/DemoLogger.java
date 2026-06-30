package database;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * DEMO LOGGER — Shared utility for SqlBankingDemo and NoSqlBankingDemo
 *
 * Every line is written to TWO places simultaneously:
 *   1. The CONSOLE  — you see output live while the program runs
 *   2. A .TXT FILE  — you can open and read it comfortably afterwards
 *
 * Usage in a demo class:
 *   DemoLogger.open("src/database/sql_demo_output.txt");  // call once at start
 *   DemoLogger.println("Hello");
 *   DemoLogger.printf("Balance: %.2f%n", 1200.0);
 *   DemoLogger.close();                                   // call once at end
 */
public class DemoLogger {

    private static PrintWriter fileWriter = null;
    private static String      openPath   = null;

    // ── Open ──────────────────────────────────────────────────────────────────

    /** Open (or overwrite) the log file. Call once at the start of main(). */
    public static void open(String filePath) {
        openPath = filePath;
        try {
            fileWriter = new PrintWriter(new FileWriter(filePath, false)); // false = overwrite
            String ts = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            writeLine("Generated : " + ts);
            writeLine("Log file  : " + filePath);
            writeLine("");
        } catch (IOException e) {
            System.err.println("[DemoLogger] Cannot open log file: " + e.getMessage());
            fileWriter = null;
        }
    }

    // ── Output ────────────────────────────────────────────────────────────────

    /** Print a line to console and file. */
    public static void println(String line) {
        System.out.println(line);
        writeLine(line);
    }

    /** Print a blank line to console and file. */
    public static void println() {
        System.out.println();
        writeLine("");
    }

    /**
     * Print a formatted string to console and file.
     * Uses the same syntax as System.out.printf — e.g. "%-10s | %.2f%n"
     */
    public static void printf(String format, Object... args) {
        String text = String.format(format, args);
        System.out.print(text);
        if (fileWriter != null) { fileWriter.print(text); fileWriter.flush(); }
    }

    // ── Close ─────────────────────────────────────────────────────────────────

    /** Flush and close the log file. Call once at the end of main(). */
    public static void close() {
        if (fileWriter != null) {
            writeLine("");
            writeLine("--- end of log ---");
            fileWriter.flush();
            fileWriter.close();
            fileWriter = null;
        }
        if (openPath != null) {
            System.out.println("  → Log saved to: " + openPath);
            openPath = null;
        }
    }

    // ── Internal ──────────────────────────────────────────────────────────────

    private static void writeLine(String line) {
        if (fileWriter != null) { fileWriter.println(line); fileWriter.flush(); }
    }
}
